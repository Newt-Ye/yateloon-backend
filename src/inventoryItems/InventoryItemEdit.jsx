import * as React from "react"
import {
  Edit,
  SimpleForm,
  useTranslate,
  SaveButton,
  useDataProvider,
  useNotify,
  useGetList,
  useRedirect
} from "react-admin"
import { useState, useEffect, useCallback } from "react";
import { 
  Typography, 
  Box, 
  Dialog, 
  DialogTitle, 
  DialogContent,
  DialogActions, 
  Button, 
  Grid, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Paper,
  Checkbox,
  ListItemText,
  TablePagination
} from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { InventoryItemForm } from "./InventoryItemCreate"

const fieldLabels = {
  inventory_item_category_id: "inventory_item_category",
  attribute: "attribute",
  name: "name",
  code: "code",
  specification: "specification",
  unit_id: "unit",
  inventory: "inventory",
  unit_cost: "unit_cost",
  inventory_amount: "inventory_amount",
  warehouse_id: "warehouse",
  inventory_manage: "inventory_manage",
  over_delivery_manage: "over_delivery_manage",
  over_receiving_manage: "over_receiving_manage",
  edit_item_name: "edit_item_name",
  effective_date: "effective_date",
  expiration_date: "expiration_date",
  inspection_method: "inspection_method",
  last_storage_date: "last_storage_date",
  currency_id: "currency",
  latest_purchase_price: "latest_purchase_price",
  customer_code: "customer_code",
  cost: "cost",
  unit_weight: "unit_weight",
  unit_std_material_cost: "unit_std_material_cost",
  unit_std_labor_cost: "unit_std_labor_cost",
  unit_std_manufacturing_cost: "unit_std_manufacturing_cost",
  unit_std_processing_cost: "unit_std_processing_cost",
  total_standard_cost: "total_standard_cost"
};

const InventoryItemTitle = () => {
  return <span>{'修改品號'}</span>;
};

const InventoryItemEdit = () => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const translate = useTranslate();
  const redirect = useRedirect();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [pendingSubmitData, setPendingSubmitData] = useState(null);
  const [multiApproverCount, setMultiApproverCount] = useState(0);

  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", account: "", department_id: "" });
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  const { data: departments = [] } = useGetList('departments');

  const validateForm = async (values) => {
    const errors = {}
    if (!values.inventory_item_category_id) {
      errors.inventory_item_category_id = "ra.validation.required"
    }
    if (!values.code) {
      errors.code = 'ra.validation.required';
    } else {
      try {
        const { data: category } = await dataProvider.getOne('inventory-item-categories', {
          id: values.inventory_item_category_id,
        });

        const requiredLength = category.code === '130' ? 18 : 15;

        if (values.code.length !== requiredLength) {
          errors.code = `resources.inventoryItems.detail.validation.exact_length_${requiredLength}`;
        }
      } catch (error) {
        // 若找不到分類，仍可顯示錯誤
        errors.code = 'resources.inventoryItems.detail.validation.category_not_found';
      }
    }
    if (!values.name) {
      errors.name = "ra.validation.required"
    }
    if (!values.specification) {
      errors.specification = "ra.validation.required"
    }
    if (!values.unit_id) {
      errors.unit_id = "ra.validation.required"
    }
    if (!values.warehouse_id) {
      errors.warehouse_id = "ra.validation.required"
    }
    if (!values.inspection_method) {
      errors.inspection_method = "ra.validation.required"
    }
    if (values.unit_std_material_cost === "") {
      errors.unit_std_material_cost = "ra.validation.required"
    }
    if (!values.unit_std_labor_cost === "") {
      errors.unit_std_labor_cost = "ra.validation.required"
    }
    if (!values.unit_std_manufacturing_cost === "") {
      errors.unit_std_manufacturing_cost = "ra.validation.required"
    }
    if (!values.unit_std_processing_cost === "") {
      errors.unit_std_processing_cost = "ra.validation.required"
    }
    if (!values.unit_std_processing_cost === "") {
      errors.unit_std_processing_cost = "ra.validation.required"
    }
    if (!values.total_standard_cost === "") {
      errors.total_standard_cost = "ra.validation.required"
    }
    return errors
  }

  const handleSubmit = async (values) => {
    // 簽核設定參數
    const { data: approvalSettings } = await dataProvider.getList(
        'approval-settings',
        {
          pagination: { page: 1, perPage: 1 },
          sort: { field: 'created_at', order: 'DESC' },
          filter: { 
            resource: 'inventory-items',
            is_enabled: 1 
          }
        }
    );

    if (!approvalSettings.length) {
      await dataProvider.update('inventory-items', { id: values.id, data: values });
      notify("ra.notification.updated", { type: "success" });
      return;
    }

    const approvalSettingData = approvalSettings[0];
    const { data: originalData } = await dataProvider.getOne('inventory-items', { id: values.id });

    if (originalData.approval_instance_status &&
      originalData.approval_instance_status !== "approved" &&
      originalData.approval_instance_status !== "cancelled" &&
      originalData.approval_instance_status !== "returned" &&
      originalData.approval_instance_status !== "completed"
    ) {
      notify("此品號有簽核單正在進行中，請等待流程完成後再修改", { type: "error" });
      return;
    }

    // 比對差異欄位
    const fieldChanges = Object.keys(values).reduce((changes, key) => {
        if (
            key in originalData &&
            values[key] !== originalData[key] &&
            key !== 'creator' &&
            key !== 'modifier' &&
            key !== 'updated_at' &&
            key !== 'created_at'
        ) {
            changes.push({
                field_name: key,
                field_label: fieldLabels[key] || key,
                original_value: originalData[key],
                new_value: values[key],
            });
        }
        return changes;
    }, []);
    console.log('fieldChanges', fieldChanges);

    if (!fieldChanges.length) return;

    const firstStep = approvalSettingData.steps[0];
    if (firstStep?.allow_self_assign) {
      // 開啟 Dialog 並儲存後續需要的資料
      setMultiApproverCount(firstStep?.multi_approver_count || 0)
      setPendingSubmitData({ values, approvalSettingData, fieldChanges });
      setOpenDialog(true);
      return;
    }

    // 若不需要自選簽核人，直接送出
    await submitApproval(values.id, approvalSettingData.steps, fieldChanges);
    notify('已送出簽核單，待審核通過後才會變更品號資料', { type: 'info' });
  }

  const submitApproval = async (documentId, stepsData, fieldChanges, selectedApproverIds = []) => {
    const steps = stepsData.map((step, index) => ({
      ...step,
      approver_ids:
        index === 0 && step.allow_self_assign
          ? selectedApproverIds
          : step.approvers.map((a) => a.id)
    }));

    await dataProvider.create('approval-instances', {
      data: {
        document_type: 'inventory_items',
        document_id: documentId,
        steps,
        fieldChanges
      }
    });
  };

  const handleSearch = useCallback(async (pageParam = page, currentFilters = filters) => {
      const result = await dataProvider.getList('users', {
        filter: currentFilters,
        pagination: { page: pageParam, perPage },
        sort: { field: 'created_at', order: 'ASC' },
      });
      setUsers(result.data);
      setTotal(result.total);
    }, [dataProvider, page, perPage, filters]);

    const toggleSelect = (id) => {
      if (selectedApprovers.includes(id)) {
        setSelectedApprovers(prev => prev.filter(item => item !== id));
      } else {
        setSelectedApprovers(prev => [...prev, id]);
      }
    };

    const handleSave = async () => {
      if (selectedApprovers.length !== multiApproverCount) {
        notify('請選擇指定數量的簽核人員', { type: 'error' });
        return;
      }
      setOpenDialog(false);
      const { values, approvalSettingData, fieldChanges } = pendingSubmitData;
      console.log('pendingSubmitData', pendingSubmitData);
      await submitApproval(values.id, approvalSettingData.steps, fieldChanges, selectedApprovers);
      notify('已送出簽核單，待審核通過後才會變更品號資料', { type: 'info' });
      redirect('show', 'inventory-items', values.id);
    };

    const handleClose = () => {
      setFilters({ name: "", account: "", department_id: "" })
      setSelectedApprovers([])
      setMultiApproverCount(0)
      setOpenDialog(false)
    };

    useEffect(() => {
      if (openDialog) {
        setPage(1);
        handleSearch(1, filters);
      }
    }, [openDialog, handleSearch, filters]);

    useEffect(() => {
      if (!openDialog) {
        setFilters({ name: "", account: "", department_id: "" });
      }
    }, [openDialog]);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItems.title')}
      </Typography>
      <Edit 
        title={<InventoryItemTitle/>} 
        redirect={false} 
        mutationMode="optimistic"
      >
        <SimpleForm
          defaultValues={{
            inventory_item_category_id: "",
            attribute: "M",
            name: "",
            code: "",
            specification: "",
            unit_id: "",
            inventory: 0,
            unit_cost: 0,
            inventory_amount: 0,
            warehouse_id: 0,
            inventory_manage: false,
            over_delivery_manage: true,
            over_receiving_manage: true,
            edit_item_name: false,
            effective_date: "",
            expiration_date: "",
            inspection_method: "",
            last_storage_date: "",
            currency_id: "",
            latest_purchase_price: 0,
            customer_code: "",
            cost: 0,
            unit_weight: "",
            unit_std_material_cost: 0,
            unit_std_labor_cost: 0,
            unit_std_manufacturing_cost: 0,
            unit_std_processing_cost: 0,
            total_standard_cost: 0
          }}
          validate={validateForm}
          toolbar={false}
          onSubmit={handleSubmit}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <InventoryItemForm />
          <AuditFields />
          <Dialog 
            open={openDialog}
            onClose={(event, reason) => {
              if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                return;
              }
              setOpenDialog(false);
            }}
            maxWidth="md" 
            fullWidth >
            <DialogTitle>
              { `指定${multiApproverCount}位簽核人員` }
            </DialogTitle>
            <DialogContent dividers>
              <Box mb={3}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <FormControl fullWidth>
                      <InputLabel>{translate('resources.approvalSettings.detail.dialog.department')}</InputLabel>
                      <Select
                        value={filters.department_id}
                        onChange={(e) => setFilters({ ...filters, department_id: e.target.value })}
                      >
                        {departments.map(dept => (
                          <MenuItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label={translate('resources.approvalSettings.detail.dialog.account')}
                      fullWidth
                      inputProps={{
                        autoComplete: "off"
                      }}
                      onChange={(e) => setFilters({ ...filters, account: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      label={translate('resources.approvalSettings.detail.dialog.user_name')}
                      fullWidth
                      inputProps={{
                        autoComplete: "off"
                      }}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      onClick={handleSearch}
                      sx={{ mt: 1.5 }}
                    >
                      {translate('ra.action.search')}
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ mb: 2 }} />
              <Box component={Paper} variant="outlined" sx={{ maxHeight: 400, overflowY: 'auto' }}>
                <List dense disablePadding>
                  {users.length === 0 && (
                    <ListItem>
                      <ListItemText primary={translate('ra.navigation.no_results')} />
                    </ListItem>
                  )}
                  {users.map((user) => (
                    <ListItemButton key={user.id} onClick={() => toggleSelect(user.id)}>
                      <Checkbox checked={selectedApprovers.includes(user.id)} />
                      <ListItemText
                        primary={user.name}
                        secondary={`${translate('resources.approvalSettings.detail.dialog.account')}: ${user.account}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Box>
              <TablePagination
                component="div"
                count={total}
                page={page - 1}
                onPageChange={(event, newPage) => {
                  setPage(newPage + 1);
                  handleSearch(newPage + 1);
                }}
                rowsPerPage={perPage}
                rowsPerPageOptions={[perPage]}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} / ${count !== -1 ? count : `more than ${to}`}`
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleSave}>{translate('ra.action.confirm')}</Button>
              <Button onClick={handleClose}>{translate('ra.action.cancel')}</Button>
            </DialogActions>
          </Dialog>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemEdit
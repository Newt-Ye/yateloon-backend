import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  NumberInput,
  SelectInput,
  SelectArrayInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  useTranslate,
  useSimpleFormIteratorItem,
  useDataProvider,
  AutocompleteArrayInput,
  useNotify,
  useGetList,
  Toolbar
} from "react-admin"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Checkbox,
  ListItemText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Divider,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useEffect, useState, useMemo } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import { menuItems } from '../menuData';

const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.resources) {
    errors.resources = "ra.validation.required"
  }
  if (!values.resources || values.resources.length === 0) {
    errors.resources = "ra.validation.required"
  }
  if (!values.total_steps) {
    errors.total_steps = "ra.validation.required"
  }
  if (values.steps) {
    let hasSteps = false;
    
    errors.steps = [];
    values.steps.forEach((item, index) => {
      if (item.step_name) {
        hasSteps = true;
  
        if (!item.allow_self_assign && item.approver_ids.length === 0) {
          errors.steps[index] = errors.steps[index] || {};
          errors.steps[index].approver_ids = "ra.validation.required";
        }

        if (item.allow_self_assign && !item.multi_approver_count) {
          errors.steps[index] = errors.steps[index] || {};
          errors.steps[index].multi_approver_count = "ra.validation.required";
        }
      }
    });
  
    if (!hasSteps) {
      errors.steps = "resources.approvalSettings.detail.errors.min_one_step_required"
    }
  }
  return errors
}

// 自訂一個固定右上角的 Toolbar
const FixedSaveToolbar = ({ formType }) => {
  if (formType === "show") return null
  return (
    <Toolbar
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        p: 2,
        // backgroundColor: 'transparent',
        backgroundColor: 'white',
        boxShadow: 'none',
        width: '99%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <SaveButton/>
    </Toolbar>
  )
}

const ApprovalSettingForm = ({ 
  formKey,
  formType,
  AuditFields
}) => {
  const translate = useTranslate();
  const notify = useNotify();

  const menuItemChoices = menuItems
      .flatMap(group => group.items)
      .filter(item => item.isApprovalForm)
      .map(item => ({
        id: item.resource,
        name: item.primaryText
      }));

  // 適用單據選單
  const ApprovalFormSelector = () => (
    <SelectArrayInput 
      source="resources" 
      choices={menuItemChoices} 
      label={translate('resources.approvalSettings.commons.fields.resources')}
      isRequired={formType === 'show' ? false : true}
      readOnly={formType === 'show' ? true : false}
    />
  )

  // 簽核層級數量
  const TotalStepsInput = () => (
    <NumberInput 
      source="total_steps" 
      label={translate('resources.approvalSettings.commons.fields.total_steps')}
      isRequired={formType === 'show' ? false : true}
      readOnly={formType === 'show' ? true : false} 
      min={1}
      inputProps={{
        autoComplete: "off"
      }}/>
  )

  // 簽核層級設定
  const ApprovalStepsGrid = () => {
    const { setValue, getValues } = useFormContext();
    const totalSteps = useWatch({ name: 'total_steps' }) || 0;

    useEffect(() => {
      if (Number.isInteger(totalSteps) && totalSteps > 0) {
        const steps = getValues('steps');
        const filledSteps = Array.from({ length: totalSteps }, (_, i) => steps[i] || {
          step_name: "",
          approval_type: "user",
          approval_department_id: "",
          approver_ids: [],
          allow_self_assign: 0,
          multi_approver_enabled: 0,
          multi_approver_rule: "all",
          multi_approver_count: "",
          reject_behavior: "previous"
        });
        setValue("steps", filledSteps);
      } else {
        setValue("steps", []);
      }
    }, [totalSteps, getValues, setValue]);

    const ApprovalDepartmentSelecter = () => {
      const { index } = useSimpleFormIteratorItem();
      const { clearErrors } = useFormContext();
      const approvalType = useWatch({ name: `steps.${index}.approval_type` }) || undefined;
      const [disabled, setDisabled] = useState(true);

      useEffect(() => {
        if (approvalType && approvalType === "department") {
          setDisabled(false)
        } else {
          setDisabled(true)
          if (getValues(`steps.${index}.approval_department_id`)) {
            setValue(`steps.${index}.approval_department_id`, "");
          }
        }
      }, [approvalType, index]);

      return (
        <ReferenceInput source="approval_department_id" 
          reference="departments" 
          sort={{ field: 'created_at', order: 'ASC' }}
        >
          <SelectInput 
            optionText="name" 
            label={translate('resources.approvalSettings.detail.fields.approval_department')} 
            readOnly={disabled}
            onChange={(e) => {
              if (e.target.value) clearErrors(`steps.${index}.approval_department_id`);
            }}
          />
        </ReferenceInput>
      )
    }

    const ApproversSelecter = () => {
      const { index } = useSimpleFormIteratorItem();
      const approvalType = useWatch({ name: `steps.${index}.approval_type` }) || undefined;
      const multiApproverEnabled = useWatch({ name: `steps.${index}.multi_approver_enabled` }) || undefined;
      const allowSelfAssign = useWatch({ name: `steps.${index}.allow_self_assign` }) || undefined;

      useEffect(() => {
        if (!approvalType || approvalType !== "user") {
          if (getValues(`steps.${index}.approver_ids`)) {
            setValue(`steps.${index}.approver_ids`, []);
          }
        }
      }, [approvalType, index]);

      useEffect(() => {
        if (!multiApproverEnabled) {
          const approverIds = getValues(`steps.${index}.approver_ids`);
          if (approverIds && approverIds.length > 1) {
            setValue(`steps.${index}.approver_ids`, [approverIds[0]]);
          }
        }
      }, [multiApproverEnabled, index]);

      useEffect(() => {
        if (allowSelfAssign) {
          if (getValues(`steps.${index}.approver_ids`)) {
            setValue(`steps.${index}.approver_ids`, []);
          }
        }
      }, [allowSelfAssign, index]);

      return (
        <ReferenceInput source="approver_ids" 
          reference="users" 
          sort={{ field: 'created_at', order: 'ASC' }}
        >
          <AutocompleteArrayInput 
            optionText="name" 
            label={translate('resources.approvalSettings.detail.fields.approvers')} 
            helperText={false} 
            sx={{ width: '80%' }}
            readOnly
          />
        </ReferenceInput>
      )
    }

    const MultiApproverCountInput = () => {
      const { index } = useSimpleFormIteratorItem();
      const allowSelfAssign = useWatch({ name: `steps.${index}.allow_self_assign` }) || undefined;
      const [disabled, setDisabled] = useState(true);

      useEffect(() => {
        if (allowSelfAssign) {
          setDisabled(false)
        } else {
          if (getValues(`steps.${index}.multi_approver_count`)) {
            setValue(`steps.${index}.multi_approver_count`, "");
          }
          setDisabled(true)
        }
      }, [allowSelfAssign, index]);

      return (
        <NumberInput 
          source="multi_approver_count" 
          label={translate('resources.approvalSettings.detail.fields.multi_approver_count')} 
          readOnly={disabled}
          min={1}
        />
      )
    }

    const ApproverDialogButton = () => {
      const dataProvider = useDataProvider();
      const { setValue, getValues, setError } = useFormContext();
      const { index } = useSimpleFormIteratorItem();
      const [open, setOpen] = useState(false);
      const [users, setUsers] = useState([]);
      const [filters, setFilters] = useState({ name: "", account: "", department_id: "" });
      const [page, setPage] = useState(1);
      const [perPage] = useState(10);
      const [total, setTotal] = useState(0);

      const steps = useWatch({ name: "steps" });
      const approvalType = steps[index]?.approval_type || undefined;
      const multiApproverEnabled = steps[index]?.multi_approver_enabled || undefined;
      // const approvalDepartmentId = steps[index]?.approval_department_id || undefined;
      const approverIds = useMemo(() => {
          return steps[index]?.approver_ids || [];
        }, [steps, index]);
      const [selected, setSelected] = useState(approverIds);
      const [departmentDisabled, setDepartmentDisabled] = useState(false);

      const { data: departments = [] } = useGetList('departments');

      useEffect(() => {
        setSelected(approverIds);
      }, [approverIds]);

      // useEffect(() => {
      //   if (approvalDepartmentId) {
      //     setDepartmentDisabled(true);
      //     // setValue(`steps.${index}.filter_department_id`, approvalDepartmentId);
      //     // setFilters({ ...filters, department_id: approvalDepartmentId })
      //   } else {
      //     setDepartmentDisabled(false);
      //     // setValue(`steps.${index}.filter_department_id`, "");
      //     // setFilters({ ...filters, department_id: "" })
      //   }
      // }, [approvalDepartmentId, filters]);

      const handleSearch = async (pageParam = page, currentFilters = filters) => {
        const result = await dataProvider.getList('users', {
          filter: currentFilters,
          pagination: { page: pageParam, perPage },
          sort: { field: 'created_at', order: 'ASC' },
        });
        setUsers(result.data);
        setTotal(result.total);
      };

      const toggleSelect = (id) => {
        if (selected.includes(id)) {
          setSelected(prev => prev.filter(item => item !== id));
        } else {
          setSelected(prev => [...prev, id]);
        }
      };

      const handleSave = () => {
        if (!multiApproverEnabled && selected.length > 1) {
          notify("resources.approvalSettings.detail.errors.single_approver_required", { type: "error", autoHideDuration: 2000 });
          return;
        }
        setValue(`steps.${index}.approver_ids`, selected, {shouldDirty: true});
        handleClose()
      };

      const handleClose = () => {
        // setValue(`steps.${index}.filter_department_id`, "");
        // setValue(`steps.${index}.filter_user_account`, "");
        // setValue(`steps.${index}.filter_user_name`, "");
        setFilters({ name: "", account: "", department_id: "" })
        setOpen(false)
      };

      const handleOpen = () => {
        const approvalDepartmentId = getValues(`steps.${index}.approval_department_id`);
        if (!approvalType || (approvalType === "department" && !approvalDepartmentId)) {
          setError(`steps.${index}.approval_department_id`, { type: "required", message: "ra.validation.required" });
          return;
        }

        const newFilters = {
          ...filters,
          department_id: approvalDepartmentId || "",
        };
        setFilters(newFilters);
        setDepartmentDisabled(!!approvalDepartmentId);

        setUsers([]);
        setOpen(true);
        setPage(1);
        handleSearch(1, newFilters);
      };

      return (
        <>
          {formType !== 'show' && (
            <>
              <Button 
                variant="outlined" 
                onClick={handleOpen}
              >
                {translate('resources.approvalSettings.detail.action.select_approvers')}
              </Button>
              <Dialog 
                open={open}
                onClose={(event, reason) => {
                  if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
                    return;
                  }
                  handleClose();
                }}
                maxWidth="md" 
                fullWidth >
                <DialogTitle>
                  {translate('resources.approvalSettings.detail.dialog.approvers')}
                </DialogTitle>
                <DialogContent dividers>
                  <Box mb={3}>
                    <Grid container spacing={2}>
                      <Grid item xs={3}>
                        {/* <ReferenceInput
                          reference="departments" 
                          sort={{ field: 'created_at', order: 'ASC' }}
                        >
                          <SelectInput 
                            optionText="name" 
                            label={translate('resources.approvalSettings.detail.dialog.department')}
                            fullWidth
                            readOnly={departmentDisabled}
                          />
                        </ReferenceInput> */}
                        <FormControl fullWidth>
                          <InputLabel>{translate('resources.approvalSettings.detail.dialog.department')}</InputLabel>
                          <Select
                            value={filters.department_id}
                            onChange={(e) => setFilters({ ...filters, department_id: e.target.value })}
                            disabled={departmentDisabled}
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
                          <Checkbox checked={selected.includes(user.id)} />
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
            </>
          )}
        </>
      );
    };

    return (
      <ArrayInput source="steps" label={false}>
        <SimpleFormIterator getItemLabel={index => `#${index + 1}`} disableAdd disableRemove>
          <TextInput 
            source="step_name" 
            label={translate('resources.approvalSettings.detail.fields.step_name')} 
            readOnly={formType === 'show' ? true : false}
          />
          <SelectInput 
            source="approval_type" 
            label={translate('resources.approvalSettings.detail.fields.approval_type')} 
            choices={[
              {id: 'user', name: '指定使用者'},
              {id: 'department', name: '指定部門'}
            ]}
            readOnly={formType === 'show' ? true : false}
          />
          <ApprovalDepartmentSelecter />
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, width: '100%' }}>
            <ApproversSelecter formType={formType} />
            <ApproverDialogButton formType={formType} />
          </Stack>
          <SelectInput 
            source="multi_approver_enabled" 
            label={translate('resources.approvalSettings.detail.fields.multi_approver_enabled')} 
            choices={[
              {id: 0, name: '否'},
              {id: 1, name: '是'}
            ]}
            readOnly={formType === 'show' ? true : false}
          />
          <SelectInput 
            source="multi_approver_rule" 
            label={translate('resources.approvalSettings.detail.fields.multi_approver_rule')} 
            choices={[
              {id: 'any', name: '任一人'},
              {id: 'all', name: '全部'}
            ]}
            readOnly={formType === 'show' ? true : false}
          />
          <SelectInput 
            source="allow_self_assign" 
            label={translate('resources.approvalSettings.detail.fields.allow_self_assign')} 
            choices={[
              {id: 0, name: '否'},
              {id: 1, name: '是'}
            ]}
            readOnly={formType === 'show' ? true : false}
          />
          <MultiApproverCountInput />
          <SelectInput 
            source="reject_behavior" 
            label={translate('resources.approvalSettings.detail.fields.reject_behavior')} 
            choices={[
              {id: 'previous', name: '退回上一層'},
              {id: 'creator', name: '退回建立者'}
            ]}
            readOnly={formType === 'show' ? true : false}
          />
        </SimpleFormIterator>
      </ArrayInput>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: 2,
          paddingTop: formType !== "show" ? 8 : 2, // 預留 SaveButton 空間
        }}
      >
        <SimpleForm
          key={formKey}
          defaultValues={{
            name: "",
            code: "",
            total_steps: 1,
            is_enabled: 1,
            steps: [
              {
                step_name: "",
                approval_type: "user",
                approval_department_id: "",
                approver_ids: [],
                allow_self_assign: 0,
                multi_approver_enabled: 0,
                multi_approver_rule: "all",
                multi_approver_count: "",
                reject_behavior: "previous"
              }
            ]
          }}
          validate={validateForm}
          toolbar={<FixedSaveToolbar formType={formType} />}
        >
          <Grid container width={{ xs: "100%", xl: 900 }} spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput 
                  autoFocus 
                  source="code"
                  label={translate('resources.approvalSettings.commons.fields.code')}
                  isRequired={formType === 'show' ? false : true}
                  readOnly={formType === 'show' ? true : false} 
                  inputProps={{
                    autoComplete: "off"
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput 
                  source="name" 
                  label={translate('resources.approvalSettings.commons.fields.name')}
                  isRequired={formType === 'show' ? false : true}
                  readOnly={formType === 'show' ? true : false} 
                  inputProps={{
                    autoComplete: "off"
                  }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ApprovalFormSelector/>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TotalStepsInput/>
              </Grid>
              <Grid item xs={12}>
                <TextInput source="note"
                  label={translate('resources.approvalSettings.commons.fields.note')}
                  multiline
                  rows={4}
                  readOnly={formType === 'show' ? true : false} 
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ 
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center",
                      mb: 2 }} >
                      <Typography variant="h6" gutterBottom>
                        {translate('resources.approvalSettings.detail.fieldGroups.approval_steps')}
                      </Typography>
                    </Box>
                    <ApprovalStepsGrid/>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          
          {AuditFields && <AuditFields />}
        </SimpleForm>
      </Box>
    </Box>
  )
}

export default ApprovalSettingForm;
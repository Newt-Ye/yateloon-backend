import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  useDataProvider,
  TextField
  /*useTranslate*/
} from "react-admin"
import { Box, Grid, Card, CardContent, Tabs, Tab, Typography, InputAdornment } from "@mui/material"
import { useState, useEffect } from "react";
import { useFormState, useWatch, useFormContext } from "react-hook-form";
import { validateForm } from "./InventoryItemCreate"

const InventoryItemTitle = () => {
  return <span>{'修改品號'}</span>;
};

const CustomReferenceInput = ({reference, source, label, required=false }) => {
  const dataProvider = useDataProvider();

  const handleCreate = async (newName) => {
      try {
        const { data } = await dataProvider.create(reference, {
          data: { name: newName }
        });
        return { id: data.id, name: data.name };
      } catch (error) {
        console.error(`Error creating ${reference}:`, error);
      }
  };

  return (
    <ReferenceInput 
      source={source} 
      reference={reference}
      sort={{ field: 'created_at', order: 'ASC' }}
    >
      <AutocompleteInput 
        label={label} 
        onCreate={handleCreate}
        isPending={true}
        isRequired={required}
      />
    </ReferenceInput>
  );
};

const ChildTab = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { errors } = useFormState();

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const hasError = {
    1: Boolean(errors.inspection_method),
    4: Boolean(errors.unit_std_material_cost 
      || errors.unit_std_labor_cost 
      || errors.unit_std_manufacturing_cost 
      || errors.unit_std_processing_cost
      || errors.total_standard_cost)
  };

  return (
    <Card>
      <CardContent>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ minHeight: '32px', height: '32px' }} >
          <Tab label="採購生管"sx={{ minHeight: '32px', height: '32px', color: hasError[1] ? "error.main" : "text.secondary" }} />
          <Tab label="業務"sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label="關務"sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label="財務"sx={{ minHeight: '32px', height: '32px', color: hasError[4] ? "error.main" : "text.secondary" }}/>
        </Tabs>
        <Box mt={2}>
          <Box sx={{ display: tabIndex === 0 ? "block" : "none" }}>
            <Grid container spacing={2} rowSpacing={0.2}>
              <Grid item xs={12}>
                <SelectInput source="inspection_method" label='檢驗方式' isRequired choices={[
                  { id: 'EX', name: '免檢' },
                  { id: 'SR', name: '抽檢(減量)' },
                  { id: 'SN', name: '抽檢(正常)' },
                  { id: 'ST', name: '抽檢(加嚴)' },
                  { id: 'FI', name: '全檢' }
                ]} />
              </Grid>
              <Grid item xs={12}>
                <DateInput source="last_storage_date" label='最後入庫日' />
              </Grid>
              <Grid item xs={12}>
                <CustomReferenceInput label="幣別" source="currency_id" reference="currencies" />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="latest_purchase_price" label='最近進價'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }} />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: tabIndex === 1 ? "block" : "none" }}>
            <TextInput source="customer_code" label='客戶品號' />
            <NumberInput source="cost" label='成本'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
          </Box>
          <Box sx={{ display: tabIndex === 2 ? "block" : "none" }}>
            <NumberInput source="unit_weight" label='單體重量(kg)' />
          </Box>
          <Box sx={{ display: tabIndex === 3 ? "block" : "none" }}>
            <NumberInput source="unit_std_material_cost" label='單位標準材料成本' isRequired
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_labor_cost" label='單位標準人工成本' isRequired
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_manufacturing_cost" label='單位標準製造費用' isRequired
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_processing_cost" label='單位標準加工費用' isRequired
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="total_standard_cost" label='標準成本合計' isRequired
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const InventoryAmountInput = () => {
  const { setValue } = useFormContext();

  const inventory = useWatch({ name: "inventory" }) || 0;
  const unitCost  = useWatch({ name: "unit_cost" }) || 0;

  useEffect(() => {
    const inventoryAmount = inventory * (Math.round(unitCost * 100) / 100);
    setValue("inventory_amount", Math.round(inventoryAmount * 100) / 100);
  }, [inventory, unitCost, setValue]);

  return (
    <NumberInput  source="inventory_amount" label="庫存金額"
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }} />
  );
}

const InventoryItemEdit = () => {
  const [attribute, setAttribute] = useState("");
  
  const getMaxLength = attribute === "M" ? 18 : 15;

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        品號資料
      </Typography>
      <Edit title={<InventoryItemTitle/>}>
        <SimpleForm
          defaultValues={{
            inventory_item_category_id: "",
            attribute: "",
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
        >
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} md={7}>
              <Typography variant="h5" gutterBottom mb={2}>
                {'基本資料'}
              </Typography>
              <Grid container spacing={2} rowSpacing={0.2}>
                <Grid item xs={12} sm={6}>
                  <ReferenceInput source="inventory_item_category_id" 
                    reference="inventory-item-categories" 
                    sort={{ field: 'created_at', order: 'ASC' }}
                  >
                    <SelectInput optionText="name" label="品號類別" isRequired />
                  </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput source="attribute" label='品號屬性' isRequired choices={[
                    { id: 'M', name: '自製件' },
                    { id: 'P', name: '採購件' },
                    { id: 'S', name: '委外加工件' }
                  ]} onChange={(e) => setAttribute(e.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput source="code" label="品號"  placeholder="15或18碼" inputProps={{ maxLength: getMaxLength }} isRequired />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomReferenceInput label="主要庫別" source="warehouse_id" reference="warehouses" required={true} />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextInput  source="name" label="品名" isRequired />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextInput 
                    source="specification" 
                    label="規格" 
                    inputProps={{ maxLength: 120 }}
                    multiline
                    rows={2} 
                    isRequired />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomReferenceInput label="單位" source="unit_id" reference="units" required={true} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput 
                    source="inventory" 
                    label="庫存數量" 
                    step={1}
                    format={(v) => Math.round(v)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput  source="unit_cost" label="單位成本"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    format={(v) => {
                      return Math.round(v * 100) / 100;
                    }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InventoryAmountInput />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="庫存管理" source="inventory_manage" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="超交管理" source="over_delivery_manage" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="超收管理" source="over_receiving_manage" />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="變更品名" source="edit_item_name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateInput  source="effective_date" label="生效日期" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateInput  source="expiration_date" label="失效日期" />
                </Grid>
              </Grid>
              <Card sx={{ mt: 0, bgcolor: 'text.disabled' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography variant="body2" align="left" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} >
                        建立者：
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField source="creator_name" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" align="left" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} >
                        修改者：
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField source="modifier_name" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} />
                    </Grid>

                    <Grid item xs={2}>
                      <Typography variant="body2" align="left" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} >
                        建立日期：
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField source="created_at" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} />
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2" align="left" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} >
                        修改日期：
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    <TextField source="updated_at" sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}} />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <ChildTab />
            </Grid>
          </Grid>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemEdit
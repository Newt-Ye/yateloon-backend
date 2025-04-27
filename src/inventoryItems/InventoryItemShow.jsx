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
  TextField,
  TopToolbar,
  EditButton
  /*useTranslate*/
} from "react-admin"
import { Box, Grid, Card, CardContent, Tabs, Tab, Typography, InputAdornment } from "@mui/material"
import { useState } from "react";


const ChildTab = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Card>
      <CardContent>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ minHeight: '32px', height: '32px' }} >
          <Tab label="採購生管"sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label="業務"sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label="關務"sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label="財務"sx={{ minHeight: '32px', height: '32px'}}/>
        </Tabs>
        <Box mt={2}>
          <Box sx={{ display: tabIndex === 0 ? "block" : "none" }}>
            <Grid container spacing={2} rowSpacing={0.2}>
              <Grid item xs={12}>
                <SelectInput source="inspection_method" label='檢驗方式' disabled choices={[
                  { id: 'EX', name: '免檢' },
                  { id: 'SR', name: '抽檢(減量)' },
                  { id: 'SN', name: '抽檢(正常)' },
                  { id: 'ST', name: '抽檢(加嚴)' },
                  { id: 'FI', name: '全檢' }
                ]} />
              </Grid>
              <Grid item xs={12}>
                <DateInput source="last_storage_date" label='最後入庫日' disabled />
              </Grid>
              <Grid item xs={12}>
                <ReferenceInput 
                    source="currency_id"
                    reference="currencies"
                    sort={{ field: 'created_at', order: 'ASC' }}
                  >
                    <AutocompleteInput 
                      label="幣別"
                      disabled
                    />
                  </ReferenceInput>
              </Grid>
              <Grid item xs={12}>
                <TextInput source="latest_purchase_price" label='最近進價'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }} disabled />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: tabIndex === 1 ? "block" : "none" }}>
            <TextInput source="customer_code" label='客戶品號' disabled />
            <NumberInput source="cost" label='成本'
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} disabled />
          </Box>
          <Box sx={{ display: tabIndex === 2 ? "block" : "none" }}>
            <NumberInput source="unit_weight" label='單體重量(kg)' disabled />
          </Box>
          <Box sx={{ display: tabIndex === 3 ? "block" : "none" }}>
            <NumberInput source="unit_std_material_cost" label='單位標準材料成本' disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_labor_cost" label='單位標準人工成本' disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_manufacturing_cost" label='單位標準製造費用' disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="unit_std_processing_cost" label='單位標準加工費用' disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
            <NumberInput source="total_standard_cost" label='標準成本合計' disabled
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const InventoryItemShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        品號資料
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
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
                    <SelectInput optionText="name" label="品號類別" disabled />
                  </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <SelectInput source="attribute" label='品號屬性' disabled choices={[
                    { id: 'M', name: '自製件' },
                    { id: 'P', name: '採購件' },
                    { id: 'S', name: '委外加工件' }
                  ]} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextInput
                    source="code"
                    label="品號"
                    placeholder="15或18碼"
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReferenceInput 
                    source="warehouse_id"
                    reference="warehouses"
                    sort={{ field: 'created_at', order: 'ASC' }}
                  >
                    <AutocompleteInput 
                      label="主要庫別"
                      disabled
                    />
                  </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextInput source="name" label="品名" disabled />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextInput 
                    source="specification" 
                    label="規格" 
                    inputProps={{ maxLength: 120 }}
                    multiline
                    rows={2} 
                    disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ReferenceInput 
                    source="unit_id"
                    reference="units"
                    sort={{ field: 'created_at', order: 'ASC' }}
                  >
                    <AutocompleteInput 
                      label="單位"
                      disabled
                    />
                  </ReferenceInput>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput 
                    source="inventory" 
                    label="庫存數量" 
                    step={1}
                    format={(v) => Math.round(v)} 
                    disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput  source="unit_cost" label="單位成本"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    format={(v) => {
                      return Math.round(v * 100) / 100;
                    }} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <NumberInput source="inventory_amount" label="庫存金額"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }} disabled />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="庫存管理" source="inventory_manage" disabled />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="超交管理" source="over_delivery_manage" disabled />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="超收管理" source="over_receiving_manage" disabled />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <BooleanInput label="變更品名" source="edit_item_name" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateInput  source="effective_date" label="生效日期" disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateInput  source="expiration_date" label="失效日期" disabled />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={5}>
              <ChildTab />
            </Grid>
          </Grid>
          <Card sx={{ mt: 4, bgcolor: 'text.disabled', width: '100%' }} >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="creator_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="created_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="modifier_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="updated_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemShow
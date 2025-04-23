import * as React from "react"
import { 
  Edit, 
  TabbedForm,
  SelectInput,
  RadioButtonGroupInput,
  TextInput,
  SaveButton,
  usePermissions,
} from "react-admin"
import { Grid, Typography, Box,  } from "@mui/material"
import { MonthInput } from '../customInputs/MonthInput';


const SettingTitle = () => {
  return <span>{'共用參數設定'}</span>;
};

const validateForm = values => {
  const errors = {}
  if (!values.date_format) {
    errors.date_format = "ra.validation.required"
  }
  if (!values.inventory_item_code_policy) {
    errors.inventory_item_code_policy = "ra.validation.required"
  }
  if (!values.date_separator) {
    errors.date_separator = "ra.validation.required"
  }
  if (!values.customer_code_policy) {
    errors.customer_code_policy = "ra.validation.required"
  }
  if (!values.quantity_mode) {
    errors.quantity_mode = "ra.validation.required"
  }
  if (!values.supplier_code_policy) {
    errors.supplier_code_policy = "ra.validation.required"
  }
  if (!values.confirmation_date_basis) {
    errors.confirmation_date_basis = "ra.validation.required"
  }
  if (!values.tax_calculation_mode) {
    errors.tax_calculation_mode = "ra.validation.required"
  }
  if (!values.tax_rate_precision) {
    errors.tax_rate_precision = "ra.validation.required"
  }
  if (!values.inventory_item_class_method) {
    errors.inventory_item_class_method = "ra.validation.required"
  }
  if (!values.costing_method) {
    errors.costing_method = "ra.validation.required"
  }
  if (!values.fiscal_period_type) {
    errors.fiscal_period_type = "ra.validation.required"
  }
  if (!values.inventory_current_period) {
    errors.inventory_current_period = "ra.validation.required"
  }
  if (!values.inventory_freeze_date) {
    errors.inventory_freeze_date = "ra.validation.required"
  }
  if (!values.bank_current_period) {
    errors.bank_current_period = "ra.validation.required"
  }
  if (!values.ar_current_period) {
    errors.ar_current_period = "ra.validation.required"
  }
  if (!values.ar_closed_period) {
    errors.ar_closed_period = "ra.validation.required"
  }
  if (!values.ap_current_period) {
    errors.ap_current_period = "ra.validation.required"
  }
  if (!values.ap_closed_period) {
    errors.ap_closed_period = "ra.validation.required"
  }
  return errors
}

const SettingEdit = (props) => {
  const { isPending, permissions } = usePermissions();

  return isPending
    ? null
    : (
      <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        共用參數設定
      </Typography>
      <Edit title={<SettingTitle/>} redirect={false} mutationMode="optimistic">
        <TabbedForm
          // Here for the GQL provider
          defaultValues={{
            date_format: "YYYY-MM-DD",
            inventory_item_code_policy: "N",
            date_separator: "-",
            customer_code_policy: "N",
            quantity_mode: "single",
            supplier_code_policy: "N",
            confirmation_date_basis: "document_date",
            tax_calculation_mode: "document",
            tax_rate_precision: "0.00",
            inventory_item_class_method: "材料",
            costing_method: "standard",
            fiscal_period_type: "12"
          }} 
          validate={validateForm}
          toolbar={false}
        >
          {(permissions === 'superuser' || permissions?.['setting']?.edit) 
            ? (
              <Box sx={{ position: 'absolute', top: -10, right: 0, p: 2, zIndex: 100 }}>
                <SaveButton />
              </Box>
            ) 
            : null}
          <TabbedForm.Tab
            label="基本參數設定"
            path="basic-settings"
            sx={{ maxWidth: "50em" }}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <SelectInput source="date_format" label="日期格式" choices={[
                  { id: 'YYYY-MM-DD', name: 'YYYY-MM-DD' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="inventory_item_code_policy" label="品號資料管制方式" choices={[
                  { id: 'N', name: '不控管' },
                  { id: '1', name: '品號不可重複' },
                  { id: '2', name: '品號重複時僅需警告' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="date_separator" label="日期區隔符號" choices={[
                  { id: '-', name: '-' },
                  { id: '/', name: '/' },
                  { id: '.', name: '.' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="customer_code_policy" label="客戶資料管制方式" choices={[
                  { id: 'N', name: '不控管' },
                  { id: '1', name: '客戶簡稱不可重複' },
                  { id: '2', name: '客戶簡稱重複時僅需警告' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="quantity_mode" label="數量表達方式" choices={[
                  { id: 'single', name: '單一單位' },
                  { id: 'dual', name: '雙單位' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="supplier_code_policy" label="廠商資料管制方式" choices={[
                  { id: 'N', name: '不控管' },
                  { id: '1', name: '廠商簡稱不可重複' },
                  { id: '2', name: '廠商簡稱重複時僅需警告' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="confirmation_date_basis" label="確認日依據" choices={[
                  { id: 'system_date', name: '系統日' },
                  { id: 'document_date', name: '單據日' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="tax_calculation_mode" label="稅額計算方式" choices={[
                  { id: 'document', name: '整張計算' },
                  { id: 'line_item', name: '單筆計算' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12} sm={6}>
                <SelectInput source="tax_rate_precision" label="營業稅率格式精度" choices={[
                  { id: '0', name: '0%' },
                  { id: '0.0', name: '0.0%' },
                  { id: '0.00', name: '0.00%' },
                  { id: '0.000', name: '0.000%' },
                ]} isRequired />
              </Grid>
            </Grid>
          </TabbedForm.Tab>
          <TabbedForm.Tab
            label="進銷存參數設定"
            path="inventory-settings"
            sx={{ maxWidth: "50em" }}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextInput source="inventory_item_class_method" label="品號分類方式" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="inventory_current_period" label="庫存現行日期" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="inventory_closed_period" label="庫存關帳日期" />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="inventory_freeze_date" label="帳務凍結日期" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <RadioButtonGroupInput source="costing_method" label="成本計價方式" row={false} isRequired choices={[
                  { id: 'standard', name: '標準成本制' },
                  { id: 'monthly_avg', name: '月加權平均成本制' },
                ]} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            </Grid>
          </TabbedForm.Tab>
          <TabbedForm.Tab
            label="財務參數設定"
            path="financial-settings"
            sx={{ maxWidth: "50em" }}
          >
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <RadioButtonGroupInput source="fiscal_period_type" label="會計期制" isRequired choices={[
                  { id: '12', name: '12期' },
                  { id: '13', name: '13期' },
                ]} />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="bank_current_period" label="銀行存款現行年月" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="ar_current_period" label="應收帳款現行年月" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="ar_closed_period" label="應收帳款關帳年月" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="ap_current_period" label="應付帳款現行年月" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
              <Grid item xs={12} sm={6}>
                <MonthInput source="ap_closed_period" label="應付帳款關帳年月" isRequired />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            </Grid>
          </TabbedForm.Tab>
        </TabbedForm>
      </Edit>
      </>
    )
}

export default SettingEdit
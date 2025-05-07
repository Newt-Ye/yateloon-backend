import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  DateInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  useDataProvider,
  SaveButton,
  useNotify,
  useTranslate
} from "react-admin"
import { Box, Grid, Card, CardContent, Tabs, Tab, Typography, InputAdornment } from "@mui/material"
import { useState, useEffect } from "react";
import { useFormState, useWatch, useFormContext } from "react-hook-form";

const InventoryItemTitle = () => {
  return <span>{'新增品號資料'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  } else {
    if (values.attribute === "M" && values.code.length !== 18) {
      errors.code = 'validation.inventoryItems.code.exact_length_18';
    } else if (values.attribute !== "M" && values.code.length !== 15) {
      errors.code = 'validation.inventoryItems.code.exact_length_15';
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

export const CustomReferenceInput = ({reference, source, label, required=false, disabled }) => {
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
        isRequired={required && !disabled}
        disabled={disabled}
      />
    </ReferenceInput>
  );
};

export const ChildTab = ({ disabled = false }) => {
  const translate = useTranslate();
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
          <Tab label={translate('resources.inventoryItems.detail.tabs.procurement')} sx={{ minHeight: '32px', height: '32px', color: hasError[1] ? "error.main" : "text.secondary" }} />
          <Tab label={translate('resources.inventoryItems.detail.tabs.sales')} sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label={translate('resources.inventoryItems.detail.tabs.customs')} sx={{ minHeight: '32px', height: '32px'}} />
          <Tab label={translate('resources.inventoryItems.detail.tabs.finance')} sx={{ minHeight: '32px', height: '32px', color: hasError[4] ? "error.main" : "text.secondary" }}/>
        </Tabs>
        <Box mt={2}>
          <Box sx={{ display: tabIndex === 0 ? "block" : "none" }}>
            <Grid container spacing={2} rowSpacing={0.2}>
              <Grid item xs={12}>
                <SelectInput source="inspection_method" label={translate('resources.inventoryItems.detail.fields.inspection_method')} choices={[
                    { id: 'EX', name: '免檢' },
                    { id: 'SR', name: '抽檢(減量)' },
                    { id: 'SN', name: '抽檢(正常)' },
                    { id: 'ST', name: '抽檢(加嚴)' },
                    { id: 'FI', name: '全檢' }
                  ]} 
                  isRequired={!disabled}
                  disabled={disabled} />
              </Grid>
              <Grid item xs={12}>
                <DateInput source="last_storage_date" label={translate('resources.inventoryItems.detail.fields.last_storage_date')} disabled={disabled} />
              </Grid>
              <Grid item xs={12}>
                <CustomReferenceInput label={translate('resources.inventoryItems.detail.fields.currency')} source="currency_id" reference="currencies" disabled={disabled} />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="latest_purchase_price" label={translate('resources.inventoryItems.detail.fields.latest_purchase_price')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }} disabled={disabled} />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: tabIndex === 1 ? "block" : "none" }}>
            <TextInput source="customer_code" label={translate('resources.inventoryItems.detail.fields.customer_code')} />
            <NumberInput source="cost" label={translate('resources.inventoryItems.detail.fields.cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} disabled={disabled} />
          </Box>
          <Box sx={{ display: tabIndex === 2 ? "block" : "none" }}>
            <NumberInput source="unit_weight" label={translate('resources.inventoryItems.detail.fields.unit_weight')} disabled={disabled} />
          </Box>
          <Box sx={{ display: tabIndex === 3 ? "block" : "none" }}>
            <NumberInput source="unit_std_material_cost" label={translate('resources.inventoryItems.detail.fields.unit_std_material_cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }} 
              isRequired={!disabled}
              disabled={disabled} />
            <NumberInput source="unit_std_labor_cost" label={translate('resources.inventoryItems.detail.fields.unit_std_labor_cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              isRequired={!disabled}
              disabled={disabled} />
            <NumberInput source="unit_std_manufacturing_cost" label={translate('resources.inventoryItems.detail.fields.unit_std_manufacturing_cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              isRequired={!disabled}
              disabled={disabled} />
            <NumberInput source="unit_std_processing_cost" label={translate('resources.inventoryItems.detail.fields.unit_std_processing_cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              isRequired={!disabled}
              disabled={disabled} />
            <NumberInput source="total_standard_cost" label={translate('resources.inventoryItems.detail.fields.total_standard_cost')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
              isRequired={!disabled}
              disabled={disabled} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export const InventoryAmountInput = () => {
  const translate = useTranslate();
  const { setValue } = useFormContext();

  const inventory = useWatch({ name: "inventory" }) || 0;
  const unitCost  = useWatch({ name: "unit_cost" }) || 0;

  useEffect(() => {
    const inventoryAmount = inventory * (Math.round(unitCost * 100) / 100);
    setValue("inventory_amount", Math.round(inventoryAmount * 100) / 100);
  }, [inventory, unitCost, setValue]);

  return (
    <NumberInput  source="inventory_amount" label={translate('resources.inventoryItems.detail.fields.inventory_amount')}
      InputProps={{
        startAdornment: <InputAdornment position="start">$</InputAdornment>
      }} />
  );
}

export const InventoryItemCodeInput = () => {
  const translate = useTranslate();
  const { setError, clearErrors } = useFormContext();

  const code = useWatch({ name: "code" });
  const attribute = useWatch({ name: "attribute" });

  const getMaxLength = attribute === "M" ? 18 : 15;

  useEffect(() => {
    if (code) {
      if (attribute === "M" && code.length !== 18) {
        setError("code", { type: "required", message: translate('resources.inventoryItems.detail.validation.exact_length_18') });
      } else if (attribute !== "M" && code.length !== 15) {
        setError("code", { type: "required", message: translate('resources.inventoryItems.detail.validation.exact_length_15') });
      } else {
        clearErrors("code");
      }
    }
  }, [code, attribute, setError, clearErrors, translate]);

  return (
    <TextInput
      source="code"
      label={translate('resources.inventoryItems.detail.fields.code')}
      placeholder="15或18碼"
      inputProps={{ maxLength: getMaxLength }} 
      isRequired
    />
  );
};

export const InventoryItemForm = ({ disabled = false }) => {
  const translate = useTranslate();
  return (
    <>
      <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
        <Grid item xs={12} md={7}>
          <Typography variant="h5" gutterBottom mb={2}>
            {translate('resources.inventoryItems.detail.fieldGroups.basic_info')}
          </Typography>
          <Grid container spacing={2} rowSpacing={0.2}>
            <Grid item xs={12} sm={6}>
              <ReferenceInput source="inventory_item_category_id" 
                reference="inventory-item-categories" 
                sort={{ field: 'created_at', order: 'ASC' }}
              >
                <SelectInput optionText="name" label={translate('resources.inventoryItems.detail.fields.inventory_item_category')} 
                  autoFocus 
                  isRequired={!disabled}
                  disabled={disabled} />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="attribute" label={translate('resources.inventoryItems.detail.fields.attribute')} choices={[
                { id: 'M', name: '自製件' },
                { id: 'P', name: '採購件' },
                { id: 'S', name: '委外加工件' }
              ]}
                isRequired={!disabled}
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              { !disabled 
                ? <InventoryItemCodeInput />
                : <TextInput
                    source="code"
                    label={translate('resources.inventoryItems.detail.fields.code')}
                    placeholder="15或18碼"
                    disabled
                  />
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomReferenceInput label={translate('resources.inventoryItems.detail.fields.warehouse')} source="warehouse_id" reference="warehouses" required={true} disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput  source="name" label={translate('resources.inventoryItems.detail.fields.name')} 
                isRequired={!disabled}
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextInput 
                source="specification" 
                label={translate('resources.inventoryItems.detail.fields.specification')} 
                inputProps={{ maxLength: 120 }}
                multiline
                rows={2} 
                isRequired={!disabled}
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomReferenceInput label={translate('resources.inventoryItems.detail.fields.unit')}  source="unit_id" reference="units" required={true} disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput 
                source="inventory" 
                label={translate('resources.inventoryItems.detail.fields.inventory')} 
                step={1}
                format={(v) => Math.round(v)} 
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput  source="unit_cost" label={translate('resources.inventoryItems.detail.fields.unit_cost')} 
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
                format={(v) => {
                  return Math.round(v * 100) / 100;
                }}
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              { !disabled 
                ? <InventoryAmountInput /> 
                : <NumberInput  source="inventory_amount" label={translate('resources.inventoryItems.detail.fields.inventory_amount')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }} disabled />
              }
            </Grid>
            <Grid item xs={6} sm={3}>
              <BooleanInput label={translate('resources.inventoryItems.detail.fields.inventory_manage')} source="inventory_manage" disabled={disabled} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <BooleanInput label={translate('resources.inventoryItems.detail.fields.over_delivery_manage')} source="over_delivery_manage" disabled={disabled} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <BooleanInput label={translate('resources.inventoryItems.detail.fields.over_receiving_manage')} source="over_receiving_manage" disabled={disabled} />
            </Grid>
            <Grid item xs={6} sm={3}>
              <BooleanInput label={translate('resources.inventoryItems.detail.fields.edit_item_name')} source="edit_item_name" disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput  source="effective_date" label={translate('resources.inventoryItems.detail.fields.effective_date')} 
                readOnly={!disabled}
                disabled={disabled} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput  source="expiration_date" label={translate('resources.inventoryItems.detail.fields.expiration_date')} disabled={disabled} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5}>
          <ChildTab disabled={disabled} />
        </Grid>
      </Grid>
    </>
  );
}

const InventoryItemCreate = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const [key, setKey] = useState(0);

  const onSuccess = () => {
    notify("資料新增成功", { type: "success", autoHideDuration: 2000 });
    setKey((prev) => prev + 1); // 強制渲染表單
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItems.title')}
      </Typography>
      <Create 
        title={<InventoryItemTitle/>}
        mutationOptions={{ onSuccess }}
        mutationMode="pessimistic"
        redirect={false}
      >
        <SimpleForm
          key={key}
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
            effective_date: new Date().toISOString().split('T')[0],
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
            total_standard_cost: 0,
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <InventoryItemForm disabled={false} />
        </SimpleForm>
      </Create>
    </>
  )
}

export default InventoryItemCreate
import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  useTranslate,
  RadioButtonGroupInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
} from "react-admin"
import { Box, Grid } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.factory_id) {
    errors.factory_id = "ra.validation.required"
  }
  if (!values.is_stock) {
    errors.is_stock = "ra.validation.required"
  }
  return errors
}


const WarehouseForm = ({ 
  formKey,
  disabled = false,
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey}
      defaultValues={{
        name: "",
        code: "",
        factory_id: "",
        is_stock: 1,
        include_in_available_quantity: 1,
        allow_outbound_when_save: 1,
        allow_outbound_when_confirm: 1,
      }}
      validate={validateForm}
      toolbar={false}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <SaveButton />
      </Box>
      <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
          <Grid item xs={12}>
            <RadioButtonGroupInput 
              source="is_stock" 
              label={translate('resources.warehouses.commons.fields.storage_type')}  
              choices={[
                  { id: 1, name: 'resources.warehouses.detail.fields.inventory' },
                  { id: 0, name: 'resources.warehouses.detail.fields.non_inventory' },
              ]} 
              isRequired={!disabled}
              disabled={disabled} />
          </Grid>
          <Grid item xs={12}>
            <ReferenceInput source="factory_id" 
              reference="factories" 
              sort={{ field: 'created_at', order: 'ASC' }}
            >
              <SelectInput 
                autoFocus
                optionText="name" 
                label={translate('resources.warehouses.detail.fields.factory')} 
                isRequired={!disabled}
                disabled={disabled} />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12}>
            <TextInput  
              source="code" 
              label={translate('resources.warehouses.commons.fields.code')}
              isRequired={!disabled}
              disabled={disabled} />
          </Grid>
          <Grid item xs={12}>
            <TextInput 
              source="name" 
              label={translate('resources.warehouses.commons.fields.name')}  
              isRequired={!disabled}
              disabled={disabled} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <BooleanInput 
              label={translate('resources.warehouses.detail.fields.include_in_available_quantity')}  
              source="include_in_available_quantity"
              disabled={disabled} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <BooleanInput 
              label={translate('resources.warehouses.detail.fields.allow_outbound_when_save')}  
              source="allow_outbound_when_save"
              disabled={disabled} />
          </Grid>
          <Grid item xs={6} sm={4}>
            <BooleanInput 
              label={translate('resources.warehouses.detail.fields.allow_outbound_when_confirm')}
              source="allow_outbound_when_confirm"
              disabled={disabled} />
          </Grid>
      </Grid>
    </SimpleForm>
  )
}

export default WarehouseForm;
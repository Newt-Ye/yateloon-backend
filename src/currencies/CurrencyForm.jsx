import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  SelectInput,
  useTranslate,
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
  return errors
}

const CurrencyForm = ({ 
  formKey,
  disabled = false,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey ?? undefined}
      defaultValues={{
        code: "",
        name: "",
        unit_price_precision: '0',
        amount_precision: '0',
        unit_cost_precision: '0',
        total_cost_precision: '0',
      }}
      validate={!disabled ? validateForm : undefined}
      toolbar={false}
    >
      { !disabled &&
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <SaveButton />
        </Box>
      }
      <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
        <Grid item xs={12}>
          <TextInput 
            autoFocus 
            source="code" 
            label={translate('resources.currencies.commons.fields.code')}
            isRequired={!disabled}
            readOnly={disabled}
            inputProps={{
              maxLength: 3,
              autoComplete: "off"
            }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            source="name" 
            label={translate('resources.currencies.commons.fields.name')} 
            isRequired={!disabled}
            readOnly={disabled}
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput source="unit_price_precision" label={translate('resources.currencies.detail.fields.unit_price_precision')} 
            choices={[
              { id: '0', name: '整數' },
              { id: '1', name: '小數一位' },
              { id: '2', name: '小數二位' },
              { id: '3', name: '小數三位' },
              { id: '4', name: '小數四位' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} 
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput source="amount_precision" label={translate('resources.currencies.detail.fields.amount_precision')} 
            choices={[
              { id: '0', name: '整數' },
              { id: '1', name: '小數一位' },
              { id: '2', name: '小數二位' },
              { id: '3', name: '小數三位' },
              { id: '4', name: '小數四位' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} 
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput source="unit_cost_precision" label={translate('resources.currencies.detail.fields.unit_cost_precision')} 
            choices={[
              { id: '0', name: '整數' },
              { id: '1', name: '小數一位' },
              { id: '2', name: '小數二位' },
              { id: '3', name: '小數三位' },
              { id: '4', name: '小數四位' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} 
          />
        </Grid>
        <Grid item xs={12}>
          <SelectInput source="total_cost_precision" label={translate('resources.currencies.detail.fields.total_cost_precision')} 
            choices={[
              { id: '0', name: '整數' },
              { id: '1', name: '小數一位' },
              { id: '2', name: '小數二位' },
              { id: '3', name: '小數三位' },
              { id: '4', name: '小數四位' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled}
          />
        </Grid>
      </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default CurrencyForm;
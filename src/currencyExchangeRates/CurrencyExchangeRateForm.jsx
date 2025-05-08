import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  ReferenceInput,
  SelectInput,
  DateInput,
  NumberInput,
  useTranslate,
} from "react-admin"
import { Box, Grid } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.currency_id) {
    errors.currency_id = "ra.validation.required"
  }
  if (!values.effective_date) {
    errors.effective_date = "ra.validation.required"
  }
  if (!values.bank_buy_rate) {
    errors.bank_buy_rate = "ra.validation.required"
  }
  if (!values.bank_sell_rate) {
    errors.bank_sell_rate = "ra.validation.required"
  }
  return errors
}

const CurrencyExchangeRateForm = ({ 
  formKey,
  disabled = false,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey ?? undefined}
      defaultValues={{
        currency_id: "",
        effective_date: new Date().toISOString().split('T')[0],
        bank_buy_rate: "",
        bank_sell_rate: ""
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
            <ReferenceInput 
              source="currency_id" 
              reference="currencies" 
              sort={{ field: 'created_at', order: 'ASC' }}
            >
              <SelectInput 
                optionText="name" 
                label={translate('resources.currencyExchangeRates.commons.fields.currency')} 
                autoFocus 
                isRequired={!disabled}
                readOnly={disabled}
                />
            </ReferenceInput>
          </Grid>
          <Grid item xs={12}>
            <DateInput 
              source="effective_date" 
              label={translate('resources.currencyExchangeRates.commons.fields.effective_date')} 
              isRequired={!disabled}
              readOnly={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <NumberInput 
              source="bank_buy_rate" 
              label={translate('resources.currencyExchangeRates.commons.fields.bank_buy_rate')} 
              isRequired={!disabled}
              readOnly={disabled}
            />
          </Grid>
          <Grid item xs={12}>
            <NumberInput 
              source="bank_sell_rate" 
              label={translate('resources.currencyExchangeRates.commons.fields.bank_sell_rate')}
              isRequired={!disabled} 
              readOnly={disabled}
            />
          </Grid>
      </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default CurrencyExchangeRateForm;
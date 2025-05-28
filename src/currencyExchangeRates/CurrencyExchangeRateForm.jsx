import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  ReferenceInput,
  SelectInput,
  DateInput,
  NumberInput,
  useTranslate,
  ArrayField,
  Datagrid,
  NumberField,
  DateField,
  Pagination,
  useRecordContext
} from "react-admin"
import { Box, Grid, Typography } from "@mui/material"

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
  const record = useRecordContext();

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
          { !disabled &&
              <>
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
                    inputProps={{
                      autoComplete: "off"
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <NumberInput 
                    source="bank_sell_rate" 
                    label={translate('resources.currencyExchangeRates.commons.fields.bank_sell_rate')}
                    isRequired={!disabled} 
                    readOnly={disabled}
                    inputProps={{
                      autoComplete: "off"
                    }}
                  />
                </Grid>
              </>
          }
          <Grid item xs={12} sm={10}>
            <Typography variant="h6" gutterBottom>
              {record?.name + translate('resources.currencyExchangeRates.detail.fieldGroups.history')}
            </Typography>
            <ArrayField source="rates" sort={{ field: 'effective_date', order: 'DESC' }} perPage={10}>
              <Datagrid rowClick={false} bulkActionButtons={false}>
                <DateField 
                  source="effective_date" 
                  label={translate('resources.currencyExchangeRates.commons.fields.effective_date')}
                />
                <DateField 
                  source="created_at" 
                  label={translate('resources.currencyExchangeRates.commons.fields.created_at')}
                  showTime
                />
                <NumberField 
                  source="bank_buy_rate" 
                  options={{ maximumFractionDigits: 4 }}
                  label={translate('resources.currencyExchangeRates.commons.fields.bank_buy_rate')}
                />
                <NumberField 
                  source="bank_sell_rate" 
                  options={{ maximumFractionDigits: 4 }}
                  label={translate('resources.currencyExchangeRates.commons.fields.bank_sell_rate')}  
                />
              </Datagrid>
              <Pagination />
            </ArrayField>
          </Grid>
      </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default CurrencyExchangeRateForm;
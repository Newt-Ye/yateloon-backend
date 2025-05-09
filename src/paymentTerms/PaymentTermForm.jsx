import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  RadioButtonGroupInput,
  NumberInput,
  SelectInput,
  useTranslate
} from "react-admin"
import { Box, Grid, Typography } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.term_type) {
    errors.term_type = "ra.validation.required"
  }
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.settlement_offset_type) {
    errors.settlement_offset_type = "ra.validation.required"
  }
  if (!values.settlement_base_date) {
    errors.settlement_base_date = "ra.validation.required"
  }
  if (values.settlement_offset_type) {
    if (values.settlement_offset_type === "day" && !values.after_settlement_days) {
      errors.after_settlement_days = "ra.validation.required"
    } else if (values.settlement_offset_type === "month") {
      if (!values.after_settlement_months) {
        errors.after_settlement_months = "ra.validation.required"
      }
      if (!values.fixed_day_of_month) {
        errors.fixed_day_of_month = "ra.validation.required"
      }
    }
  }
  return errors
}

const PaymentTermForm = ({ 
  formKey,
  disabled = false,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey ?? undefined}
      defaultValues={{
        term_type: "purchase",
        code: "",
        name: "",
        settlement_offset_type: "day",
        settlement_base_date: "settlement_date",
        after_settlement_days: "",
        after_settlement_months: "",
        fixed_day_of_month: ""
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
          <SelectInput 
            source="term_type" 
            label={translate('resources.paymentTerms.commons.fields.term_type')}  
            choices={[
                { id: 'purchase', name: 'resources.paymentTerms.commons.choices.purchase' },
                { id: 'sales', name: 'resources.paymentTerms.commons.choices.sales' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            autoFocus 
            source="code"
            label={translate('resources.paymentTerms.commons.fields.code')}
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            source="name" 
            label={translate('resources.paymentTerms.commons.fields.name')}
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <RadioButtonGroupInput 
            source="settlement_offset_type" 
            label={translate('resources.paymentTerms.detail.fields.settlement_offset_type')}  
            choices={[
                { id: 'day', name: 'resources.paymentTerms.detail.choices.day' },
                { id: 'month', name: 'resources.paymentTerms.detail.choices.month' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <SelectInput 
            source="settlement_base_date" 
            label={translate('resources.paymentTerms.detail.fields.settlement_base_date')} 
              choices={[
              { id: 'settlement_date', name: 'resources.paymentTerms.detail.choices.settlement_date' },
              { id: 'next_month', name: 'resources.paymentTerms.detail.choices.next_month' },
            ]}
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">
              {translate('resources.paymentTerms.detail.fields.after_settlement')}
            </Typography>
            <Box sx={{ width: '100px' }}>
              <TextInput 
                source="after_settlement_days"
                label={false}
                readOnly={disabled}
              />
            </Box>
            <Typography variant="subtitle1">
              {translate('resources.paymentTerms.detail.fields.days')}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="subtitle1">
              {translate('resources.paymentTerms.detail.fields.after_settlement')}
            </Typography>
            <Box sx={{ width: '100px' }}>
              <NumberInput 
                source="after_settlement_months" 
                label={false}
                readOnly={disabled}
              />
            </Box>
            <Typography variant="subtitle1">
              {translate('resources.paymentTerms.detail.fields.fixed_day')}
            </Typography>
            <Box sx={{ width: '100px' }}>
              <NumberInput 
                source="fixed_day_of_month" 
                label={false}
                readOnly={disabled}
              />
            </Box>
            <Typography variant="subtitle1">
              {translate('resources.paymentTerms.detail.fields.day')}
            </Typography>
          </Box>
        </Grid>
    </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default PaymentTermForm;
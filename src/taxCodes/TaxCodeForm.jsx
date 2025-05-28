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
import { Box, Grid, InputAdornment } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.direction) {
    errors.direction = "ra.validation.required"
  }
  if (!values.invoice_type) {
    errors.invoice_type = "ra.validation.required"
  }
  if (!values.tax_type) {
    errors.tax_type = "ra.validation.required"
  }
  return errors
}

const TaxCodeForm = ({ 
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
        direction: "input",
        invoice_type: "no_invoice",
        tax_type: "tax_included",
        tax_rate: ""
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
            label={translate('resources.taxCodes.commons.fields.code')}
            isRequired={!disabled}
            readOnly={disabled} 
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            source="name" 
            label={translate('resources.taxCodes.commons.fields.name')}
            isRequired={!disabled}
            readOnly={disabled} 
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RadioButtonGroupInput 
            source="direction" 
            label={translate('resources.taxCodes.commons.fields.direction')}  
            choices={[
                { id: 'input', name: 'resources.taxCodes.commons.choices.input' },
                { id: 'output', name: 'resources.taxCodes.commons.choices.output' },
            ]} 
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <SelectInput 
            source="invoice_type" 
            label={translate('resources.taxCodes.commons.fields.invoice_type')} 
            choices={[
              { id: 'no_invoice', name: 'resources.taxCodes.commons.choices.no_invoice' },
              { id: 'two_part', name: 'resources.taxCodes.commons.choices.two_part' },
              { id: 'three_part', name: 'resources.taxCodes.commons.choices.three_part' },
              { id: 'special', name: 'resources.taxCodes.commons.choices.special' },
            ]}
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <SelectInput 
            source="tax_type" 
            label={translate('resources.taxCodes.commons.fields.tax_type')} 
            choices={[
              { id: 'tax_included', name: 'resources.taxCodes.commons.choices.tax_included' },
              { id: 'tax_excluded', name: 'resources.taxCodes.commons.choices.tax_excluded' },
              { id: 'zero_rate', name: 'resources.taxCodes.commons.choices.zero_rate' },
              { id: 'exempted', name: 'resources.taxCodes.commons.choices.exempted' },
              { id: 'non_taxable', name: 'resources.taxCodes.commons.choices.non_taxable' },
            ]}
            isRequired={!disabled}
            readOnly={disabled} />
        </Grid>
        <Grid item xs={12}>
          <NumberInput 
            source="tax_rate" 
            label={translate('resources.taxCodes.commons.fields.tax_rate')}
            format={v => v ? Math.round(v) : ""}
            InputProps={{
              endAdornment: <InputAdornment position="start">%</InputAdornment>,
              autoComplete: "off"
            }} 
            readOnly={disabled} />
        </Grid>
    </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default TaxCodeForm;
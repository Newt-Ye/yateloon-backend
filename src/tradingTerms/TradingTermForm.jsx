import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
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

const TradingTermForm = ({ 
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
        name: ""
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
            label={translate('resources.tradingTerms.commons.fields.code')}
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
            label={translate('resources.tradingTerms.commons.fields.name')}
            isRequired={!disabled}
            readOnly={disabled} 
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
    </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default TradingTermForm;
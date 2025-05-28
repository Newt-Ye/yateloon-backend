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

const FactoryForm = ({ 
  formKey,
  disabled = false,
  WarehouseList,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey}
      defaultValues={{
        name: "",
        code: ""
      }}
      validate={validateForm}
      toolbar={false}
    >
      <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
        <SaveButton />
      </Box>
      <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
          <Grid item xs={12}>
            <TextInput 
              autoFocus 
              source="code"
              label={translate('resources.factories.commons.fields.code')}
              isRequired={!disabled}
              readOnly={disabled}
              inputProps={{
                autoComplete: "off"
              }} />
          </Grid>
          <Grid item xs={12}>
            <TextInput 
              source="name" 
              label={translate('resources.factories.commons.fields.name')}
              isRequired={!disabled}
              readOnly={disabled} 
              inputProps={{
                autoComplete: "off"
              }} />
          </Grid>
          {WarehouseList && <WarehouseList />}
      </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default FactoryForm;
import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  ReferenceInput,
  SelectArrayInput,
  BooleanInput,
  useTranslate,
} from "react-admin"
import { Box, Grid, Typography, Card, CardContent } from "@mui/material"
import { menuItems } from '../menuData';

const validateForm = values => {
  console.log(values);
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.company_ids || values.company_ids.length === 0) {
    errors.company_ids = "ra.validation.required"
  }
  return errors
}

const DepartmentForm = ({ 
  formKey,
  formType,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey ?? undefined}
      defaultValues={{
        code: "",
        name: "",
        company_ids: [],
      }}
      validate={ formType !== 'show' ? validateForm : undefined}
      toolbar={false}
    >
      { formType !== 'show' &&
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <SaveButton />
        </Box>
      }
      <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextInput 
            autoFocus 
            source="code" 
            label={translate(
              "resources.departments.commons.fields.code"
            )} 
            isRequired={formType === 'show' ? false : true}
            readOnly={formType === 'create' ? false : true} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextInput 
            source="name" 
            label={translate(
              "resources.departments.commons.fields.name"
            )} 
            isRequired={formType === 'show' ? false : true}
            readOnly={formType === 'create' ? false : true} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ReferenceInput 
            source="company_ids" 
            reference="companies"
          >
            <SelectArrayInput 
              optionText="name" 
              label={translate(
                "resources.departments.commons.fields.companies"
              )} 
              isRequired={formType === 'show' ? false : true} 
              readOnly={formType === 'show' ? true : false}/>
          </ReferenceInput>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Typography variant="subtitle1">
            {translate("resources.departments.detail.fieldGroups.permissions")}
          </Typography>
          <Card sx={{ mt: 1 }}>
            <CardContent>
              <Grid container width={{ xs: "100%" }} spacing={2}>
                {menuItems.map((module) => (
                  <Grid item xs={2} key={module.key}>
                    <BooleanInput 
                      label={module.name} 
                      source={module.key} 
                      readOnly={formType === 'show' ? true : false} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default DepartmentForm;
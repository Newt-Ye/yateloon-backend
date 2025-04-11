import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectArrayInput,
  ReferenceInput,
  BooleanInput,
  SaveButton,
} from "react-admin"
import { Typography, Grid, Card, CardContent, Box } from "@mui/material"
import { menuItems } from '../menuData';

const DepartmentTitle = () => {
  return <span>{'新增部門權限'}</span>;
};

export const validateForm = values => {
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

const DepartmentCreate = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        部門權限
      </Typography>
      <Create title={<DepartmentTitle/>}>
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            code: "",
            name: "",
            company_ids: [],
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextInput autoFocus source="name" label="部門名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="code" label="部門代號" isRequired />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput 
                source="company_ids" 
                reference="companies"
              >
                <SelectArrayInput optionText="name" label="適用公司別" isRequired />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">
                模組權限設定
              </Typography>
              <Card sx={{ mt: 1 }}>
                <CardContent>
                  <Grid container width={{ xs: "100%" }} spacing={2}>
                    {menuItems.map((module) => (
                    <Grid item xs={2} key={module.key}>
                        <BooleanInput label={module.name} source={module.key} />
                    </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default DepartmentCreate
import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  ReferenceInput,
  CheckboxGroupInput,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent } from "@mui/material"
import modules from '../assets/modules.json';

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
          }}
          validate={validateForm}
        >
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextInput autoFocus source="name" label="部門名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="code" label="部門代號" isRequired />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput source="companies" 
                reference="companies"
                >
                <SelectInput optionText="name" label="適用公司別" isRequired />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Typography variant="subtitle1">
            模組權限設定
          </Typography>
          <Card sx={{ mt: 1 }}>
            <CardContent>
              <Grid container  width={{ xs: "100%", xl: 1200 }} spacing={2}>
                {modules.map((module) => (
                  <Grid item xs={2} key={module.key}>
                    <CheckboxGroupInput
                      label={module.name}
                      source={module.key}
                      choices={[
                        { id: 'edit', name: '可編輯' },
                        { id: 'show', name: '可檢視' }
                      ]}
                      row={false}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </SimpleForm>
      </Create>
    </>
  )
}

export default DepartmentCreate
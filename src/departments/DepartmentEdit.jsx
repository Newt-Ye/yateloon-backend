import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectArrayInput,
  ReferenceInput,
  BooleanInput,
  /*Toolbar,*/
  SaveButton,
  TextField,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent, Box } from "@mui/material"
import { menuItems } from '../menuData';

const DepartmentTitle = () => {
  return <span>{'修改部門權限'}</span>;
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

/*
const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);
*/

const DepartmentEdit = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        部門權限
      </Typography>
      <Edit title={<DepartmentTitle/>} redirect={false} mutationMode="optimistic">
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
              <TextInput autoFocus source="code" label="部門代號" isRequired readOnly />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput source="name" label="部門名稱" isRequired readOnly />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ReferenceInput 
                source="company_ids" 
                reference="companies"
              >
                <SelectArrayInput optionText="name" label="適用公司別" isRequired readOnly />
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
          <Card sx={{ mt: 4, bgcolor: 'text.disabled', width: '100%' }} >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="creator_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="created_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="modifier_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="updated_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default DepartmentEdit
import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Toolbar,
  SaveButton,
  TextField,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent } from "@mui/material"
import { validateForm, ShortNameInput } from "./CompanyCreate"

const CompanyTitle = () => {
  return <span>{'修改公司資料'}</span>;
};

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const CompanyEdit = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        公司資料
      </Typography>
      <Edit title={<CompanyTitle/>} redirect={false} mutationMode="optimistic"> 
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            code: "",
            status: 1,
            short_name: "",
            name: "",
            responsible_person: "",
            phone: "",
            fax: "",
            address: ""
          }}
          validate={validateForm}
          toolbar={<CustomToolbar />}
        >
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="code" label="代號" isRequired readOnly />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' isRequired choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ShortNameInput />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="公司全名" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="responsible_person" label="負責人" isRequired />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="phone" label="電話" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="fax" label="傳真" />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="address" label="登記地址" isRequired />
            </Grid>
          </Grid>
          <Card sx={{ mt: 0, bgcolor: 'text.disabled', width: '100%' }} >
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

export default CompanyEdit
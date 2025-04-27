import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  /*Toolbar,*/
  TextField,
  TopToolbar,
  EditButton,
  ArrayField,
  Datagrid,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent } from "@mui/material"

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const CompanyShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        公司資料
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="code" label="代號" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' disabled choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="short_name" label="公司簡稱" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="公司全名" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="responsible_person" label="負責人" disabled />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="phone" label="電話" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="fax" label="傳真" disabled />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="address" label="登記地址" disabled />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {'部門列表'}
              </Typography>
              <ArrayField source="departments">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                  <TextField source="code" label="部門代號" />
                  <TextField source="name" label="部門名稱" />
                </Datagrid>
              </ArrayField>
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

export default CompanyShow
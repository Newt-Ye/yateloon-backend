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
  useTranslate
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent } from "@mui/material"

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const CompanyShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        公司資料
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="code" label={translate('resources.companies.detail.fields.code')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label={translate('resources.companies.detail.fields.status')} disabled choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="short_name" label={translate('resources.companies.detail.fields.short_name')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label={translate('resources.companies.detail.fields.name')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="responsible_person" label={translate('resources.companies.detail.fields.responsible_person')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="region_type" label={translate('resources.companies.detail.fields.region_type')} choices={[
                { id: 'taiwan', name: '臺灣地區' },
                { id: 'china', name: '中國地區' }
              ]} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="phone" label={translate('resources.companies.detail.fields.phone')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="fax" label={translate('resources.companies.detail.fields.fax')} disabled />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="address" label={translate('resources.companies.detail.fields.address')} disabled />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.companies.detail.fieldGroups.departments')}
              </Typography>
              <ArrayField source="departments">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                  <TextField source="code" label={translate('resources.companies.detail.fields.department_code')} />
                  <TextField source="name" label={translate('resources.companies.detail.fields.department_name')} />
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
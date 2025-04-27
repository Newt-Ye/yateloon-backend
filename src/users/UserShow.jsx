import * as React from "react"
import {
  TextField,
  SelectField,
  ArrayField,
  Datagrid,
  SingleFieldList,
  ChipField,
  BooleanInput,
  TextInput,
  Edit,
  SimpleForm,
  SelectInput,
  DateInput,
  TopToolbar,
  EditButton
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent } from "@mui/material"

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const UserShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者代號
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12}>
              <BooleanInput label="超級使用者" source="is_admin" helperText={false} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="account" label="登入者代號" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' choices={[
                { id: 0, name: "未啟用" },
                { id: 1, name: "啟用中" },
                { id: 9, name: "失效" }
              ]} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="登入者名稱" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput source="effective_date" label="生效日期" disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput type="email" source="email" label="電子郵件" disabled />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {'公司與部門設定'}
              </Typography>
              <ArrayField source="companies">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                  <TextField source="company_name" label="公司別" />
                  <TextField source="employee_code" label="工號" />
                  <ArrayField source="departments" label="隸屬部門">
                    <SingleFieldList linkType={false}>
                      <ChipField source="name" size="small" />
                    </SingleFieldList>
                  </ArrayField>
                  <SelectField source="status" label="狀態" choices={[
                    { id: 1, name: '啟用' },
                    { id: 0, name: '停用' },
                  ]} />
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

export default UserShow

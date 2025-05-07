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
  EditButton,
  useTranslate
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid } from "@mui/material"
import { AuditFields } from "../components/AuditFields"

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const UserShow = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.users.title')}
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12}>
              <BooleanInput label={translate('resources.users.detail.fields.super_user')} source="is_admin" helperText={false} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="account" label={translate('resources.users.detail.fields.account')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label={translate('resources.users.detail.fields.status')} choices={[
                { id: 0, name: "未啟用" },
                { id: 1, name: "啟用中" },
                { id: 9, name: "失效" }
              ]} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label={translate('resources.users.detail.fields.name')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DateInput source="effective_date" label={translate('resources.users.detail.fields.effective_date')} disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput type="email" source="email" label={translate('resources.users.detail.fields.email')} disabled />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {translate('resources.users.detail.fieldGroups.company_settings')}
              </Typography>
              <ArrayField source="companies">
                <Datagrid bulkActionButtons={false} rowClick={false}>
                  <TextField source="company_name" label={translate('resources.users.detail.fields.company')} />
                  <TextField source="employee_code" label={translate('resources.users.detail.fields.employee_code')} />
                  <ArrayField source="departments" label={translate('resources.users.detail.fields.departments')} >
                    <SingleFieldList linkType={false}>
                      <ChipField source="name" size="small" />
                    </SingleFieldList>
                  </ArrayField>
                  <SelectField source="status" label={translate('resources.users.detail.fields.company_status')} choices={[
                    { id: 1, name: '啟用' },
                    { id: 0, name: '停用' },
                  ]} />
                </Datagrid>
              </ArrayField>
            </Grid>
          </Grid>
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default UserShow

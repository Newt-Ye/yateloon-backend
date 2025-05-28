import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  /*Toolbar,*/
  SaveButton,
  useTranslate
} from "react-admin"
import { /*Box,*/Typography, Grid, Box } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { validateForm, ShortNameInput } from "./CompanyCreate"

const CompanyTitle = () => {
  return <span>{'修改公司資料'}</span>;
};

/*
const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);
*/

const CompanyEdit = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.companies.title')}
      </Typography>
      <Edit title={<CompanyTitle/>} redirect={false} mutationMode="optimistic"> 
        <SimpleForm
          defaultValues={{
            code: "",
            status: 1,
            short_name: "",
            name: "",
            responsible_person: "",
            phone: "",
            fax: "",
            address: "",
            region_type: "taiwan"
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="code" label={translate('resources.companies.detail.fields.code')} isRequired readOnly />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label={translate('resources.companies.detail.fields.status')} isRequired choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ShortNameInput />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput 
                source="name" 
                label={translate('resources.companies.detail.fields.name')} 
                isRequired 
                inputProps={{
                  autoComplete: "off"
                }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput 
                source="responsible_person" 
                label={translate('resources.companies.detail.fields.responsible_person')} 
                isRequired 
                inputProps={{
                  autoComplete: "off"
                }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="region_type" label={translate('resources.companies.detail.fields.region_type')} choices={[
                { id: 'taiwan', name: '臺灣地區' },
                { id: 'china', name: '中國地區' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput 
                source="phone" 
                label={translate('resources.companies.detail.fields.phone')} 
                isRequired 
                inputProps={{
                  autoComplete: "off"
                }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput 
                source="fax" 
                label={translate('resources.companies.detail.fields.fax')} 
                inputProps={{
                  autoComplete: "off"
                }} />
            </Grid>
            <Grid item xs={12}>
              <TextInput 
                source="address" 
                label={translate('resources.companies.detail.fields.address')} 
                isRequired 
                inputProps={{
                  autoComplete: "off"
                }} />
            </Grid>
          </Grid>
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default CompanyEdit
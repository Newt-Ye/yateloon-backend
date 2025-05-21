import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  CheckboxGroupInput,
  useRecordContext,
  /*Toolbar,*/
  useTranslate,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
	EditButton,
  useEditController,
} from "react-admin"
import { Typography, Grid, Box, Tabs, Tab, Card, CardContent } from "@mui/material"
import { useWatch } from "react-hook-form";
import { useState } from "react";
import { menuItems } from '../menuData';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CompanyPermissionTabs = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  
  const [tabIndex, setTabIndex] = useState(0);
  
  return (
    <>
      <Tabs value={tabIndex} onChange={(e, newVal) => setTabIndex(newVal)}>
        {record.companies.map((company, i) => (
          <Tab key={company.id} label={company.name} />
        ))}
      </Tabs>
      {record?.companies?.map((company, i) => (
        <Box key={company.id || i} sx={{ display: tabIndex === i ? 'block' : 'none' }}>
          <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
              {translate("resources.permissions.detail.fields.employee_code")}：
            </Typography>
            <Typography variant="body2">
              {company.employee_code}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
              {translate("resources.permissions.detail.fields.departments")}：
            </Typography>
            <ArrayField record={company} source="departments" label="部門">
              <SingleFieldList linkType={false}>
                <ChipField source="name" size="small" />
              </SingleFieldList>
            </ArrayField>
          </Box>
          <PermissionsInput company={company} />
        </Box>
      ))}
    </>
  );
}

const PermissionsInput = ({company}) => {
  const permissions = useWatch({ name: `permissions.${company.id}` }) || {};

  return (
    <>
      {menuItems.map(module => 
        company.modules?.includes(module.key) && (
          <Box key={module.key} sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              <FormControlLabel 
                control={
                  <Checkbox 
                    checked={module.items.some(item =>
                      permissions[module.key]?.[item.resource]?.includes('view')
                    )}
                    disabled
                  />
                } 
                label={module.name} 
              />
            </Typography>
            {module.items.map(item => (
              <Box key={item.resource} sx={{ ml: 2 }}>
                <Typography variant="body2">{item.primaryText}</Typography>
                <CheckboxGroupInput 
                  source={`permissions.${company.id}.${module.key}.${item.resource}`}
                  choices={item.permissions.map(p => ({
                    id: p.id,
                    name: p.name
                  }))}
                  label={false}
                  disabled
                 />
              </Box>
            ))}
          </Box>
        ) 
      )}
    </>
  )
}

const getDefaultValues = (record) => {
  if (!record) return {};

  const defaultPermissions = {};

  record.companies?.forEach(company => {
    const companyId = company.id;
    defaultPermissions[companyId] = {};

    menuItems.forEach(module => {
      if (company.modules?.includes(module.key)) {
        defaultPermissions[companyId][module.key] = {};
        module.items.forEach(item => {
          defaultPermissions[companyId][module.key][item.resource] = ['view'];
        });
      }
    });
  });

  return {
    account: record.account,
    name: record.name,
    permissions: {
      ...defaultPermissions,
      ...(record.permissions || {}),
    }
  };
};

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const PermissionShow = () => {
  const translate = useTranslate();
  const controllerProps = useEditController();
  const record = controllerProps.record;

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate("resources.permissions.title")}
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false} defaultValues={getDefaultValues(record)} >
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="account" 
                label={translate(
                  "resources.permissions.commons.fields.account"
                )} readOnly />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name"
                label={translate(
                  "resources.permissions.commons.fields.name"
                )} readOnly />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card width={{ xs: "100%", xl: 1200 }}>
                <CardContent>
                  <CompanyPermissionTabs />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default PermissionShow
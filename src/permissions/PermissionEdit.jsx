import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  CheckboxGroupInput,
  useRecordContext,
  Toolbar,
  SaveButton,
  /*useTranslate*/
} from "react-admin"
import { Typography, Grid, Box, Tabs, Tab, Card, CardContent } from "@mui/material"
import { useFormContext, useWatch } from "react-hook-form";
import { useState } from "react";
import { menuItems } from '../menuData';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const PermissionTitle = () => {
  return <span>{'修改登入者權限'}</span>;
};

const CompanyPermissionTabs = () => {
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
          <PermissionsInput company={company} />
        </Box>
      ))}
    </>
  );
}

const PermissionsInput = ({company}) => {
  const { setValue } = useFormContext();
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
                    onChange={e => {
                      const newPerm = { ...permissions };
                      if (!newPerm.hasOwnProperty(module.key)) newPerm[module.key] = {};

                      module.items.forEach(item => {

                        item.permissions.forEach(permission => {
                          const key = permission.id;
                            if (!newPerm[module.key].hasOwnProperty(item.resource) || 
                            newPerm[module.key][item.resource] === undefined) {
                            newPerm[module.key][item.resource] = [];
                          }
                          const index = newPerm[module.key][item.resource].indexOf(key);

                          if (e.target.checked && index === -1) {
                            newPerm[module.key][item.resource].push(key);
                          } else if (!e.target.checked && index !== -1) {
                            newPerm[module.key][item.resource].splice(index, 1);
                          }
                        })
                      })
                      setValue(`permissions.${company.id}`, newPerm);
                    }}
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
                />
              </Box>
            ))}
          </Box>
        ) 
      )}
    </>
  )
}

const CustomToolbar = () => (
    <Toolbar>
      <SaveButton alwaysEnable />
    </Toolbar>
);

const PermissionEdit = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者權限
      </Typography>
      <Edit title={<PermissionTitle/>} redirect={false} mutationMode="optimistic">
        <SimpleForm toolbar={<CustomToolbar />} >
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="account" label='登入者代號' readOnly />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label='登入者名稱' readOnly />
            </Grid>
            <Grid item xs={12}>
              <Card>
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

export default PermissionEdit
import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  CheckboxGroupInput,
  useRecordContext,
  /*Toolbar,*/
  /*useTranslate*/
  useEditController,
  ArrayField,
  SingleFieldList,
  ChipField,
  TopToolbar,
	EditButton,
} from "react-admin"
import { Typography, Grid, Box, Tabs, Tab, Card, CardContent } from "@mui/material"
import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { menuItems } from '../menuData';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
          <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
              工號：
            </Typography>
            <Typography variant="body2">
              {company.employee_code}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" sx={{ mt: 2, mb: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
              部門：
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

const AutoSelectCheckboxGroupInput = ({ source, companyId, moduleKey, resource, ...props }) => {
  const { setValue } = useFormContext();
  const currentValue = useWatch({ name: source });
  const prevValueRef = useRef([]);

  useEffect(() => {
    const prevValue = prevValueRef.current;
    const justCheckedEdit = !prevValue?.includes('edit') && currentValue?.includes('edit');

    if (justCheckedEdit) {
      const newPermissions = new Set(currentValue);
      if (!currentValue.includes('view')) newPermissions.add('view');
      if (!currentValue.includes('create')) newPermissions.add('create');

      setValue(source, Array.from(newPermissions), {
        shouldValidate: false,
        shouldDirty: true,
      });
    }

    prevValueRef.current = currentValue;
  }, [currentValue, setValue, source]);

  return (
    <CheckboxGroupInput
      source={source}
      {...props}
    />
  );
};

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
                    disabled
                  />
                } 
                label={module.name} 
              />
            </Typography>
            {module.items.map(item => (
              <Box key={item.resource} sx={{ ml: 2 }}>
                <Typography variant="body2">{item.primaryText}</Typography>
                <AutoSelectCheckboxGroupInput 
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

const PermissionEdit = () => {
  const controllerProps = useEditController();
  const record = controllerProps.record;

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        使用者權限
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false} defaultValues={getDefaultValues(record)} >
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput source="account" label='登入者代號' disabled />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label='登入者名稱' disabled />
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

export default PermissionEdit
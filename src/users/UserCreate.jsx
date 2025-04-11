import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  useSimpleFormIteratorItem,
  SelectArrayInput,
  BooleanInput,
  SaveButton,
  /*useTranslate*/
} from "react-admin"
import { Typography, Grid, Card, CardContent, Box } from "@mui/material"
import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect } from "react";

const UserTitle = () => {
  return <span>{'新增登入者代號'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.account) {
    errors.account = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (values.status === undefined) {
    errors.status = "ra.validation.required"
  }
  if (!values.companies || values.companies.length === 0) {
    errors.companies = "ra.validation.required"
  }
  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "resources.customers.errors.password_mismatch"
  }
  return errors
}

export const ShortNameInput = () => {
  const { setValue, getValues } = useFormContext();

  const handleShortNameBlur = (event) => {
    const newValue = event.target.value;

    if (newValue && !getValues('name')) {
      setValue('name', newValue);
    }
  };

  return (
    <TextInput source="short_name" label="公司簡稱" onBlur={handleShortNameBlur} isRequired />
  );
}

const EffectiveDateInput = ({setReadOnly, dateReadOnly}) => {
  const { setValue } = useFormContext();

  const handleEffectiveDateChange = (newDate) => {
    if (newDate) {
      setValue('status', 0);
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  return (
    <DateInput source="effective_date" label="生效日期" onChange={(e) => handleEffectiveDateChange(e.target.value)} readOnly={dateReadOnly} />
  );
}

const DepartmentReferenceInput = () => {
  const { index } = useSimpleFormIteratorItem();
  const { setValue } = useFormContext();
  const companies = useWatch({ name: "companies" }) || [];
  const companyId = companies[index]?.company_id || undefined;
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (companyId) {
      setFilter({ company_id: companyId });
      setValue(`companies.${index}.department_ids`, []);
    } else {
      setFilter({});
    }
  }, [companyId, index, setValue]);

  return (
    <ReferenceInput
      source="department_ids"
      reference="departments"
      filter={filter}
    >
      <SelectArrayInput optionText="name" label="隸屬部門" readOnly={!companyId} />
    </ReferenceInput>
  );
};

const UserCreate = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [dateReadOnly, setDateReadOnly] = useState(false);

  const handleStatusChange = (status) => {
    if (status !== 0) {
      setDateReadOnly(true);
    } else {
      setDateReadOnly(false);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者代號
      </Typography>
      <Create title={<UserTitle/>}>
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            account: "",
            status: 0,
            name: "",
            effective_date: "",
            password: "",
            companies: [
              {
                company_id: "",
                employee_code: "",
                department_ids: [],
                status: 1,
              }
            ]
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12}>
              <BooleanInput label="超級使用者" source="is_admin" helperText={false} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="account" label="登入者代號" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' isRequired 
                choices={[
                  { id: 0, name: '未啟用' },
                  { id: 1, name: '啟用中' }
                ]}  
                readOnly={readOnly} 
                onChange={(e) => {
                  const value = e.target.value;
                  handleStatusChange(value);
                }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="登入者名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EffectiveDateInput setReadOnly={setReadOnly} dateReadOnly={dateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="password" label="密碼" isRequired />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="confirm_password" label="再次輸入密碼" isRequired />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom mb={2}>
                    {'可登入公司別'}
                  </Typography>
                  <ArrayInput source="companies" label={false}>
                    <SimpleFormIterator inline>
                      <ReferenceInput source="company_id" reference="companies">
                        <SelectInput optionText="name" label="公司別" />
                      </ReferenceInput>
                      <TextInput source="employee_code" label="工號" />
                      <DepartmentReferenceInput />
                      <SelectInput source="status" choices={[
                        { id: 1, name: '啟用' },
                        { id: 0, name: '停用' },
                      ]} label="狀態" defaultValue={1} />
                    </SimpleFormIterator>
                  </ArrayInput>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default UserCreate
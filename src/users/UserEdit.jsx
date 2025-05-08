import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  DateInput,
  ReferenceInput,
  SelectArrayInput,
  useEditContext,
  SaveButton,
  /*Toolbar,*/
  useSimpleFormIteratorItem,
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  useNotify,
  useTranslate
} from "react-admin"
import { Typography, Grid, Card, CardContent, Box, Button } from "@mui/material"
import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
import { AuditFields } from "../components/AuditFields"
import { EmployeeCodeInput, StatusInput as CompanyStatusInput, CopyCompanyDialog } from "./UserCreate"

const UserTitle = () => {
  return <span>{'修改登入者代號'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.account) {
    errors.account = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.email) {
    errors.email = "ra.validation.required"
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
  if (values.companies) {
    errors.companies = [];
  
    values.companies.forEach((item, index) => {
      if (item.company_id) { 
        if (!item.employee_code) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].employee_code = "ra.validation.required";
        }
        if (item.department_ids.length === 0) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].department_ids = "ra.validation.required";
        }
        if (item.status === null) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].status = "ra.validation.required";
        }
      }
    });
  }
  return errors
}

export const EffectiveDateInput = ({setReadOnly, dateReadOnly, setDateReadOnly}) => {
  const translate = useTranslate();
  const { setValue } = useFormContext();
  const { record } = useEditContext();

  useEffect(() => {
    setDateReadOnly(record.status !== 0);
  }, [setDateReadOnly, record.status]);

  const handleEffectiveDateChange = (newDate) => {
    if (newDate) {
      setValue('status', 0);
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  return (
    <DateInput source="effective_date" label={translate('resources.users.detail.fields.effective_date')} onChange={(e) => handleEffectiveDateChange(e.target.value)} readOnly={dateReadOnly} />
  );
}

const ExpiredDateInput = ({setReadOnly, expiredDateReadOnly, setExpiredDateReadOnly}) => {
  const translate = useTranslate();
  const { record } = useEditContext();

  useEffect(() => {
    if (record.status === 1) {
      setExpiredDateReadOnly(false);
    } else {
      setExpiredDateReadOnly(true);
    }
  }, [setExpiredDateReadOnly, record.status]);

  const handleExpiredDateChange = (newDate) => {
    if (newDate) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  return (
    <DateInput source="expired_date" label={translate('resources.users.detail.fields.expired_date')} onChange={(e) => handleExpiredDateChange(e.target.value)} readOnly={expiredDateReadOnly} />
  );
}

const StatusInput = ({readOnly, setReadOnly, setDateReadOnly, setExpiredDateReadOnly}) => {
  const translate = useTranslate();
  const { getValues, setValue } = useFormContext();
  const { record } = useEditContext();
  const defaultReadOnly = Boolean(record?.effective_date) && record.status === 0;

  const choices = [
    { id: 0, name: "未啟用" },
    { id: 1, name: "啟用中" },
    { id: 9, name: "失效" }
  ].map(choice => ({
    ...choice,
    disabled: (record?.status === 1 ||  record?.status === 9) && choice.id === 0
  }));

  useEffect(() => {
    setReadOnly(defaultReadOnly);
  }, [setReadOnly, defaultReadOnly]);

  const handleStatusChange = (status) => {
    if (status !== 0) {
      setDateReadOnly(true);
      setExpiredDateReadOnly(true);
      if (status === 9) {
        const companies = getValues('companies');
        for (let i=0; i<companies.length; i++) {
          setValue(`companies.${i}.status`, 0);
        }
      } else {
        if (record.effective_date && !record.expired_date) setExpiredDateReadOnly(false);
      }
    } else {
      setDateReadOnly(false);
    }
  };

  return (
    <SelectInput source="status" label={translate('resources.users.detail.fields.status')} isRequired choices={choices} readOnly={readOnly} onChange={(e) => handleStatusChange(e.target.value)} />
  );
}

const CompanyReferenceInput = () => {
  const translate = useTranslate();
  const { index } = useSimpleFormIteratorItem();
  const { getValues, setValue } = useFormContext();
  const notify = useNotify();
  const companies = useWatch({ name: "companies" });
  const isDialog = companies[index]?.is_dialog || false;

  return (
    <ReferenceInput source="company_id" reference="companies">
      <SelectInput 
        optionText="name"
        label={translate('resources.users.detail.fields.company')}
        readOnly={isDialog}
        onChange={(e) => {
          if (e.target.value) {
            const companies = getValues('companies');

            const alreadyExists = companies.some((item, i) => item.company_id === e.target.value && index !== i);
            if (alreadyExists) {
              notify("resources.users.errors.company_already_assigned", { type: 'error' });
              setValue(`companies.${index}.company_id`, "")
            }
          }
        }} 
      />
    </ReferenceInput>
  );
};

const DepartmentReferenceInput = () => {
  const translate = useTranslate();
  const { index } = useSimpleFormIteratorItem();
  const { setValue, setError, clearErrors } = useFormContext();
  const companies = useWatch({ name: "companies" });
  const companyId = companies[index]?.company_id || undefined;
  const departmentIds = useMemo(() => {
    return companies[index]?.department_ids || [];
  }, [companies, index]);
  const [filter, setFilter] = useState({});
  const [defaultSet, setDefaultSet] = useState(false);
  const [dialogSet, setDialogSet] = useState(false);
  const { record } = useEditContext();

  useEffect(() => {
    if (companyId) {
      setFilter({ company_id: companyId });
    } else {
      setFilter({});
    }
    setValue(`companies.${index}.department_ids`, []);
  }, [companyId, index, setValue]);

  // 等待部門 options 載入後塞入預設值
  useEffect(() => {
    if (!defaultSet && record.companies?.[index]?.department_ids?.length > 0) {
      setValue(`companies.${index}.department_ids`, record.companies[index].department_ids);
      setDefaultSet(true);
    }
    if (!dialogSet && companies?.[index]?.dialog_department_ids?.length > 0) {
      setValue(`companies.${index}.department_ids`, companies[index].dialog_department_ids);
      setDialogSet(true);
    }
  }, [index, setValue, defaultSet, record?.companies, dialogSet, companies]);

  useEffect(() => {
      if (companyId && departmentIds.length === 0) {
        setError(`companies.${index}.department_ids`, { type: "required", message: "ra.validation.required" });
      } else {
        clearErrors(`companies.${index}.department_ids`)
      }
    }, [departmentIds, companyId, index, setError, clearErrors]);

  return (
    <ReferenceInput
      source="department_ids"
      reference="departments"
      filter={filter}
    >
      <SelectArrayInput optionText="name" label={translate('resources.users.detail.fields.departments')} readOnly={!companyId} />
    </ReferenceInput>
  );
};

const UserEdit = () => {
  const translate = useTranslate();
  const [readOnly, setReadOnly] = useState(false);
  const [dateReadOnly, setDateReadOnly] = useState(false);
  const [expiredDateReadOnly, setExpiredDateReadOnly] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.users.title')}
      </Typography>
      <Edit title={<UserTitle/>} redirect={false} mutationMode="optimistic">
        <SimpleForm
          defaultValues={{
            account: "",
            status: 0,
            name: "",
            effective_date: "",
            password: "",
            email: "",
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
              <BooleanInput label={translate('resources.users.detail.fields.super_user')} source="is_admin" helperText={false} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="account" label={translate('resources.users.detail.fields.account')} readOnly isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatusInput readOnly={readOnly} setReadOnly={setReadOnly} setDateReadOnly={setDateReadOnly} setExpiredDateReadOnly={setExpiredDateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label={translate('resources.users.detail.fields.name')} isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EffectiveDateInput setReadOnly={setReadOnly} dateReadOnly={dateReadOnly} setDateReadOnly={setDateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput type="email" source="email" label={translate('resources.users.detail.fields.email')} isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ExpiredDateInput setReadOnly={setReadOnly} expiredDateReadOnly={expiredDateReadOnly} setExpiredDateReadOnly={setExpiredDateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="password" label={translate('resources.users.detail.fields.password')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="confirm_password" label={translate('resources.users.detail.fields.confirm_password')} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardContent>
                  <Box sx={{ 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    mb: 2 }} >
                    <Typography variant="h6" gutterBottom>
                      {translate('resources.users.detail.fieldGroups.company_settings')}
                    </Typography>
                    <Button variant="contained" onClick={handleOpen} sx={{ ml: 5 }}>
                      {translate('resources.users.detail.page.copy_from_user')}
                    </Button>
                  </Box>
                  <ArrayInput source="companies" label={false}>
                    <SimpleFormIterator inline>
                      <CompanyReferenceInput />
                      <EmployeeCodeInput />
                      <DepartmentReferenceInput />
                      <CompanyStatusInput />
                      <TextInput source="employee_name" label={translate('resources.users.detail.fields.copy_user_permissions')} readOnly/>
                    </SimpleFormIterator>
                  </ArrayInput>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <AuditFields />
          <CopyCompanyDialog open={open} handleClose={handleClose} />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default UserEdit
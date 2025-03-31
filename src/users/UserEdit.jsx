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
  Toolbar,
  TextField,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid, Card, CardContent } from "@mui/material"
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

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

const EffectiveDateInput = ({setReadOnly, dateReadOnly, setDateReadOnly}) => {
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
    <DateInput source="effective_date" label="生效日期" onChange={(e) => handleEffectiveDateChange(e.target.value)} readOnly={dateReadOnly} />
  );
}

const StatusInput = ({readOnly, setReadOnly, setDateReadOnly}) => {
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
    } else {
      setDateReadOnly(false);
    }
  };

  return (
    <SelectInput source="status" label='使用狀態' isRequired choices={choices} readOnly={readOnly} onChange={(e) => handleStatusChange(e.target.value)} />
  );
}

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

const UserEdit = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [dateReadOnly, setDateReadOnly] = useState(false);

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者代號
      </Typography>
      <Edit title={<UserTitle/>} redirect={false} mutationMode="pessimistic">
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            account: "",
            status: 0,
            name: "",
            effective_date: "",
            password: "",
            companies: []
          }}
          validate={validateForm}
          toolbar={<CustomToolbar />}
        >
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="account" label="登入者代號" readOnly isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatusInput readOnly={readOnly} setReadOnly={setReadOnly} setDateReadOnly={setDateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="登入者名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EffectiveDateInput setReadOnly={setReadOnly} dateReadOnly={dateReadOnly} setDateReadOnly={setDateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="password" label="密碼" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="confirm_password" label="再次輸入密碼" />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={12}>
              <ReferenceInput source="companies" 
                reference="companies"
              >
                <SelectArrayInput optionText="name" label="可登入公司別" isRequired />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Card sx={{ mt: 0, bgcolor: 'text.disabled' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立者：
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField source="creator_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改者：
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField source="modifier_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>

                <Grid item xs={2}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立日期：
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField source="created_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改日期：
                  </Typography>
                </Grid>
                <Grid item xs={4}>
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

export default UserEdit
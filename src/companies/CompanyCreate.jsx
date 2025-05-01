import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  SaveButton,
  useNotify,
  /*useTranslate*/
} from "react-admin"
import { Typography, Grid, Box } from "@mui/material"
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const CompanyTitle = () => {
  return <span>{'新增公司資料'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (values.status === undefined) {
    errors.status = "ra.validation.required"
  }
  if (!values.short_name) {
    errors.name = "ra.validation.required"
  }
  if (!values.responsible_person) {
    errors.responsible_person = "ra.validation.required"
  }
  if (!values.phone) {
    errors.phone = "ra.validation.required"
  }
  if (!values.address) {
    errors.address = "ra.validation.required"
  }
  return errors
}

export const ShortNameInput = () => {
  const { setValue, getValues } = useFormContext();

  const handleShortNameBlur = (event) => {
    const newValue = event.target.value;

    if (!getValues('name')) {
      setValue('name', newValue);
    }
  };

  return (
    <TextInput source="short_name" label="公司簡稱" onBlur={handleShortNameBlur} isRequired />
  );
}

const CompanyCreate = () => {
  const notify = useNotify();
  const [key, setKey] = useState(0);

  const onSuccess = () => {
    notify("資料新增成功", { type: "success", autoHideDuration: 2000 });
    setKey((prev) => prev + 1); // 強制渲染表單
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        公司資料
      </Typography>
      <Create 
        title={<CompanyTitle/>}
        mutationOptions={{ onSuccess }}
        mutationMode="pessimistic"
        redirect={false}
      >
        <SimpleForm
          key={key}
          defaultValues={{
            code: "",
            status: 1,
            short_name: "",
            name: "",
            responsible_person: "",
            phone: "",
            fax: "",
            address: ""
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="code" label="代號" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' isRequired choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ShortNameInput />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="公司全名" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="responsible_person" label="負責人" isRequired />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="phone" label="電話" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="fax" label="傳真" />
            </Grid>
            <Grid item xs={12}>
              <TextInput source="address" label="登記地址" isRequired />
            </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default CompanyCreate
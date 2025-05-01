import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SaveButton,
  useNotify,
  /*useTranslate*/
} from "react-admin"
import { Box, Typography, Grid } from "@mui/material"
import { useState } from "react";

const CurrencyTitle = () => {
  return <span>{'新增幣別'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  return errors
}

const CurrencyCreate = () => {
  const notify = useNotify();
  const [key, setKey] = useState(0);

  const onSuccess = () => {
    notify("資料新增成功", { type: "success", autoHideDuration: 2000 });
    setKey((prev) => prev + 1); // 強制渲染表單
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        幣別資料
      </Typography>
      <Create 
        title={<CurrencyTitle/>} 
        mutationOptions={{ onSuccess }}
        mutationMode="pessimistic"
        redirect={false}
      >
        <SimpleForm
          key={key}
          defaultValues={{
            name: "",
            code: ""
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
              <Grid item xs={12}>
                <TextInput autoFocus source="code" label="幣別" isRequired />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="name" label="幣別名稱" isRequired />
              </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default CurrencyCreate
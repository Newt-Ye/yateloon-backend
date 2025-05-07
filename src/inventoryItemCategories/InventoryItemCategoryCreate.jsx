import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SaveButton,
  useNotify,
  useTranslate
} from "react-admin"
import { Box, Typography, Grid } from "@mui/material"
import { useState } from "react";

const InventoryItemCategoryTitle = () => {
  return <span>{'新增品號類別'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  return errors
}

export const InventoryItemCategoryForm = ({ disabled = false }) => {
  const translate = useTranslate();
  return (
    <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
        <Grid item xs={12}>
          <TextInput 
            source="code" 
            label={translate('resources.inventoryItemCategories.detail.fields.code')} 
            isRequired={!disabled}
            disabled={disabled} 
            autoFocus={!disabled} />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            source="name" 
            label={translate('resources.inventoryItemCategories.detail.fields.name')}
            isRequired={!disabled}
            disabled={disabled} />
        </Grid>
    </Grid>
  )
}

const InventoryItemCategoryCreate = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const [key, setKey] = useState(0);

  const onSuccess = () => {
    notify("ra.notification.created", { type: "success", autoHideDuration: 2000 });
    setKey((prev) => prev + 1); // 強制渲染表單
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItemCategories.title')}
      </Typography>
      <Create 
        title={<InventoryItemCategoryTitle/>}
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
          <InventoryItemCategoryForm />
        </SimpleForm>
      </Create>
    </>
  )
}

export default InventoryItemCategoryCreate
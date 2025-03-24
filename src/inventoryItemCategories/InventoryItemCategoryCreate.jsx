import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  /*useTranslate*/
} from "react-admin"
import { /*Box,*/Typography, Grid } from "@mui/material"

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

const InventoryItemCategoryCreate = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        品號類別
      </Typography>
      <Create title={<InventoryItemCategoryTitle/>}>
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            name: "",
            code: ""
          }}
          validate={validateForm}
        >
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
              <Grid item xs={12}>
                <TextInput autoFocus source="code" label="類別代號" isRequired />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="name" label="類別名稱" isRequired />
              </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default InventoryItemCategoryCreate
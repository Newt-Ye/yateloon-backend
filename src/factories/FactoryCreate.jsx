import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SaveButton,
  /*useTranslate*/
} from "react-admin"
import { Box, Typography, Grid } from "@mui/material"

const FactoryTitle = () => {
  return <span>{'新增廠別'}</span>;
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

const FactoryCreate = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        廠別資料
      </Typography>
      <Create title={<FactoryTitle/>} redirect="show">
        <SimpleForm
          // Here for the GQL provider
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
                <TextInput autoFocus source="code" label="廠別代號" isRequired />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="name" label="廠別名稱" isRequired />
              </Grid>
          </Grid>
        </SimpleForm>
      </Create>
    </>
  )
}

export default FactoryCreate
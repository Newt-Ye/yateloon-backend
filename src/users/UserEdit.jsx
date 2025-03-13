import * as React from "react"
import {
  DateInput,
  Edit,
  NullableBooleanInput,
  TextInput,
  PasswordInput,
  SimpleForm,
  useTranslate,
  BooleanInput
} from "react-admin"
import { Grid, Box, Typography } from "@mui/material"

import { validateForm } from "./UserCreate"

const UserTitle = () => {
  return <span>{'帳號'}</span>;
};

const UserEdit = () => {
  const translate = useTranslate()
  return (
    <Edit title={<UserTitle/>}>
      <SimpleForm 
        sx={{ maxWidth: 800 }}
        defaultValues={{
          status: true, // Default status to active
          name: "",
          email: "",
          account: "",
          password: "",
          confirm_password: "" // Will be automatically filled with password when entered
        }}
        validate={validateForm}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.identity")}
              </Typography>
              <TextInput source="name" label="名稱" isRequired />
              <TextInput type="email" source="email" label="Email" isRequired />
              <TextInput source="account" label="帳號" isRequired />
              <BooleanInput label="啟用狀態" source="status" />
              <TextInput source="note" label="備註" multiline />

              <Box mt="1em" />

              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.change_password")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <PasswordInput source="password" label="密碼" />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                  <PasswordInput source="confirm_password" label="再次輸入密碼" />
                </Box>
              </Box>
            </Grid>
          </Grid>
      </SimpleForm>
    </Edit>
  )
}

export default UserEdit
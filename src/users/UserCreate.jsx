import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  BooleanInput,
} from "react-admin"
import { Box, Typography } from "@mui/material"

const UserTitle = () => {
  return <span>{'帳號'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.account) {
    errors.account = "ra.validation.required"
  }
  if (!values.email) {
    errors.email = "ra.validation.required"
  } else {
    const error = email()(values.email)
    if (error) {
      errors.email = error
    }
  }
  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "resources.customers.errors.password_mismatch"
  }
  return errors
}

const UserCreate = () => (
  <Create title={<UserTitle/>}>
    <SimpleForm
      sx={{ maxWidth: 800 }}
      // Here for the GQL provider
      defaultValues={{
        status: true, // Default status to active
        name: "",
        email: "",
        account: "",
        password: "",
        confirm_password: "" // Will be automatically filled with password when entered
      }}
      validate={validateForm}
    >
      <SectionTitle label="resources.customers.fieldGroups.identity" />
      {/* <SectionTitle label="基本資料" /> */}
      <TextInput source="name" label="名稱" isRequired />
      <TextInput type="email" source="email" label="Email" isRequired />
      <TextInput source="account" label="帳號" isRequired />
      <BooleanInput label="啟用狀態" source="status" />
      <TextInput source="note" label="備註" multiline />
      <SectionTitle label="resources.customers.fieldGroups.password" />
      <Box display={{ xs: "block", sm: "flex" }}>
        <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="password" label="密碼" isRequired />
        </Box>
        <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
          <PasswordInput source="confirm_password" label="再次輸入密碼" isRequired />
        </Box>
      </Box>
    </SimpleForm>
  </Create>
)

const SectionTitle = ({ label }) => {
  const translate = useTranslate()

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label)}
    </Typography>
  )
}

const Separator = () => <Box pt="1em" />

export default UserCreate
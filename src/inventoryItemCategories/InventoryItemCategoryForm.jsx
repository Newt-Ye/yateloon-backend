import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  useTranslate,
  Toolbar,
} from "react-admin"
import { Box, Grid } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  return errors
}

// 自訂一個固定右上角的 Toolbar
const FixedSaveToolbar = ({ disabled }) => {
  if (disabled) return null
  return (
    <Toolbar
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        p: 2,
        backgroundColor: 'transparent',
        boxShadow: 'none',
      }}
    >
      <SaveButton />
    </Toolbar>
  )
}

const InventoryItemCategoryForm = ({ 
  formKey,
  disabled = false,
  AuditFields
}) => {
  const translate = useTranslate()

  return (
    <Box
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          padding: 2,
          paddingTop: !disabled ? 8 : 2, // 預留 SaveButton 空間
        }}
      >
        <SimpleForm
          key={formKey}
          defaultValues={{ name: "", code: "" }}
          validate={validateForm}
          toolbar={<FixedSaveToolbar disabled={disabled} />}
        >
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12}>
              <TextInput 
                source="code" 
                label={translate('resources.inventoryItemCategories.detail.fields.code')} 
                isRequired={!disabled}
                disabled={disabled} 
                autoFocus={!disabled} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput 
                source="name" 
                label={translate('resources.inventoryItemCategories.detail.fields.name')}
                isRequired={!disabled}
                disabled={disabled} 
              />
            </Grid>
          </Grid>

          {AuditFields && <AuditFields />}
        </SimpleForm>
      </Box>
    </Box>
  )
}

export default InventoryItemCategoryForm

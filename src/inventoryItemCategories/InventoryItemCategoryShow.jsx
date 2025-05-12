import * as React from "react"
import {
  Edit,
  SimpleForm,
  useTranslate
} from "react-admin"
import { Typography } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { InventoryItemCategoryForm } from "./InventoryItemCategoryCreate"

const InventoryItemCategoryShow = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItemCategories.title')}
      </Typography>
      <Edit actions={false} redirect="show">
        <SimpleForm toolbar={false}>
          <InventoryItemCategoryForm disabled={true} />
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemCategoryShow
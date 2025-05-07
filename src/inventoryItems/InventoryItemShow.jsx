import * as React from "react"
import {
  Edit,
  SimpleForm,
  TopToolbar,
  EditButton,
  useTranslate
} from "react-admin"
import { Typography } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { InventoryItemForm } from "./InventoryItemCreate"

const Actions = () => (
  <TopToolbar>
    <EditButton />
  </TopToolbar>
);

const InventoryItemShow = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItems.title')}
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <InventoryItemForm disabled={true} />
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemShow
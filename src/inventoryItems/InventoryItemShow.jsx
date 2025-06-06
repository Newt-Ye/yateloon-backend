import * as React from "react"
import {
  Edit,
  SimpleForm,
  TopToolbar,
  EditButton,
  useTranslate,
  Button,
  useRecordContext
} from "react-admin"
import { Typography } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { InventoryItemForm } from "./InventoryItemCreate"
import { Link } from 'react-router-dom';
import { ContentCopy } from '@mui/icons-material';
import ApprovalStatusAside from './ApprovalStatusAside';


const CloneButton = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Button
      component={Link}
      to={`/inventory-items/${record.id}/clone`}
      label="複製"
      startIcon={<ContentCopy />}
    />
  )
};


const Actions = () => (
  <TopToolbar>
    <EditButton />
    <CloneButton />
  </TopToolbar>
);

const InventoryItemShow = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItems.title')}
      </Typography>
      <Edit 
        actions={<Actions />} 
        redirect="show"
        aside={<ApprovalStatusAside />}
      >
        <SimpleForm toolbar={false}>
          <InventoryItemForm disabled={true} />
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemShow
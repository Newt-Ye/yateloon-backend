import * as React from "react"
import {
  Edit,
  useTranslate,
  useNotify
} from "react-admin"
import { Typography } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import TaxCodeForm from './TaxCodeForm';

const TaxCodeEdit = () => {
  const translate = useTranslate();
  const notify = useNotify();

  const onSuccess = () => {
    notify("ra.notification.updated", { type: "success", autoHideDuration: 2000, messageArgs: { smart_count: 1 } });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.taxCodes.title')}
      </Typography>
      <Edit 
        title={false} 
        mutationOptions={{ onSuccess }}
        redirect={false} 
        mutationMode="optimistic"
      >
        <TaxCodeForm 
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default TaxCodeEdit
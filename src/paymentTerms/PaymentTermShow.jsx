import * as React from "react"
import {
    Edit,
    useTranslate,
  /*useRecordContext*/
} from "react-admin"
import { Typography } from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import { AuditFields } from "../components/AuditFields"
import PaymentTermForm from "./PaymentTermForm"

const PaymentTermShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.paymentTerms.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <PaymentTermForm 
          disabled={true}
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default PaymentTermShow

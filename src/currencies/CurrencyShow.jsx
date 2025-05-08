import * as React from "react"
import {
	Edit,
	useTranslate,
  /*useRecordContext*/
} from "react-admin"
import { Typography } from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import { AuditFields } from "../components/AuditFields"
import CurrencyForm from "./CurrencyForm"

const CurrencyShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.currencies.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <CurrencyForm 
          disabled={true}
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default CurrencyShow

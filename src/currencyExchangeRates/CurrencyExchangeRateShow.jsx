import * as React from "react"
import {
  Edit,
  useTranslate
} from "react-admin"
import { Typography} from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import { AuditFields } from "../components/AuditFields"
import CurrencyExchangeRateForm from "./CurrencyExchangeRateForm"

const CurrencyExchangeRateShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.currencyExchangeRates.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <CurrencyExchangeRateForm 
          disabled={true}
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default CurrencyExchangeRateShow
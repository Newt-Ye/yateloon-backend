import * as React from "react"
import {
  Edit,
  useTranslate,
  useNotify,
} from "react-admin"
import { Typography} from "@mui/material"
import CurrencyExchangeRateForm from "./CurrencyExchangeRateForm"

const CurrencyExchangeRateEdit = () => {
  const translate = useTranslate();
  const notify = useNotify();

  const onSuccess = () => {
    notify("ra.notification.updated", { type: "success", autoHideDuration: 2000, messageArgs: { smart_count: 1 } });
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.currencyExchangeRates.title')}
      </Typography>
      <Edit 
        title={false}
        mutationOptions={{ onSuccess }}
        redirect={false} 
        mutationMode="optimistic"
      >
        <CurrencyExchangeRateForm />
      </Edit>
    </>
  )
}

export default CurrencyExchangeRateEdit
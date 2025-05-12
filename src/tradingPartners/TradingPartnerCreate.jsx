import * as React from "react"
import {
  Create,
  useNotify,
  useTranslate,
} from "react-admin"
import { Typography } from "@mui/material"
import { useState } from "react";
import TradingPartnerForm from './TradingPartnerForm';

const TradingPartnerCreate = () => {
  const translate = useTranslate();
  const notify = useNotify();
  const [key, setKey] = useState(0);

  const onSuccess = () => {
    notify("ra.notification.created", { type: "success", autoHideDuration: 2000 });
    setKey((prev) => prev + 1);
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.tradingPartners.title')}
      </Typography>
      <Create 
        title={false} 
        mutationOptions={{ onSuccess }}
        mutationMode="pessimistic"
        redirect={false}
      >
        <TradingPartnerForm 
          formKey={key}
        />
      </Create>
    </>
  )
}

export default TradingPartnerCreate
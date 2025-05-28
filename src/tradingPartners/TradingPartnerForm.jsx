import * as React from "react"
import {
  SimpleForm,
  SaveButton,
  TextInput,
  AutocompleteInput,
  ReferenceInput,
  useTranslate,
  useDataProvider
} from "react-admin"
import { Box, Grid } from "@mui/material"

const validateForm = values => {
  const errors = {}
  if (!values.trading_partner_category_id) {
    errors.trading_partner_category_id = "ra.validation.required"
  }
  if (!values.code) {
    errors.code = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  return errors
}

const CustomReferenceInput = ({reference, source, label, required=false, disabled }) => {
  const dataProvider = useDataProvider();

  const handleCreate = async (newName) => {
      try {
        const { data } = await dataProvider.create(reference, {
          data: { name: newName }
        });
        return { id: data.id, name: data.name };
      } catch (error) {
        console.error(`Error creating ${reference}:`, error);
      }
  };

  return (
    <ReferenceInput 
      source={source} 
      reference={reference}
      sort={{ field: 'created_at', order: 'ASC' }}
    >
      <AutocompleteInput 
        label={label} 
        onCreate={handleCreate}
        isPending={true}
        isRequired={required && !disabled}
        readOnly={disabled}
      />
    </ReferenceInput>
  );
};

const TradingPartnerForm = ({ 
  formKey,
  disabled = false,
  AuditFields
}) => {
  const translate = useTranslate();

  return (
    <SimpleForm
      key={formKey ?? undefined}
      defaultValues={{
        trading_partner_category_id: "",
        code: "",
        name: ""
      }}
      validate={!disabled ? validateForm : undefined}
      toolbar={false}
    >
      { !disabled &&
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
          <SaveButton />
        </Box>
      }
      <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
        <Grid item xs={12}>
          <CustomReferenceInput 
            label={translate('resources.tradingPartners.commons.fields.trading_partner_category')} 
            source="trading_partner_category_id" 
            reference="trading-partner-categories" 
            required={true} 
            disabled={disabled} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            autoFocus 
            source="code"
            label={translate('resources.tradingPartners.commons.fields.code')}
            isRequired={!disabled}
            readOnly={disabled} 
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput 
            source="name" 
            label={translate('resources.tradingPartners.commons.fields.name')}
            isRequired={!disabled}
            readOnly={disabled} 
            inputProps={{
              autoComplete: "off"
            }}
          />
        </Grid>
    </Grid>
      {AuditFields && <AuditFields />}
    </SimpleForm>
  )
}

export default TradingPartnerForm;
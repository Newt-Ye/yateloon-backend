import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  SaveButton,
  RadioButtonGroupInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  /*useTranslate*/
} from "react-admin"
import { Box, Typography, Grid } from "@mui/material"
import { validateForm } from "./WarehouseCreate"

const FactoryTitle = () => {
  return <span>{'修改庫別'}</span>;
};

const WarehouseEdit = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        庫別資料
      </Typography>
      <Edit title={<FactoryTitle/>} redirect="show">
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            name: "",
            code: "",
            factory_id: "",
            is_stock: 1,
            include_in_available_quantity: 1,
            allow_outbound_when_save: 1,
            allow_outbound_when_confirm: 1,
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
              <Grid item xs={12}>
                <RadioButtonGroupInput source="is_stock" label="庫別性質" choices={[
                    { id: 1, name: '存貨倉' },
                    { id: 0, name: '非存貨倉' },
                ]} isRequired />
              </Grid>
              <Grid item xs={12}>
                <ReferenceInput source="factory_id" 
                  reference="factories" 
                  sort={{ field: 'created_at', order: 'ASC' }}
                >
                  <SelectInput optionText="name" label="隸屬廠別" isRequired />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12}>
                <TextInput autoFocus source="code" label="庫別代號" isRequired />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="name" label="庫別名稱" isRequired />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="納入可用量計算" source="include_in_available_quantity" />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="存檔時庫存不足允許出貨" source="allow_outbound_when_save" />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="確認時庫存不足允許出貨" source="allow_outbound_when_confirm" />
              </Grid>
          </Grid>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default WarehouseEdit
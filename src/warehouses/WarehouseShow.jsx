import * as React from "react"
import {
  Edit,
  SimpleForm,
  TextInput,
  RadioButtonGroupInput,
  ReferenceInput,
  SelectInput,
  BooleanInput,
  TopToolbar,
  EditButton,
  /*useTranslate*/
} from "react-admin"
import { Typography, Grid } from "@mui/material"

const Actions = () => (
    <TopToolbar>
        <EditButton />
    </TopToolbar>
);

const WarehouseShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        庫別資料
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
              <Grid item xs={12}>
                <RadioButtonGroupInput source="is_stock" label="庫別性質" choices={[
                    { id: 1, name: '存貨倉' },
                    { id: 0, name: '非存貨倉' },
                ]} disabled />
              </Grid>
              <Grid item xs={12}>
                <ReferenceInput source="factory_id" 
                  reference="factories" 
                  sort={{ field: 'created_at', order: 'ASC' }}
                >
                  <SelectInput optionText="name" label="隸屬廠別" disabled />
                </ReferenceInput>
              </Grid>
              <Grid item xs={12}>
                <TextInput autoFocus source="code" label="庫別代號" disabled />
              </Grid>
              <Grid item xs={12}>
                <TextInput source="name" label="庫別名稱" disabled />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="納入可用量計算" source="include_in_available_quantity" disabled />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="存檔時庫存不足允許出貨" source="allow_outbound_when_save" disabled />
              </Grid>
              <Grid item xs={6} sm={4}>
                <BooleanInput label="確認時庫存不足允許出貨" source="allow_outbound_when_confirm" disabled />
              </Grid>
          </Grid>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default WarehouseShow
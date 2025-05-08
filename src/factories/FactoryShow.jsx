import * as React from "react"
import {
  TextField,
	Edit,
  ArrayField,
  Datagrid,
  DateField,
  useTranslate
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid} from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import { AuditFields } from "../components/AuditFields"
import FactoryForm from "./FactoryForm"

const WarehouseList = () => {
  const translate = useTranslate();

  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        {translate('resources.factories.detail.fieldGroups.warehouse_list')}
      </Typography>
      <ArrayField source="warehouses">
          <Datagrid bulkActionButtons={false} rowClick={false}>
            <TextField source="code" label={translate('resources.factories.detail.fields.warehouse_code')} />
            <TextField source="name" label={translate('resources.factories.detail.fields.warehouse_name')} />
            <DateField source="created_at" label={translate('resources.factories.commons.fields.created_at')} showTime />
          </Datagrid>
      </ArrayField>
    </Grid>
  )
}

const FactoryShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.factories.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <FactoryForm 
          disabled={true}
          WarehouseList={WarehouseList}
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default FactoryShow

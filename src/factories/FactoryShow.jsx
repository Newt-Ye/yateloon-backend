import * as React from "react"
import {
  TextField,
	TextInput,
	Edit,
	SimpleForm,
	TopToolbar,
	EditButton,
  ArrayField,
  Datagrid,
  DateField,
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent } from "@mui/material"

const Actions = () => (
	<TopToolbar>
		<EditButton />
	</TopToolbar>
);

const FactoryShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
				廠別資料
      </Typography>
      <Edit actions={<Actions />} redirect="show">
        <SimpleForm toolbar={false}>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
							<Grid item xs={12}>
								<TextInput source="code" label="廠別代號" disabled />
							</Grid>
							<Grid item xs={12}>
								<TextInput source="name" label="廠別名稱" disabled />
							</Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  {'庫別列表'}
                </Typography>
                <ArrayField source="warehouses">
                    <Datagrid bulkActionButtons={false} rowClick={false}>
                      <TextField source="code" label="庫別代號" />
                      <TextField source="name" label="庫別名稱" />
                      <DateField source="created_at" label="建立時間" showTime />
                    </Datagrid>
                </ArrayField>
              </Grid>
          </Grid>
          <Card sx={{ mt: 4, bgcolor: 'text.disabled', width: '100%' }} >
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="creator_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    建立日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="created_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改者：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="modifier_name" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
                <Grid item xs={6} sm={1}>
                  <Typography variant="body2" align="left" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} >
                    修改日期：
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <TextField source="updated_at" sx={{ 
                    color: 'black', 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center"}} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </SimpleForm>
      </Edit>
    </>
  )
}

export default FactoryShow

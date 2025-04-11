import * as React from "react"
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  Show,
  ArrayField,
  DateField,
  Datagrid,
  SingleFieldList,
  ChipField
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent } from "@mui/material"
// import PostTitle from "./PostTitle"

const UserShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者代號
      </Typography>
      <Show>
        <SimpleShowLayout>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                超級使用者：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <SelectField source="status" choices={[
                { id: 1, name: '是' },
                { id: 0, name: '否' },
              ]} />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                登入者代號：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="account" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                使用狀態：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <SelectField source="status" choices={[
                { id: 0, name: '未啟用' },
                { id: 1, name: '啟用中' },
                { id: 9, name: '失效' }
              ]} />
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                登入者名稱：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="name" sx={{
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}}/>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                生效日期：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <DateField source="effective_date" sx={{
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}}/>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom mt={2}>
                {'可登入公司別'}
              </Typography>
              <ArrayField source="companies">
                <Datagrid bulkActionButtons={false}>
                  <TextField source="company_name" label="公司別" />
                  <TextField source="employee_code" label="工號" />
                  <ArrayField source="departments" label="隸屬部門">
                    <SingleFieldList linkType={false}>
                      <ChipField source="name" size="small" />
                    </SingleFieldList>
                  </ArrayField>
                  <SelectField source="status" label="狀態" choices={[
                    { id: 1, name: '啟用' },
                    { id: 0, name: '停用' },
                  ]} />
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
        </SimpleShowLayout>
      </Show>
    </>
  )
}

export default UserShow

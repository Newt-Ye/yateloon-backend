import * as React from "react"
import {
  TextField,
  SelectField,
  SimpleShowLayout,
  Show,
  ArrayField,
  SingleFieldList,
  ChipField,
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent } from "@mui/material"
// import PostTitle from "./PostTitle"

const CompanyShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        公司資料
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
                代號：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="code" sx={{ 
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
                公司簡稱：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="short_name" sx={{
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
                公司全名：
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
                負責人：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="responsible_person" sx={{
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}}/>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={6} sm={2}>
              <Typography variant="body2" align="left" sx={{ 
                color: 'black', 
                display: "flex",
                justifyContent: "left",
                alignItems: "center"}} >
                電話：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="phone" sx={{
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
                傳真：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="fax" sx={{
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
                登記地址：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <TextField source="address" sx={{
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
                部門：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <ArrayField source="departments" label="部門">
                <SingleFieldList linkType={false}>
                  <ChipField source="name" size="small" />
                </SingleFieldList>
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

export default CompanyShow

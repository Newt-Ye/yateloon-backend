import * as React from "react"
import {
  TextField,
  SimpleShowLayout,
  Show,
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent, } from "@mui/material"
// import PostTitle from "./PostTitle"

const InventoryItemCategoryShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        品號類別
      </Typography>
      <Show>
        <SimpleShowLayout>
          <TextField source="code" label="類別代號" />
          <TextField source="name" label="類別名稱" />
          <Card sx={{ mt: 0, bgcolor: 'text.disabled' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <Typography variant="body2" align="left" sx={{ 
                      color: 'black', 
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center"}} >
                      建立者：
                    </Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <TextField source="creator_name" sx={{ 
                      color: 'black', 
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center"}} />
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="body2" align="left" sx={{ 
                      color: 'black', 
                      display: "flex",
                      justifyContent: "left",
                      alignItems: "center"}} >
                      建立日期：
                    </Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <TextField source="created_at" sx={{ 
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

export default InventoryItemCategoryShow

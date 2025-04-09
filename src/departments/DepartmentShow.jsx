import * as React from "react"
import {
  TextField,
  BooleanField,
  SimpleShowLayout,
  Show,
  ArrayField,
  SingleFieldList,
  ChipField,
  /*useRecordContext*/
} from "react-admin"
import { Typography, Grid, Card, CardContent } from "@mui/material"
import { menuItems } from '../menuData';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const DepartmentShow = () => {
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        部門權限
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
                部門名稱：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField source="name" sx={{ 
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
                部門代號：
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
                適用公司別：
              </Typography>
            </Grid>
            <Grid item xs={6} sm={10}>
              <ArrayField source="companies" label="適用公司別">
                <SingleFieldList linkType={false}>
                  <ChipField source="name" size="small" />
                </SingleFieldList>
              </ArrayField>
            </Grid>
          </Grid>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Grid container  width={{ xs: "100%", xl: 1200 }} spacing={2}>
                {menuItems.map((module) => (
                  <>
                    <Grid item xs={1} key={`module-${module.key}`}>
                      <Typography variant="body1" align="left" sx={{ 
                          color: 'black', 
                          display: "flex",
                          justifyContent: "left",
                          alignItems: "center"}} >
                          {module.name}
                        </Typography>
                      </Grid>
                    <Grid item xs={1} key={module.key}>
                      <BooleanField label={module.name} source={module.key} sx={{ 
                        color: 'black', 
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center"}}
                        TrueIcon={CheckBoxIcon} FalseIcon={CheckBoxOutlineBlankIcon} />
                    </Grid>
                  </>
                ))}
              </Grid>
            </CardContent>
          </Card>
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

export default DepartmentShow

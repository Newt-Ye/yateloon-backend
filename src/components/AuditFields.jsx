import React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { TextField, useTranslate } from 'react-admin';

export const AuditFields = () => {
  const translate = useTranslate();

  return (
    <Card sx={{ mt: 4, bgcolor: 'text.disabled', width: '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={1}>
            <Typography variant="body2" align="left" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
              {translate('resources.common.fields.created_by')}：
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField source="creator_name" sx={{ color: 'black' }} />
          </Grid>

          <Grid item xs={6} sm={1}>
            <Typography variant="body2" align="left" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
              {translate('resources.common.fields.created_at')}：
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField source="created_at" sx={{ color: 'black' }} />
          </Grid>

          <Grid item xs={6} sm={1}>
            <Typography variant="body2" align="left" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
              {translate('resources.common.fields.updated_by')}：
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField source="modifier_name" sx={{ color: 'black' }} />
          </Grid>

          <Grid item xs={6} sm={1}>
            <Typography variant="body2" align="left" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
              {translate('resources.common.fields.updated_at')}：
            </Typography>
          </Grid>
          <Grid item xs={6} sm={2}>
            <TextField source="updated_at" sx={{ color: 'black' }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

import {
  useRecordContext,
  useTranslate,
  useGetOne,
  useGetList,
  Loading,
  Error
} from 'react-admin';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Divider
} from '@mui/material';

const ApprovalStatusAside = () => {
  const translate = useTranslate();
  const record = useRecordContext();
  const { data: units, isPending: unitPending, error: unitError } = useGetList('units');
  const { data: warehouses, isPending: warehousePending, error: warehouseError } = useGetList('warehouses');
  const { data: currencies, isPending: currencyPending, error: currencyError } = useGetList('currencies');

  console.log('record', record);
  const {
    data: instances,
    isPending,
    error
  } = useGetOne('approval-instances', 
    { 
      id: record?.approval_instance_id 
    }, {
      enabled: !!record?.approval_instance_id
    });

  const shouldShowLoading = 
    (record?.approval_instance_id ? isPending : false) || 
    unitPending || 
    warehousePending || 
    currencyPending;

  const shouldShowError = 
    (record?.approval_instance_id ? error : false) || 
    unitError || 
    warehouseError || 
    currencyError;

  if (shouldShowLoading) return <Loading />;
  if (shouldShowError) return <Error />;

  if (!record?.approval_instance_id) return null;
  console.log('instances', instances);

  const getFieldLabel = (fieldName) => {
    return translate(`resources.inventoryItems.detail.fields.${fieldName}`, {
      _: fieldName,
    });
  };

  const getLabelByValue = (field, value) => {
    switch(field) {
      case "unit_id":
        return units?.find(u => u.id === parseInt(value))?.name;
      case "warehouse_id":
        return warehouses?.find(w => w.id === parseInt(value))?.name;
      case "currency_id":
        return currencies?.find(c => c.id === parseInt(value))?.name;
      default:
        return value;
    }
  };

  const steps = [...(instances?.steps || [])].sort((a, b) => a.step_order - b.step_order);
  const currentStepIndex = steps.findIndex(s => s.step_order === instances?.current_step);

  return (
    <Box 
      sx={{
        width: "25%",
        minWidth: "25%",
        ml: 2,
        maxHeight: '80vh',
        overflowY: 'auto',
        display: { xs: 'none', lg: 'block' },
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>簽核單</Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              <strong>簽核狀態：</strong>
            </Typography>
            <Chip
              size="small"
              label={translate(`ra.status.approval.${instances.status}`)} 
              color={
                instances.status === 'approved'
                  ? 'success'
                  : instances.status === 'rejected'
                  ? 'error'
                  : 'warning'
              }
            />
          </Box>

          {instances.field_changes?.length > 0 && (
            <Paper elevation={1} sx={{ p: 2, mt: 4, backgroundColor: '#f9f9f9' }}>
              <Typography variant="subtitle1" gutterBottom>
                欄位異動紀錄
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {instances.field_changes.map((change, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {getFieldLabel(change.field_label)} -
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 1 }}>
                    原始值：<span style={{ color: '#999' }}>{getLabelByValue(change.field_name, change.original_value)}</span>
                  </Typography>
                  <Typography variant="body2" sx={{ pl: 1 }}>
                    新值：<strong>{getLabelByValue(change.field_name, change.new_value)}</strong>
                  </Typography>
                </Box>
              ))}
            </Paper>
          )}

          <Stepper activeStep={currentStepIndex} orientation="vertical" nonLinear>
            {steps.map((step) => {
              const isActive = step.step_order === instances?.current_step;

              return (
                <Step key={step.step_order} expanded completed={step.status === "approved"}>
                  <StepLabel
                    optional={
                      <Typography variant="caption" color="textSecondary">
                        {translate(`ra.status.approval.${step.status}`)}
                      </Typography>
                    }
                  >
                    <Typography variant="body1" color={isActive ? 'primary' : 'text.primary'}>
                      {step.step_name}
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    {step.approvers.map((approver, i) => (
                      <Box key={i} sx={{ pl: 1, mb: 1, display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2">
                          ➤ {approver.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={translate(`ra.status.approval.${approver.pivot.status}`)}
                          color={
                            approver.pivot.status === 'approved'
                              ? 'success'
                              : approver.pivot.status === 'rejected'
                              ? 'error'
                              : 'default'
                          }
                          sx={{ ml: 1 }}
                        />
                      </Box>
                    ))}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ApprovalStatusAside;

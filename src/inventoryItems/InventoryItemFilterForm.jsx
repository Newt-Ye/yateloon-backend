import * as React from "react"
import {
  TextInput,
  useListContext,
  useTranslate,
  AutocompleteArrayInput,
  ReferenceInput,
  CheckboxGroupInput,
  DateInput
} from "react-admin"
import {
  useForm,
  FormProvider
} from "react-hook-form"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  InputAdornment
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect } from "react"

const InventoryItemFilterForm = () => {
  const translate = useTranslate()
  const {
    displayedFilters,
    filterValues,
    setFilters
  } = useListContext()

  const form = useForm({
    defaultValues: {
      ...filterValues,
      q: filterValues.q || '',
      inventory_item_category_ids: [],
      warehouse_ids: filterValues.warehouse_ids || [],
      unit_ids: filterValues.unit_ids || [],
      currency_ids: filterValues.currency_ids || [],
      customer_code: filterValues.customer_code || '',
      begin_expiration_date: filterValues.begin_expiration_date || null,
      end_expiration_date: filterValues.end_expiration_date || null,
      begin_last_storage_date: filterValues.begin_last_storage_date || null,
      end_last_storage_date: filterValues.end_last_storage_date || null,
      attributes: filterValues.attributes || '',
      inspection_methods: filterValues.inspection_methods || ''
    }
  })

  useEffect(() => {
    if (!displayedFilters.main) {
      form.reset()
    }
  }, [displayedFilters.main, form])

  if (!displayedFilters.main) return null

  const onSubmit = values => {
    const updatedFilters = {
      ...filterValues,
      ...values
    }
    setFilters(updatedFilters)
  }

  const resetFilter = () => {
    form.reset({
      q: '',
      inventory_item_category_ids: [],
      warehouse_ids: [],
      unit_ids: [],
      currency_ids: [],
      customer_code: '',
      begin_expiration_date: null,
      end_expiration_date: null,
      begin_last_storage_date: null,
      end_last_storage_date: null,
      attributes: '',
      inspection_methods: ''
    });

    // 強制清除日期欄位
    document.querySelectorAll('input[type="date"]').forEach(input => {
      input.value = '';
    });

    setFilters({
      ...filterValues,
      q: '',
      inventory_item_category_ids: [],
      warehouse_ids: [],
      unit_ids: [],
      currency_ids: [],
      customer_code: '',
      begin_expiration_date: null,
      end_expiration_date: null,
      begin_last_storage_date: null,
      end_last_storage_date: null,
      attributes: [],
      inspection_methods: []
    }, { main: true })
  }

  return (
    <Card
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        order: -1,
        flex: "0 0 16em",
        mr: 2,
        mt: 6,
        maxHeight: "calc(90vh - 100px)",
        position: "relative"
      }}
    >
      <CardHeader
        title={translate('ra.action.filter')}
        titleTypographyProps={{ variant: "h6", fontSize: "1rem" }}
        action={
          <IconButton onClick={() => setFilters({
            ...filterValues,
            q: '',
            inventory_item_category_ids: [],
            warehouse_ids: [],
            unit_ids: [],
            currency_ids: [],
            customer_code: '',
            begin_expiration_date: null,
            end_expiration_date: null,
            begin_last_storage_date: null,
            end_last_storage_date: null,
            attributes: [],
            inspection_methods: []
          }, [])} size="small">
            <CloseIcon />
          </IconButton>
        }
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          bgcolor: "background.paper",
          borderBottom: "1px solid #eee",
          py: 1,
          px: 2
        }}
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <CardContent
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              pr: 1,
              pb: 10, // 給底部按鈕空間
              pt: 1
            }}
          >
            <Box display="flex" flexDirection="column" gap={2}>
              <TextInput
                source="q"
                resettable
                helperText={false}
                label={translate('ra.action.search')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon color="disabled" />
                    </InputAdornment>
                  )
                }}
              />

              <ReferenceInput source="inventory_item_category_ids" reference="inventory-item-categories">
                <AutocompleteArrayInput
                  label={translate('resources.inventoryItems.detail.fields.inventory_item_category')}
                  helperText={false}
                />
              </ReferenceInput>

              <ReferenceInput source="warehouse_ids" reference="warehouses">
                <AutocompleteArrayInput
                  label={translate('resources.inventoryItems.list.filters.warehouse')}
                  helperText={false}
                />
              </ReferenceInput>

              <ReferenceInput source="unit_ids" reference="units">
                <AutocompleteArrayInput
                  label={translate('resources.inventoryItems.detail.fields.unit')}
                  helperText={false}
                />
              </ReferenceInput>

              <ReferenceInput source="currency_ids" reference="currencies">
                <AutocompleteArrayInput
                  label={translate('resources.inventoryItems.detail.fields.currency')}
                  helperText={false}
                />
              </ReferenceInput>

              <TextInput
                source="customer_code"
                resettable
                helperText={false}
                label={translate('resources.inventoryItems.detail.fields.customer_code')}
              />

              <Box>
                <DateInput 
                  source="begin_expiration_date" 
                  label="失效日期(起)" 
                  fullWidth 
                  helperText={false}
                />
                <DateInput 
                  source="end_expiration_date" 
                  label="失效日期(迄)" 
                  fullWidth 
                  helperText={false}
                />
              </Box>

              <Box>
                <DateInput 
                  source="begin_last_storage_date" 
                  label="最後入庫日(起)" 
                  fullWidth 
                  helperText={false} />
                <DateInput 
                  source="end_last_storage_date" 
                  label="最後入庫日(迄)" 
                  fullWidth 
                  helperText={false} />
              </Box>

              <CheckboxGroupInput
                source="attributes"
                label={translate('resources.inventoryItems.list.filters.attribute')}
                helperText={false}
                choices={[
                  { id: 'M', name: '自製件' },
                  { id: 'P', name: '採購件' },
                  { id: 'S', name: '委外加工件' }
                ]}
              />

              <CheckboxGroupInput
                source="inspection_methods"
                label={translate('resources.inventoryItems.list.filters.inspection_method')}
                helperText={false}
                choices={[
                  { id: 'EX', name: '免檢' },
                  { id: 'SR', name: '抽檢(減量)' },
                  { id: 'SN', name: '抽檢(正常)' },
                  { id: 'ST', name: '抽檢(加嚴)' },
                  { id: 'FI', name: '全檢' }
                ]}
              />
            </Box>
          </CardContent>

          {/* 固定底部的按鈕 */}
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              bgcolor: "background.paper",
              p: 2,
              borderTop: "1px solid #eee"
            }}
          >
            <Box display="flex" gap={1}>
              <Button variant="outlined" color="primary" type="submit" fullWidth>
                {translate('ra.action.filter')}
              </Button>
              <Button variant="outlined" color="secondary" onClick={resetFilter} fullWidth>
                {translate('ra.action.clear_input_value')}
              </Button>
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Card>
  )
}

export default InventoryItemFilterForm

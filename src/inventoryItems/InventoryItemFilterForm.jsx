import * as React from "react"
import { 
  TextInput,
  useListContext,
  ReferenceInput,
  SelectInput
} from "react-admin"
import { 
  useForm, 
  FormProvider 
} from "react-hook-form"
import { Box, Button, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect } from "react"

const InventoryItemFilterForm = () => {
  const {
    displayedFilters,
    filterValues,
    setFilters,
    hideFilter
  } = useListContext()

  const form = useForm({
    defaultValues: {
      ...filterValues,
      q: filterValues.q || '',  // 預設值
    }
  });

  useEffect(() => {
    if (!displayedFilters.main) {
      form.reset();  // 當篩選器隱藏時重置表單
    }
  }, [displayedFilters.main, form]);  // 只在displayedFilters.main變更時執行

  if (!displayedFilters.main) return null

  const onSubmit = values => {
    if (Object.keys(values).length > 0) {
      setFilters(values)
    } else {
      hideFilter("main")
    }
  }

  const resetFilter = () => {
    form.reset()
    setFilters({}, [])
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Box display="flex" alignItems="flex-end" mb={1}>
          <Box component="span" mr={2}>
            {/* Full-text search filter. We don't use <SearchFilter> to force a large form input */}
            <TextInput
              resettable
              helperText={false}
              source="q"
              label="搜尋"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          {/* <Box component="span" mr={2}>
            <ReferenceInput source="inventory_item_category_id" 
              reference="inventory-item-categories" 
              sort={{ field: 'created_at', order: 'ASC' }}
            >
              <SelectInput 
                resettable
                emptyText="全部"
                helperText={false} // Disable extra helper text
                label="品號類別"
              />
            </ReferenceInput>
          </Box> */}
          <Box component="span" mr={2}>
            <SelectInput
              resettable
              source="attribute"
              label="品號屬性"
              emptyText="全部"
              helperText={false} // Disable extra helper text
              choices={[
                { id: 'M', name: '自製件' },
                { id: 'P', name: '採購件' },
                { id: 'S', name: '委外加工件' }
              ]}
            />
          </Box>
          <Box component="span" mr={2}>
            <ReferenceInput source="warehouse_id" 
              reference="warehouses" 
              sort={{ field: 'created_at', order: 'ASC' }}
            >
              <SelectInput 
                resettable
                emptyText="全部"
                helperText={false} // Disable extra helper text
                label="主要庫別"
              />
            </ReferenceInput>
          </Box>
          <Box component="span" mr={2}>
            <SelectInput
              resettable
              source="inspection_method"
              label="檢驗方式"
              emptyText="全部"
              helperText={false} // Disable extra helper text
              choices={[
                { id: 'EX', name: '免檢' },
                { id: 'SR', name: '抽檢(減量)' },
                { id: 'SN', name: '抽檢(正常)' },
                { id: 'ST', name: '抽檢(加嚴)' },
                { id: 'FI', name: '全檢' }
              ]}
            />
          </Box>
          <Box component="span" mr={2} mb={1.5}>
            <Button variant="outlined" color="primary" type="submit">
              篩選
            </Button>
          </Box>
          <Box component="span" mb={1.5}>
            <Button variant="outlined" onClick={resetFilter}>
              關閉
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  )
}

export default InventoryItemFilterForm;
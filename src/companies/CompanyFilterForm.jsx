import * as React from "react"
import { 
  TextInput,
  useListContext,
  useTranslate
} from "react-admin"
import { 
  useForm, 
  FormProvider 
} from "react-hook-form"
import { Box, Button, InputAdornment } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect } from "react"

const CompanyFilterForm = () => {
  const translate = useTranslate();
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
              label={translate('ra.action.search')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box component="span" mr={2} mb={1.5}>
            <Button variant="outlined" color="primary" type="submit">
              {translate('ra.action.filter')}
            </Button>
          </Box>
          <Box component="span" mb={1.5}>
            <Button variant="outlined" onClick={resetFilter}>
              {translate('ra.action.close')}
            </Button>
          </Box>
        </Box>
      </form>
    </FormProvider>
  )
}

export default CompanyFilterForm;
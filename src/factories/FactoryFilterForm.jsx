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

const FactoryFilterForm = () => {
  const translate = useTranslate()
  const {
    displayedFilters,
    filterValues,
    setFilters
  } = useListContext()

  const form = useForm({
    defaultValues: {
      ...filterValues,
      q: filterValues.q || ''
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
      q: ''
    });

    setFilters({
      ...filterValues,
      q: ''
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
            q: ''
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

export default FactoryFilterForm

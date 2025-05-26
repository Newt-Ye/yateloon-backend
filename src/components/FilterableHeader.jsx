import * as React from "react"
import {
  useListContext,
  useTranslate,
  TextInput,
  DateInput,
  ReferenceInput,
  AutocompleteArrayInput
} from "react-admin"
import {
  Button,
  Box,
  Typography,
  IconButton,
  Menu,
  Divider,
  Stack
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react"
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FilterAndSortMenu = ({
  source,
  label,
  onSortChange,
  onFilterApply,
  currentFilterValue,
  filterType,
  reference,
  choices,
  optionValue="id",
  optionText="name"
}) => {
  const translate = useTranslate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const methods = useForm({
    defaultValues:
      filterType === "date"
        ? {
            [`begin_${source}`]: currentFilterValue?.[`begin_${source}`] || null,
            [`end_${source}`]: currentFilterValue?.[`end_${source}`] || null,
          }
        : {
            [source]: currentFilterValue || "",
          },
  });

  const { getValues, reset } = methods;

  const handleMenuOpen = (event) => {
    event.stopPropagation();

    if (filterType === "date") {
      reset({
        [`begin_${source}`]: currentFilterValue?.[`begin_${source}`] || null,
        [`end_${source}`]: currentFilterValue?.[`end_${source}`] || null,
      });
    } else {
      reset({
        [source]: currentFilterValue || (filterType === "select" ? [] : ""),
      });
    }

    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = () => {
    const values = getValues();
    let appliedValue;
    if (filterType === "date") {
      appliedValue = {
        [`begin_${source}`]: values[`begin_${source}`] || undefined,
        [`end_${source}`]: values[`end_${source}`] || undefined,
      };
    } else if (filterType === "select") {
      appliedValue = values[source]?.length ? values[source] : undefined;
    } else {
      appliedValue = values[source] || undefined;
    }
    onFilterApply(appliedValue);
    handleMenuClose();
  };

  const handleClearFilter = () => {
    const resetValues = filterType === "date"
      ? {
          [`begin_${source}`]: null,
          [`end_${source}`]: null,
        }
      : { [source]: filterType === "select" ? [] : "" };

    reset(resetValues);
    onFilterApply(filterType === "date" ? {} : filterType === "select" ? [] : "");
    handleMenuClose();
  };
  
  const isFiltered = filterType === "date"
  ? currentFilterValue?.[`begin_${source}`] || currentFilterValue?.[`end_${source}`]
  : Array.isArray(currentFilterValue)
    ? currentFilterValue.length > 0
    : !!currentFilterValue;

  useEffect(() => {
    if (!currentFilterValue) reset();
  }, [currentFilterValue, reset]);

  return (
    <>
      <IconButton
        onClick={handleMenuOpen}
        size="small"
        color={isFiltered ? "primary" : "default"}
      >
        <FilterAltIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={(e) => e.stopPropagation()}
        MenuListProps={{
          sx: {
            p: 2,
            width: 260,
          },
        }}
        disablePortal
      >
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: "bold" }}>
          {label}
        </Typography>

        <FormProvider {...methods}>
          <Box component="form" onSubmit={(e) => e.preventDefault()} noValidate sx={{ mb: 2 }}>
            {filterType === "text" && 
              <TextInput
                source={source}
                label=""
                fullWidth
                size="small"
                variant="outlined"
              />
            }
            {filterType === "date" && 
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <DateInput
                  source={`begin_${source}`}
                  label="起始日期"
                  fullWidth
                  helperText={false}
                  sx={{ mb: 1 }}
                />
                <DateInput
                  source={`end_${source}`}
                  label="結束日期"
                  fullWidth
                  helperText={false}
                />
              </Box>
            }

            {filterType === "select" && (
              reference ? (
                <ReferenceInput source={source} reference={reference}>
                  <AutocompleteArrayInput
                    source={source}
                    label=""
                    helperText={false}
                    optionValue={optionValue}
                    optionText={optionText}
                  />
                </ReferenceInput>
              ) : (
                <AutocompleteArrayInput
                  source={source}
                  label=""
                  helperText={false}
                  choices={choices}
                  optionValue={optionValue}
                  optionText={optionText}
                />
              )
            )}
          </Box>
        </FormProvider>

        <Divider sx={{ mb: 1 }} />

        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            fullWidth
            size="small"
            color="inherit"
            onClick={handleClearFilter}
          >
            {translate("ra.navigation.clear_filters")}
          </Button>
          <Button
            variant="contained"
            fullWidth
            size="small"
            onClick={handleApplyFilter}
          >
            {translate("ra.action.filter")}
          </Button>
        </Stack>
      </Menu>
    </>
  );
};

export const FilterableHeader = ({ source, label, filterType, reference, choices, optionValue, optionText }) => {
  const { setSort, filterValues, setFilters } = useListContext();

  const handleSortChange = (order) => {
    setSort({ field: source, order });
  };

  const handleFilterApply = (value) => {
    const updatedFilters = { ...filterValues };

    if (filterType === "date") {
      updatedFilters[`begin_${source}`] = value[`begin_${source}`] || undefined;
      updatedFilters[`end_${source}`] = value[`end_${source}`] || undefined;
    } else {
      updatedFilters[source] = value || undefined;
    }

    setFilters(updatedFilters, null, false);
  };

  const currentFilterValue =
    filterType === "date"
      ? {
          [`begin_${source}`]: filterValues[`begin_${source}`],
          [`end_${source}`]: filterValues[`end_${source}`],
        }
      : filterValues[source];

  return (
    <Box display="flex" alignItems="center" justifyContent="start">
      {label}
      <FilterAndSortMenu
        source={source}
        label={label}
        onSortChange={handleSortChange}
        onFilterApply={handleFilterApply}
        currentFilterValue={currentFilterValue}
        filterType={filterType}
        reference={reference}
        choices={choices}
        optionValue={optionValue}
        optionText={optionText}
      />
    </Box>
  );
};

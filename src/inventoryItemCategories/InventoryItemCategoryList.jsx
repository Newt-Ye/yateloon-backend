import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TextField,
  usePermissions,
  useTranslate,
} from "react-admin"
import {
  useMediaQuery,
  Typography,
} from "@mui/material";
import { ListActions } from "../components/ListActions"
import { FilterableHeader } from "../components/FilterableHeader"
import InventoryItemCategoryFilterForm from "./InventoryItemCategoryFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const InventoryItemCategoryList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "inventory-item-categories";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.inventoryItemCategories.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              FilterFormComponent={InventoryItemCategoryFilterForm}
            />}
          >
            {isXsmall ? (
              <div></div>
            ) : (
              <DatagridConfigurable
                sx={{
                  "& .column-groups": {
                    md: { display: "none" },
                    lg: { display: "table-cell" },
                  },
                  "& .RaDatagrid-headerCell, & .RaDatagrid-cell": {
                    flex: "1 1 0",
                    minWidth: "120px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                }}
                omit={["id"]}
                bulkActionButtons={false}
                rowClick="show"
              >
                <TextField
                  source="id"
                />
                <TextField
                  source="index"
                  label={translate(
                    "resources.inventoryItemCategories.list.fields.sorting"
                  )}
                  sortable={false}
                />
                <TextField
                  source="code"
                  label={
                    <FilterableHeader
                      source="code"
                      label={translate(
                        "resources.inventoryItemCategories.list.fields.code"
                      )}
                      filterType="text"
                    />
                  }
                />
                <TextField
                  source="name"
                  label={
                    <FilterableHeader
                      source="name"
                      label={translate(
                        "resources.inventoryItemCategories.list.fields.name"
                      )}
                      filterType="text"
                    />
                  }
                />
                <DateField
                  source="created_at"
                  label={
                    <FilterableHeader
                      source="created_at"
                      label={translate(
                        "resources.inventoryItemCategories.list.fields.created_at"
                      )}
                      filterType="date"
                    />
                  }
                  showTime
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default InventoryItemCategoryList
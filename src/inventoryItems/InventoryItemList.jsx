import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TextField,
  DeleteWithConfirmButton,
  EditButton,
  usePermissions,
  useTranslate,
  SelectField
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { ListActions } from "../components/ListActions"
import { FilterableHeader } from "../components/FilterableHeader"
import InventoryItemFilterForm from "./InventoryItemFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const InventoryItemList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "inventory-items";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.inventoryItems.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
            />}
            aside={<InventoryItemFilterForm />}
          >
            {isXsmall ? (
              <div></div>
            ) : (
              <DatagridConfigurable
                sx={{
                  "& .column-groups": {
                    md: { display: "none" },
                    lg: { display: "table-cell" }
                  }
                }}
                omit={["id"]}
                bulkActionButtons={false}
                rowClick="show"
              >
                {(permissions === 'superuser' || permissions?.[resource]?.edit) ? (<EditButton />) : null}
                <TextField
                  source="id"
                  label="ID"
                />
                <TextField
                  source="code"
                  label={
                    <FilterableHeader
                      source="code"
                      label={translate(
                        "resources.inventoryItems.list.fields.code"
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
                        "resources.inventoryItems.list.fields.name"
                      )}
                      filterType="text"
                    />
                  }
                />
                <TextField
                  source="specification"
                  label={
                    <FilterableHeader
                      source="specification"
                      label={translate(
                        "resources.inventoryItems.list.fields.specification"
                      )}
                      filterType="text"
                    />
                  }
                />
                <TextField
                  source="inventory"
                  label={translate('resources.inventoryItems.list.fields.inventory')}
                />
                <DateField 
                  source="effective_date" 
                  label={
                    <FilterableHeader
                      source="effective_date"
                      label={translate(
                        "resources.inventoryItems.list.fields.effective_date"
                      )}
                      filterType="date"
                    />
                  }
                />
                <SelectField 
                  source="last_approval_instances.status" 
                  label={translate(
                    "resources.inventoryItems.list.fields.approval_instance_status"
                  )}
                  choices={[
                    { id: 'pending', name: 'ra.status.approval.pending' },
                    { id: 'partially_approved', name: 'ra.status.approval.partially_approved' },
                    { id: 'approved', name: 'ra.status.approval.approved' },
                    { id: 'rejected', name: 'ra.status.approval.rejected' },
                    { id: 'cancelled', name: 'ra.status.approval.cancelled' },
                    { id: 'returned', name: 'ra.status.approval.returned' }
                  ]} />
                {(permissions === 'superuser' || permissions?.[resource]?.delete) && (
                  <DeleteWithConfirmButton
                    confirmTitle="確認刪除"
                    confirmContent="您確定要刪除此品號嗎？"
                  />
                )}
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default InventoryItemList
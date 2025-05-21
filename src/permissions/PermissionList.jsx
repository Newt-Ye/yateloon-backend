import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TextField,
  EditButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  usePermissions,
  useTranslate
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { FilterableHeader } from "../components/FilterableHeader"
import { ListActions } from "../components/ListActions"
import PermissionFilterForm from "./PermissionFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const PermissionList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "permissions";

  return isPending
      ? null
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate("resources.permissions.list.title")}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              createCtrl={false}
            />}
            aside={<PermissionFilterForm />}
          >
            {isXsmall ? (
              <div></div>
            ) : (
              <DatagridConfigurable
                sx={{
                  "& .column-groups": {
                    md: { display: "none" },
                    lg: { display: "table-cell" }
                  },
                  "& .RaDatagrid-headerCell, & .RaDatagrid-cell": {
                    flex: "1 1 0",  // 設定每個欄位的彈性寬度
                    minWidth: "120px",  // 最小寬度，避免太窄
                    maxWidth: "200px",  // 最大寬度
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }
                }}
                omit={["id"]}
                bulkActionButtons={false}
                rowClick="show"
              >
                {(permissions === 'superuser' || permissions?.[resource]?.create) ? (<EditButton />) : null}
                <TextField
                  source="id"
                  label="ID"
                />
                <TextField
                  source="account"
                  label={
                    <FilterableHeader
                      source="account"
                      label={translate(
                        "resources.permissions.commons.fields.account"
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
                        "resources.permissions.commons.fields.name"
                      )}
                      filterType="text"
                    />
                  }
                />
                <ArrayField 
                  source="companies" 
                  label={
                    <FilterableHeader
                      source="company_ids"
                      label={translate(
                        "resources.permissions.list.fields.companies"
                      )}
                      filterType="select"
                      reference="companies"
                    />
                  }
                >
                  <SingleFieldList linkType={false}>
                    <ChipField source="name" size="small" />
                  </SingleFieldList>
                </ArrayField>
                <DateField 
                  source="updated_at"
                  label={
                    <FilterableHeader
                      source="updated_at"
                      label={translate(
                        "resources.permissions.list.fields.updated_at"
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

export default PermissionList
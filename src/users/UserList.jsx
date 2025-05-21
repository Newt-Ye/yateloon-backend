import * as React from "react"
import {
  CreateButton,
  DatagridConfigurable,
  List,
  SearchInput,
  TopToolbar,
  TextField,
  useListContext,
  EditButton,
  FunctionField,
  DateField,
  ArrayField,
  SingleFieldList,
  ChipField,
  usePermissions,
  useTranslate,
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import { FilterableHeader } from "../components/FilterableHeader"
import ContentFilter from '@mui/icons-material/FilterList';

import UserFilterForm from "./UserFilterForm"

const UserFilterButton = () => {
  const { showFilter } = useListContext()
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => showFilter("main")}
      startIcon={<ContentFilter />}
      sx={{
        height: '27.5px', // 調整按鈕高度
        padding: '4px 5px', // 調整內邊距
        fontSize: '13px', // 調整字型大小，這樣可以與 CreateButton 大小對齊
      }}
    >
      篩選
    </Button>
  )
}

const visitorFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const UserListActions = ({ permissions }) => (
  <Box width="100%">
    <TopToolbar>
      <UserFilterButton />
      {(permissions === 'superuser' || permissions?.['permissions']?.create) ? (<CreateButton />) : null}
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    {/* <UserFilterForm /> */}
  </Box>
)

const UserList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  return isPending
      ? null
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.users.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<UserListActions permissions={permissions} />}
            aside={<UserFilterForm />}
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
                {(permissions === 'superuser' || permissions?.['permissions']?.create) ? (<EditButton />) : null}
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
                        "resources.users.list.fields.account"
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
                        "resources.users.list.fields.name"
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
                        "resources.users.list.fields.companies"
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
                <FunctionField
                  label={
                    <FilterableHeader
                      source="statuses"
                      label={translate(
                        "resources.users.list.fields.status"
                      )}
                      filterType="select"
                      choices={[
                        { id: 0, name: '未啟用' },
                        { id: 1, name: '啟用中' },
                        { id: 9, name: '失效' }
                      ]}
                    />
                  }
                  render={(record) => {
                    const statusMapping = {
                      0: "未啟用",
                      1: "啟用中",
                      9: "失效"
                    }
                    return statusMapping[record.status]
                  }}
                  sortBy="status"
                />
                <DateField 
                  source="created_at" 
                  label={
                    <FilterableHeader
                      source="created_at"
                      label={translate(
                        "resources.users.list.fields.created_at"
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

export default UserList
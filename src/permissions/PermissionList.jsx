import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TopToolbar,
  TextField,
  useListContext,
  EditButton,
  ArrayField,
  SingleFieldList,
  ChipField,
  usePermissions,
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import ContentFilter from '@mui/icons-material/FilterList';

import PermissionFilterForm from "./PermissionFilterForm"

const UserPermissionFilterButton = () => {
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

const UserPermissionListActions = () => (
  <Box width="100%">
    <TopToolbar>
      <UserPermissionFilterButton />
      {/* <CreateButton /> */}
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    <PermissionFilterForm />
  </Box>
)

const UserPermissionList = () => {
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  return isPending
      ? null
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            使用者權限列表
          </Typography>
          <List
            title={false}
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<UserPermissionListActions />}
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
                  label="使用者代號"
                />
                <TextField
                  source="name"
                  label="使用者名稱"
                  sortBy="user_id"
                />
                <ArrayField source="companies" label="可登入公司別">
                  <SingleFieldList linkType={false}>
                    <ChipField source="name" size="small" />
                  </SingleFieldList>
                </ArrayField>
                <DateField 
                  source="updated_at" 
                  label="更新日期"  
                  showTime
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default UserPermissionList
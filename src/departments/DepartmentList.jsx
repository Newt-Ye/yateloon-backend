import * as React from "react"
import {
  CreateButton,
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
  ChipField
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import ContentFilter from '@mui/icons-material/FilterList';

import DepartmentFilterForm from "./DepartmentFilterForm"

const DepartmentFilterButton = () => {
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

const DepartmentListActions = () => (
  <Box width="100%">
    <TopToolbar>
      <DepartmentFilterButton />
      <CreateButton />
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    <DepartmentFilterForm />
  </Box>
)

const DepartmentList = () => {
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        部門權限列表
      </Typography>
      <List
        title={false}
        filters={isSmall ? visitorFilters : undefined}
        sort={{ field: "created_at", order: "ASC" }}
        perPage={10}
        actions={<DepartmentListActions />}
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
            rowClick="edit"
          >
            <EditButton />
            <TextField
              source="id"
              label="ID"
            />
            <TextField
              source="code"
              label="部門代號"
            />
            <TextField
              source="short_name"
              label="部門名稱"
            />
            <ArrayField source="companies" label="適用公司別">
              <SingleFieldList linkType={false}>
                <ChipField source="name" size="small" />
              </SingleFieldList>
            </ArrayField>
            <DateField 
              source="created_at" 
              label="建立日期"  
              showTime
            />
          </DatagridConfigurable>
        )}
      </List>
    </>
  )
}

export default DepartmentList
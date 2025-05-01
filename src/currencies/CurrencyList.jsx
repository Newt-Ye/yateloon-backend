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
  usePermissions,
  EditButton,
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import ContentFilter from '@mui/icons-material/FilterList';

import CurrencyFilterForm from "./CurrencyFilterForm"

const CurrencyFilterButton = () => {
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

const CurrencyListActions = ({ permissions }) => (
  <Box width="100%">
    <TopToolbar>
      <CurrencyFilterButton />
      {(permissions === 'superuser' || permissions?.[["factories"]]?.create) ? <CreateButton /> : null}
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    <CurrencyFilterForm />
  </Box>
)

const CurrencyList = () => {
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            幣別資料列表
          </Typography>
          <List
            title={false}
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<CurrencyListActions permissions={permissions} />}
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
                {(permissions === 'superuser' || permissions?.['factories']?.edit) ? (<EditButton />) : null}
                <TextField
                  source="id"
                  label="ID"
                />
                <TextField
                  source="code"
                  label="幣別"
                />
                <TextField
                  source="name"
                  label="幣別名稱"
                />
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

export default CurrencyList
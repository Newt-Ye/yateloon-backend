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
  DeleteWithConfirmButton,
  EditButton,
  usePermissions,
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import ContentFilter from '@mui/icons-material/FilterList';

import InventoryItemFilterForm from "./InventoryItemFilterForm"

const InventoryItemFilterButton = () => {
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

const InventoryItemListActions = ({ permissions }) => (
  <Box width="100%">
    <TopToolbar>
      <InventoryItemFilterButton />
      {(permissions === 'superuser' || permissions?.['inventory-items']?.create) ? (<CreateButton />) : null}
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    <InventoryItemFilterForm />
  </Box>
)

const InventoryItemList = () => {
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            品號資料列表
          </Typography>
          <List
            title={false}
            filters={isSmall ? visitorFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<InventoryItemListActions permissions={permissions} />}
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
                rowClick={false}
              >
                {(permissions === 'superuser' || permissions?.['inventory-items']?.edit) ? (<EditButton />) : null}
                <TextField
                  source="id"
                  label="ID"
                />
                <TextField
                  source="code"
                  label="品號"
                />
                <TextField
                  source="name"
                  label="品名"
                />
                <TextField
                  source="specification"
                  label="規格"
                />
                <TextField
                  source="inventory"
                  label="庫存數量"
                />
                <DateField 
                  source="effective_date" 
                  label="生效日期"  
                  showTime
                />
                {(permissions === 'superuser' || permissions?.['inventory-items']?.delete) && (
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
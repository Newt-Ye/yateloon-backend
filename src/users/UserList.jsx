import * as React from "react"
import {
  BooleanField,
  CreateButton,
  DatagridConfigurable,
  DateField,
  DateInput,
  ExportButton,
  List,
  NullableBooleanInput,
  NumberField,
  SearchInput,
  SelectColumnsButton,
  TopToolbar,
  TextField,
  EmailField,
  useListContext,
  DeleteButton,
  EditButton,
  BulkUpdateButton, 
  BulkDeleteButton, 
  BulkExportButton
} from "react-admin"
import { useMediaQuery, Button, Box, Typography } from "@mui/material"
import ContentFilter from '@mui/icons-material/FilterList';
import { VisibilityOff } from "@mui/icons-material";

// import SegmentsField from "./SegmentsField"
// import SegmentInput from "./SegmentInput"
// import UserLinkField from "./UserLinkField"
// import ColoredNumberField from "./ColoredNumberField"
// import MobileGrid from "./MobileGrid"
import UserListAside from "./UserListAside"
import UserFilterForm from "./UserFilterForm"
import UserEmpty from "./UserEmpty"

const UserFilterButton = () => {
  const { showFilter } = useListContext();
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
  );
};

const visitorFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const UserListActions = () => (
  <Box width="100%">
    <TopToolbar>
      <UserFilterButton />
      <CreateButton />
      {/* <SelectColumnsButton /> */}
      {/* <ExportButton /> */}
    </TopToolbar>
    <UserFilterForm />
  </Box>
)

const UserBulkActionButtons = () => (
  <>
      <BulkDeleteButton />
      {/* <BulkExportButton /> */}
  </>
);

const UserTitle = () => {
  return <span>{'帳號'}</span>;
};

const Empty = () => (
  <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
          No products available
      </Typography>
      <Typography variant="body1">
          Create one or import from a file
      </Typography>
      <CreateButton />
  </Box>
);

const UserList = () => {
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  return (
    <List
      title={<UserTitle/>}
      filters={isSmall ? visitorFilters : undefined}
      sort={{ field: "createdAt", order: "ASC" }}
      perPage={25}
      // aside={<UserListAside />}
      actions={<UserListActions />}
    >
      {isXsmall ? (
        // <MobileGrid />
        <div></div>
      ) : (
        <DatagridConfigurable
          rowClick="edit"
          bulkActionButtons={<UserBulkActionButtons />}
          sx={{
            "& .column-groups": {
              md: { display: "none" },
              lg: { display: "table-cell" }
            }
          }}
          omit={["id"]}
        >
          <TextField
            source="id"
            label="ID"
          />
          <TextField
            source="name"
            label="名稱"
          />
          <EmailField
            source="email"
            label="Email"
          />
          <BooleanField
            source="status"
            label="起用狀態"
          />
          <DateField 
            source="createdAt" 
            label="建立時間"  
            showTime
          />
          <DeleteButton />
        </DatagridConfigurable>
      )}
    </List>
  )
}

export default UserList
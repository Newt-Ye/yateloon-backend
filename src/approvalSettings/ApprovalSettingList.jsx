import * as React from "react"
import {
  DatagridConfigurable,
  List,
  SearchInput,
  TextField,
  usePermissions,
  EditButton,
  useTranslate,
  NumberField,
  SelectField,
  FunctionField
} from "react-admin"
import { useMediaQuery, Typography, Chip } from "@mui/material"
import { ListActions } from "../components/ListActions"
import { FilterableHeader } from "../components/FilterableHeader"
import ApprovalSettingFilterForm from "./ApprovalSettingFilterForm"
import { menuItems } from '../menuData';

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const ApprovalSettingList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "approval-settings";

  const menuItemchoices = menuItems
    .flatMap(group => group.items)
    .filter(item => item.isApprovalForm)
    .map(item => ({
      id: item.resource,
      name: item.primaryText
    }));

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.approvalSettings.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              // FilterFormComponent={ApprovalSettingFilterForm}
            />}
            aside={<ApprovalSettingFilterForm />}
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
                    flex: "1 1 0",
                    minWidth: "120px",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
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
                        "resources.approvalSettings.commons.fields.code"
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
                        "resources.approvalSettings.commons.fields.name"
                      )}
                      filterType="text"
                    />
                  }
                />
                <FunctionField
                  label={
                    <FilterableHeader
                      source="resources"
                      label={translate("resources.approvalSettings.commons.fields.resources")}
                      filterType="select"
                      choices={menuItemchoices}
                    />
                  }
                  render={record => (
                    <>
                      {record.resources?.map(item => {
                        const res = menuItemchoices.find(choice => choice.id === item.resource);
                        return res ? (
                          <Chip
                            key={res.id}
                            label={res.name}
                            size="small"
                            sx={{ mr: 0.5 }}
                          />
                        ) : null;
                      })}
                    </>
                  )}
                />
                <NumberField
                  source="total_steps"
                  label={translate(
                    "resources.approvalSettings.commons.fields.total_steps"
                  )}
                />
                <SelectField 
                  source="is_enabled"
                  label={
                    <FilterableHeader
                      source="is_enableds"
                      label={translate(
                        "resources.approvalSettings.commons.fields.is_enabled"
                      )}
                      filterType="select"
                      choices={[
                        { id: 0, name: '未啟用' },
                        { id: 1, name: '已啟用' },
                      ]}
                    />
                  }
                  choices={[
                    { id: 0, name: '未啟用' },
                    { id: 1, name: '已啟用' },
                  ]} 
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default ApprovalSettingList
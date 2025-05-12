import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TextField,
  usePermissions,
  EditButton,
  useTranslate,
  ReferenceField
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { ListActions } from "../components/ListActions"
import TradingPartnerFilterForm from "./TradingPartnerFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const TradingPartnerList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "trading-partners";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.tradingPartners.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              FilterFormComponent={TradingPartnerFilterForm}
            />}
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
                <ReferenceField 
                  source="trading_partner_category_id" 
                  reference="trading-partner-categories"
                  label={translate('resources.tradingPartners.commons.fields.trading_partner_category')}
                  link={false}
                >
                  <TextField source="name"/>
                </ReferenceField>
                <TextField
                  source="code"
                  label={translate('resources.tradingPartners.commons.fields.code')}
                />
                <TextField
                  source="name"
                  label={translate('resources.tradingPartners.commons.fields.name')}
                />
                <DateField 
                  source="created_at" 
                  label={translate('resources.tradingPartners.commons.fields.created_at')}
                  showTime
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default TradingPartnerList
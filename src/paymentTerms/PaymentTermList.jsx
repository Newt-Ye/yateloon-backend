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
  SelectField
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { ListActions } from "../components/ListActions"
import PaymentTermFilterForm from "./PaymentTermFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const PaymentTermList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "payment-terms";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.paymentTerms.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              FilterFormComponent={PaymentTermFilterForm}
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
                <SelectField 
                  source="term_type" 
                  label={translate('resources.paymentTerms.commons.fields.term_type')} 
                  choices={[
                    { id: 'purchase', name: 'resources.paymentTerms.commons.choices.purchase' },
                    { id: 'sales', name: 'resources.paymentTerms.commons.choices.sales' },
                  ]} 
                />
                <TextField
                  source="code"
                  label={translate('resources.paymentTerms.commons.fields.code')}
                />
                <TextField
                  source="name"
                  label={translate('resources.paymentTerms.commons.fields.name')}
                />
                <DateField 
                  source="created_at" 
                  label={translate('resources.paymentTerms.commons.fields.created_at')}
                  showTime
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default PaymentTermList
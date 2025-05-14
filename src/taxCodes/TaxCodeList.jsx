import * as React from "react"
import {
  DatagridConfigurable,
  List,
  SearchInput,
  TextField,
  usePermissions,
  EditButton,
  useTranslate,
  SelectField,
  NumberField
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { ListActions } from "../components/ListActions"
import TaxCodeFilterForm from "./TaxCodeFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const TaxCodeList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "tax-codes";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.taxCodes.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              FilterFormComponent={TaxCodeFilterForm}
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
                <TextField
                  source="code"
                  label={translate('resources.taxCodes.commons.fields.code')}
                />
                <TextField
                  source="name"
                  label={translate('resources.taxCodes.commons.fields.name')}
                />
                <SelectField 
                  source="direction" 
                  label={translate('resources.taxCodes.commons.fields.direction')} 
                  choices={[
                    { id: 'input', name: 'resources.taxCodes.commons.choices.input' },
                    { id: 'output', name: 'resources.taxCodes.commons.choices.output' },
                  ]} 
                />
                <SelectField 
                  source="invoice_type" 
                  label={translate('resources.taxCodes.commons.fields.invoice_type')} 
                  choices={[
                    { id: 'no_invoice', name: 'resources.taxCodes.commons.choices.no_invoice' },
                    { id: 'two_part', name: 'resources.taxCodes.commons.choices.two_part' },
                    { id: 'three_part', name: 'resources.taxCodes.commons.choices.three_part' },
                    { id: 'special', name: 'resources.taxCodes.commons.choices.special' },
                  ]}
                />
                <SelectField 
                  source="tax_type" 
                  label={translate('resources.taxCodes.commons.fields.tax_type')} 
                  choices={[
                    { id: 'tax_included', name: 'resources.taxCodes.commons.choices.tax_included' },
                    { id: 'tax_excluded', name: 'resources.taxCodes.commons.choices.tax_excluded' },
                    { id: 'zero_rate', name: 'resources.taxCodes.commons.choices.zero_rate' },
                    { id: 'exempted', name: 'resources.taxCodes.commons.choices.exempted' },
                    { id: 'non_taxable', name: 'resources.taxCodes.commons.choices.non_taxable' },
                  ]}
                />
                <NumberField
                  source="tax_rate"
                  label={translate('resources.taxCodes.commons.fields.tax_rate')}
                  textAlign="left"
                  transform={value => `${Math.round(value)}%`}
                />
              </DatagridConfigurable>
            )}
          </List>
        </>
      )
}

export default TaxCodeList
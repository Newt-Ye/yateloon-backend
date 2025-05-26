import * as React from "react"
import {
  DatagridConfigurable,
  DateField,
  List,
  SearchInput,
  TextField,
  usePermissions,
  EditButton,
  ReferenceField,
  SelectField,
  useTranslate
} from "react-admin"
import { useMediaQuery, Typography } from "@mui/material"
import { ListActions } from "../components/ListActions"
import { FilterableHeader } from "../components/FilterableHeader"
import WarehouseFilterForm from "./WarehouseFilterForm"

const mobileFilters = [
  <SearchInput source="q" alwaysOn />,
  // <DateInput source="last_seen_gte" />,
  // <NullableBooleanInput source="has_ordered" />,
  // <NullableBooleanInput source="has_newsletter" defaultValue />,
  // <SegmentInput source="groups" />
]

const WarehouseList = () => {
  const translate = useTranslate();
  const isXsmall = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const isSmall = useMediaQuery(theme => theme.breakpoints.down("md"))
  const { isPending, permissions } = usePermissions();

  const resource = "warehouses";

  return isPending
      ? (<div>Waiting for permissions...</div>)
      : (
        <>
          <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
            {translate('resources.warehouses.list.title')}
          </Typography>
          <List
            title={false}
            filters={isSmall ? mobileFilters : undefined}
            sort={{ field: "created_at", order: "ASC" }}
            perPage={10}
            actions={<ListActions 
              permissions={permissions} 
              resource={resource}
              // FilterFormComponent={WarehouseFilterForm}
            />}
            aside={<WarehouseFilterForm />}
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
                        "resources.warehouses.commons.fields.code"
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
                        "resources.warehouses.commons.fields.name"
                      )}
                      filterType="text"
                    />
                  }
                />
                <SelectField 
                  source="is_stock"
                  label={
                    <FilterableHeader
                      source="is_stocks"
                      label={translate(
                        "resources.warehouses.commons.fields.storage_type"
                      )}
                      filterType="select"
                      choices={[
                        { id: 1, name: '存貨倉' },
                        { id: 0, name: '非存貨倉' }
                      ]}
                    />
                  }
                  choices={[
                    { id: 1, name: '存貨倉' },
                    { id: 0, name: '非存貨倉' },
                  ]} 
                />
                <ReferenceField 
                  source="factory_id" 
                  reference="factories" 
                  label={
                    <FilterableHeader
                      source="factory_ids"
                      label={translate(
                        "resources.factories.commons.fields.code"
                      )}
                      filterType="select"
                      reference="factories"
                      optionText="code"
                    />
                  }
                  link={false}
                >
                  <TextField source="code"/>
                </ReferenceField>
                <ReferenceField 
                  source="factory_id" 
                  reference="factories"
                  label={
                    <FilterableHeader
                      source="factory_ids"
                      label={translate(
                        "resources.factories.commons.fields.name"
                      )}
                      filterType="select"
                      reference="factories"
                    />
                  }
                  link={false}
                >
                  <TextField source="name"/>
                </ReferenceField>
                <DateField 
                  source="created_at"
                  label={
                    <FilterableHeader
                      source="created_at"
                      label={translate(
                        "resources.warehouses.commons.fields.created_at"
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

export default WarehouseList
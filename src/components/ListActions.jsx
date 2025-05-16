import React from 'react';
import { TopToolbar, CreateButton } from 'react-admin';
import { Box } from "@mui/material"
import { FilterButton } from "./CustomFilterButton"

export const ListActions = ({ 
  permissions, 
  resource, 
  FilterFormComponent,
  createCtrl=true,
}) => {
  return (
    <Box width="100%">
      <TopToolbar>
        <FilterButton />
        {(permissions === 'superuser' || permissions?.[resource]?.create) && createCtrl ? (
          <CreateButton />
        ) : null}
        {/* <SelectColumnsButton /> */}
        {/* <ExportButton /> */}
      </TopToolbar>

      {FilterFormComponent && <FilterFormComponent />}
    </Box>
  );
};

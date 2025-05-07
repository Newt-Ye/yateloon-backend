import React from 'react';
import { TopToolbar, CreateButton } from 'react-admin';
import { Box } from "@mui/material"
import { FilterButton } from "./CustomFilterButton"

export const ListActions = ({ 
  permissions, 
  resource, 
  FilterFormComponent 
}) => {
  return (
    <Box width="100%">
      <TopToolbar>
        <FilterButton />
        {(permissions === 'superuser' || permissions?.[resource]?.create) ? (
          <CreateButton />
        ) : null}
        {/* <SelectColumnsButton /> */}
        {/* <ExportButton /> */}
      </TopToolbar>

      {FilterFormComponent && <FilterFormComponent />}
    </Box>
  );
};

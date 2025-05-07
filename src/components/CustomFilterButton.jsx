import React from 'react';
import { Button } from '@mui/material';
import { 
  useListContext,
  useTranslate,
} from 'react-admin';
import ContentFilter from '@mui/icons-material/FilterList';

export const FilterButton = () => {
  const { showFilter } = useListContext()
  const translate = useTranslate()
  return (
    <Button
      size="small"
      color="primary"
      onClick={() => showFilter("main")}
      startIcon={<ContentFilter />}
      sx={{
        height: '27.5px',
        padding: '4px 5px',
        fontSize: '13px',
      }}
    >
      {translate('ra.action.filter')}
    </Button>
  )
}
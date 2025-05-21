import * as React from "react"
import {
  Edit,
  useTranslate
} from "react-admin"
import { Typography } from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import InventoryItemCategoryForm from "./InventoryItemCategoryForm"

const InventoryItemCategoryShow = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItemCategories.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <InventoryItemCategoryForm 
          disabled={true}
        />
      </Edit>
    </>
  )
}

export default InventoryItemCategoryShow
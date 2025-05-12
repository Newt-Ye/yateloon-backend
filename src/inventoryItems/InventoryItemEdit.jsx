import * as React from "react"
import {
  Edit,
  SimpleForm,
  useTranslate,
  SaveButton
} from "react-admin"
import { Typography, Box } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { validateForm, InventoryItemForm } from "./InventoryItemCreate"

const InventoryItemTitle = () => {
  return <span>{'修改品號'}</span>;
};

const InventoryItemEdit = () => {
  const translate = useTranslate();
  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.inventoryItems.title')}
      </Typography>
      <Edit title={<InventoryItemTitle/>} redirect={false} mutationMode="optimistic">
        <SimpleForm
          defaultValues={{
            inventory_item_category_id: "",
            attribute: "M",
            name: "",
            code: "",
            specification: "",
            unit_id: "",
            inventory: 0,
            unit_cost: 0,
            inventory_amount: 0,
            warehouse_id: 0,
            inventory_manage: false,
            over_delivery_manage: true,
            over_receiving_manage: true,
            edit_item_name: false,
            effective_date: "",
            expiration_date: "",
            inspection_method: "",
            last_storage_date: "",
            currency_id: "",
            latest_purchase_price: 0,
            customer_code: "",
            cost: 0,
            unit_weight: "",
            unit_std_material_cost: 0,
            unit_std_labor_cost: 0,
            unit_std_manufacturing_cost: 0,
            unit_std_processing_cost: 0,
            total_standard_cost: 0
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <InventoryItemForm />
          <AuditFields />
        </SimpleForm>
      </Edit>
    </>
  )
}

export default InventoryItemEdit
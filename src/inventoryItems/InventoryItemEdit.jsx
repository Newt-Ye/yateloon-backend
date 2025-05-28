import * as React from "react"
import {
  Edit,
  SimpleForm,
  useTranslate,
  SaveButton,
  useDataProvider
} from "react-admin"
import { Typography, Box } from "@mui/material"
import { AuditFields } from "../components/AuditFields"
import { InventoryItemForm } from "./InventoryItemCreate"

const InventoryItemTitle = () => {
  return <span>{'修改品號'}</span>;
};

const InventoryItemEdit = () => {
  const dataProvider = useDataProvider()
  const translate = useTranslate();

  const validateForm = async (values) => {
    const errors = {}
    if (!values.inventory_item_category_id) {
      errors.inventory_item_category_id = "ra.validation.required"
    }
    if (!values.code) {
      errors.code = 'ra.validation.required';
    } else {
      try {
        const { data: category } = await dataProvider.getOne('inventory-item-categories', {
          id: values.inventory_item_category_id,
        });

        const requiredLength = category.code === '130' ? 18 : 15;

        if (values.code.length !== requiredLength) {
          errors.code = `resources.inventoryItems.detail.validation.exact_length_${requiredLength}`;
        }
      } catch (error) {
        // 若找不到分類，仍可顯示錯誤
        errors.code = 'resources.inventoryItems.detail.validation.category_not_found';
      }
    }
    if (!values.name) {
      errors.name = "ra.validation.required"
    }
    if (!values.specification) {
      errors.specification = "ra.validation.required"
    }
    if (!values.unit_id) {
      errors.unit_id = "ra.validation.required"
    }
    if (!values.warehouse_id) {
      errors.warehouse_id = "ra.validation.required"
    }
    if (!values.inspection_method) {
      errors.inspection_method = "ra.validation.required"
    }
    if (values.unit_std_material_cost === "") {
      errors.unit_std_material_cost = "ra.validation.required"
    }
    if (!values.unit_std_labor_cost === "") {
      errors.unit_std_labor_cost = "ra.validation.required"
    }
    if (!values.unit_std_manufacturing_cost === "") {
      errors.unit_std_manufacturing_cost = "ra.validation.required"
    }
    if (!values.unit_std_processing_cost === "") {
      errors.unit_std_processing_cost = "ra.validation.required"
    }
    if (!values.unit_std_processing_cost === "") {
      errors.unit_std_processing_cost = "ra.validation.required"
    }
    if (!values.total_standard_cost === "") {
      errors.total_standard_cost = "ra.validation.required"
    }
    return errors
  }

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
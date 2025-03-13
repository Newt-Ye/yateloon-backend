import * as React from "react"
import {
    Edit,
    SimpleForm,
    TextInput,
    useTranslate,
    email,
    SelectInput,
    DateTimeInput,
    FullNameField,
    BooleanInput,
    ReferenceInput,
    useRecordContext
  } from "react-admin"
import { Box, Typography, Grid } from "@mui/material"

import { validateForm } from "./CategoryCreate"

const CategoryTitle = () => {
  return <span>{'商品系列'}</span>
}

const ExcludeSelectInput = () => {
  const record = useRecordContext();
  const isDisabled = record?.children && record.children.length > 0;

  return (
    <ReferenceInput source="parentId" 
      reference="categories" 
      filter={{ type: 'product', level: 'top', excludeId: record.id }}
      sort={{ field: 'sorting', order: 'ASC' }}
      defaultValue={record?.parentId}
    >
      <SelectInput optionText="name" label="父類別" emptyText="無" disabled={isDisabled} />
    </ReferenceInput>
  )
};

const CategoryEdit = (props) => {
  const translate = useTranslate()

  return (
    <Edit title={<CategoryTitle/>} >
      <SimpleForm
        // Here for the GQL provider
        defaultValues={{
          name: "",
          code: "",
          status: 1,
          description: "",
          type: "",
        }}
        validate={validateForm}
      >
        <Grid container width={{ xs: "100%", xl: "50rem" }} spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextInput autoFocus source="name" label="名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={4} 
              sx={{
                display: "flex",
                justifyContent: "right"
              }}
            >
              <BooleanInput label="啟用狀態" source="status" />
            </Grid>
            <Grid item xs={12} sm={8}>
              <ExcludeSelectInput/>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextInput source="sorting" label="排序編號" isRequired />
            </Grid>
            {/* <Grid item xs={12} sm={8}>
              <TextInput source="code" label="編號" />
            </Grid> */}
            <Grid item xs={8}>
              <TextInput source="description"
                label="備註" 
                multiline
                rows={4} // 設定多行的行數
              />
            </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  )
}

export default CategoryEdit
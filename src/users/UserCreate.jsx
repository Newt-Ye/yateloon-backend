import * as React from "react"
import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  DateInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  useSimpleFormIteratorItem,
  SelectArrayInput,
  BooleanInput,
  SaveButton,
  useDataProvider,
  useNotify,
  AutocompleteInput,
  /*useTranslate*/
} from "react-admin"
import { Typography, Grid, Card, CardContent, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material"
import { useFormContext, useWatch } from "react-hook-form";
import { useState, useEffect, useCallback, useMemo} from "react";

const UserTitle = () => {
  return <span>{'新增登入者代號'}</span>;
};

export const validateForm = values => {
  const errors = {}
  if (!values.account) {
    errors.account = "ra.validation.required"
  }
  if (!values.name) {
    errors.name = "ra.validation.required"
  }
  if (!values.email) {
    errors.email = "ra.validation.required"
  }
  if (values.status === undefined) {
    errors.status = "ra.validation.required"
  }
  if (!values.companies || values.companies.length === 0) {
    errors.companies = "ra.validation.required"
  }
  if (values.password && values.password !== values.confirm_password) {
    errors.confirm_password = "resources.customers.errors.password_mismatch"
  }
  if (values.companies) {
    errors.companies = [];
  
    values.companies.forEach((item, index) => {
      if (item.company_id) { 
        if (!item.employee_code) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].employee_code = "ra.validation.required";
        }
        if (item.department_ids.length === 0) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].department_ids = "ra.validation.required";
        }
        if (item.status === null) {
          errors.companies[index] = errors.companies[index] || {}; 
          errors.companies[index].status = "ra.validation.required";
        }
      }
    });
  }
  return errors
}

export const ShortNameInput = () => {
  const { setValue, getValues } = useFormContext();

  const handleShortNameBlur = (event) => {
    const newValue = event.target.value;

    if (newValue && !getValues('name')) {
      setValue('name', newValue);
    }
  };

  return (
    <TextInput source="short_name" label="公司簡稱" onBlur={handleShortNameBlur} isRequired />
  );
}

const EffectiveDateInput = ({setReadOnly, dateReadOnly}) => {
  const { setValue } = useFormContext();

  const handleEffectiveDateChange = (newDate) => {
    if (newDate) {
      setValue('status', 0);
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  return (
    <DateInput source="effective_date" label="生效日期" onChange={(e) => handleEffectiveDateChange(e.target.value)} readOnly={dateReadOnly} />
  );
}

const CompanyReferenceInput = () => {
  const { index } = useSimpleFormIteratorItem();
  const { getValues, setValue } = useFormContext();
  const notify = useNotify();
  const companies = useWatch({ name: "companies" });
  const isDialog = companies[index]?.is_dialog || false;

  return (
    <ReferenceInput source="company_id" reference="companies">
      <SelectInput 
        optionText="name" 
        label="公司別" 
        readOnly={isDialog} 
        onChange={(e) => {
          if (e.target.value) {
            const companies = getValues('companies');

            const alreadyExists = companies.some((item, i) => item.company_id === e.target.value && index !== i);
            if (alreadyExists) {
              notify("resources.users.errors.company_already_assigned", { type: 'error' });
              setValue(`companies.${index}.company_id`, "")
            }
          }
        }} 
      />
    </ReferenceInput>
  );
};

export const EmployeeCodeInput = () => {
  const { index } = useSimpleFormIteratorItem();
  const { setError, clearErrors } = useFormContext();
  const companies = useWatch({ name: "companies" });
  const companyId = companies[index]?.company_id || undefined;
  const employeeCode = companies[index]?.employee_code || "";

  useEffect(() => {
    if (companyId && !employeeCode) {
      setError(`companies.${index}.employee_code`, { type: "required", message: "ra.validation.required" });
    } else {
      clearErrors(`companies.${index}.employee_code`)
    }
  }, [companyId, employeeCode, index, setError, clearErrors]);

  return (
    <TextInput source="employee_code" label="工號" /> 
  )
}

const DepartmentReferenceInput = () => {
  const { index } = useSimpleFormIteratorItem();
  const { setValue, setError, clearErrors } = useFormContext();
  const companies = useWatch({ name: "companies" });
  const companyId = companies[index]?.company_id || undefined;
  const departmentIds = useMemo(() => {
    return companies[index]?.department_ids || [];
  }, [companies, index]);
  const isDialog = companies[index]?.is_dialog || false;
  const [filter, setFilter] = useState({});
  const [defaultSet, setDefaultSet] = useState(false);

  useEffect(() => {
    if (companyId) {
      setFilter({ company_id: companyId });
    } else {
      setFilter({});
    }
    setValue(`companies.${index}.department_ids`, []);
  }, [companyId, index, setValue]);

  useEffect(() => {
    if (!defaultSet && companies?.[index]?.dialog_department_ids?.length > 0) {
      setValue(`companies.${index}.department_ids`, companies[index].dialog_department_ids);
      setDefaultSet(true);
    }
  }, [index, setValue, defaultSet, companies]);

  useEffect(() => {
    if (companyId && departmentIds.length === 0) {
      setError(`companies.${index}.department_ids`, { type: "required", message: "ra.validation.required" });
    } else {
      clearErrors(`companies.${index}.department_ids`)
    }
  }, [departmentIds, companyId, index, setError, clearErrors]);

  return (
    <ReferenceInput
      source="department_ids"
      reference="departments"
      filter={filter}
    >
      <SelectArrayInput optionText="name" label="隸屬部門" readOnly={!companyId || isDialog} />
    </ReferenceInput>
  );
};

export const StatusInput = () => {
  const { index } = useSimpleFormIteratorItem();
  const { setError, clearErrors } = useFormContext();
  const companies = useWatch({ name: "companies" });
  const companyId = companies[index]?.company_id || undefined;
  const status = companies[index]?.status;

  useEffect(() => {
    if (companyId && status === null) {
      setError(`companies.${index}.status`, { type: "required", message: "ra.validation.required" });
    } else {
      clearErrors(`companies.${index}.status`)
    }
  }, [companyId, status, index, setError, clearErrors]);

  return (
    <SelectInput source="status" choices={[
      { id: 1, name: '啟用' },
      { id: 0, name: '停用' },
    ]} label="狀態" />
  )
}

const CopyCompanyDialog = ({ open, handleClose }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const { setValue, getValues } = useFormContext();

  const [companyId, setCompanyId] = useState("");
  const [departmentIds, setDepartmentIds] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [filter, setFilter] = useState({});

  const fetchDepartment = useCallback(async () => {
    try {
      const { data } = await dataProvider.getMany("departments", { 
        filter: { 
          company_id: companyId,
          user_id: userId
        } 
      });
  
      if (data) {
        const defaultIds = data.map((item) => item.id)
        setValue('department_ids', defaultIds)
        setDepartmentIds(defaultIds)
      }
  
    } catch (error) {
      console.error(error);
    }
  }, [companyId, userId, dataProvider, setValue]);

  useEffect(() => {
    if (companyId) {
      setFilter({ company_id: companyId });
    } else {
      setFilter({});
    }

    if (companyId && userId) {
      fetchDepartment();
    } else {
      setValue('department_ids', [])
      setDepartmentIds([])
    }
  }, [companyId, userId, setValue, fetchDepartment]);

  const handleAddCompany = () => {
    if (!companyId || !departmentIds) return;

    const companies = getValues('companies')
      .filter((item) => item.company_id)
      .map(function(item) {
        return {
          company_id: item.company_id,
          employee_code: item.employee_code,
          department_ids: item.department_ids,
          status: item.status,
          dialog_department_ids: item.department_ids,
          is_dialog: item.is_dialog,
          source_user_id: item.source_user_id,
          employee_name: item.employee_name
        }
    })

    const alreadyExists = companies.some((item) => item.company_id === companyId);
    if (alreadyExists) {
      notify("resources.users.errors.duplicate_company_department_warning", { type: 'error' });
      return;
    }

    companies.push({
      company_id: companyId,
      employee_code: "",
      department_ids: [],
      status: 1,
      dialog_department_ids: departmentIds,
      is_dialog: true,
      source_user_id: userId,
      employee_name: userName
    })

    setValue('companies', companies)
    setValue('company_id', "");
    setValue('user_id', "");
    setValue('department_ids', []);
    
    setCompanyId("");
    setUserId("");
    setDepartmentIds([]);

    handleClose();
  };

  const handleChange = (value, record) => {
    setUserId(value)

    if (value) {
      const matchedCompany = record.companies.find(item => item.id === companyId);
      const employee_code = matchedCompany?.pivot?.employee_code || null;

      setUserName(`${employee_code} / ${record.name}`);
    } else {
      setUserName("");
    }
  };

  const optionRenderer = choice => {
    const matchedCompany = choice.companies.find(item => item.id === companyId);
    const employee_code = matchedCompany?.pivot?.employee_code || null;

    return `${employee_code} / ${choice.name}`
  }

  return (
    <Dialog 
      open={open} 
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }

        setValue('company_id', "");
        setValue('user_id', "");
        setValue('department_ids', []);
        
        setCompanyId("");
        setUserId("");
        setDepartmentIds([]);

        handleClose();
      }}
      width="sm" 
      fullWidth >
      <DialogTitle>{'選擇欲複製的公司與工號'}</DialogTitle>
      <DialogContent dividers>
          <ReferenceInput 
            source="company_id" 
            reference="companies"
          >
            <SelectInput 
              optionText="name" 
              label="公司別" 
              onChange={(e) => {
                if (e.target.value) 
                  setCompanyId(e.target.value)
                else 
                  setCompanyId("")
              }} />
          </ReferenceInput>
          <ReferenceInput 
            source="user_id" 
            reference="users" 
            filter={filter}
          >
            <AutocompleteInput 
              optionText={optionRenderer}
              label="工號 / 員工名稱"
              onChange={handleChange} 
              readOnly={!companyId}
            />
          </ReferenceInput>
          <ReferenceInput 
            source="department_ids" 
            reference="departments" 
            filter={filter}
          >
            <SelectArrayInput 
              optionText="name" 
              label="隸屬部門"
              readOnly={!companyId || !userId} />
          </ReferenceInput>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={handleAddCompany} 
          disabled={!companyId || !userId}
        >
          確定
        </Button>
        <Button 
          onClick={() => {
            setValue('company_id', "");
            setValue('user_id', "");
            setValue('department_ids', []);
            
            setCompanyId("");
            setUserId("");
            setDepartmentIds([]);

            handleClose();
          }} 
        >
          取消
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const UserCreate = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [dateReadOnly, setDateReadOnly] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatusChange = (status) => {
    if (status !== 0) {
      setDateReadOnly(true);
    } else {
      setDateReadOnly(false);
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        登入者代號
      </Typography>
      <Create title={<UserTitle/>}>
        <SimpleForm
          // Here for the GQL provider
          defaultValues={{
            account: "",
            status: 0,
            name: "",
            effective_date: "",
            password: "",
            email: "",
            companies: [
              {
                company_id: "",
                employee_code: "",
                department_ids: [],
                status: 1,
              }
            ]
          }}
          validate={validateForm}
          toolbar={false}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
            <SaveButton />
          </Box>
          <Grid container width={{ xs: "100%", xl: 1200 }} spacing={2}>
            <Grid item xs={12}>
              <BooleanInput label="超級使用者" source="is_admin" helperText={false} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput autoFocus source="account" label="登入者代號" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectInput source="status" label='使用狀態' isRequired 
                choices={[
                  { id: 0, name: '未啟用' },
                  { id: 1, name: '啟用中' }
                ]}  
                readOnly={readOnly} 
                onChange={(e) => {
                  const value = e.target.value;
                  handleStatusChange(value);
                }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput source="name" label="登入者名稱" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <EffectiveDateInput setReadOnly={setReadOnly} dateReadOnly={dateReadOnly} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInput type="email" source="email" label="電子郵件"  isRequired />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: 0 }}></Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="password" label="密碼" isRequired />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PasswordInput source="confirm_password" label="再次輸入密碼" isRequired />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Card>
                <CardContent>
                  <Box sx={{ 
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    mb: 2 }} >
                    <Typography variant="h6" gutterBottom>
                      {'公司與部門設定'}
                    </Typography>
                    <Button variant="contained" onClick={handleOpen} sx={{ ml: 5 }}>
                      {'複製其他使用者設定(權限)'}
                    </Button>
                  </Box>
                  <ArrayInput source="companies" label={false}>
                    <SimpleFormIterator inline>
                      <CompanyReferenceInput />
                      <TextInput source="employee_name" label="欲複製對象權限" readOnly/>
                      <EmployeeCodeInput />
                      <DepartmentReferenceInput />
                      <StatusInput />
                    </SimpleFormIterator>
                  </ArrayInput>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <CopyCompanyDialog open={open} handleClose={handleClose} />
        </SimpleForm>
      </Create>
    </>
  )
}

export default UserCreate
import * as React from "react"
import {
	Edit,
	useTranslate,
  /*useRecordContext*/
} from "react-admin"
import { Typography } from "@mui/material"
import { ShowActions } from "../components/ShowActions"
import { AuditFields } from "../components/AuditFields"
import ApprovalSettingFrom from './ApprovalSettingForm';

const ApprovalSettingShow = () => {
  const translate = useTranslate();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 1, color: 'black' }}>
        {translate('resources.approvalSettings.title')}
      </Typography>
      <Edit 
        actions={<ShowActions/>}
        title={false}
        redirect={false} 
        mutationMode="optimistic"
      >
        <ApprovalSettingFrom 
          formType="show"
          AuditFields={AuditFields}
        />
      </Edit>
    </>
  )
}

export default ApprovalSettingShow

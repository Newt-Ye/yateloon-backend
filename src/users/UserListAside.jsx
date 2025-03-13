import * as React from "react"
import { Card, CardContent } from "@mui/material"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MailIcon from "@mui/icons-material/MailOutline"
import LocalOfferIcon from "@mui/icons-material/LocalOfferOutlined"
import {
  FilterList,
  FilterListItem,
  FilterLiveSearch,
  SavedQueriesList
} from "react-admin"
import {
  endOfYesterday,
  startOfWeek,
  subWeeks,
  startOfMonth,
  subMonths
} from "date-fns"

const Aside = () => (
  <Card
    sx={{
      display: {
        xs: "none",
        md: "block"
      },
      order: -1,
      flex: "0 0 15em",
      mr: 2,
      mt: 6,
      alignSelf: "flex-start"
    }}
  >
    <CardContent sx={{ pt: 1 }}>
      <FilterLiveSearch hiddenLabel />
      <FilterList
        label="狀態"
        icon={<CheckCircleIcon />}
      >
        <FilterListItem
          label="ra.boolean.true"
          value={{
            status: true,
          }}
        />
        <FilterListItem
          label="ra.boolean.false"
          value={{
            status: false,
          }}
        />
      </FilterList>
    </CardContent>
  </Card>
)

export default Aside
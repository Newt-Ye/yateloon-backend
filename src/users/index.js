import UserIcon from "@mui/icons-material/AccountCircle"

import UserList from "./UserList"
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';

const resource = {
  list: UserList,
  create: UserCreate,
  edit: UserEdit,
  icon: UserIcon,
}

export default resource
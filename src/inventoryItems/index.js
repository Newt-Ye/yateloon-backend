import InventoryIcon from '@mui/icons-material/Inventory';
import InventoryItemList from './InventoryItemList';
import InventoryItemCreate from './InventoryItemCreate';
import InventoryItemEdit from './InventoryItemEdit';
import InventoryItemShow from './InventoryItemShow';
import InventoryItemClone from './InventoryItemClone';

const resource = {
  list: InventoryItemList,
  create: InventoryItemCreate,
  edit: InventoryItemEdit,
  show: InventoryItemShow,
  clone: InventoryItemClone,
  icon: InventoryIcon,
}
  
export default resource

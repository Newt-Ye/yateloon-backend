import InventoryIcon from '@mui/icons-material/Inventory';
import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';

export const menuItems = [
  {
    key: "menuInventories",
    icon: <InventoryIcon />,
    name: "庫存管理",
    items: [
      { 
        resource: "inventory-item-categories", 
        primaryText: "品號類別",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' }
        ]
      },
      { 
        resource: "inventory-items", 
        primaryText: "品號資料",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' },
          { id: 'delete', name: '刪除' }
        ]
      }
    ]
  },
  {
    key: "menuSettings",
    name: "系統設定",
    icon: <SettingsIcon />,
    items: [
      { 
        resource: "users", 
        primaryText: "登入者代號",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "companies",
        primaryText: "公司資料",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "departments", 
        primaryText: "部門權限",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' },
        ]
      },
      { 
        resource: "permissions",
        primaryText: "使用者權限",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'edit', name: '修改' }
        ]
      }
    ]
  },
  {
    key: "menuBasics",
    name: "基本設定",
    icon: <TuneIcon />,
    items: [
      { 
        resource: "settings", 
        primaryText: "共同參數設定",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "factories", 
        primaryText: "廠別資料",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "warehouses", 
        primaryText: "庫別資料",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "currencies", 
        primaryText: "幣別資料",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "currency-exchange-rates", 
        primaryText: "幣別匯率",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "payment-terms", 
        primaryText: "付款條件",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "trading-partners", 
        primaryText: "交易對象",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "trading-terms", 
        primaryText: "交易條件",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      },
      { 
        resource: "tax-codes", 
        primaryText: "稅別碼",
        permissions: [
          { id: 'view', name: '檢視' },
          { id: 'create', name: '新增' },
          { id: 'edit', name: '修改' }
        ]
      }
    ]
  }
];

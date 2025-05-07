import chineseTWMessages from 'ra-language-chinese-traditional';

const customChineseTWMessages = {
  ...chineseTWMessages,
  ra: {
    ...chineseTWMessages.ra,
    action: {
      add_filter: '新增篩選',
      add: '新增',
      back: '返回',
      bulk_actions: '已選擇 %{smart_count} 項',
      cancel: '取消',
      clear_array_input: '清除列表',
      clear_input_value: '清除值',
      clone: '克隆',
      confirm: '確認',
      create: '創建',
      create_item: '創建 %{item}',
      delete: '刪除',
      edit: '編輯',
      export: '匯出',
      list: '列表',
      refresh: '刷新',
      remove_filter: '移除此篩選',
      remove_all_filters: '移除所有篩選',
      remove: '移除',
      save: '儲存',
      search: '搜尋',
      select_all: '全選',
      select_row: '選擇這一行',
      show: '顯示',
      sort: '排序',
      undo: '撤銷',
      unselect: '取消選擇',
      expand: '展開',
      close: '關閉',
      open_menu: '打開菜單',
      close_menu: '關閉菜單',
      update: '更新',
      move_up: '上移',
      move_down: '下移',
      open: '打開',
      toggle_theme: '切換明暗模式',
      select_columns: '欄位',
      update_application: '重新加載應用程序',
      filter: "篩選",
    },
    boolean: {
      true: '是',
      false: '否',
      null: ' ',
    },
    page: {
      create: '創建 %{name}',
      dashboard: '儀表板',
      edit: '%{name} %{recordRepresentation}',
      error: '發生錯誤',
      list: '%{name}',
      loading: '加載中',
      not_found: '未找到',
      show: '%{name} %{recordRepresentation}',
      empty: '尚無資料。',
      invite: '您想要新增一個嗎？',
    },
    input: {
      file: {
        upload_several: '將一些檔案拖曳到此處上傳，或點擊以選擇一個。',
        upload_single: '將一個檔案拖曳到此處上傳，或點擊以選擇它。',
      },
      image: {
        upload_several: '將一些圖片拖曳到此處上傳，或點擊以選擇一個。',
        upload_single: '將一張圖片拖曳到此處上傳，或點擊以選擇它。',
      },
      references: {
        all_missing: '無法找到參考數據。',
        many_missing: '至少有一個關聯的參考不再可用。',
        single_missing: '關聯的參考不再可用。',
        all: "全部"
      },
      password: {
        toggle_visible: '隱藏密碼',
        toggle_hidden: '顯示密碼',
      },
    },
    message: {
      about: '關於',
      are_you_sure: '您確定嗎？',
      auth_error: '驗證令牌時發生錯誤。',
      bulk_delete_content: '您確定要刪除這個 %{name}？ |||| 您確定要刪除這 %{smart_count} 項嗎？',
      bulk_delete_title: '刪除 %{name} |||| 刪除 %{smart_count} 項 %{name}',
      bulk_update_content: '您確定要更新這個 %{name}？ |||| 您確定要更新這 %{smart_count} 項嗎？',
      bulk_update_title: '更新 %{name} |||| 更新 %{smart_count} 項 %{name}',
      clear_array_input: '您確定要清除整個列表嗎？',
      delete_content: '您確定要刪除這個項目嗎？',
      delete_title: '刪除 %{name} #%{id}',
      details: '詳細信息',
      error: '發生客戶端錯誤，您的請求無法完成。',
      invalid_form: '表單無效。請檢查錯誤。',
      loading: '請稍候',
      no: '否',
      not_found: '您輸入了錯誤的 URL，或者您跟隨了錯誤的鏈接。',
      yes: '是',
      unsaved_changes: '您的某些更改未被儲存。您確定要忽略它們嗎？',
    },
    navigation: {
      clear_filters: '清除篩選',
      no_filtered_results: '使用當前篩選未找到任何 %{resource}。',
      no_results: '未找到任何資料',
      no_more_results: '頁碼 %{page} 超出範圍。請嘗試前一頁。',
      page_out_of_boundaries: '頁碼 %{page} 超出範圍',
      page_out_from_end: '無法進入最後一頁',
      page_out_from_begin: '無法進入第 1 頁',
      page_range_info: '%{offsetBegin}-%{offsetEnd} 共 %{total}',
      partial_page_range_info: '%{offsetBegin}-%{offsetEnd} 共超過 %{offsetEnd}',
      current_page: '第 %{page} 頁',
      page: '前往第 %{page} 頁',
      first: '前往第一頁',
      last: '前往最後一頁',
      next: '前往下一頁',
      previous: '前往上一頁',
      page_rows_per_page: '每頁顯示行數：',
      skip_nav: '跳至內容',
    },
    sort: {
      sort_by: '依 %{field} %{order} 排序',
      ASC: '升序',
      DESC: '降序',
    },
    auth: {
      auth_check_error: '請登入以繼續',
      user_menu: '個人資料',
      username: '用戶名',
      password: '密碼',
      sign_in: '登入',
      sign_in_error: '身份驗證失敗，請重試',
      logout: '登出',
    },
    notification: {
      updated: '資料已更新 |||| %{smart_count} 個資料已更新',
      created: '資料已創建',
      deleted: '資料已刪除 |||| %{smart_count} 個資料已刪除',
      bad_item: '錯誤的元素',
      item_doesnt_exist: '元素不存在',
      http_error: '伺服器通信錯誤',
      data_provider_error: '數據提供者錯誤。請查看控制台以獲取詳細信息。',
      i18n_error: '無法加載指定語言的翻譯',
      canceled: '操作已取消',
      logged_out: '您的會話已結束，請重新連接。',
      not_authorized: '您無權訪問此資源。',
      application_update_available: '有新版本可用。',
      該會員已有其他LOGO設定成預設圖片: '該會員已有其他LOGO設定成預設圖片',
    },
    validation: {
      required: '必填',
      minLength: '必須至少 %{min} 個字元',
      maxLength: '必須不超過 %{max} 個字元',
      minValue: '必須至少 %{min}',
      maxValue: '必須不超過 %{max}',
      number: '必須是數字',
      email: '必須是有效的電子郵件',
      oneOf: '必須是：%{options} 之一',
      regex: '必須符合特定格式 (regexp)：%{pattern}',
      unique: '必須是唯一的',
    },
    saved_queries: {
      label: '已儲存的查詢',
      query_name: '查詢名稱',
      new_label: '儲存當前查詢...',
      new_dialog_title: '將當前查詢儲存為',
      remove_label: '移除已儲存的查詢',
      remove_label_with_name: '移除查詢 "%{name}"',
      remove_dialog_title: '移除已儲存的查詢？',
      remove_message: '您確定要從已儲存查詢列表中移除該項目嗎？',
      help: '篩選列表並將此查詢儲存以備後用',
    },
    configurable: {
      customize: '自定義',
      configureMode: '配置此頁面',
      inspector: {
          title: '檢查器',
          content: '將滑鼠懸停於應用程序 UI 元素上以進行配置',
          reset: '重設設定',
          hideAll: '隱藏所有',
          showAll: '顯示所有',
      },
      Datagrid: {
          title: '數據表格',
          unlabeled: '未標記的欄位 #%{column}',
      },
      SimpleForm: {
          title: '表單',
          unlabeled: '未標記的輸入 #%{input}',
      },
      SimpleList: {
          title: '列表',
          primaryText: '主要文本',
          secondaryText: '次要文本',
          tertiaryText: '第三文本',
      },
    },
  }, 
  pos: {
    search: "搜尋",
    configuration: "配置",
    language: "語言",
    theme: {
      name: "主題",
      light: "淺色",
      dark: "深色"
    },
    dashboard: {
      monthly_revenue: "每月收入",
      month_history: "30天收入歷史",
      new_orders: "新訂單",
      pending_reviews: "待審核評論",
      all_reviews: "查看所有評論",
      new_customers: "新客戶",
      all_customers: "查看所有客戶",
      pending_orders: "待處理訂單",
      order: {
        items:
          "來自 %{customer_name} 的一項商品 |||| 來自 %{customer_name} 的 %{nb_items} 項商品"
      },
      welcome: {
        title: "歡迎來到 react-admin 電子商務示範",
        subtitle:
          "這是虛構商店的管理後台。隨意探索和修改數據 - 它是本地的，每次重新加載時將重置。",
        ra_button: "react-admin 網站",
        demo_button: "此示範的源碼"
      }
    },
    menu: {
      sales: "銷售",
      catalog: "目錄",
      customers: "客戶"
    },
    events: {
      review: {
        title: '發布了對 "%{product}" 的評論'
      },
      order: {
        title: "訂購了 1 個商品 |||| 訂購了 %{smart_count} 個商品"
      }
    }
  },
  resources: {
    inventoryItemCategories: {
      name: "品號類別 |||| 品號類別",
      amount: "1 品號類別 |||| %{smart_count} 品號類別",
      title: "品號類別",
      list: {
        title: "品號類別列表",
        fields: {
          sorting: "序",
          code: "品號類別代碼",
          name: "品號類別名稱",
          created_at: "建立日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          code: "類別代號",
          name: "類別名稱",
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        },
      }
    },  
    inventoryItems: {
      name: "品號資料 |||| 品號資料",
      amount: "1 品號資料 |||| %{smart_count} 品號資料",
      title: "品號資料",
      list: {
        title: "品號資料列表",
        fields: {
          code: "品號",
          name: "品名",
          specification: "規格",
          inventory: "庫存數量",
          effective_date: "生效日期"
        },
        filters: {
          attribute: "品號屬性",
          warehouse: "主要庫別",
          inspection_method: "檢驗方式"
        }
      },
      detail: {
        tabs: {
          procurement: "採購生管",
          sales: "業務",
          customs: "關務",
          finance: "財務",
        },
        fields: {
          inventory_item_category: "品號類別",
          attribute: "品號屬性",
          code: "品號",
          warehouse: "主要庫別",
          name: "品名",
          specification: "規格",
          unit: "單位",
          inventory: "庫存數量",
          unit_cost: "單位成本",
          inventory_amount: "庫存金額",
          inventory_manage: "庫存管理",
          over_delivery_manage: "超交管理",
          over_receiving_manage: "超收管理",
          edit_item_name: "變更品名",
          effective_date: "生效日期",
          expiration_date: "失效日期",
          inspection_method: "檢驗方式",
          last_storage_date: "最後入庫日",
          currency: "幣別",
          latest_purchase_price: "最後進價",
          customer_code: "客戶品號",
          cost: "成本",
          unit_weight: "單體重量(kg)",
          unit_std_material_cost: "單位標準材料成本",
          unit_std_labor_cost: "單位標準人工成本",
          unit_std_manufacturing_cost: "單位標準製造費用",
          unit_std_processing_cost: "單位標準加工費用",
          total_standard_cost: "標準成本合計",
        },
        fieldGroups: {
          company_settings: "基本資料",
        },
        page: {
        },
        errors: {
        },
        validation: {
          exact_length_18: '品號長度必須為 18 碼',
          exact_length_15: '品號長度必須為 15 碼',
        }
      }
    }, 
    users: {
      name: "登入者代號 |||| 登入者代號",
      amount: "1 登入者代號 |||| %{smart_count} 登入者代號",
      title: "登入者代號",
      list: {
        title: "登入者代號列表",
        fields: {
          account: "代號",
          name: "名稱",
          companies: "可登入公司別",
          status: "使用狀態",
          created_at: "建立日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          super_user: "超級使用者",
          account: "登入者代號",
          status: "使用狀態",
          name: "登入者名稱",
          email: "電子郵件",
          password: "密碼",
          confirm_password: "再次輸入密碼",
          company: "公司別",
          employee_code: "工號",
          departments: "隸屬部門",
          company_status: "狀態",
          copy_user_permissions: "欲複製對象權限",
          user: "工號 / 員工名稱",
          effective_date: "生效日期",
          short_name: "公司簡稱"
        },
        fieldGroups: {
          company_settings: "公司與部門設定",
          companyAndIdTitle: '選擇欲複製的公司與工號'
        },
        page: {
          copy_from_user: '複製其他使用者設定(權限)',
        },
        errors: {
          duplicate_company_department_warning: "此公司與部門設定已重複加入",
          company_already_assigned: "此公司已被設定"
        }
      }
    },
    companies: {
      name: "公司資料 |||| 公司資料",
      amount: "1 公司資料 |||| %{smart_count} 公司資料",
      title: "公司資料",
      list: {
        title: "公司資料列表",
        fields: {
          code: "公司代號",
          short_name: "公司簡稱",
          status: "使用狀態",
          created_at: "建立日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          code: "代號",
          status: "使用狀態",
          name: "公司全名",
          responsible_person: "負責人",
          region_type: "所屬地區",
          phone: "電話",
          fax: "傳真",
          address: "登記地址",
          short_name: "公司簡稱",
          department_code: "部門代號",
          department_name: "部門名稱"
        },
        fieldGroups: {
          departments: "部門列表"
        },
        page: {
        },
        errors: {
        }
      }
    },    
    departments: {
      name: "部門權限 |||| 部門權限",
      amount: "1 部門權限 |||| %{smart_count} 部門權限",
      title: "部門權限",
      list: {
        title: "部門權限列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    }, 
    permissions: {
      name: "使用者權限 |||| 使用者權限",
      amount: "1 使用者權限 |||| %{smart_count} 使用者權限",
      title: "使用者權限",
      list: {
        title: "使用者權限列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    settings: {
      name: "共用參數設定 |||| 共用參數設定",
      amount: "1 共用參數設定 |||| %{smart_count} 共用參數設定",
      title: "共用參數設定",
      list: {
        title: "共用參數設定列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    }, 
    factories: {
      name: "廠別資料 |||| 廠別資料",
      amount: "1 廠別資料 |||| %{smart_count} 廠別資料",
      title: "廠別資料",
      commons: {
        fields: {
          code: "廠別代號",
          name: "廠別名稱",
          created_at: "建立日期"
        },
      },
      list: {
        title: "廠別資料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    }, 
    warehouses: {
      name: "庫別資料 |||| 庫別資料",
      amount: "1 庫別資料 |||| %{smart_count} 庫別資料",
      title: "庫別資料",
      commons: {
        fields: {
          code: "庫別代號",
          name: "庫別名稱",
          storage_type: "庫別性質",
          created_at: "建立日期"
        },
      },
      list: {
        title: "庫別資料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
          factory: "隸屬廠別",
          include_in_available_quantity: "納入可用量計算",
          allow_outbound_when_save: "納入可用量計算",
          allow_outbound_when_confirm: "納入可用量計算",
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    },  
    currencies: {
      name: "幣別資料 |||| 幣別資料",
      amount: "1 幣別資料 |||| %{smart_count} 幣別資料",
      title: "幣別資料",
      commons: {
        fields: {
          code: "幣別代碼",
          name: "幣別名稱",
          created_at: "建立日期"
        },
      },
      list: {
        title: "幣別資料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    currencyExchangeRates: {
      name: "幣別匯率 |||| 幣別匯率",
      amount: "1 幣別匯率 |||| %{smart_count} 幣別匯率",
      title: "幣別匯率",
      commons: {
        fields: {
          currency: "幣別",
          effective_date: "生效日期",
          bank_buy_rate: "銀行買進匯率",
          bank_sell_rate: "銀行賣出匯率",
          created_at: "建立日期"
        },
      },
      list: {
        title: "幣別匯率列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    common: {
      fields: {
        created_by: "建立者",
        created_at: "建立時間",
        updated_by: "修改者",
        updated_at: "修改時間",
      }
    }
  }
};

export default customChineseTWMessages;
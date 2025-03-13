import chineseMessages from "ra-language-chinese"

const customChineseMessages = {
  ...chineseMessages,
  ra: {
    ...chineseMessages.ra,
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
      no_results: '未找到任何 %{resource}',
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
      updated: '元素已更新 |||| %{smart_count} 個元素已更新',
      created: '元素已創建',
      deleted: '元素已刪除 |||| %{smart_count} 個元素已刪除',
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
    customers: {
      name: "客戶 |||| 客戶",
      fields: {
        orders: "訂單",
        first_seen: "首次見面",
        full_name: "姓名",
        groups: "分組",
        last_seen: "最後見面",
        last_seen_gte: "自此以來訪問",
        name: "姓名",
        total_spent: "總支出",
        password: "密碼",
        confirm_password: "確認密碼",
        stateAbbr: "州"
      },
      filters: {
        last_visited: "最後訪問",
        today: "今天",
        this_week: "這週",
        last_week: "上週",
        this_month: "這個月",
        last_month: "上個月",
        earlier: "早前",
        has_ordered: "已下訂單",
        has_newsletter: "訂閱了電子報",
        group: "分組"
      },
      fieldGroups: {
        identity: "基本資料",
        address: "地址",
        stats: "統計",
        history: "歷史",
        password: "密碼",
        change_password: "更改密碼"
      },
      page: {
        delete: "刪除客戶"
      },
      errors: {
        password_mismatch:
          "密碼確認與密碼不一致。"
      }
    },
    orders: {
      name: "訂單 |||| 訂單",
      amount: "1 訂單 |||| %{smart_count} 訂單",
      title: "訂單 %{reference}",
      fields: {
        basket: {
          delivery: "交付",
          reference: "參考",
          quantity: "數量",
          sum: "總和",
          tax_rate: "稅率",
          taxes: "稅金",
          total: "總計",
          unit_price: "單價"
        },
        address: "地址",
        customer_id: "客戶",
        date_gte: "自此以來",
        date_lte: "之前",
        nb_items: "項目數",
        total_gte: "最小金額",
        status: "狀態",
        returned: "已退回"
      },
      section: {
        order: "訂單",
        customer: "客戶",
        shipping_address: "配送地址",
        items: "項目",
        total: "總計"
      }
    },
    invoices: {
      name: "發票 |||| 發票",
      fields: {
        date: "發票日期",
        customer_id: "客戶",
        order_id: "訂單",
        date_gte: "自此以來",
        date_lte: "之前",
        total_gte: "最小金額",
        address: "地址"
      }
    },
    products: {
      name: "商品 |||| 商品",
      fields: {
        category_id: "類別",
        height_gte: "最小高度",
        height_lte: "最大高度",
        height: "高度",
        image: "圖片",
        price: "價格",
        reference: "參考",
        sales: "銷售",
        stock_lte: "庫存低",
        stock: "庫存",
        thumbnail: "縮略圖",
        width_gte: "最小寬度",
        width_lte: "最大寬度",
        width: "寬度"
      },
      tabs: {
        image: "圖片",
        details: "細節",
        description: "描述",
        reviews: "評論"
      },
      filters: {
        categories: "類別",
        stock: "庫存",
        no_stock: "缺貨",
        low_stock: "1 - 9 件",
        average_stock: "10 - 49 件",
        enough_stock: "50 件以上",
        sales: "銷售",
        best_sellers: "暢銷商品",
        average_sellers: "普通",
        low_sellers: "少量",
        never_sold: "從未售出"
      }
    },
    categories: {
      name: "類別 |||| 類別",
      fields: {
        products: "產品"
      }
    },
    reviews: {
      name: "評論 |||| 評論",
      amount: "1 評論 |||| %{smart_count} 評論",
      relative_to_poster: "對商品的評論",
      detail: "評論細節",
      fields: {
        customer_id: "客戶",
        order_id: "訂單",
        product_id: "產品",
        date_gte: "自此以來發佈",
        date_lte: "之前發佈",
        date: "日期",
        comment: "評論",
        rating: "評分"
      },
      action: {
        accept: "接受",
        reject: "拒絕"
      },
      notification: {
        approved_success: "評論已批准",
        approved_error: "錯誤：評論未被批准",
        rejected_success: "評論已拒絕",
        rejected_error: "錯誤：評論未被拒絕"
      }
    },
    segments: {
      name: "分組 |||| 分組",
      fields: {
        customers: "客戶",
        name: "名稱"
      },
      data: {
        compulsive: "強迫性",
        collector: "收集者",
        ordered_once: "曾經訂購",
        regular: "常規",
        returns: "退回",
        reviewer: "評論者"
      }
    },
    members: {
      errors: {
        email_exists: "電子郵件已存在",
        default_exists: "該會員已有其他 LOGO 設定成預設圖片"
      }
    }
  }
};

export default customChineseMessages;
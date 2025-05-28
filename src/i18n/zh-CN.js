import chineseMessages from '@haxqer/ra-language-chinese';

const customChineseMessages = {
  ...chineseMessages,
  ra: {
    ...chineseMessages.ra,
    action: {
      add_filter: '新增筛选',
      add: '新增',
      back: '返回',
      bulk_actions: '已选择 %{smart_count} 项',
      cancel: '取消',
      clear_array_input: '清除列表',
      clear_input_value: '清除值',
      clone: '克隆',
      confirm: '确认',
      create: '创建',
      create_item: '创建 %{item}',
      delete: '删除',
      edit: '编辑',
      export: '导出',
      list: '列表',
      refresh: '刷新',
      remove_filter: '移除此筛选',
      remove_all_filters: '移除所有筛选',
      remove: '移除',
      save: '保存',
      search: '搜索',
      select_all: '全选',
      select_row: '选择这一行',
      show: '显示',
      sort: '排序',
      undo: '撤销',
      unselect: '取消选择',
      expand: '展开',
      close: '关闭',
      open_menu: '打开菜单',
      close_menu: '关闭菜单',
      update: '更新',
      move_up: '上移',
      move_down: '下移',
      open: '打开',
      toggle_theme: '切换明暗模式',
      select_columns: '字段',
      update_application: '重新加载应用程序',
      filter: "筛选"
    },
    boolean: {
      true: '是',
      false: '否',
      null: ' ',
    },
    page: {
      create: '创建 %{name}',
      dashboard: '仪表板',
      edit: '%{name} %{recordRepresentation}',
      error: '发生错误',
      list: '%{name}',
      loading: '加载中',
      not_found: '未找到',
      show: '%{name} %{recordRepresentation}',
      empty: '尚无数据。',
      invite: '您想要新增一个吗？',
    },
    input: {
      file: {
        upload_several: '将一些文件拖曳到此处上传，或点击以选择一个。',
        upload_single: '将一个文件拖曳到此处上传，或点击以选择它。',
      },
      image: {
        upload_several: '将一些图片拖曳到此处上传，或点击以选择一个。',
        upload_single: '将一张图片拖曳到此处上传，或点击以选择它。',
      },
      references: {
        all_missing: '无法找到参考数据。',
        many_missing: '至少有一个关联的参考不再可用。',
        single_missing: '关联的参考不再可用。',
        all: "全部"
      },
      password: {
        toggle_visible: '隐藏密码',
        toggle_hidden: '显示密码',
      },
    },
    message: {
      about: '关于',
      are_you_sure: '您确定吗？',
      auth_error: '验证令牌时发生错误。',
      bulk_delete_content: '您确定要删除这个 %{name}？ |||| 您确定要删除这 %{smart_count} 项吗？',
      bulk_delete_title: '删除 %{name} |||| 删除 %{smart_count} 项 %{name}',
      bulk_update_content: '您确定要更新这个 %{name}？ |||| 您确定要更新这 %{smart_count} 项吗？',
      bulk_update_title: '更新 %{name} |||| 更新 %{smart_count} 项 %{name}',
      clear_array_input: '您确定要清除整个列表吗？',
      delete_content: '您确定要删除这个项目吗？',
      delete_title: '删除 %{name} #%{id}',
      details: '详细信息',
      error: '发生客户端错误，您的请求无法完成。',
      invalid_form: '表单无效。请检查错误。',
      loading: '请稍候',
      no: '否',
      not_found: '您输入了错误的 URL，或者您跟随了错误的链接。',
      yes: '是',
      unsaved_changes: '您的某些更改未被保存。您确定要忽略它们吗？',
    },
    navigation: {
      clear_filters: '清除筛选',
      no_filtered_results: '使用当前筛选未找到任何数据。',
      no_results: '未找到任何数据',
      no_more_results: '页码 %{page} 超出范围。请尝试前一页。',
      page_out_of_boundaries: '页码 %{page} 超出范围',
      page_out_from_end: '无法进入最后一页',
      page_out_from_begin: '无法进入第 1 页',
      page_range_info: '%{offsetBegin}-%{offsetEnd} 共 %{total}',
      partial_page_range_info: '%{offsetBegin}-%{offsetEnd} 共超过 %{offsetEnd}',
      current_page: '第 %{page} 页',
      page: '前往第 %{page} 页',
      first: '前往第一页',
      last: '前往最后一页',
      next: '前往下一页',
      previous: '前往上一页',
      page_rows_per_page: '每页显示行数：',
      skip_nav: '跳至内容',
    },
    sort: {
      sort_by: '依 %{field} %{order} 排序',
      ASC: '升序',
      DESC: '降序',
    },
    auth: {
      auth_check_error: '请登录以继续',
      user_menu: '个人资料',
      username: '用户名',
      password: '密码',
      sign_in: '登录',
      sign_in_error: '身份验证失败，请重试',
      logout: '登出',
    },
    notification: {
      updated: '资料已更新 |||| %{smart_count} 个资料已更新',
      created: '资料已创建',
      deleted: '资料已删除 |||| %{smart_count} 个资料已删除',
      bad_item: '错误的元素',
      item_doesnt_exist: '元素不存在',
      http_error: '服务器通信错误',
      data_provider_error: '数据提供者错误。请查看控制台以获取详细信息。',
      i18n_error: '无法加载指定语言的翻译',
      canceled: '操作已取消',
      logged_out: '您的会话已结束，请重新连接。',
      not_authorized: '您无权访问此资源。',
      application_update_available: '有新版本可用。',
      该会员已有其他LOGO设置成默认图片: '该会员已有其他LOGO设置成默认图片',
    },
    validation: {
      required: '必填',
      minLength: '必须至少 %{min} 个字符',
      maxLength: '必须不超过 %{max} 个字符',
      minValue: '必须至少 %{min}',
      maxValue: '必须不超过 %{max}',
      number: '必须是数字',
      email: '必须是有效的电子邮件',
      oneOf: '必须是：%{options} 之一',
      regex: '必须符合特定格式 (regexp)：%{pattern}',
      unique: '必须是唯一的',
    },
    saved_queries: {
      label: '已保存的查询',
      query_name: '查询名称',
      new_label: '保存当前查询...',
      new_dialog_title: '将当前查询保存为',
      remove_label: '移除已保存的查询',
      remove_label_with_name: '移除查询 "%{name}"',
      remove_dialog_title: '移除已保存的查询？',
      remove_message: '您确定要从已保存查询列表中移除该项目吗？',
      help: '筛选列表并将此查询保存以备后用',
    },
    configurable: {
      customize: '自定义',
      configureMode: '配置此页面',
      inspector: {
          title: '检查器',
          content: '将鼠标悬停于应用程序 UI 元素上进行配置',
          reset: '重置设置',
          hideAll: '隐藏所有',
          showAll: '显示所有',
      },
      Datagrid: {
          title: '数据表格',
          unlabeled: '未标记的字段 #%{column}',
      },
      SimpleForm: {
          title: '表单',
          unlabeled: '未标记的输入 #%{input}',
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
    search: "搜索",
    configuration: "配置",
    language: "语言",
    theme: {
      name: "主题",
      light: "浅色",
      dark: "深色"
    },
    dashboard: {
      monthly_revenue: "每月收入",
      month_history: "30天收入历史",
      new_orders: "新订单",
      pending_reviews: "待审核评论",
      all_reviews: "查看所有评论",
      new_customers: "新客户",
      all_customers: "查看所有客户",
      pending_orders: "待处理订单",
      order: {
        items:
          "来自 %{customer_name} 的一项商品 |||| 来自 %{customer_name} 的 %{nb_items} 项商品"
      },
      welcome: {
        title: "欢迎来到 react-admin 电子商务示范",
        subtitle:
          "这是虚构商店的管理后台。随意探索和修改数据 - 它是本地的，每次重新加载时将重置。",
        ra_button: "react-admin 网站",
        demo_button: "此示范的源码"
      }
    },
    menu: {
      sales: "销售",
      catalog: "目录",
      customers: "客户"
    },
    events: {
      review: {
        title: '发布了对 "%{product}" 的评论'
      },
      order: {
        title: "订购了 1 个商品 |||| 订购了 %{smart_count} 个商品"
      }
    }
  },
  resources: {
    inventoryItemCategories: {
      name: "品号类别 |||| 品号类别",
      amount: "1 品号类别 |||| %{smart_count} 品号类别",
      title: "品号类别",
      list: {
        title: "品号类别列表",
        fields: {
          sorting: "序号",
          code: "品号类别代码",
          name: "品号类别名称", 
          created_at: "创建日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          code: "类别代号",
          name: "类别名称",
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
      name: "品号资料 |||| 品号资料",
      amount: "1 品号资料 |||| %{smart_count} 品号资料",
      title: "品号资料",
      list: {
        title: "品号资料列表",
        fields: {
          code: "品号",
          name: "品名",
          specification: "规格",
          inventory: "库存数量",
          effective_date: "生效日期"
        },
        filters: {
          attribute: "品号属性",
          warehouse: "主要库别",
          inspection_method: "检验方式"
        }
      },
      detail: {
        tabs: {
          procurement: "采购生管",
          sales: "业务",
          customs: "关务",
          finance: "财务",
        },
        fields: {
          inventory_item_category: "品号类别",
          attribute: "品号属性",
          code: "品号",
          warehouse: "主要库别",
          name: "品名",
          specification: "规格",
          unit: "单位",
          inventory: "库存数量",
          unit_cost: "单位成本",
          inventory_amount: "库存金额",
          inventory_manage: "库存管理",
          over_delivery_manage: "超交管理",
          over_receiving_manage: "超收管理",
          edit_item_name: "变更品名",
          effective_date: "生效日期",
          expiration_date: "失效日期",
          inspection_method: "检验方式",
          last_storage_date: "最后入库日",
          currency: "币别",
          latest_purchase_price: "最后进价",
          customer_code: "客户品号",
          cost: "成本",
          unit_weight: "单件重量(kg)",
          unit_std_material_cost: "单位标准材料成本",
          unit_std_labor_cost: "单位标准人工成本",
          unit_std_manufacturing_cost: "单位标准制造费用",
          unit_std_processing_cost: "单位标准加工费用",
          total_standard_cost: "标准成本合计",
        },
        fieldGroups: {
          basic_info: "基本资料",
        },
        placeholders: {
          code: "15码或18码"
        },
        page: {
        },
        errors: {
        },
        validation: {
          exact_length_18: '品号长度必须为 18 码',
          exact_length_15: '品号长度必须为 15 码',
        }
      }
    }, 
    users: {
      name: "登录账号 |||| 登录账号",
      amount: "1 个登录账号 |||| %{smart_count} 个登录账号",
      title: "登录账号",
      list: {
        title: "登录账号列表",
        fields: {
          account: "账号",
          name: "姓名",
          companies: "可登录公司别",
          status: "使用状态",
          created_at: "创建日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          super_user: "超级用户",
          account: "登录账号",
          status: "使用状态", 
          name: "用户姓名",
          email: "电子邮箱",
          password: "密码",
          confirm_password: "确认密码",
          company: "公司别",
          employee_code: "工号",
          departments: "所属部门",
          company_status: "状态",
          copy_user_permissions: "需复制的权限对象",
          user: "工号 / 员工姓名",
          effective_date: "生效日期",
          expired_date: "失效日期",
          short_name: "公司简称"
        },
        fieldGroups: {
          company_settings: "公司与部门设置",
          companyAndIdTitle: '选择需复制的公司与工号'
        },
        page: {
          copy_from_user: '复制其他用户设置',
        },
        errors: {
          duplicate_company_department_warning: "此公司与部门设置已重复添加",
          company_already_assigned: "此公司已被设定",
          password_mismatch: "密码确认与密码不一致",
          min_one_company_required: "最少需设置一间公司资料"
        }
      }
    },
    companies: {
      name: "公司资料 |||| 公司资料",
      amount: "1 条公司资料 |||| %{smart_count} 条公司资料",
      title: "公司资料",
      list: {
        title: "公司资料列表",
        fields: {
          code: "公司代码",
          short_name: "公司简称", 
          status: "使用状态",
          created_at: "创建日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          code: "代码",
          status: "使用状态",
          name: "公司全称",
          responsible_person: "负责人",
          region_type: "所属地区",
          phone: "电话",
          fax: "传真",
          address: "登记地址",
          short_name: "公司简称",
          department_code: "部门代码",
          department_name: "部门名称",
          factory_code: "工厂代码",
          factory_name: "工厂名称"
        },
        fieldGroups: {
          departments: "部门列表",
          factories: "工厂列表"
        },
        page: {
        },
        errors: {
        }
      }
    },
    departments: {
      name: "部门权限 |||| 部门权限",
      amount: "1 部门权限 |||| %{smart_count} 部门权限",
      title: "部门权限",
      commons: {
        fields: {
          code: "部门代号",
          name: "部门名称",
          companies: "适用公司别",
          created_at: "创建日期"
        },
      },
      list: {
        title: "部门权限列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
          permissions: "模组权限设定"
        },
        page: {
        },
        errors: {
        }
      }
    },
    permissions: {
      name: "使用者权限 |||| 使用者权限",
      amount: "1 使用者权限 |||| %{smart_count} 使用者权限",
      title: "使用者权限",
      commons: {
        fields: {
          account: "使用者代号",
          name: "使用者名称"
        },
      },
      list: {
        title: "使用者权限列表",
        fields: {
          companies: "可登入公司别",
          updated_at: "更新日期"
        },
        filters: {
        }
      },
      detail: {
        fields: {
          employee_code: "工号",
          departments: "部门"
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
      name: "工厂资料 |||| 工厂资料",
      amount: "1 条工厂资料 |||| %{smart_count} 条工厂资料", 
      title: "工厂资料",
      commons: {
        fields: {
          code: "工厂代码",
          name: "工厂名称",
          created_at: "创建日期"
        },
      },
      list: {
        title: "工厂资料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
          warehouse_code: "仓库代码",
          warehouse_name: "仓库名称"
        },
        fieldGroups: {
          warehouse_list: "仓库列表"
        },
        page: {
        },
        errors: {
        }
      }
    },
    warehouses: {
      name: "仓库资料 |||| 仓库资料",
      amount: "1 条仓库资料 |||| %{smart_count} 条仓库资料",
      title: "仓库资料", 
      commons: {
        fields: {
          code: "仓库代码",
          name: "仓库名称",
          storage_type: "仓库类型",
          created_at: "创建日期"
        },
      },
      list: {
        title: "仓库资料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
          inventory: "存货仓",
          non_inventory: "非存货仓",
          factory: "所属工厂",
          include_in_available_quantity: "纳入可用量计算",
          allow_outbound_when_save: "保存时允许出库",
          allow_outbound_when_confirm: "确认时允许出库" 
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
      name: "币种资料 |||| 币种资料",
      amount: "1 条币种资料 |||| %{smart_count} 条币种资料",
      title: "币种资料",
      commons: {
        fields: {
          code: "币种代码",
          name: "币种名称",
          created_at: "创建日期"
        },
      },
      list: {
        title: "币种资料列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
          unit_price_precision: "单价精度",
          amount_precision: "金额精度",
          unit_cost_precision: "单位成本精度",
          total_cost_precision: "成本总金额精度",
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
      name: "币种汇率 |||| 币种汇率",
      amount: "1 条币种汇率 |||| %{smart_count} 条币种汇率",
      title: "币种汇率",
      commons: {
        fields: {
          currency: "币种",
          effective_date: "生效日期",
          bank_buy_rate: "银行买入汇率",
          bank_sell_rate: "银行卖出汇率", 
          created_at: "创建日期"
        },
      },
      list: {
        title: "币种汇率列表",
        fields: {
          daily_buy_rate: "当日买价",
          daily_sell_rate: "当日卖价",
        },
        filters: {
        }
      },
      detail: {
        fields: {
        },
        fieldGroups: {
          history: "历史汇率"
        },
        page: {
        },
        errors: {
        }
      }
    },
    paymentTerms: {
      name: "付款条件 |||| 付款条件",
      amount: "1 个付款条件 |||| %{smart_count} 个付款条件",
      title: "付款条件",
      commons: {
        fields: {
          term_type: "类别",
          code: "付款代码",
          name: "付款名称", 
          created_at: "创建日期"
        },
        choices: {
          purchase: "采购/加工用",
          sales: "销售用"
        }
      },
      list: {
        title: "付款条件列表",
        fields: {
        },
        filters: {
        }
      },
      detail: {
        fields: {
          settlement_offset_type: "结算后收现日",
          settlement_base_date: "起算日",
          after_settlement: "结算日后",
          days: "天",
          day: "日",
          months: "月",
          fixed_day: "月后逢"
        },
        fieldGroups: {
        },
        choices: {
          day: "加天数",
          month: "加月数",
          settlement_date: "结算日",
          next_month: "次月初"
        },
        page: {
        },
        errors: {
        }
      }
    },
    tradingPartners: {
      name: "交易对象 |||| 交易对象",
      amount: "1 个交易对象 |||| %{smart_count} 个交易对象",
      title: "交易对象",
      commons: {
        fields: {
          trading_partner_category: "分类方式",
          code: "代号",
          name: "名称",
          created_at: "创建日期"
        },
        choices: {
        },
      },
      list: {
        title: "交易对象列表",
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
        choices: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    tradingTerms: {
      name: "交易条件 |||| 交易条件",
      amount: "1 条交易条件 |||| %{smart_count} 条交易条件", 
      title: "交易条件",
      commons: {
        fields: {
          code: "代号",
          name: "名称",
          created_at: "创建日期"
        },
        choices: {
        },
      },
      list: {
        title: "交易条件列表",
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
        choices: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    taxCodes: {
      name: "税种编码 |||| 税种编码",
      amount: "1 个税种编码 |||| %{smart_count} 个税种编码",
      title: "税种编码",
      commons: {
        fields: {
          code: "税种代码",
          name: "税种名称",
          direction: "进/销项",
          invoice_type: "发票类型",
          tax_type: "課稅別",
          tax_rate: "营业税率",
          created_at: "创建日期"
        },
        choices: {
          input: "进项",
          output: "销项",
          no_invoice: "无发票",
          two_part: "两联式",
          three_part: "三联式",
          special: "专用发票",
          tax_included: "应税内含",
          tax_excluded: "应税外加",
          zero_rate: "零税率",
          exempted: "免税",
          non_taxable: "非应税"
        },
      },
      list: {
        title: "税种编码列表",
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
        choices: {
        },
        page: {
        },
        errors: {
        }
      }
    },
    common: {
      fields: {
        created_by: "创建人",
        created_at: "创建时间", 
        updated_by: "修改人",
        updated_at: "修改时间"
      }
    }
  }
};

export default customChineseMessages;
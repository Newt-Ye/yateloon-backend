import axios from 'axios';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import zhTW from './i18n/zh-TW';
// import zhCN from './i18n/zh-CN';

// const i18nProvider = polyglotI18nProvider(locale => 
//   locale === 'zh-cn' ? zhCN : zhTW ,
//   'zh-tw', // Default locale
//   [
//       { locale: 'zh-tw', name: '繁體中文' },
//       { locale: 'zh-cn', name: '簡體中文' }
//   ],
// );

const authProvider = {
  login: ({ account, password, company_id }) => {
    return axios.post(
          `${process.env.REACT_APP_API_URL}/auth/login`, 
          { account, password, company_id },
          {
            headers: {
              'Accept': 'application/json'
            }
          }
        )
        .then(response => {
          const data = response.data;
          var expiresAt = new Date(data.expires_at);

          localStorage.setItem('auth_token', data.access_token);
          localStorage.setItem('auth_expires_at', expiresAt.getTime());
          localStorage.setItem('identity', JSON.stringify(data.user));
          localStorage.setItem('permissions', JSON.stringify(data.permissions));
          localStorage.setItem('companies', JSON.stringify(data.companies));
          localStorage.setItem('current_company', JSON.stringify(data.current_company));
          // localStorage.setItem('current_region_type', JSON.stringify(data.current_region_type));
          localStorage.setItem('super_user', data.user.super_user ? '1' : '0');
          
          // // 判斷要使用的語系
          // const locale = data.current_region_type.startsWith('china')
          //   ? 'zh-cn'
          //   : 'zh-tw';
          // // 更新語系
          // i18nProvider.changeLocale(locale);
        })
        .catch(error => {
          throw new Error(error.response.data.message || 'Login failed'); 
        });
  },
  logout: async () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_expires_at")
    localStorage.removeItem("identity")
    localStorage.removeItem("permissions")
    localStorage.removeItem("companies")
    localStorage.removeItem("current_company")
    localStorage.removeItem("super_user")

    return Promise.resolve()
  },
  checkError: async ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_expires_at")
      localStorage.removeItem("identity")
      localStorage.removeItem("permissions")
      localStorage.removeItem("companies")
      localStorage.removeItem("current_company")
      localStorage.removeItem("super_user")


      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },
  checkAuth: async () => {
    const authToken = localStorage.getItem("auth_token");
    if (!authToken) {
      return Promise.reject()
    }
    if (isTokenExpired()) {
      localStorage.removeItem("auth_token")
      localStorage.removeItem("auth_expires_at")
      localStorage.removeItem("identity")
      localStorage.removeItem("permissions")
      localStorage.removeItem("companies")
      localStorage.removeItem("current_company")
      localStorage.removeItem("super_user")


      return Promise.reject({ redirectTo: "/login" });
    }
    return Promise.resolve();
  },
  getPermissions: () => {
    const isSuperuser = localStorage.getItem('super_user') === '1';
    if (isSuperuser) {
      return Promise.resolve('superuser');
    }
    const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
    const currentCompany = localStorage.getItem('current_company');
    return Promise.resolve(permissions[currentCompany] || {});
  },
  getIdentity: () => {
    const identity = localStorage.getItem('identity');
    if (identity) {
      const user = JSON.parse(identity);
      return Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: user.avatar || ''
      })
    }
  }
}

// 檢查Token過期狀況
const isTokenExpired = () => {
  const expiresAt = localStorage.getItem("auth_expires_at");
  return expiresAt ? Date.now() >= parseInt(expiresAt) : true;
};

export default authProvider

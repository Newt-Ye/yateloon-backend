import polyglotI18nProvider from 'ra-i18n-polyglot';
import { 
  Admin,
  Resource,
  localStorageStore,
  StoreContextProvider,
  defaultTheme,
} from "react-admin";
import customDataProviderFactory from "./customDataProvider";
import authProviderFactory from './authProvider';
import inventoryItemCategories from './inventoryItemCategories';
import inventoryItems from './inventoryItems';
import companies from './companies';
import departments from './departments';
import users from './users';
import permissions from './permissions';
import settings from './settings';
import factories from './factories';
import warehouses from './warehouses';
import currencies from './currencies';
import { Layout, Login } from "./layout"
import en from './i18n/en';
import zhTW from './i18n/zh-TW';
import { useState, useEffect } from "react";

const i18nProvider = polyglotI18nProvider(locale => 
  locale === 'zh-tw' ? zhTW : en,
  'zh-tw', // Default locale
  [
      { locale: 'en', name: 'English' },
      { locale: 'zh-tw', name: '繁體中文' }
  ],
);

const store = localStorageStore(undefined, "ECommerce")

const AppWrapper = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [authProvider, setAuthProvider] = useState(null);
  const [accesses, setAccesses] = useState(null);

  useEffect(() => {
    fetch("/frontend-yateloon/config.json")
      .then(res => res.json())
      .then(async (config) => {
        const apiUrl = config.REACT_APP_API_URL;
        const provider = customDataProviderFactory(apiUrl);
        const auth = authProviderFactory(apiUrl);
        const access = await auth.getPermissions();

        setDataProvider(provider);
        setAuthProvider(auth);
        setAccesses(access);
      });
  }, []);

  if (!dataProvider || !authProvider || !accesses) return null;

  return (
    <StoreContextProvider value={store}>
      <Admin
        title=""
        store={store}
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={Login}
        i18nProvider={i18nProvider}
        layout={Layout}
        defaultTheme={defaultTheme}
        dashboard={() => <div></div>}
      >
        <Resource name="inventory-item-categories" {...inventoryItemCategories} />
        <Resource name="inventory-items" {...inventoryItems} />
        <Resource name="companies" {...companies} />
        <Resource name="users" {...users} />
        <Resource name="departments" {...departments} />
        <Resource name="permissions" {...permissions} />
        <Resource name="settings" {...settings} />
        <Resource name="factories" {...factories} />
        <Resource name="warehouses" {...warehouses} />
        <Resource name="currencies" {...currencies} />
      </Admin>
    </StoreContextProvider>
  )
}

export { AppWrapper as App };

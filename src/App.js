import polyglotI18nProvider from 'ra-i18n-polyglot';
import { 
  Admin,
  Resource,
  localStorageStore,
  StoreContextProvider,
  defaultTheme,
} from "react-admin";
import customDataProvider from "./customDataProvider";
import authProvider from './authProvider';
import inventoryItemCategories from './inventoryItemCategories';
import inventoryItems from './inventoryItems';
import companies from './companies';
import departments from './departments';
import users from './users';
import permissions from './permissions';
import settings from './settings';
import factories from './factories';
import warehouses from './warehouses';
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

const App = () => {
  const [accesses, setAccesses] = useState(null);

  useEffect(() => {
    authProvider.getPermissions().then(setAccesses);
  }, []);

  if (!accesses) return null

  return (
    <Admin
      title=""
      store={store}
      dataProvider={customDataProvider}
      authProvider={authProvider}
      loginPage={Login}
      i18nProvider={i18nProvider}
      layout={Layout}
      defaultTheme={defaultTheme}
      dashboard={() => <div></div>}
    >
      {/* {(accesses === 'superuser' || accesses?.["inventory-item-categories"]?.view) && (
        <Resource
          name="inventory-item-categories"
          list={
            accesses === 'superuser' || accesses?.["inventory-item-categories"]?.view
              ? inventoryItemCategories.list
              : null
          }
          create={
            accesses === 'superuser' || accesses?.["inventory-item-categories"]?.create
              ? inventoryItemCategories.create
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["inventory-item-categories"]?.edit
              ? inventoryItemCategories.edit
              : null
          }
          show={
            accesses === 'superuser' || accesses?.["inventory-item-categories"]?.view
              ? inventoryItemCategories.show
              : null
          }
        />
      )}
      {(accesses === 'superuser' || accesses?.["inventory-items"]?.view) && (
        <Resource
          name="inventory-items"
          list={
            accesses === 'superuser' || accesses?.["inventory-items"]?.view
              ? inventoryItems.list
              : null
          }
          create={
            accesses === 'superuser' || accesses?.["inventory-items"]?.create
              ? inventoryItems.create
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["inventory-items"]?.edit
              ? inventoryItems.edit
              : null
          }
        />
      )}
      {(accesses === 'superuser' || accesses?.["companies"]?.view) && (
        <Resource
          name="companies"
          list={
            accesses === 'superuser' || accesses?.["companies"]?.view
              ? companies.list
              : null
          }
          create={
            accesses === 'superuser' || accesses?.["companies"]?.create
              ? companies.create
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["companies"]?.edit
              ? companies.edit
              : null
          }
          show={
            accesses === 'superuser' || accesses?.["companies"]?.view
              ? companies.show
              : null
          }
        />
      )}
      {(accesses === 'superuser' || accesses?.["users"]?.view) && (
        <Resource
          name="users"
          list={
            accesses === 'superuser' || accesses?.["users"]?.view
              ? users.list
              : null
          }
          create={
            accesses === 'superuser' || accesses?.["users"]?.create
              ? users.create
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["users"]?.edit
              ? users.edit
              : null
          }
        />
      )}
      {(accesses === 'superuser' || accesses?.["departments"]?.view) && (
        <Resource
          name="departments"
          list={
            accesses === 'superuser' || accesses?.["departments"]?.view
              ? departments.list
              : null
          }
          create={
            accesses === 'superuser' || accesses?.["departments"]?.create
              ? departments.create
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["departments"]?.edit
              ? departments.edit
              : null
          }
          show={
            accesses === 'superuser' || accesses?.["departments"]?.view
              ? departments.show
              : null
          }
        />
      )}
      {(accesses === 'superuser' || accesses?.["permissions"]?.view) && (
        <Resource
          name="permissions"
          list={
            accesses === 'superuser' || accesses?.["permissions"]?.view
              ? permissions.list
              : null
          }
          edit={
            accesses === 'superuser' || accesses?.["permissions"]?.edit
              ? permissions.edit
              : null
          }
        />
      )} */}
      <Resource name="inventory-item-categories" {...inventoryItemCategories} />
      <Resource name="inventory-items" {...inventoryItems} />
      <Resource name="companies" {...companies} />
      <Resource name="users" {...users} />
      <Resource name="departments" {...departments} />
      <Resource name="permissions" {...permissions} />
      <Resource name="settings" {...settings} />
      <Resource name="factories" {...factories} />
      <Resource name="warehouses" {...warehouses} />
    </Admin>
  )
}

const AppWrapper = () => (
  <StoreContextProvider value={store}>
    <App />
  </StoreContextProvider>
)

export { AppWrapper as App };
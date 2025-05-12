import { useEffect, useState } from "react";
import {
  Admin,
  Resource,
  localStorageStore,
  StoreContextProvider,
  defaultTheme,
} from "react-admin";
import customDataProviderFactory from "./customDataProvider"; // 改成 factory function
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
import currencies from './currencies';
import currencyExchangeRates from './currencyExchangeRates';
import paymentTerms from './paymentTerms';
import tradingPartners from './tradingPartners';
import tradingTerms from './tradingTerms';
import i18nProvider from './i18n';
import { Layout, Login } from "./layout";

const store = localStorageStore(undefined, "ECommerce");

const AppWrapper = () => {
  const [dataProvider, setDataProvider] = useState(null);
  const [accesses, setAccesses] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("/config.json").then(res => res.json()),
      authProvider.getPermissions()
    ]).then(([config, access]) => {
      const apiUrl = config.REACT_APP_API_URL;
      const provider = customDataProviderFactory(apiUrl);
      setDataProvider(provider);
      setAccesses(access);
    });
  }, []);

  if (!dataProvider || !accesses) return null;

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
        <Resource name="currency-exchange-rates" {...currencyExchangeRates} />
        <Resource name="payment-terms" {...paymentTerms} />
        <Resource name="trading-partners" {...tradingPartners} />
        <Resource name="trading-terms" {...tradingTerms} />
      </Admin>
    </StoreContextProvider>
  );
};

export { AppWrapper as App };

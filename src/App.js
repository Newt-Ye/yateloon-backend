import polyglotI18nProvider from 'ra-i18n-polyglot';
import { 
  Admin,
  Resource,
  localStorageStore,
  StoreContextProvider,
  defaultTheme
} from "react-admin";
import customDataProvider from "./customDataProvider";
import authProvider from './authProvider';
import inventoryItemCategories from './inventoryItemCategories';
import { Layout, Login } from "./layout"
import en from './i18n/en';
import zhTW from './i18n/zh-TW';

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
    >
      <Resource name="inventory-item-categories" {...inventoryItemCategories} />
    </Admin>
  )
}

const AppWrapper = () => (
  <StoreContextProvider value={store}>
    <App />
  </StoreContextProvider>
)

export { AppWrapper as App };
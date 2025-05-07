import polyglotI18nProvider from 'ra-i18n-polyglot'
import zhTW from './zh-TW';
import zhCN from './zh-CN';

const messages = {
  'zh-tw': zhTW,
  'zh-cn': zhCN,
};

const getLocale = () => localStorage.getItem('locale') || 'zh-tw';

const i18nProvider = polyglotI18nProvider(
  locale => messages[locale],
  getLocale()
);

export default i18nProvider;
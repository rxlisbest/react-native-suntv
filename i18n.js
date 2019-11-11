import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import zh from './language/zh'
import en from './language/en'

i18n.fallbacks = true;
i18n.translations = { zh, en };
i18n.locale = Localization.locale;
// i18n.locale = 'zh';

export default i18n
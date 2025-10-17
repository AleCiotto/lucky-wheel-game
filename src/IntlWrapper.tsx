import { IntlProvider } from "react-intl";
import { useLanguage } from "./contexts/LanguageContext";
import { enLanguage, itLanguage } from "./translations";

const LOCALE_BY_LANG: Record<string, string> = {
    en: "en-GB",
    it: "it-IT",
};

const MESSAGES_BY_LANG: Record<string, Record<string, string>> = {
    en: enLanguage,
    it: itLanguage,
};

export default function IntlWrapper({ children }: { children: React.ReactNode }) {
    const { lang } = useLanguage();
    const locale = LOCALE_BY_LANG[lang] ?? LOCALE_BY_LANG.en;
    const messages = MESSAGES_BY_LANG[lang] ?? MESSAGES_BY_LANG.en;

    return (
        <IntlProvider locale={locale} messages={messages}>
            {children}
        </IntlProvider>
    );
}

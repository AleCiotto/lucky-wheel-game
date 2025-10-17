import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export type LangCode = "en" | "it";

export const SUPPORTED_LANGUAGES: { code: LangCode; label: string }[] = [
    { code: "en", label: "English" },
    { code: "it", label: "Italiano" },
];

type LanguageContextValue = {
    lang: LangCode;
    setLang: (l: LangCode) => void;
    list: { code: LangCode; label: string }[];
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const detectDefault = (): LangCode => {
        const stored = localStorage.getItem("app_lang") as LangCode | null;
        if (stored && SUPPORTED_LANGUAGES.some(s => s.code === stored)) return stored;
        const nav = navigator.language?.slice(0, 2);
        return nav === "it" ? "it" : "en";
    };

    const [lang, setLangState] = useState<LangCode>(detectDefault);

    useEffect(() => {
        localStorage.setItem("app_lang", lang);
    }, [lang]);

    const value = useMemo(
        () => ({
            lang,
            setLang: (l: LangCode) => setLangState(l),
            list: SUPPORTED_LANGUAGES,
        }),
        [lang]
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}

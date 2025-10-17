import { useLanguage } from "@contexts/LanguageContext";

const LanguageSelector = ({ className }: { className?: string }) => {
    const { lang, setLang, list } = useLanguage();

    return (
        <select
            className={className}
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            aria-label="Select language"
        >
            {list.map((l) => (
                <option key={l.code} value={l.code}>
                    {l.label}
                </option>
            ))}
        </select>
    );
}

export default LanguageSelector;

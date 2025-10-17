import { Theme, useTheme } from "@src/contexts/ThemeContext";
import { useForm } from "react-hook-form";
import "./theme-switcher.scss";

type ThemeSwitcherForm = {
    theme: Theme;
}

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const methods = useForm<ThemeSwitcherForm>({ defaultValues: { theme: theme ?? "light" } });
    const { handleSubmit, register } = methods;

    const onSubmit = (formData: ThemeSwitcherForm) => {
        setTheme(formData.theme);
    }

    return (
        <form onChange={handleSubmit(onSubmit)} className="flex">
            <input type="radio" {...register("theme")} id="theme-switcher-light" className="sr-only" value="light" />
            <label htmlFor="theme-switcher-light" className={`opacity-50 dark:opacity-100 dark:z-5 border-2 border-black bg-white h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700`}>
                <span className="sr-only">Toggle light theme</span>
                <LightSvg />
            </label>
            <input type="radio" {...register("theme")} id="theme-switcher-dark" className="sr-only" value="dark" />
            <label htmlFor="theme-switcher-dark" className="-ml-6 opacity-100 z-5 dark:opacity-50 dark:z-0 border-2 border-black bg-white h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="sr-only">Toggle dark theme</span>
                <DarkSvg />
            </label>
        </form>
    );
}

const LightSvg = () => (
    <svg className="fill-yellow-500" fill="currentColor" viewBox="0 0 20 20">
        <path
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            fillRule="evenodd" clipRule="evenodd"></path>
    </svg>
);

const DarkSvg = () => (
    <svg className="fill-indigo-700" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
    </svg>
);

export default ThemeSwitcher;

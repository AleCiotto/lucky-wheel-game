import { PropsWithChildren } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import SkipToMainContent from "./components/skip-to-main-content/SkipToMainContent";
import { useTheme } from "./contexts/ThemeContext";

type PageLayoutProps = PropsWithChildren

const PageLayout = ({ children }: PageLayoutProps) => {
    const { theme } = useTheme();

    return (
        <div className="page-layout grow-1 flex flex-col" data-theme={theme}>
            <SkipToMainContent />
            <Header />
            <main id="main-content" className="grow-1">
                {children}
            </main>
            <Footer />
        </div>
    )
};

export default PageLayout;

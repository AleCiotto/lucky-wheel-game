import { PropsWithChildren } from "react";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

type PageLayoutProps = PropsWithChildren

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="page-layout">
            <Header />
            {children}
            <Footer />
        </div>
    )
};

export default PageLayout;

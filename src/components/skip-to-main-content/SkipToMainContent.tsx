import { FormattedMessage } from "react-intl";

const SkipToMainContent = () => {
    return (
        <a
            href="#main-content"
            type="button"
            className="w-full block text-center border-black sr-only focus:not-sr-only!"
        >
            <FormattedMessage id="skip_to_main_content" />
        </a>
    )
}

export default SkipToMainContent;

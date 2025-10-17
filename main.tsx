import App from './src/App'
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './src/contexts/LanguageContext';
import IntlWrapper from './src/IntlWrapper'

import './style.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <LanguageProvider>
    <IntlWrapper>
      <App />
    </IntlWrapper>
  </LanguageProvider>
);

import './style.css';

import ReactDOM from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import { enLanguage } from './src/translations';

// translations

// App Container
import App from './src/App'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <IntlProvider locale={'en-GB'} messages={enLanguage}>
    <App />
  </IntlProvider>
);

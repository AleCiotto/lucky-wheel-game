import './styles/main.scss'
import AppRouter from './AppRouter'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return <ThemeProvider><AppRouter /></ThemeProvider>
}

export default App

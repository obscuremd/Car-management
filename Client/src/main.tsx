import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GeneralProvider } from './Providers/GeneralProvider.tsx'
import { ApiProvider } from './Providers/ApiProvider.tsx'
import axios from 'axios'

axios.defaults.withCredentials = true;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneralProvider>
      <ApiProvider>
        <App />
      </ApiProvider>
    </GeneralProvider>
  </StrictMode>,
)

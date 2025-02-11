import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GeneralProvider } from './Providers/GeneralProvider.tsx'
import { ApiProvider } from './Providers/ApiProvider.tsx'
import axios from 'axios'
import { ClerkProvider } from '@clerk/clerk-react'
import { app } from './services/firebaseconfig.ts'

console.log('Firebase app initialized:', app);

axios.defaults.withCredentials = true;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GeneralProvider>
        <ApiProvider>
          <App />
        </ApiProvider>
      </GeneralProvider>
    </ClerkProvider>
  </StrictMode>,
)

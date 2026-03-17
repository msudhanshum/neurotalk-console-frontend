import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/bootstrap.min.css'
import './assets/css/theme.min.css'
import { ChevronRight } from "react-feather";
import '@fortawesome/fontawesome-free/css/all.min.css'

// import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

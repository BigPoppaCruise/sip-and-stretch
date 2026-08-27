import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SipAndStretch from './sip-and-stretch'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SipAndStretch />
  </StrictMode>
)
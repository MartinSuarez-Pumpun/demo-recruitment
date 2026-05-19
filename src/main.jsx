import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RecruitmentPlugin from './plugin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecruitmentPlugin onComplete={(r) => console.log('onComplete', r)} />
  </StrictMode>
)

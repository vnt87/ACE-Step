import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Shell } from '@/components/layout'
import CreatePage from '@/pages/CreatePage'
import LibraryPage from '@/pages/LibraryPage'
import SettingsPage from '@/pages/SettingsPage'

import '@/i18n'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<CreatePage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

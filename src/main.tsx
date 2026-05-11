import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import i18n from './i18n'
import App from './App.tsx'
import { DataProvider } from './context/DataContext'

function syncDocumentLang(lng: string) {
  const base = lng.replace('_', '-').split('-')[0]?.toLowerCase() ?? 'en'
  const allowed = new Set(['en', 'ar', 'fr', 'uk', 'sw', 'ne', 'rw'])
  document.documentElement.lang = allowed.has(base) ? base : 'en'
}

syncDocumentLang(i18n.language)
i18n.on('languageChanged', syncDocumentLang)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </StrictMode>,
)

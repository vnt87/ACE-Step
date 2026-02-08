import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'
type Language = 'en' | 'vi'

interface SettingsState {
    theme: Theme
    language: Language
    setTheme: (theme: Theme) => void
    setLanguage: (language: Language) => void
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set) => ({
            theme: 'dark',
            language: 'en',
            setTheme: (theme) => {
                set({ theme })
                applyTheme(theme)
            },
            setLanguage: (language) => {
                set({ language })
                localStorage.setItem('language', language)
            },
        }),
        {
            name: 'ace-step-settings',
            onRehydrateStorage: () => (state) => {
                if (state) {
                    applyTheme(state.theme)
                }
            },
        }
    )
)

function applyTheme(theme: Theme) {
    const root = document.documentElement

    if (theme === 'system') {
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.classList.toggle('dark', systemDark)
    } else {
        root.classList.toggle('dark', theme === 'dark')
    }
}

// Initialize theme on load
const savedTheme = localStorage.getItem('ace-step-settings')
if (savedTheme) {
    try {
        const { state } = JSON.parse(savedTheme)
        if (state?.theme) {
            applyTheme(state.theme)
        }
    } catch {
        applyTheme('dark')
    }
} else {
    applyTheme('dark')
}

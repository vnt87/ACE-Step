import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Music, Library, Settings, Sun, Moon, Languages } from 'lucide-react'
import { useSettingsStore } from '@/stores/settings'
import { cn } from '@/lib/utils'
import i18n from '@/i18n'

export function Sidebar() {
    const { t } = useTranslation()
    const { theme, setTheme, language, setLanguage } = useSettingsStore()

    const navItems = [
        { to: '/', icon: Music, label: t('common.create') },
        { to: '/library', icon: Library, label: t('common.library') },
        { to: '/settings', icon: Settings, label: t('common.settings') },
    ]

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'vi' : 'en'
        setLanguage(newLang)
        i18n.changeLanguage(newLang)
    }

    return (
        <aside className="flex h-full w-16 flex-col items-center border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] py-4 lg:w-56">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-2 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
                    <Music className="h-5 w-5 text-white" />
                </div>
                <span className="hidden text-lg font-bold lg:block">ACE-Step</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 px-2 lg:px-3">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-[hsl(var(--muted))]',
                                'lg:w-full',
                                isActive && 'bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
                            )
                        }
                    >
                        <item.icon className="h-5 w-5 shrink-0" />
                        <span className="hidden lg:block">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Bottom controls */}
            <div className="flex flex-col gap-2 px-2 lg:px-3">
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-[hsl(var(--muted))] lg:w-full"
                    title={t('common.language')}
                >
                    <Languages className="h-5 w-5 shrink-0" />
                    <span className="hidden text-xs uppercase lg:block">{language}</span>
                </button>
                <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-[hsl(var(--muted))] lg:w-full"
                    title={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5 shrink-0" />
                    ) : (
                        <Moon className="h-5 w-5 shrink-0" />
                    )}
                    <span className="hidden lg:block">
                        {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
                    </span>
                </button>
            </div>
        </aside>
    )
}

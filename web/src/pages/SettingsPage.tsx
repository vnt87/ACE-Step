import { useTranslation } from 'react-i18next'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useSettingsStore } from '@/stores/settings'
import { Heading, Subheading } from '@/components/heading'
import { Divider } from '@/components/divider'
import { Text } from '@/components/text'
import i18n from '@/i18n'

export default function SettingsPage() {
    const { t } = useTranslation()
    const { theme, setTheme, language, setLanguage } = useSettingsStore()

    const themes = [
        { id: 'light', icon: Sun, label: 'settings.lightMode' },
        { id: 'dark', icon: Moon, label: 'settings.darkMode' },
        { id: 'system', icon: Monitor, label: 'settings.systemMode' },
    ] as const

    const languages = [
        { id: 'en', label: 'English', flag: '🇺🇸' },
        { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    ] as const

    const handleLanguageChange = (lang: 'en' | 'vi') => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
    }

    return (
        <div className="space-y-8">
            <Heading>{t('settings.title')}</Heading>

            {/* Theme Section */}
            <div>
                <Subheading>{t('settings.theme')}</Subheading>
                <Text className="mt-1 text-zinc-500">{t('settings.themeDescription')}</Text>
                <div className="mt-4 grid grid-cols-3 gap-3">
                    {themes.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setTheme(id)}
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${theme === id
                                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-950'
                                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                                }`}
                        >
                            <Icon className={`h-6 w-6 ${theme === id ? 'text-violet-500' : 'text-zinc-500'}`} />
                            <span className={`text-sm font-medium ${theme === id ? 'text-violet-700 dark:text-violet-300' : ''}`}>
                                {t(label)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <Divider />

            {/* Language Section */}
            <div>
                <Subheading>{t('settings.language')}</Subheading>
                <Text className="mt-1 text-zinc-500">{t('settings.languageDescription')}</Text>
                <div className="mt-4 grid grid-cols-2 gap-3">
                    {languages.map(({ id, label, flag }) => (
                        <button
                            key={id}
                            onClick={() => handleLanguageChange(id)}
                            className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${language === id
                                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-950'
                                    : 'border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600'
                                }`}
                        >
                            <span className="text-2xl">{flag}</span>
                            <span className={`font-medium ${language === id ? 'text-violet-700 dark:text-violet-300' : ''}`}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <Divider />

            {/* About Section */}
            <div>
                <Subheading>{t('settings.about')}</Subheading>
                <div className="mt-4 rounded-xl border border-zinc-200 p-4 dark:border-zinc-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500">
                            <span className="text-xl font-bold text-white">A</span>
                        </div>
                        <div>
                            <Text className="font-semibold">ACE-Step Web</Text>
                            <Text className="text-sm text-zinc-500">{t('settings.version')} 1.0.0</Text>
                        </div>
                    </div>
                    <Text className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                        A modern web interface for ACE-Step, an open-source AI music generation model.
                    </Text>
                </div>
            </div>
        </div>
    )
}

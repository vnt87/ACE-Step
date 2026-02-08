import { useTranslation } from 'react-i18next'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useSettingsStore } from '@/stores/settings'
import { cn } from '@/lib/utils'
import i18n from '@/i18n'

export default function SettingsPage() {
    const { t } = useTranslation()
    const { theme, setTheme, language, setLanguage } = useSettingsStore()

    const handleLanguageChange = (lang: 'en' | 'vi') => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
    }

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="mb-8 text-3xl font-bold">{t('common.settings')}</h1>

            <div className="space-y-8">
                {/* Theme Section */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <button
                            onClick={() => setTheme('light')}
                            className={cn(
                                'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                theme === 'light'
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                            )}
                        >
                            <Sun className="h-6 w-6" />
                            <span className="text-sm font-medium">{t('common.lightMode')}</span>
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={cn(
                                'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                theme === 'dark'
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                            )}
                        >
                            <Moon className="h-6 w-6" />
                            <span className="text-sm font-medium">{t('common.darkMode')}</span>
                        </button>
                        <button
                            onClick={() => setTheme('system')}
                            className={cn(
                                'flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all',
                                theme === 'system'
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                            )}
                        >
                            <Monitor className="h-6 w-6" />
                            <span className="text-sm font-medium">System</span>
                        </button>
                    </div>
                </section>

                {/* Language Section */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold">{t('common.language')}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={cn(
                                'flex items-center gap-3 rounded-lg border-2 p-4 transition-all',
                                language === 'en'
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                            )}
                        >
                            <span className="text-2xl">🇺🇸</span>
                            <div className="text-left">
                                <p className="font-medium">English</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">English (US)</p>
                            </div>
                        </button>
                        <button
                            onClick={() => handleLanguageChange('vi')}
                            className={cn(
                                'flex items-center gap-3 rounded-lg border-2 p-4 transition-all',
                                language === 'vi'
                                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)]'
                                    : 'border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'
                            )}
                        >
                            <span className="text-2xl">🇻🇳</span>
                            <div className="text-left">
                                <p className="font-medium">Tiếng Việt</p>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">Vietnamese</p>
                            </div>
                        </button>
                    </div>
                </section>

                {/* About Section */}
                <section>
                    <h2 className="mb-4 text-lg font-semibold">About</h2>
                    <div className="rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4">
                        <h3 className="font-medium">ACE-Step</h3>
                        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                            A Step Towards Music Generation Foundation Model
                        </p>
                        <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                            Apache 2.0 License • ACE Studio & StepFun AI
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}

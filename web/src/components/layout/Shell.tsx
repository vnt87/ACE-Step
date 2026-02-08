import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Music, FolderOpen, Cog, Moon, Sun, Languages } from 'lucide-react'
import { SidebarLayout } from '@/components/sidebar-layout'
import {
    Sidebar,
    SidebarHeader,
    SidebarBody,
    SidebarFooter,
    SidebarSection,
    SidebarItem,
    SidebarLabel,
    SidebarSpacer,
} from '@/components/sidebar'
import { Navbar, NavbarSpacer, NavbarItem } from '@/components/navbar'
import { useSettingsStore } from '@/stores/settings'
import { AudioPlayer } from '@/components/audio/AudioPlayer'
import i18n from '@/i18n'

function AppSidebar() {
    const { t } = useTranslation()
    const location = useLocation()
    const { theme, setTheme, language, setLanguage } = useSettingsStore()

    const navItems = [
        { href: '/', icon: Music, label: t('common.create') },
        { href: '/library', icon: FolderOpen, label: t('common.library') },
        { href: '/settings', icon: Cog, label: t('common.settings') },
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
        <Sidebar>
            <SidebarHeader>
                <SidebarItem href="/">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-pink-500">
                        <Music data-slot="icon" className="h-4 w-4 text-white" />
                    </div>
                    <SidebarLabel className="text-lg font-bold">ACE-Step</SidebarLabel>
                </SidebarItem>
            </SidebarHeader>

            <SidebarBody>
                <SidebarSection>
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            current={location.pathname === item.href}
                        >
                            <item.icon data-slot="icon" />
                            <SidebarLabel>{item.label}</SidebarLabel>
                        </SidebarItem>
                    ))}
                </SidebarSection>

                <SidebarSpacer />
            </SidebarBody>

            <SidebarFooter>
                <SidebarSection>
                    <SidebarItem onClick={toggleLanguage}>
                        <Languages data-slot="icon" />
                        <SidebarLabel className="uppercase">{language}</SidebarLabel>
                    </SidebarItem>
                    <SidebarItem onClick={toggleTheme}>
                        {theme === 'dark' ? (
                            <Sun data-slot="icon" />
                        ) : (
                            <Moon data-slot="icon" />
                        )}
                        <SidebarLabel>
                            {theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
                        </SidebarLabel>
                    </SidebarItem>
                </SidebarSection>
            </SidebarFooter>
        </Sidebar>
    )
}

function AppNavbar() {
    return (
        <Navbar>
            <NavbarSpacer />
            <NavbarItem href="/settings">
                <Cog data-slot="icon" />
            </NavbarItem>
        </Navbar>
    )
}

export function Shell() {
    return (
        <div className="relative h-screen">
            {/* Main layout - full height */}
            <SidebarLayout navbar={<AppNavbar />} sidebar={<AppSidebar />}>
                {/* Content area with bottom padding for player */}
                <div className="pb-20">
                    <Outlet />
                </div>
            </SidebarLayout>

            {/* Audio player - fixed at bottom, overlaid on top of content */}
            <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
                <div className="pointer-events-auto lg:ml-64">
                    <AudioPlayer />
                </div>
            </div>
        </div>
    )
}

import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { AudioPlayer } from '@/components/audio/AudioPlayer'

export function Shell() {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[hsl(var(--background))]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Page content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>

                {/* Audio player bar */}
                <AudioPlayer />
            </div>
        </div>
    )
}

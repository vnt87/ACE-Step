import { useTranslation } from 'react-i18next'
import { Search, Play, RotateCcw, Pencil, Download, ArrowDownUp } from 'lucide-react'
import { useState } from 'react'
import { usePlayerStore, type Track } from '@/stores/player'
import { formatDuration, formatDate } from '@/lib/utils'

// Mock data - will be replaced with API calls
const MOCK_TRACKS: Track[] = [
    {
        id: '1',
        title: 'Pop Song Demo',
        prompt: 'pop, synth, drums, guitar, 120 bpm, upbeat, catchy',
        lyrics: '[verse]\nHello world...',
        audioPath: '/outputs/demo1.wav',
        duration: 180,
        createdAt: new Date().toISOString(),
        params: {},
    },
]

export default function LibraryPage() {
    const { t } = useTranslation()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
    const { setCurrentTrack, setIsPlaying } = usePlayerStore()

    const handlePlay = (track: Track) => {
        setCurrentTrack(track)
        setIsPlaying(true)
    }

    const filteredTracks = MOCK_TRACKS.filter(
        (track) =>
            track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{t('library.title')}</h1>
            </div>

            {/* Search and filters */}
            <div className="mb-6 flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t('library.search')}
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] py-2 pl-10 pr-4 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none"
                    />
                </div>
                <button
                    onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                    className="flex items-center gap-2 rounded-lg border border-[hsl(var(--border))] px-4 py-2 text-sm transition-colors hover:bg-[hsl(var(--muted))]"
                >
                    <ArrowDownUp className="h-4 w-4" />
                    {sortOrder === 'newest' ? t('library.sortNewest') : t('library.sortOldest')}
                </button>
            </div>

            {/* Track list */}
            {filteredTracks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[hsl(var(--border))] py-16">
                    <p className="text-[hsl(var(--muted-foreground))]">{t('library.noResults')}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredTracks.map((track) => (
                        <div
                            key={track.id}
                            className="group flex items-center gap-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 transition-all hover:border-[hsl(var(--primary)/0.5)]"
                        >
                            {/* Thumbnail / Play button */}
                            <button
                                onClick={() => handlePlay(track)}
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] transition-transform hover:scale-105"
                            >
                                <Play className="h-6 w-6 text-white" />
                            </button>

                            {/* Track info */}
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-medium">{track.title || 'Untitled'}</h3>
                                <p className="truncate text-sm text-[hsl(var(--muted-foreground))]">
                                    {track.prompt}
                                </p>
                                <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
                                    {formatDuration(track.duration)} • {formatDate(track.createdAt)}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                <button
                                    className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--muted))]"
                                    title={t('library.retake')}
                                >
                                    <RotateCcw className="h-4 w-4" />
                                </button>
                                <button
                                    className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--muted))]"
                                    title={t('library.edit')}
                                >
                                    <Pencil className="h-4 w-4" />
                                </button>
                                <button
                                    className="rounded-lg p-2 transition-colors hover:bg-[hsl(var(--muted))]"
                                    title={t('common.download')}
                                >
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

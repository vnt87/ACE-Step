import { useTranslation } from 'react-i18next'
import { Search, Play, RotateCcw, Pencil, Download, ArrowDownUp } from 'lucide-react'
import { useState } from 'react'
import { usePlayerStore, type Track } from '@/stores/player'
import { formatDuration, formatDate } from '@/lib/utils'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Button } from '@/components/button'
import { Badge } from '@/components/badge'

// Mock data - will be replaced with API calls
const MOCK_TRACKS: Track[] = [
    {
        id: '1',
        title: 'Summer Vibes',
        prompt: 'upbeat pop, summer, happy, acoustic guitar',
        lyrics: '',
        duration: 180,
        createdAt: new Date().toISOString(),
        audioPath: '/outputs/1.wav',
        params: {},
    },
    {
        id: '2',
        title: 'Night Drive',
        prompt: 'synthwave, retrowave, 80s, driving, night',
        lyrics: '',
        duration: 240,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        audioPath: '/outputs/2.wav',
        params: {},
    },
    {
        id: '3',
        title: 'Peaceful Morning',
        prompt: 'lo-fi, chill, relaxing, piano, ambient',
        lyrics: '',
        duration: 120,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        audioPath: '/outputs/3.wav',
        params: {},
    },
]

type SortOption = 'newest' | 'oldest' | 'longest' | 'shortest'

export default function LibraryPage() {
    const { t } = useTranslation()
    const { setCurrentTrack, setIsPlaying } = usePlayerStore()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState<SortOption>('newest')

    const filteredTracks = MOCK_TRACKS.filter(
        (track) =>
            track.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            track.prompt?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const sortedTracks = [...filteredTracks].sort((a, b) => {
        switch (sortBy) {
            case 'oldest':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            case 'longest':
                return b.duration - a.duration
            case 'shortest':
                return a.duration - b.duration
            default:
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
    })

    const handlePlay = (track: Track) => {
        setCurrentTrack(track)
        setIsPlaying(true)
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Heading>{t('library.title')}</Heading>
                <Badge color="zinc">{MOCK_TRACKS.length} {t('library.tracks')}</Badge>
            </div>

            {/* Search and Sort */}
            <div className="flex items-center gap-4">
                <InputGroup className="flex-1">
                    <Search data-slot="icon" className="size-4" />
                    <Input
                        type="search"
                        placeholder={t('library.search')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </InputGroup>
                <Button
                    plain
                    onClick={() => {
                        const options: SortOption[] = ['newest', 'oldest', 'longest', 'shortest']
                        const currentIndex = options.indexOf(sortBy)
                        setSortBy(options[(currentIndex + 1) % options.length])
                    }}
                >
                    <ArrowDownUp data-slot="icon" />
                    {t(`library.${sortBy}`)}
                </Button>
            </div>

            {/* Track List */}
            {sortedTracks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-zinc-500">
                    <p>{t('library.empty')}</p>
                </div>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {sortedTracks.map((track) => (
                        <div
                            key={track.id}
                            className="group rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-violet-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-violet-600"
                        >
                            {/* Track Thumbnail */}
                            <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-violet-500 to-pink-500">
                                <button
                                    onClick={() => handlePlay(track)}
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                    <Play className="h-12 w-12 fill-white text-white" />
                                </button>
                            </div>

                            {/* Track Info */}
                            <h3 className="truncate font-semibold">{track.title || 'Untitled'}</h3>
                            <p className="mt-1 truncate text-sm text-zinc-500 dark:text-zinc-400">
                                {track.prompt}
                            </p>
                            <div className="mt-2 flex items-center justify-between text-xs text-zinc-400">
                                <span>{formatDuration(track.duration)}</span>
                                <span>{formatDate(track.createdAt)}</span>
                            </div>

                            {/* Actions */}
                            <div className="mt-3 flex items-center gap-1">
                                <Button plain onClick={() => handlePlay(track)} className="flex-1">
                                    <Play data-slot="icon" className="size-4" />
                                </Button>
                                <Button plain className="flex-1">
                                    <RotateCcw data-slot="icon" className="size-4" />
                                </Button>
                                <Button plain className="flex-1">
                                    <Pencil data-slot="icon" className="size-4" />
                                </Button>
                                <Button plain className="flex-1">
                                    <Download data-slot="icon" className="size-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

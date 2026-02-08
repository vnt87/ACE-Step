import { useRef, useEffect } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import { usePlayerStore } from '@/stores/player'
import { formatDuration } from '@/lib/utils'

export function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const {
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        setIsPlaying,
        setProgress,
        setDuration,
        setVolume,
        togglePlay,
    } = usePlayerStore()

    useEffect(() => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.play()
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying, currentTrack])

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume
        }
    }, [volume])

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setProgress(audioRef.current.currentTime)
        }
    }

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration)
        }
    }

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = parseFloat(e.target.value)
        if (audioRef.current) {
            audioRef.current.currentTime = time
        }
        setProgress(time)
    }

    const handleEnded = () => {
        setIsPlaying(false)
        setProgress(0)
    }

    if (!currentTrack) {
        return (
            <div className="flex h-20 items-center justify-center border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4">
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    No track playing
                </p>
            </div>
        )
    }

    return (
        <div className="flex h-20 items-center gap-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4">
            {currentTrack.audioPath && (
                <audio
                    ref={audioRef}
                    src={`/api/outputs/${currentTrack.id}/audio`}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                />
            )}

            {/* Track info */}
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))]">
                    <Play className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                    <p className="truncate font-medium">{currentTrack.title || 'Untitled'}</p>
                    <p className="truncate text-sm text-[hsl(var(--muted-foreground))]">
                        {currentTrack.prompt?.slice(0, 50)}...
                    </p>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                    <button className="rounded-full p-1.5 transition-colors hover:bg-[hsl(var(--muted))]">
                        <SkipBack className="h-4 w-4" />
                    </button>
                    <button
                        onClick={togglePlay}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-white transition-transform hover:scale-105"
                    >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button className="rounded-full p-1.5 transition-colors hover:bg-[hsl(var(--muted))]">
                        <SkipForward className="h-4 w-4" />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="flex w-64 items-center gap-2">
                    <span className="w-10 text-xs text-[hsl(var(--muted-foreground))]">
                        {formatDuration(progress)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={progress}
                        onChange={handleSeek}
                        className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-[hsl(var(--muted))] accent-[hsl(var(--primary))]"
                    />
                    <span className="w-10 text-xs text-[hsl(var(--muted-foreground))]">
                        {formatDuration(duration)}
                    </span>
                </div>
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setVolume(volume > 0 ? 0 : 1)}
                    className="rounded-full p-1.5 transition-colors hover:bg-[hsl(var(--muted))]"
                >
                    {volume > 0 ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                </button>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.1}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-[hsl(var(--muted))] accent-[hsl(var(--primary))]"
                />
            </div>
        </div>
    )
}

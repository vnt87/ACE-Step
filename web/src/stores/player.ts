import { create } from 'zustand'

export interface Track {
    id: string
    title: string
    prompt: string
    lyrics: string
    audioPath: string
    duration: number
    createdAt: string
    params: Record<string, unknown>
}

interface PlayerState {
    currentTrack: Track | null
    isPlaying: boolean
    progress: number
    duration: number
    volume: number
    setCurrentTrack: (track: Track | null) => void
    setIsPlaying: (playing: boolean) => void
    setProgress: (progress: number) => void
    setDuration: (duration: number) => void
    setVolume: (volume: number) => void
    togglePlay: () => void
}

export const usePlayerStore = create<PlayerState>((set) => ({
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    volume: 1,
    setCurrentTrack: (track) => set({ currentTrack: track, progress: 0 }),
    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setProgress: (progress) => set({ progress }),
    setDuration: (duration) => set({ duration }),
    setVolume: (volume) => set({ volume }),
    togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))

import { create } from 'zustand'

export interface GenerationParams {
    format: string
    audioDuration: number
    prompt: string
    lyrics: string
    inferStep: number
    guidanceScale: number
    schedulerType: 'euler' | 'heun' | 'pingpong'
    cfgType: 'cfg' | 'apg' | 'cfg_star'
    omegaScale: number
    manualSeeds: string
    guidanceInterval: number
    guidanceIntervalDecay: number
    minGuidanceScale: number
    useErgTag: boolean
    useErgLyric: boolean
    useErgDiffusion: boolean
    ossSteps: string
    guidanceScaleText: number
    guidanceScaleLyric: number
    audio2audioEnable: boolean
    refAudioStrength: number
    refAudioPath: string | null
    loraNameOrPath: string
    loraWeight: number
}

interface GenerationState {
    params: GenerationParams
    isGenerating: boolean
    progress: number
    error: string | null
    setParams: (params: Partial<GenerationParams>) => void
    resetParams: () => void
    setIsGenerating: (generating: boolean) => void
    setProgress: (progress: number) => void
    setError: (error: string | null) => void
}

const defaultParams: GenerationParams = {
    format: 'wav',
    audioDuration: -1,
    prompt: '',
    lyrics: '',
    inferStep: 60,
    guidanceScale: 15.0,
    schedulerType: 'euler',
    cfgType: 'apg',
    omegaScale: 10.0,
    manualSeeds: '',
    guidanceInterval: 0.5,
    guidanceIntervalDecay: 0.0,
    minGuidanceScale: 3.0,
    useErgTag: true,
    useErgLyric: false,
    useErgDiffusion: true,
    ossSteps: '',
    guidanceScaleText: 0.0,
    guidanceScaleLyric: 0.0,
    audio2audioEnable: false,
    refAudioStrength: 0.5,
    refAudioPath: null,
    loraNameOrPath: 'none',
    loraWeight: 1.0,
}

export const useGenerationStore = create<GenerationState>((set) => ({
    params: { ...defaultParams },
    isGenerating: false,
    progress: 0,
    error: null,
    setParams: (newParams) =>
        set((state) => ({
            params: { ...state.params, ...newParams },
        })),
    resetParams: () => set({ params: { ...defaultParams } }),
    setIsGenerating: (generating) => set({ isGenerating: generating }),
    setProgress: (progress) => set({ progress }),
    setError: (error) => set({ error }),
}))

// Genre presets matching the original Gradio UI
export const GENRE_PRESETS: Record<string, string> = {
    'Modern Pop': 'pop, synth, drums, guitar, 120 bpm, upbeat, catchy, vibrant, female vocals, polished vocals',
    'Rock': 'rock, electric guitar, drums, bass, 130 bpm, energetic, rebellious, gritty, male vocals, raw vocals',
    'Hip Hop': 'hip hop, 808 bass, hi-hats, synth, 90 bpm, bold, urban, intense, male vocals, rhythmic vocals',
    'Country': 'country, acoustic guitar, steel guitar, fiddle, 100 bpm, heartfelt, rustic, warm, male vocals, twangy vocals',
    'EDM': 'edm, synth, bass, kick drum, 128 bpm, euphoric, pulsating, energetic, instrumental',
    'Reggae': 'reggae, guitar, bass, drums, 80 bpm, chill, soulful, positive, male vocals, smooth vocals',
    'Classical': 'classical, orchestral, strings, piano, 60 bpm, elegant, emotive, timeless, instrumental',
    'Jazz': 'jazz, saxophone, piano, double bass, 110 bpm, smooth, improvisational, soulful, male vocals, crooning vocals',
    'Metal': 'metal, electric guitar, double kick drum, bass, 160 bpm, aggressive, intense, heavy, male vocals, screamed vocals',
    'R&B': 'r&b, synth, bass, drums, 85 bpm, sultry, groovy, romantic, female vocals, silky vocals',
}

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, ChevronDown, ChevronUp, Upload } from 'lucide-react'
import { useGenerationStore, GENRE_PRESETS } from '@/stores/generation'
import { cn } from '@/lib/utils'

export default function CreatePage() {
    const { t } = useTranslation()
    const { params, setParams, isGenerating } = useGenerationStore()
    const [showAdvanced, setShowAdvanced] = useState(false)
    const [selectedPreset, setSelectedPreset] = useState<string>('Custom')

    const handlePresetChange = (preset: string) => {
        setSelectedPreset(preset)
        if (preset !== 'Custom' && GENRE_PRESETS[preset]) {
            setParams({ prompt: GENRE_PRESETS[preset] })
        }
    }

    const handleGenerate = async () => {
        // TODO: Implement API call
        console.log('Generating with params:', params)
    }

    return (
        <div className="mx-auto max-w-4xl p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold">{t('create.title')}</h1>
            </div>

            {/* Main form */}
            <div className="space-y-6">
                {/* Genre Preset */}
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Genre Preset
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {['Custom', ...Object.keys(GENRE_PRESETS)].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => handlePresetChange(preset)}
                                className={cn(
                                    'rounded-full px-4 py-1.5 text-sm font-medium transition-all',
                                    selectedPreset === preset
                                        ? 'bg-[hsl(var(--primary))] text-white'
                                        : 'bg-[hsl(var(--muted))] hover:bg-[hsl(var(--muted)/0.8)]'
                                )}
                            >
                                {t(`create.presets.${preset.toLowerCase().replace(/\s+/g, '')}`) || preset}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tags/Prompt Input */}
                <div>
                    <label htmlFor="prompt" className="mb-2 block text-sm font-medium">
                        {t('create.tagsLabel')}
                    </label>
                    <textarea
                        id="prompt"
                        rows={3}
                        value={params.prompt}
                        onChange={(e) => setParams({ prompt: e.target.value })}
                        placeholder={t('create.tagsPlaceholder')}
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-3 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)]"
                    />
                </div>

                {/* Lyrics Input */}
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <label htmlFor="lyrics" className="text-sm font-medium">
                            {t('create.lyricsLabel')}
                        </label>
                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={params.lyrics === ''}
                                onChange={(e) => setParams({ lyrics: e.target.checked ? '' : '' })}
                                className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
                            />
                            {t('create.instrumental')}
                        </label>
                    </div>
                    <div className="mb-2 flex gap-2">
                        {['[verse]', '[chorus]', '[bridge]', '[intro]', '[outro]'].map((tag) => (
                            <button
                                key={tag}
                                onClick={() =>
                                    setParams({ lyrics: params.lyrics + (params.lyrics ? '\n' : '') + tag + '\n' })
                                }
                                className="rounded bg-[hsl(var(--muted))] px-2 py-1 text-xs font-medium hover:bg-[hsl(var(--muted)/0.8)]"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                    <textarea
                        id="lyrics"
                        rows={8}
                        value={params.lyrics}
                        onChange={(e) => setParams({ lyrics: e.target.value })}
                        placeholder={t('create.lyricsPlaceholder')}
                        className="w-full rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-3 font-mono text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.2)]"
                    />
                </div>

                {/* Duration */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="duration" className="mb-2 block text-sm font-medium">
                            {t('create.duration')}
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                id="duration"
                                type="number"
                                min={-1}
                                max={240}
                                value={params.audioDuration}
                                onChange={(e) => setParams({ audioDuration: parseFloat(e.target.value) })}
                                className="w-24 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm focus:border-[hsl(var(--primary))] focus:outline-none"
                            />
                            <span className="text-sm text-[hsl(var(--muted-foreground))]">
                                {params.audioDuration === -1 ? t('create.durationRandom') : 'seconds'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Audio2Audio */}
                <div className="rounded-lg border border-[hsl(var(--border))] p-4">
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={params.audio2audioEnable}
                            onChange={(e) => setParams({ audio2audioEnable: e.target.checked })}
                            className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
                        />
                        <span className="font-medium">{t('create.audio2audio')}</span>
                    </label>
                    {params.audio2audioEnable && (
                        <div className="mt-4 space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="flex-1 cursor-pointer rounded-lg border-2 border-dashed border-[hsl(var(--border))] p-4 text-center transition-colors hover:border-[hsl(var(--primary))]">
                                    <Upload className="mx-auto mb-2 h-6 w-6 text-[hsl(var(--muted-foreground))]" />
                                    <span className="text-sm">{t('create.uploadAudio')}</span>
                                    <input type="file" accept="audio/*" className="hidden" />
                                </label>
                            </div>
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    {t('create.referenceStrength')}: {params.refAudioStrength}
                                </label>
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={params.refAudioStrength}
                                    onChange={(e) => setParams({ refAudioStrength: parseFloat(e.target.value) })}
                                    className="w-full accent-[hsl(var(--primary))]"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Advanced Settings Accordion */}
                <div className="rounded-lg border border-[hsl(var(--border))]">
                    <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="flex w-full items-center justify-between p-4 text-left font-medium"
                    >
                        {t('create.advancedSettings')}
                        {showAdvanced ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </button>
                    {showAdvanced && (
                        <div className="border-t border-[hsl(var(--border))] p-4">
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                                <div>
                                    <label className="mb-1 block text-xs font-medium">
                                        {t('create.inferenceSteps')}
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={200}
                                        value={params.inferStep}
                                        onChange={(e) => setParams({ inferStep: parseInt(e.target.value) })}
                                        className="w-full rounded border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium">
                                        {t('create.guidanceScale')}
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={30}
                                        step={0.5}
                                        value={params.guidanceScale}
                                        onChange={(e) => setParams({ guidanceScale: parseFloat(e.target.value) })}
                                        className="w-full rounded border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium">
                                        {t('create.scheduler')}
                                    </label>
                                    <select
                                        value={params.schedulerType}
                                        onChange={(e) =>
                                            setParams({ schedulerType: e.target.value as 'euler' | 'heun' | 'pingpong' })
                                        }
                                        className="w-full rounded border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm"
                                    >
                                        <option value="euler">Euler</option>
                                        <option value="heun">Heun</option>
                                        <option value="pingpong">PingPong</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium">
                                        {t('create.seed')}
                                    </label>
                                    <input
                                        type="text"
                                        value={params.manualSeeds}
                                        onChange={(e) => setParams({ manualSeeds: e.target.value })}
                                        placeholder={t('create.seedPlaceholder')}
                                        className="w-full rounded border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-xs font-medium">
                                        {t('create.loraModel')}
                                    </label>
                                    <select
                                        value={params.loraNameOrPath}
                                        onChange={(e) => setParams({ loraNameOrPath: e.target.value })}
                                        className="w-full rounded border border-[hsl(var(--border))] bg-[hsl(var(--input))] p-2 text-sm"
                                    >
                                        <option value="none">None</option>
                                        <option value="ACE-Step/ACE-Step-v1-chinese-rap-LoRA">Chinese Rap LoRA</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !params.prompt}
                    className={cn(
                        'flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-semibold text-white transition-all',
                        isGenerating || !params.prompt
                            ? 'cursor-not-allowed bg-[hsl(var(--muted))]'
                            : 'bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90'
                    )}
                >
                    <Sparkles className="h-5 w-5" />
                    {isGenerating ? t('create.generating') : t('common.create')}
                </button>
            </div>
        </div>
    )
}

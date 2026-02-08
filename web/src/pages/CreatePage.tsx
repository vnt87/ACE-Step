import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sparkles, ChevronDown, ChevronUp, Upload } from 'lucide-react'
import { useGenerationStore, GENRE_PRESETS } from '@/stores/generation'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Textarea } from '@/components/textarea'
import { Select } from '@/components/select'
import { Field, Label, Description } from '@/components/fieldset'
import { Badge } from '@/components/badge'
import { Heading, Subheading } from '@/components/heading'
import { Divider } from '@/components/divider'
import { Switch, SwitchField } from '@/components/switch'

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
        <div className="space-y-8">
            <Heading>{t('create.title')}</Heading>

            {/* Genre Presets */}
            <div>
                <Subheading>Genre Preset</Subheading>
                <div className="mt-3 flex flex-wrap gap-2">
                    {['Custom', ...Object.keys(GENRE_PRESETS)].map((preset) => (
                        <Badge
                            key={preset}
                            color={selectedPreset === preset ? 'violet' : 'zinc'}
                            className="cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handlePresetChange(preset)}
                        >
                            {preset}
                        </Badge>
                    ))}
                </div>
            </div>

            <Divider />

            {/* Tags/Prompt */}
            <Field>
                <Label>{t('create.tagsLabel')}</Label>
                <Description>Describe the style, mood, instruments, and tempo</Description>
                <Textarea
                    rows={3}
                    value={params.prompt}
                    onChange={(e) => setParams({ prompt: e.target.value })}
                    placeholder={t('create.tagsPlaceholder')}
                />
            </Field>

            {/* Lyrics */}
            <Field>
                <Label>{t('create.lyricsLabel')}</Label>
                <Description>Use structure tags to organize your lyrics</Description>
                <div className="mt-2 mb-3 flex gap-2">
                    {['[verse]', '[chorus]', '[bridge]', '[intro]', '[outro]'].map((tag) => (
                        <Badge
                            key={tag}
                            color="zinc"
                            className="cursor-pointer"
                            onClick={() =>
                                setParams({ lyrics: params.lyrics + (params.lyrics ? '\n' : '') + tag + '\n' })
                            }
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
                <Textarea
                    rows={8}
                    value={params.lyrics}
                    onChange={(e) => setParams({ lyrics: e.target.value })}
                    placeholder={t('create.lyricsPlaceholder')}
                    className="font-mono"
                />
            </Field>

            <Divider />

            {/* Duration */}
            <div className="grid grid-cols-2 gap-6">
                <Field>
                    <Label>{t('create.duration')}</Label>
                    <Description>
                        {params.audioDuration === -1 ? t('create.durationRandom') : `${params.audioDuration}s`}
                    </Description>
                    <Input
                        type="number"
                        min={-1}
                        max={240}
                        value={params.audioDuration}
                        onChange={(e) => setParams({ audioDuration: parseFloat(e.target.value) })}
                    />
                </Field>
            </div>

            {/* Audio2Audio Toggle */}
            <SwitchField>
                <Label>{t('create.audio2audio')}</Label>
                <Description>Use a reference audio to guide generation</Description>
                <Switch
                    checked={params.audio2audioEnable}
                    onChange={(checked) => setParams({ audio2audioEnable: checked })}
                    color="violet"
                />
            </SwitchField>

            {params.audio2audioEnable && (
                <div className="ml-4 space-y-4 border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
                    <Field>
                        <Label>{t('create.uploadAudio')}</Label>
                        <div className="mt-2 flex items-center gap-4">
                            <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-zinc-300 p-4 transition-colors hover:border-violet-500 dark:border-zinc-600">
                                <Upload className="h-5 w-5 text-zinc-400" />
                                <span className="text-sm text-zinc-500">Drop audio file here</span>
                                <input type="file" accept="audio/*" className="hidden" />
                            </label>
                        </div>
                    </Field>
                    <Field>
                        <Label>{t('create.referenceStrength')}: {params.refAudioStrength}</Label>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            value={params.refAudioStrength}
                            onChange={(e) => setParams({ refAudioStrength: parseFloat(e.target.value) })}
                            className="mt-2 w-full accent-violet-500"
                        />
                    </Field>
                </div>
            )}

            <Divider />

            {/* Advanced Settings Accordion */}
            <div>
                <button
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="flex w-full items-center justify-between text-left"
                >
                    <Subheading>{t('create.advancedSettings')}</Subheading>
                    {showAdvanced ? (
                        <ChevronUp className="h-5 w-5 text-zinc-400" />
                    ) : (
                        <ChevronDown className="h-5 w-5 text-zinc-400" />
                    )}
                </button>

                {showAdvanced && (
                    <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3">
                        <Field>
                            <Label>{t('create.inferenceSteps')}</Label>
                            <Input
                                type="number"
                                min={1}
                                max={200}
                                value={params.inferStep}
                                onChange={(e) => setParams({ inferStep: parseInt(e.target.value) })}
                            />
                        </Field>
                        <Field>
                            <Label>{t('create.guidanceScale')}</Label>
                            <Input
                                type="number"
                                min={1}
                                max={30}
                                step={0.5}
                                value={params.guidanceScale}
                                onChange={(e) => setParams({ guidanceScale: parseFloat(e.target.value) })}
                            />
                        </Field>
                        <Field>
                            <Label>{t('create.scheduler')}</Label>
                            <Select
                                value={params.schedulerType}
                                onChange={(e) =>
                                    setParams({ schedulerType: e.target.value as 'euler' | 'heun' | 'pingpong' })
                                }
                            >
                                <option value="euler">Euler</option>
                                <option value="heun">Heun</option>
                                <option value="pingpong">PingPong</option>
                            </Select>
                        </Field>
                        <Field>
                            <Label>{t('create.seed')}</Label>
                            <Input
                                type="text"
                                value={params.manualSeeds}
                                onChange={(e) => setParams({ manualSeeds: e.target.value })}
                                placeholder={t('create.seedPlaceholder')}
                            />
                        </Field>
                        <Field>
                            <Label>{t('create.loraModel')}</Label>
                            <Select
                                value={params.loraNameOrPath}
                                onChange={(e) => setParams({ loraNameOrPath: e.target.value })}
                            >
                                <option value="none">None</option>
                                <option value="ACE-Step/ACE-Step-v1-chinese-rap-LoRA">Chinese Rap LoRA</option>
                            </Select>
                        </Field>
                    </div>
                )}
            </div>

            <Divider />

            {/* Generate Button */}
            <Button
                color="violet"
                onClick={handleGenerate}
                disabled={isGenerating || !params.prompt}
                className="w-full py-3"
            >
                <Sparkles data-slot="icon" />
                {isGenerating ? t('create.generating') : t('common.create')}
            </Button>
        </div>
    )
}

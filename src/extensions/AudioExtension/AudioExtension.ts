import { Module } from '@src/Module';
import { Events, IEventData, IInstance, Subtitle, AudioLang } from '@src/types';
import { applyStyle, insertAfter } from '@src/utils/dom';

interface ITrackTiming {
    start: number;
    end: number;
    text: string;
}

interface ITrackTimingCache {
    [key: string]: ITrackTiming[];
}

export class AudioExtension extends Module {
    public name: string = 'AudioExtension';

    private timingsCache: ITrackTimingCache = {};

    private timings: ITrackTiming[] = null;

    private activeTiming: ITrackTiming = null;

    private currentTimeMs: number = 0;

    private text: HTMLSpanElement;

    constructor(instance: IInstance) {
        super(instance);

        this.instance.on(Events.PLAYER_STATE_TIMEUPDATE, this.onTimeUpdate);

        this.instance.on(Events.DIMENSIONS_CHANGE, this.onDimensionsChange);
    }

    public async setAudioLangauge(audio: AudioLang) {
        // const subtitle =
        //   this.instance.config.subtitles.find(
        //     subtitle => subtitle.srclang === srclang,
        //   ) || null;

        this.emit(Events.STATE_AUDIOLANGUAGE_CHANGE, {
            audio,
        });

        // if (!audio) {
        //   this.setActiveTimings(null);
        // } else {
        //   if (!audio) {
        //     this.setActiveTimings(null);
        //     return;
        //   }
        // }
    }

    public setOffset(offset: number) {
        applyStyle(this.text, {
            transform: `translateY(-${offset}px)`,
        });
    }

    private onTimeUpdate = data => {
        this.currentTimeMs = data.currentTime * 1000;

        if (this.timings) {
            this.selectActiveTiming();
        }
    };

    private onDimensionsChange = data => {
        const FONT_SIZE_PERCENT: number = 0.05;
        let fontSize = Math.round(data.height * FONT_SIZE_PERCENT * 100) / 100;

        if (fontSize > 45) {
            fontSize = 45;
        } else if (fontSize < 15) {
            fontSize = 15;
        }

        applyStyle(this.text, {
            fontSize: `${fontSize}px`,
        });
    };

    private selectActiveTiming() {
        let activeTiming: ITrackTiming = null;

        if (this.timings) {
            const timing = this.timings.find(
                track =>
                    this.currentTimeMs >= track.start && this.currentTimeMs < track.end,
            );

            if (timing) {
                activeTiming = timing;
            }
        }

        if (activeTiming !== this.activeTiming) {
            this.activeTiming = activeTiming;

            const text = this.activeTiming ? this.activeTiming.text : null;

            this.text.innerHTML = text ? text : '';
            this.text.style.display = text ? 'inline-block' : 'none';

            this.emit(Events.PLAYER_STATE_SUBTITLETEXTCHANGE, {
                text,
            });
        }
    }

    private setActiveTimings(timings: ITrackTiming[]) {
        this.timings = timings;
        this.selectActiveTiming();
    }
}

import { PlayerError } from '@src/PlayerError';
import { IThumbnail, ITrack, Subtitle } from '@src/types';

export interface IData {
  heading : string,
  subHeading : string,
  paused: boolean;
  view: ViewTypes;
  visibleControls: boolean;
  progressPercentage: number;
  bufferedPercentage: number;
  volumeBarPercentage: number;
  isVolumeControlsOpen: boolean;
  isFullscreen: boolean;
  fullscreenSupported: boolean;
  playRequested: boolean;
  adBreakData?: {
    progressPercentage: number;
  };
  cuePoints: number[];
  rebuffering: boolean;
  timeStatPosition: string;
  timeStatDuration: string;
  error?: PlayerError;
  isCenterClickAllowed: boolean;
  isSeekbarHover: boolean;
  isSeekbarSeeking: boolean;
  seekbarPercentage: number;
  seekbarTooltipText: string;
  seekbarTooltipPercentage: number;
  seekbarThumbnailPercentage: number;
  tracks: ITrack[];
  activeTrack: ITrack;
  selectedTrack: ITrack | string;
  settingsTab: SettingsTabs;
  visibleSettingsTabs: SettingsTabs[];
  subtitles: Subtitle[];
  activeSubtitle: Subtitle;

  activeAudio: AudioLang;
  audioLanguages : AudioLang[];
  
  playbackRate: number;
  pip: boolean;
  pipSupported: boolean;
  activeThumbnail: IThumbnail;
  isMobile: boolean;
  image: string;
  rewind: number;
  forward: number;
  nodIcon: string;
  logo: object;
  getTranslation(text: string, params?: object): string;
}

export interface IActions {
  playOrPause(origin?: string);
  startSeeking();
  rewind();
  forward();
  seekToPercentage(percentage: number);
  setVolume(volume: number);
  setVolumeControlsOpen(isVolumeControlsOpen: boolean);
  startVolumebarSeeking();
  stopVolumebarSeeking();
  toggleMute();
  toggleFullscreen();
  setSeekbarState(state: any);
  setVolumebarState(state: any);
  selectTrack(track: ITrack);
  setAudioLanguage(audio:AudioLang);
  setSettingsTab(tab: SettingsTabs);
  toggleSettings();
  selectSubtitle(subtitle: Subtitle);
  setPlaybackRate(playbackRate: number);
  selectAudioLanguage(audio: AudioLang);
  togglePip();
  toggleActiveSubtitle();
}

export interface IInfo {
  data: IData;
  actions: IActions;
}

export enum ViewTypes {
  ERROR = 'error',
  LOADING = 'loading',
  START = 'start',
  CONTROLS = 'controls',
}

export enum SettingsTabs {
  NONE,
  OPTIONS,
  TRACKS,
  SUBTITLES,
  PLAYBACKRATES,
  AUDIOS
}
export interface AudioLang {
  id : number;
  lang: string;
  name: string;
  url : string
}
export interface IStateStore {
  showControls();
}
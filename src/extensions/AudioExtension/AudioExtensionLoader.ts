import {
    Config,
    IInstance,
    IModuleLoader,
    ModuleLoaderTypes,
} from '@src/types';
import { AudioExtension } from '@src/extensions/AudioExtension/AudioExtension';

export const AudioExtensionLoader = {
    type: ModuleLoaderTypes.EXTENSION,

    create: async (instance: IInstance) => new AudioExtension(instance),

    isSupported: ({ config }: { config: Config }): boolean => {
        return true
    },
} as IModuleLoader<AudioExtension>;

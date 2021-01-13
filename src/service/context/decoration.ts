import 'reflect-metadata';
import {contextGet, contextRegister} from './index';

export const Injectable = (): ClassDecorator => (...args) => {
    const key = args[0];
    const storeInstance = contextGet(key);
    if (!storeInstance) {
        const instance = new (args[0] as any)();
        contextRegister(key, instance);
    }
};

export function iocInject<T>(keys: any): T {
    if (keys && Array.isArray(keys)) {
        const result = [] as any;
        keys.forEach($item => {
            result.push(contextGet($item));
        });
        return result;
    }
    return contextGet(keys) as T;
}

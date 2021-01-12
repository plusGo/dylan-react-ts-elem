export class LocalStorageUtil {
    private static LOCAL_STORAGE_PREFIX_KEY = '_local_storage_prefix_key_';

    static setStore(key: string, data: any): void {
        if (!key) return;
        if (typeof data !== 'string') {
            data = `${LocalStorageUtil.LOCAL_STORAGE_PREFIX_KEY}${JSON.stringify(data)}`;
        }
        window.localStorage.setItem(key, data);
    }

    static getStore<T>(key: string): T | null {
        if (!key) {
            return null;
        }
        const data = window.localStorage.getItem(key);
        if (data) {
            if (data.startsWith(LocalStorageUtil.LOCAL_STORAGE_PREFIX_KEY)) {
                return JSON.parse(data.substring(LocalStorageUtil.LOCAL_STORAGE_PREFIX_KEY.length));
            } else {
                return data as any;
            }
        } else {
            return null;
        }
    }

    static removeStore(key: string): void {
        if (!key) return;
        window.localStorage.removeItem(key);
    }
}

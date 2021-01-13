import {createContext} from 'react';

const initialContextState = {} as any;
export const Context = createContext(initialContextState);

export const Provider = Context.Provider;
export const Consumer = Context.Consumer;


export const DEFAULT_IOC_CONTEXT = {} as any;

export const contextRegister = (key: any, data: any) => {
    DEFAULT_IOC_CONTEXT[key] = data;
};

export const contextGet = (key: any): any => {
    return DEFAULT_IOC_CONTEXT[key]
};

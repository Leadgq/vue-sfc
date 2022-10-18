/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
interface ImportMetaEnv {
    readonly VITE_HOST: string
    readonly VITE_WS: string
    readonly  VITE_MOCK_STATE: boolean
    readonly  VITE_ENVIRONMENT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

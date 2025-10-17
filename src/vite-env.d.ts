/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_STRIPE_PUBLIC_KEY: string;
    // Add any other variables here:
    // readonly VITE_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
/// <reference types="@astrojs/image/client" />
interface ImportMetaEnv {
    readonly PUBLIC_GA_MEASUREMENT_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
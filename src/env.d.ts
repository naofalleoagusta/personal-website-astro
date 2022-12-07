/// <reference types="@astrojs/image/client" />
interface ImportMetaEnv {
    readonly URL: string;
    readonly GA_MEASUREMENT_ID: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
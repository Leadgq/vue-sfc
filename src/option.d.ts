// 全局声明
declare interface Window {
    ToViewType: (viewType: string, viewCityCode: string, cityName: string) => void
}

type loading = {
  show: () => void;
  hidden: () => void;
  showOrHidden: Boolean;
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
      $loadings: loading
  }
}
export {}
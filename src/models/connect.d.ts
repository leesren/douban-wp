export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    index?: boolean;
    home?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
}

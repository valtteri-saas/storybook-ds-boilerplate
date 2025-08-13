export interface TokenGroup {
  [key: string]: TokenGroup | string | number;
}

export interface Tokens {
  colors: {
    primitive: TokenGroup;
    semantic: TokenGroup;
    [key: string]: TokenGroup;
  };
  dimensions?: TokenGroup;
  typography?: TokenGroup;
  [key: string]: any;
}

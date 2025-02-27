export type SelectProps = {
  config: { name: string; params?: Params; url?: string }[];
  name: string;
  onChangeChart?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeServer?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onChangeStock?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  placeholder?: string;
  valueChart?: string;
  valueServer?: string[];
  valueStock?: string[];
};

type Params = {
  amount?: number;
  asset?: string;
  interval?: string;
  limit?: number;
  period?: string;
  symbol?: string;
};

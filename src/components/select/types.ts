export type SelectProps = {
  label: string;
  onChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
  options: Options[];
  placeholder?: string;
  stock?: boolean;
  value: string | string[];
};

type Options = {
  name: string;
  params?: Params;
  url?: string;
};

type Params = {
  amount?: number;
  asset?: string;
  interval?: string;
  limit?: number;
  period?: string;
  symbol?: string;
};

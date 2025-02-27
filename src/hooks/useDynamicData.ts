import { useGetDataQuery } from 'store/requests';

type ServerConfig = {
  name: string;
  params: ServerParams;
  url: string;
};

type ServerParams = Record<string, number | string>;

export const useDynamicData = (config: ServerConfig) => {
  const { data } = useGetDataQuery({
    params: config.params,
    url: config.url,
  });

  return {
    [config.name]: data || [],
  };
};

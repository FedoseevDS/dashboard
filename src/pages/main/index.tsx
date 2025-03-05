import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

import { ReactECharts } from 'components/chart';
import Select from 'components/select';

import { useDynamicData } from 'hooks/useDynamicData';

import { Chart, Container, Toggle, TopPanel } from './styles';

import { configBinance, configChart, configMobula } from './config';
import { option } from './option';
import { MainProps } from './types';

const Main = ({ theme, toggleTheme }: MainProps) => {
  const [itemsServer, setItemsServer] = useState<Array<string>>([]);
  const [itemChart, setItemChart] = useState<string>('Basic line');
  const [itemsStock, setItemsStock] = useState<Array<string>>([]);

  const { Binance: dataBinance = [] } = useDynamicData(configBinance);
  const { Mobula: dataMobula = [] } = useDynamicData(configMobula);

  const commonConfig = useMemo(() => [configBinance, configMobula], []);

  const filterConfig = useMemo(() => {
    return commonConfig.filter((i) => itemsServer.includes(i.name));
  }, [itemsServer, commonConfig]);

  const limit = useMemo(
    () =>
      commonConfig.reduce((prev: number, item) => {
        if ('limit' in item.params) {
          return item.params.limit;
        }
        if ('amount' in item.params) {
          return item.params.amount;
        }
        return prev;
      }, 0),
    [commonConfig],
  );

  const filterData = useMemo(
    () =>
      dataBinance.reduce((prev: [], item: (number | string)[]) => {
        const convertItem = item.reduce((p, i: number | string, idx: number) => {
          return {
            ...p,
            ...(idx === 1 && { open: i }),
            ...(idx === 2 && { high: i }),
            ...(idx === 3 && { low: i }),
            ...(idx === 4 && { close: i }),
            ...(idx === 5 && { volume: i }),
            ...(idx === 6 && { time: i }),
          };
        }, {});

        return [...prev, convertItem];
      }, []),
    [dataBinance],
  );

  const handleItemsServer = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.textContent || '';
    setItemsServer((prevItem) => {
      if (prevItem.includes(text)) {
        return prevItem.filter((i) => i !== text);
      }

      return [...prevItem, text];
    });
  }, []);

  const handleItemChart = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.textContent || '';
    setItemChart(text);
  }, []);

  const handleItemsStock = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const text = e.currentTarget.textContent || '';
    setItemsStock((prevItem) => {
      if (prevItem.includes(text)) {
        return prevItem.filter((i) => i !== text);
      }

      return [...prevItem, text];
    });
  }, []);

  useEffect(() => {
    setItemsStock((prevItemsStock) => {
      let updatedItemsStock = [...(prevItemsStock || [])];

      if (!itemsServer.includes('Mobula')) {
        updatedItemsStock = updatedItemsStock.filter((item) => item !== 'Bitcoin');
      }

      if (!itemsServer.includes('Binance')) {
        updatedItemsStock = updatedItemsStock.filter((item) => item !== 'BTCUSDT');
      }

      return updatedItemsStock;
    });
  }, [itemsServer]);

  return (
    <Container>
      <TopPanel>
        <Select
          label="Криптовалюта:"
          onChange={handleItemsStock}
          options={filterConfig}
          placeholder="Выберите криптовалюту"
          stock={true}
          value={itemsStock}
        />
        <Select
          label="Сервер:"
          onChange={handleItemsServer}
          options={commonConfig}
          placeholder="Выберите сервер"
          value={itemsServer}
        />
        <Select
          label="Тип диаграммы:"
          onChange={handleItemChart}
          options={configChart}
          value={itemChart}
        />
        <Toggle>
          <FiSun />
          <div>
            <input
              checked={theme === 'dark' || undefined}
              id="switch"
              onChange={(e) => toggleTheme(e.target.checked ? 'dark' : 'light')}
              type="checkbox"
            />
            <label htmlFor="switch">Toggle</label>
          </div>
          <FaMoon />
        </Toggle>
      </TopPanel>
      <Chart>
        <ReactECharts
          option={option({
            currency: itemsStock,
            dataBinance: itemsServer.includes('Binance') ? filterData : [],
            dataMobula: itemsServer.includes('Mobula') ? dataMobula : [],
            [itemChart]: itemChart,
            limit,
          })}
          theme={theme}
        />
      </Chart>
    </Container>
  );
};

export default Main;

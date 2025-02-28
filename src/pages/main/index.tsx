import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

import { ReactECharts } from 'components/chart';
import Select from 'components/select';

import { calculateSettingAsThemeString } from 'hooks/themeWindows';
import { useDynamicData } from 'hooks/useDynamicData';

import { Chart, Container, Toggle, TopPanel } from './styles';

import { configBinance, configChart, configMobula } from './config';
import { option } from './option';

const Main = () => {
  const themeWindow = calculateSettingAsThemeString();

  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(themeWindow);

  const [itemsServer, setItemsServer] = useState<string[]>([]);
  const [itemChart, setItemChart] = useState<string>('Basic line');
  const [itemsStock, setItemsStock] = useState<string[]>([]);

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
    document.querySelector('html')?.setAttribute('data-theme', theme || 'light');
  }, [theme]);

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
          config={filterConfig}
          name="Криптовалюта:"
          onChangeStock={handleItemsStock}
          placeholder="Выберите криптовалюту"
          valueStock={itemsStock}
        />
        <Select
          config={commonConfig}
          name="Сервер:"
          onChangeServer={handleItemsServer}
          placeholder="Выберите сервер"
          valueServer={itemsServer}
        />
        <Select
          config={configChart}
          name="Тип диаграммы:"
          onChangeChart={handleItemChart}
          valueChart={itemChart}
        />
        <Toggle>
          <FiSun />
          <div>
            <input
              checked={theme === 'dark' || undefined}
              id="switch"
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
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

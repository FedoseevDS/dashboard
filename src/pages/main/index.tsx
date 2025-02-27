import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

import { ReactECharts } from 'components/chart';
import Select from 'components/select';

import { calculateSettingAsThemeString } from 'hooks/themeWindows';

import { useGetDataBinanceQuery, useGetDataMobulaQuery } from 'store/requests';

import { Chart, Container, Toggle, TopPanel } from './styles';

import { configChart, configServer } from './config';
import { option } from './option';

const Main = () => {
  const themeWindow = calculateSettingAsThemeString();

  const [theme, setTheme] = useState<'dark' | 'light' | undefined>(themeWindow);

  const [itemsServer, setItemsServer] = useState<string[]>([]);
  const [itemChart, setItemChart] = useState<string>('Basic line');
  const [itemsStock, setItemsStock] = useState<string[]>([]);

  const { data: dataBinance = [] } = useGetDataBinanceQuery(null);
  const { data: dataMobula = [] } = useGetDataMobulaQuery(null);

  const filterConfig = useMemo(() => {
    return configServer.filter((i) => itemsServer?.includes(i.name));
  }, [itemsServer]);

  const filterData = dataBinance.reduce((prev: [], item: (number | string)[]) => {
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
  }, []);

  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme || 'light');
  }, [theme]);

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
          config={configServer}
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
          })}
          theme={theme}
        />
      </Chart>
    </Container>
  );
};

export default Main;

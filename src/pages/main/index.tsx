import { useCallback, useState } from 'react';
import { FaMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';

import { ReactECharts } from 'components/chart';

import { useGetDataBinanceQuery, useGetDataMobulaQuery } from 'store/requests';

import { Chart, Container, Select, Toggle, TopPanel } from './styles';

const option = ({ currency, dataBinance, dataMobula, server, ...props }) => {
  const closePriceBinance = dataBinance.map(({ close }) => close);
  const dateBinance = dataBinance.map(({ time }) => new Date(time).toISOString().split('T')[0]);

  const closePriceMobula = dataMobula?.data?.map(({ close }) => close);

  return {
    animationDuration: 3000,
    grid: {
      bottom: '0%',
      containLabel: true,
      left: '1%',
      right: '1%',
    },
    legend: {
      data: currency,
    },
    series: [
      {
        ...(props['Basic area'] ? { areaStyle: {} } : null),
        data: closePriceBinance,
        name: 'BTCUSDT',
        ...(props['Smoothed line'] && { smooth: true }),
        type: (props['Basic bar'] && 'bar') || 'line',
      },
      {
        ...(props['Basic area'] ? { areaStyle: {} } : null),
        data: closePriceMobula,
        name: 'Bitcoin',
        ...(props['Smoothed line'] && { smooth: true }),
        type: (props['Basic bar'] && 'bar') || 'line',
      },
    ],
    title: {
      text: currency,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      text: 'Stacked Line',
      trigger: 'axis',
    },
    xAxis: {
      data: dateBinance,
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
  };
};

const cryptocurrencies = {
  Binance: ['BTCUSDT'],
  Mobula: ['Bitcoin'],
};

const Main = () => {
  const [selectValue, setSelectValue] = useState('Basic line');
  const [isTheme, setIsTheme] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string[]>([]);

  const { data: dataBinance = [] } = useGetDataBinanceQuery(null);
  const { data: dataMobula = [] } = useGetDataMobulaQuery(null);

  const filterData = dataBinance.reduce((prev, item) => {
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

  const handleServer = useCallback(
    ({ target }: { target: { value: string } }) => {
      if (target.value === 'Выберите сервер') {
        return setSelectedServer([]);
      }

      const updateSelect = selectedServer.includes(target.value)
        ? selectedServer.filter((i) => i !== target.value)
        : [...selectedServer, target.value];

      setSelectedServer(updateSelect);
    },
    [setSelectedServer, selectedServer],
  );

  const handleCurrency = useCallback(
    ({ target }: { target: { value: string } }) => {
      if (target.value === 'Выберите криптовалюту') {
        return setSelectedCurrency([]);
      }

      const updateSelect = selectedCurrency.includes(target.value)
        ? selectedCurrency.filter((i) => i !== target.value)
        : [...selectedCurrency, target.value];

      setSelectedCurrency(updateSelect);
    },
    [setSelectedCurrency, selectedCurrency],
  );

  return (
    <Container>
      <TopPanel>
        <Select>
          <label>Криптовалюта:</label>
          <select onChange={handleCurrency}>
            <option selected>Выберите криптовалюту</option>
            {selectedServer?.map((i: string) => (
              <optgroup label={i}>
                {cryptocurrencies[i].map((item: string) => (
                  <option>{item}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </Select>
        <Select>
          <label>Сервер:</label>
          <select onChange={handleServer}>
            <option selected>Выберите сервер</option>
            <option>Binance</option>
            <option>Mobula</option>
          </select>
        </Select>
        <Select>
          <label>Тип диаграммы:</label>
          <select
            onChange={({ target }) => setSelectValue(target.value)}
            value={selectValue}
          >
            <option value="Basic line">Basic line</option>
            <option value="Smoothed line">Smoothed line</option>
            <option value="Basic area">Basic area</option>
            <option value="Basic bar">Basic bar</option>
          </select>
        </Select>
        <Toggle>
          <FiSun />
          <div>
            <input
              id="switch"
              onChange={(e) => setIsTheme(e.target.checked)}
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
            currency: selectedCurrency,
            dataBinance: selectedServer.includes('Binance') ? filterData : [],
            dataMobula: selectedServer.includes('Mobula') ? dataMobula : [],
            [selectValue]: selectValue,
            server: selectedServer,
          })}
          settings={selectValue}
          theme={isTheme ? 'dark' : 'light'}
        />
      </Chart>
    </Container>
  );
};

export default Main;

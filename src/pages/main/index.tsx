import { useState } from 'react';

import { ReactECharts } from 'components/chart';

// import { useGetDataQuery } from 'store/requests';
import { data } from './const';
import { Chart, Container, Select, TopPanel } from './styles';

const option = ({ data, ...props }) => {
  // const date = data?.data?.map((i: { date: string }) => i.date.split('T')[0]);
  // const close = data?.data?.map((i: { close: string }) => i.close);
  const date = data?.map((i: { date: string }) => i.date.split('T')[0]);
  const close = data?.map((i: { close: string }) => i.close);

  return {
    animationDuration: 3000,
    grid: {
      bottom: '0%',
      containLabel: true,
      left: '1%',
      right: '1%',
    },
    legend: {
      data: ['close'],
    },
    series: [
      {
        ...(props['Basic area'] ? { areaStyle: {} } : null),
        data: close,
        name: 'close',
        ...(props['Smoothed line'] && { smooth: true }),
        type: (props['Basic bar'] && 'bar') || 'line',
      },
    ],
    title: {
      text: 'AAPL',
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
      data: date,
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
  };
};

const Main = () => {
  const [selectValue, setSelectValue] = useState('Basic line');

  // const { data = [] } = useGetDataQuery({ limit: 100 });

  return (
    <Container>
      <TopPanel>
        <Select>
          <label>Акции:</label>
          <select name="stock">
            <option>AAPL</option>
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
      </TopPanel>
      <Chart>
        <ReactECharts
          option={option({ data, [selectValue]: selectValue })}
          settings={selectValue}
        />
      </Chart>
    </Container>
  );
};

export default Main;

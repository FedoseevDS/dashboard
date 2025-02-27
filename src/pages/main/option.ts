import type { EChartsOption } from 'echarts';

type DynamicProps = {
  'Basic area'?: boolean;
  'Basic bar'?: boolean;
  'Basic line'?: boolean;
  'Smoothed line'?: boolean;
};

type OptionProps = {
  currency: string[];
  dataBinance: { close: string; time: string }[];
  dataMobula: { data: { close: number }[] };
} & DynamicProps;

export const option = ({
  currency,
  dataBinance,
  dataMobula,
  ...props
}: OptionProps): EChartsOption => {
  const closePriceBinance = dataBinance.map(({ close }: { close: string }) => close);
  const dateBinance = dataBinance.map(
    ({ time }: { time: string }) => new Date(time).toISOString().split('T')[0],
  );

  const closePriceMobula = dataMobula?.data?.map(({ close }: { close: number }) => close);

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
        data: currency.includes('BTCUSDT') ? closePriceBinance : [],
        name: 'BTCUSDT',
        ...(props['Smoothed line'] && { smooth: true }),
        type: (props['Basic bar'] && 'bar') || 'line',
      },
      {
        ...(props['Basic area'] ? { areaStyle: {} } : null),
        data: currency.includes('Bitcoin') ? closePriceMobula : [],
        name: 'Bitcoin',
        ...(props['Smoothed line'] && { smooth: true }),
        type: (props['Basic bar'] && 'bar') || 'line',
      },
    ],
    title: {
      text: currency.join(', '),
    },
    toolbox: {
      feature: currency.length
        ? {
            saveAsImage: {},
          }
        : {},
    },
    tooltip: {
      axisPointer: {
        type: 'shadow',
      },
      trigger: 'axis',
    },
    xAxis: {
      data: currency.includes('BTCUSDT') ? dateBinance : undefined,
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
  };
};

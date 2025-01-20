import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts';
import type { CSSProperties } from 'react';

import { getInstanceByDom, init } from 'echarts';
import { useEffect, useRef } from 'react';

export interface ReactEChartsProps {
  loading?: boolean;
  option: EChartsOption;
  settings?: SetOptionOpts;
  style?: CSSProperties;
  theme?: 'dark' | 'light';
}

export function ReactECharts({
  loading,
  option,
  settings,
  style,
  theme,
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, theme);
    }

    // Add chart resize listener
    // ResizeObserver is leading to a bit janky UX
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.setOption(option, settings);
    }
  }, [option, settings, theme]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading, theme]);

  return (
    <div
      ref={chartRef}
      style={{ height: '100%', width: '100%', ...style }}
    />
  );
}

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { setChartData } from '../features/Chart/dataSlice';

const fetchGraphData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const Dashboard: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.chartData);
  const dispatch = useDispatch<AppDispatch>();
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const chartXAxisLabel = "Days";
  const chartYAxisLabel = "Count";

  useEffect(() => {
    if (!data.cases || !data.deaths || !data.recovered) { 
      const fetchData = async () => {
        try {
          const result = await fetchGraphData();
          dispatch(setChartData(result));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (data) {
      if (chartInstance.current) chartInstance.current.dispose();
      chartInstance.current = echarts.init(chartRef.current!);

      const maxDataValue = Math.max(...Object.values(data.cases) as number[]);
      const yAxisUnit = getUnit(maxDataValue);

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: { backgroundColor: '#6a7985' },
          },
          formatter: function (params: any) {
            let tooltipHtml = `<strong>${chartYAxisLabel}</strong><br/>`;
            params.forEach((item: any) => {
              const name = params.length < 2 ? item?.axisValueLabel : item?.seriesName;
              tooltipHtml += `<span style="display:inline-block;margin-right:4px;width:10px;height:10px;background-color:${item.color};"></span>
              ${name}: ${formatYAxis(item?.value as number, yAxisUnit)}<br/>`;
            });
            return tooltipHtml;
          },
        },
        legend: {
          data: ['Cases', 'Deaths', 'Recovered'],
          top: '5%',
          left: 'center',
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: Object.keys(data.cases),
          axisLabel: {
            rotate: 45,
            margin: 10, 
          },
        },
        yAxis: {
          type: 'value',
          name: chartYAxisLabel,
          nameLocation: 'middle',
          nameGap: 40,
          axisLabel: {
            formatter: (value: number) => formatYAxis(value, yAxisUnit),
            margin: 15, 
          },
        },
        series: [
          {
            name: 'Cases',
            data: Object.values(data.cases),
            type: 'line',
            smooth: true,
          },
          {
            name: 'Deaths',
            data: Object.values(data.deaths),
            type: 'line',
            smooth: true,
          },
          {
            name: 'Recovered',
            data: Object.values(data.recovered),
            type: 'line',
            smooth: true,
          },
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: 0,
            start: 0,
            end: 100,
          },
          {
            type: 'inside',
            xAxisIndex: 0,
            start: 0,
            end: 100,
          },
        ],
      };

      chartInstance.current.setOption(option);

      window.addEventListener('resize', () => {
        if (chartInstance.current) chartInstance.current.resize();
      });
    }
  }, [data]);

  return (
    <div className="relative w-full flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-6">COVID-19 Historical Data</h2>
      <div className="w-full h-[550px]">
        <div ref={chartRef} className="w-full h-full" />
      </div>
      <div className="text-center mt-4 font-semibold text-gray-600">
        {chartXAxisLabel}
      </div>
      <div className="absolute left-[50px] top-1/2 transform -translate-y-1/2 rotate-90 font-semibold text-gray-600">
        {chartYAxisLabel}
      </div>
    </div>
  );
};

export default Dashboard;

export const getUnit = (maxValue: number): string => {
  if (maxValue >= 1e9) return 'B';
  if (maxValue >= 1e6) return 'M';
  if (maxValue >= 1e3) return 'k';
  return '';
};

export const formatYAxis = (value: number, unit: string): string => {
  if (isNaN(value)) return '0';

  const formatValue = (divisor: number, suffix: string) => {
    const result = value / divisor;
    return (result % 1 !== 0 ? result.toFixed(2) : result) + suffix;
  };

  switch (unit) {
    case 'B':
      return formatValue(1e9, 'B');
    case 'M':
      return formatValue(1e6, 'M');
    case 'k':
      return formatValue(1e3, 'K');
    default:
      return value % 1 !== 0 ? value.toFixed(2) : value.toString();
  }
};

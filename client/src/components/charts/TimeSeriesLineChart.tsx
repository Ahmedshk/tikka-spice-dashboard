import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

export interface TimeSeriesSeries {
  id: string;
  label: string;
  data: number[];
  color?: string;
}

export interface TimeSeriesLineChartProps {
  /** X-axis labels (same length as each series data) */
  xAxisData: (string | number)[];
  /** One or more series (each data array length should match xAxisData) */
  series: TimeSeriesSeries[];
  height?: number;
  /** Optional colors in order; overrides series[].color if provided */
  colors?: string[];
}

const defaultTheme = createTheme({
  palette: { mode: 'light' },
});

export const TimeSeriesLineChart = ({
  xAxisData,
  series,
  height = 256,
  colors,
}: TimeSeriesLineChartProps) => {
  const chartSeries = series.map((s, index) => ({
    data: s.data,
    label: s.label,
    color: colors?.[index] ?? s.color,
  }));

  return (
    <ThemeProvider theme={defaultTheme}>
      <LineChart
        xAxis={[{ scaleType: 'point', data: xAxisData }]}
        series={chartSeries}
        height={height}
        margin={{ top: 10, right: 10, bottom: 24, left: 40 }}
        hideLegend
      />
    </ThemeProvider>
  );
};

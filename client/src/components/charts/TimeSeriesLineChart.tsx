import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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

const LABEL_FONT = { fontFamily: 'Onest, sans-serif', fill: '#5B6B79' };

const desktopMargin = { top: 10, right: 25, bottom: 24, left: 0 };
const mobileMargin = { top: 4, right: 14, bottom: 16, left: 0 };

export const TimeSeriesLineChart = ({
  xAxisData,
  series,
  height = 256,
  colors,
}: TimeSeriesLineChartProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const chartSeries = series.map((s, index) => ({
    data: s.data,
    label: s.label,
    color: colors?.[index] ?? s.color,
  }));

  const xAxisConfig = isDesktop
    ? {
      scaleType: 'point' as const,
      data: xAxisData,
      tickLabelStyle: LABEL_FONT,
    }
    : {
      scaleType: 'point' as const,
      data: xAxisData,
      tickLabelStyle: { ...LABEL_FONT, fontSize: 9 },
    };

  const yAxisConfig = isDesktop
    ? { tickLabelStyle: LABEL_FONT, labelStyle: LABEL_FONT }
    : { tickLabelStyle: { ...LABEL_FONT, fontSize: 10 }, labelStyle: { ...LABEL_FONT, fontSize: 9 } };

  return (
    <ThemeProvider theme={defaultTheme}>
      <LineChart
        xAxis={[xAxisConfig]}
        yAxis={[yAxisConfig]}
        series={chartSeries}
        height={height}
        margin={isDesktop ? desktopMargin : mobileMargin}
        hideLegend
      />
    </ThemeProvider>
  );
};

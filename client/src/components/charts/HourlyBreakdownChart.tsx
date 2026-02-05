import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  ChartContainer,
  BarPlot,
  LinePlot,
  MarkPlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsGrid,
} from '@mui/x-charts';

export interface HourlyBreakdownChartProps {
  xAxisLabels: string[];
  salesData: number[];
  laborCostData: number[];
  height?: number;
  /** Chart width in px. If omitted, chart uses container width (fits card on all screens). */
  width?: number;
}

const defaultTheme = createTheme({
  palette: { mode: 'light' },
});

const LABEL_FONT = { fontFamily: 'Onest, sans-serif', fill: '#5B6B79' };

const desktopMargin = { top: 20, right: 20, bottom: 0, left: 20 };
const mobileMargin = { top: 4, right: 15, bottom: 0, left: 15 };

export const HourlyBreakdownChart = ({
  xAxisLabels,
  salesData,
  laborCostData,
  height = 300,
  width,
}: HourlyBreakdownChartProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const series = [
    {
      type: 'bar' as const,
      data: salesData,
      label: 'Sales Per hours',
      id: 'sales',
      yAxisId: 'salesAxis',
      color: '#FBC52A',
    },
    {
      type: 'line' as const,
      data: laborCostData,
      label: 'Labor Cost Per hours',
      id: 'labor',
      yAxisId: 'laborAxis',
      color: '#EF4444',
      showMark: true,
    },
  ];

  const xAxisConfig = isDesktop
    ? {
        data: xAxisLabels,
        scaleType: 'band' as const,
        id: 'x-axis',
        height: 40,
        tickLabelStyle: LABEL_FONT,
      }
    : {
        data: xAxisLabels,
        scaleType: 'band' as const,
        id: 'x-axis',
        height: 26,
        tickLabelStyle: { ...LABEL_FONT, fontSize: 9 },
      };

  const salesAxisConfig = isDesktop
    ? {
        id: 'salesAxis' as const,
        label: 'Sales ($)',
        min: 0,
        max: 1000,
        tickNumber: 6,
        tickLabelStyle: LABEL_FONT,
        labelStyle: LABEL_FONT,
      }
    : {
        id: 'salesAxis' as const,
        label: 'Sales ($)',
        min: 0,
        max: 1000,
        tickNumber: 6,
        width: 40,
        tickLabelStyle: { ...LABEL_FONT, fontSize: 10 },
        labelStyle: { ...LABEL_FONT, fontSize: 9 },
      };

  const laborAxisConfig = isDesktop
    ? {
        id: 'laborAxis' as const,
        position: 'right' as const,
        label: 'Labor Cost (%)',
        min: 10,
        max: 30,
        tickNumber: 5,
        tickLabelStyle: LABEL_FONT,
        labelStyle: LABEL_FONT,
      }
    : {
        id: 'laborAxis' as const,
        position: 'right' as const,
        label: 'Labor Cost (%)',
        min: 10,
        max: 30,
        tickNumber: 5,
        width: 40,
        tickLabelStyle: { ...LABEL_FONT, fontSize: 10 },
        labelStyle: { ...LABEL_FONT, fontSize: 9 },
      };

  return (
    <ThemeProvider theme={defaultTheme}>
      <ChartContainer
        series={series}
        xAxis={[xAxisConfig]}
        yAxis={[salesAxisConfig, laborAxisConfig]}
        {...(width != null && { width })}
        height={height}
        margin={isDesktop ? desktopMargin : mobileMargin}
      >
        <ChartsGrid vertical horizontal />
        <BarPlot />
        <LinePlot />
        <MarkPlot />
        <ChartsXAxis axisId="x-axis" />
        <ChartsYAxis axisId="salesAxis" />
        <ChartsYAxis axisId="laborAxis" />
      </ChartContainer>
    </ThemeProvider>
  );
};

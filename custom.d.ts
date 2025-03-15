declare module 'react-native-chart-kit' {
  interface barDataItem {
    data: number[];
    colors?: ((opacity?: number) => string)[];
  }

  interface BarChartPropsType {
    data: barDataItem[];
    labels?: string[];
    width: number;
    height: number;
    yAxisLabel?: string;
    yAxisSuffix?: string;
    chartConfig: any; // Adjust as needed
    verticalLabelRotation?: number;
    showValuesOnTopOfBars?: boolean;
    withInnerLines?: boolean;
    fromZero?: boolean;
  }
}

import { Entypo, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';

import { IconCapacityUtilization } from '@/components/ui/icons/icon-capacity-utilization';

// Get screen width
const screenWidth = Dimensions.get('window').width;

const lineData = [
  { value: 15, label: '21/12', price: '15.000.000' },
  { value: 10, label: '22/12', price: '10.000.000' },
  { value: 12, label: '23/12', price: '12.000.000' },
  { value: 40, label: '24/12', price: '40.000.000' },
  { value: 25, label: '25/12', price: '25.000.000' },
  { value: 20, label: '26/12', price: '20.000.000' },
  { value: 35, label: '27/12', price: '35.000.000' },
  { value: 50, label: '28/12', price: '50.000.000' },
  { value: 30, label: '29/12', price: '30.000.000' },
  { value: 45, label: '30/12', price: '45.000.000' },
  { value: 18, label: '31/12', price: '18.000.000' },
  { value: 22, label: '01/01', price: '22.000.000' },
  { value: 38, label: '02/01', price: '38.000.000' },
];

const LineChartSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePointerLabel = (items: any) => {
    return (
      <View style={styles.tooltipWrapper}>
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>{items[0].value} phòng</Text>
        </View>
        <View style={styles.tooltipArrow} />
      </View>
    );
  };

  const pointerConfig = {
    pointerStripHeight: 200,
    pointerStripColor: 'transparent',
    pointerColor: 'transparent',
    activatePointersOnLongPress: true,
    autoAdjustPointerLabelPosition: true,
    stripOverPointer: true,
    pointerVanishDelay: 0,
    pointerLabelComponent: handlePointerLabel,
    onPress: (items: any) => {
      setSelectedIndex(items[0].index);
    },
    onPointerEnter: (items: any) => {
      setSelectedIndex(items[0].index);
    },
  };

  const renderDataPoint = (item: any, index: number) => {
    if (index === selectedIndex) {
      return (
        <LinearGradient
          colors={['#00C4B4', '#0088FF']}
          style={styles.selectedDataPoint}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      );
    }
    return (
      <View style={styles.defaultDataPoint}>
        <View style={styles.innerDataPoint} />
      </View>
    );
  };

  return (
    <View className="m-4 gap-4 rounded-lg border border-gray-200 bg-white p-3">
      <View className="w-full flex-row items-center justify-between gap-3">
        <View className="flex-row items-center justify-start gap-2">
          <IconCapacityUtilization />
          <Text className="text-base font-bold text-black">
            Công suất sử dụng
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-1 rounded-full border border-[#F3F4F6] bg-[#F7F7F7] px-4 py-2">
          <Feather name="calendar" size={24} color="#374151" />
          <Text className="text-[16px] text-[#374151]">Tháng này</Text>
          <Entypo name="chevron-small-down" size={26} color="#374151" />
        </View>
      </View>
      <View style={styles.container}>
        <LineChart
          data={lineData}
          xAxisColor="#DDDDDD"
          width={screenWidth * 1.5} // Increased width to enable scrolling
          yAxisLabelWidth={40}
          maxValue={100}
          noOfSections={5}
          yAxisThickness={0}
          xAxisThickness={1}
          initialSpacing={40}
          spacing={50}
          yAxisLabelTexts={['0%', '20%', '40%', '60%', '80%', '100%']}
          yAxisTextStyle={styles.yAxisText}
          dashWidth={5}
          dashGap={5}
          rulesType="dash"
          rulesColor="#DDDDDD"
          showYAxisIndices={false}
          xAxisLabelTextStyle={styles.xAxisText}
          thickness={2}
          color="#007AFF"
          dataPointsColor="#007AFF"
          dataPointsRadius={5}
          customDataPoint={renderDataPoint}
          pointerConfig={pointerConfig}
          adjustToWidth={false}
          scrollToEnd={false}
          scrollAnimation={true}
          isAnimated={true}
        />
      </View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  selectedDataPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  defaultDataPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6F0FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDataPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#007AFF',
  },
  tooltipWrapper: {
    position: 'absolute',
    alignItems: 'center',
    top: -15,
    left: '50%',
    transform: [{ translateX: -33 }],
    zIndex: 9999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipContainer: {
    backgroundColor: '#333947',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  tooltipArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#333947',
    alignSelf: 'center',
  },
  tooltipText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  yAxisText: {
    color: '#6B7280',
    fontSize: 12,
    marginRight: 5,
  },
  xAxisText: {
    color: '#6B7280',
    fontSize: 10,
    marginTop: 5,
  },
});

export default LineChartSection;

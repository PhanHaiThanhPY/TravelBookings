import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import LinearGradient from 'react-native-linear-gradient';

import IconGrowth from '@/components/ui/icons/icon-growth';
import IconGrowth2 from '@/components/ui/icons/icon-growth2';
import { IconWallet } from '@/components/ui/icons/icon-wallet';
import SelectedDropdown from '@/components/custom/selected-dropdown';

// Lấy chiều rộng màn hình
const screenWidth = Dimensions.get('window').width;

// Định nghĩa kiểu cho dữ liệu của BarChart
interface BarDataItem {
  value: number;
  frontColor: string;
  label: string;
  price: string;
}

// Định nghĩa dữ liệu
const barData: BarDataItem[] = [
  { value: 26, frontColor: '#EEEEEE', label: '21/12', price: '26.000.000' },
  { value: 20, frontColor: '#EEEEEE', label: '21/12', price: '20.000.000' },
  { value: 12, frontColor: '#EEEEEE', label: '21/12', price: '13.000.000' },
  { value: 15, frontColor: '#EEEEEE', label: '21/12', price: '15.000.000' },
  { value: 31, frontColor: '#EEEEEE', label: '21/12', price: '31.000.000' },
  { value: 13, frontColor: '#EEEEEE', label: '21/12', price: '13.000.000' },
];

// Hàm render nội dung bên trong thanh (LinearGradient)
const renderBarContent = (
  item: BarDataItem | undefined,
  index: number | undefined,
  selectedBarIndex: number | null
) => {
  if (item && typeof index === 'number' && index === selectedBarIndex) {
    return (
      <LinearGradient
        colors={['#00C4B4', '#0088FF']}
        style={{ width: '100%', height: '100%', borderRadius: 5 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    );
  }
  return null;
};
// Hàm render tooltip
const renderTopLabel = (
  item: BarDataItem | undefined,
  index: number,
  selectedBarIndex: number | null
) => {
  if (item && index === selectedBarIndex) {
    return (
      <View style={styles.tooltipWrapper}>
        <View style={styles.tooltipContainer}>
          <Text style={styles.tooltipText}>đ{item.price}</Text>
        </View>
        <View style={styles.tooltipArrow} />
      </View>
    );
  }
  return null;
};

const CombinedRevenueChart = () => {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  const handleBarPress = (item: BarDataItem | undefined, index: number) => {
    if (item && selectedBarIndex === index) {
      setSelectedBarIndex(null); // Hủy chọn nếu nhấn lại
    } else {
      setSelectedBarIndex(index); // Chọn cột mới
    }
  };
  const options = [
    { id: 1, label: 'Hôm nay', icon: 'calendar-today' },
    { id: 2, label: 'Hôm qua', icon: 'calendar-today' },
    { id: 3, label: '7 ngày qua', icon: 'calendar-today' },
    { id: 4, label: 'Tháng này', icon: 'calendar-today' },
    { id: 5, label: 'Tháng trước', icon: 'calendar-today' },
    { id: 6, label: 'Năm nay', icon: 'calendar-today' },
    { id: 7, label: 'Năm trước', icon: 'calendar-today' },
    { id: 8, label: 'Tùy chọn', icon: 'calendar-today' },
  ];

  return (
    <View className="mx-4 gap-4 rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <View className="w-full flex-row items-center justify-between gap-3">
        <View className="flex-row items-center justify-start gap-2">
          <IconWallet />
          <Text className="text-base font-bold text-black">Doanh thu</Text>
        </View>
        <View className="flex-row items-center justify-between gap-1 rounded-full bg-[#F7F7F7] ">
          <SelectedDropdown
            headerIcon="calendar-today"
            options={options as any}
            defaultValue="Tháng này"
            onSelect={(value) => console.log(value)}
            placeholder="Chọn thời gian"
          />
        </View>
      </View>

      {/* Revenue Stats */}
      <View className="flex-row items-center rounded-lg border border-gray-300 px-4 py-5">
        <View className="w-1/2 flex-col gap-1">
          <View className="flex flex-row items-center justify-start gap-1">
            <IconGrowth />
            <Text className="text-base text-[#374151]">Doanh thu</Text>
          </View>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-bold text-green-500">42.95</Text>
            <Text className="text-base text-green-500"> triệu</Text>
          </View>
          <Text className="text-sm">12 hóa đơn</Text>
        </View>

        <View className="mx-2 h-full w-[2px] bg-gray-200"></View>

        <View className="w-1/2 flex-col gap-1">
          <View className="flex flex-row items-center justify-start gap-2">
            <IconGrowth2 />
            <Text className="text-[14px] text-[#374151]">Tăng trưởng</Text>
          </View>
          <View className="flex flex-row items-center gap-2">
            <Text className="text-xl font-bold text-[#FF0000]">80.97%</Text>
            <Ionicons name="arrow-down" size={16} color="#FF0000" />
          </View>
          <Text className="text-sm text-gray-500">
            Tháng trước 255.73 triệu
          </Text>
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.container}>
        <BarChart
          data={barData}
          barWidth={35}
          xAxisColor="#DDDDDD"
          width={screenWidth - 40}
          yAxisLabelWidth={40}
          maxValue={35} // Increase from 30 to 35 to give more space at the top
          noOfSections={7} // Adjust sections accordingly
          yAxisThickness={0}
          xAxisThickness={1}
          initialSpacing={40}
          spacing={50}
          yAxisLabelTexts={[
            '0',
            '5 Tr',
            '10 Tr',
            '15 Tr',
            '20 Tr',
            '25 Tr',
            '30 Tr',
            '35 Tr',
          ]}
          yAxisTextStyle={styles.yAxisText}
          dashWidth={5}
          dashGap={5}
          rulesType="dash"
          rulesColor="#DDDDDD"
          showYAxisIndices={false}
          labelWidth={30}
          xAxisLabelTextStyle={styles.xAxisText}
          barInnerComponent={(item, index) =>
            renderBarContent(item as BarDataItem, index, selectedBarIndex)
          }
          renderTooltip={(item: BarDataItem, index: number) =>
            renderTopLabel(item, index, selectedBarIndex)
          }
          onPress={handleBarPress}
          barBorderRadius={5}
          intactTopLabel={true}
          stepHeight={40}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  tooltipWrapper: {
    position: 'absolute',
    alignItems: 'center',
    top: -35,
    left: '50%',
    transform: [{ translateX: -33 }],
    zIndex: 9999, // Tăng zIndex lên cao hơn
    elevation: 5, // Cho Android
    shadowColor: '#000', // Cho iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tooltipContainer: {
    backgroundColor: '#333947',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 100,
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
    color: '#999999',
    fontSize: 12,
    marginRight: 5,
  },
  xAxisText: {
    color: '#999999',
    fontSize: 10,
    marginTop: 5,
  },
});

export default CombinedRevenueChart;

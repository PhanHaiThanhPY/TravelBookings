import { Entypo, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import IconPlatform from '@/components/ui/icons/icon-platform';

const DonutChartSection = () => {
  // Updated pieData to match the image
  const pieData = [
    { value: 1650000000, color: '#FF5733' }, // Airbnb (Red)
    { value: 1650000000, color: '#33A1FD' }, // Traveloka (Light Blue)
    { value: 1650000000, color: '#1A3C34' }, // Booking (Dark Blue)
    { value: 1650000000, color: '#FFD60A' }, // Agoda (Yellow)
    { value: 1650000000, color: '#7209B7' }, // Khách đến (Purple)
  ];

  // Data for the legend (external labels)
  const legendData = [
    { name: 'Airbnb', color: '#FF5733', value: 'đ1.650.000.000' },
    { name: 'Traveloka', color: '#33A1FD', value: 'đ1.650.000.000' },
    { name: 'Booking', color: '#1A3C34', value: 'đ1.650.000.000' },
    { name: 'Agoda', color: '#FFD60A', value: 'đ1.650.000.000' },
    { name: 'Khách đến', color: '#7209B7', value: 'đ1.650.000.000' },
  ];

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    if (!isPressed) {
      setIsPressed(true);
      router.push(
        '/home/statistics-through-platform/statistics-through-platform-screen'
      );

      // Reset after 1 second
      setTimeout(() => {
        setIsPressed(false);
      }, 1000);
    }
  };

  return (
    <View className="mx-4 gap-4 rounded-lg border border-gray-200 bg-white p-3">
      {/* Header Section */}
      <View className="w-full flex-row items-center justify-between gap-3">
        <View className="flex-row items-center justify-start gap-2">
          <IconPlatform />
          <Text className="text-base font-bold text-black">
            Thống kê qua nền tảng
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-1 rounded-full border border-[#F3F4F6] bg-[#F7F7F7] px-4 py-2">
          <Feather name="calendar" size={24} color="#374151" />
          <Text className="text-[16px] text-[#374151]">Tháng này</Text>
          <Entypo name="chevron-small-down" size={26} color="#374151" />
        </View>
      </View>

      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          <PieChart
            data={pieData}
            donut
            radius={90}
            innerRadius={65}
            innerCircleColor="#fff"
            centerLabelComponent={() => (
              <View className="flex-col items-center">
                <Text className="text-base text-[#6B7280]">Tổng doanh thu</Text>
                <Text className="text-base font-bold text-black">
                  đ1.650.000.000
                </Text>
              </View>
            )}
          />
        </View>

        {/* Legend (External Labels) */}
        <View style={styles.legendContainer}>
          {legendData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.legendColorBox, { backgroundColor: item.color }]}
              />
              <Text className="flex-1 text-sm  text-[#001416]">
                {item.name}
              </Text>
              <Text className="text-sm font-semibold text-[#001416]">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity
        onPress={handlePress}
        disabled={isPressed}
        className="rounded-[12px] border border-[#0866FF] bg-white py-3"
      >
        <Text className="text-center font-bold text-[#0052D4]">
          Xem chi tiết
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chart: {
    alignItems: 'center',
  },

  centerLabelTitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  centerLabelValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  legendContainer: {
    flex: 1,
    marginLeft: 16,
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendColorBox: {
    width: 4,
    height: 12,
    marginRight: 8,
    borderRadius: 2,
  },
});

export default DonutChartSection;

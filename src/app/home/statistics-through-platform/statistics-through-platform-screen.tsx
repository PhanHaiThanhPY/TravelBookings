import { Stack } from 'expo-router';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

import SlidingTab from '@/components/custom/sliding-tab';

// Define the type for pie chart data
interface PieData {
  value: number;
  color: string;
  text: string;
  formattedValue: string;
}

const StatisticsThroughPlatformScreen: React.FC = () => {
  const pieData: PieData[] = [
    {
      value: 40,
      color: '#FF6B6B',
      text: 'Airbnb',
      formattedValue: '₫1,650,000,000',
    },
    {
      value: 40,
      color: '#4ECDC4',
      text: 'Traveloka',
      formattedValue: '₫1,650,000,000',
    },
    {
      value: 40,
      color: '#45B7D1',
      text: 'Booking',
      formattedValue: '₫1,650,000,000',
    },
    {
      value: 40,
      color: '#F7D794',
      text: 'Agoda',
      formattedValue: '₫1,650,000,000',
    },
    {
      value: 40,
      color: '#9B59B6',
      text: 'Khác',
      formattedValue: '₫1,650,000,000',
    },
  ];
  const handleTabChange = (key: string) => {
    console.log('Tab changed to:', key);
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View
        key={index}
        className=" flex-row items-center border-b border-gray-200  py-2"
      >
        <View className="mr-2">
          <View
            style={{
              backgroundColor: item.color,
              width: 6,
              height: 40,
              borderRadius: 8,
            }}
          />
        </View>
        <View className="flex-1 flex-col items-start">
          <Text className="text-base font-bold text-[#001416]">
            {item.text}
          </Text>
          <Text className="text-base text-gray-500">Tổng số tiền</Text>
        </View>
        <View className=" flex-1 flex-col items-end">
          <Text className="text-base text-blue-500 font-bold">40%</Text>
          <Text className=" text-base text-gray-700">
            {item.formattedValue}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Thống kê qua nền tảng',
        }}
      />

      <ScrollView className="flex-1">
        <View className="flex-1 bg-white px-4">
          {/* Tab Buttons */}
          <View className="flex-1 items-center justify-center  py-3">
            <SlidingTab
              tabs={[
                { key: 'quantity', label: 'Theo số lượng' },
                { key: 'revenue', label: 'Theo doanh thu' },
              ]}
              initialTab="quantity"
              onTabChange={handleTabChange}
              activeColor="#0866FF"
              inactiveColor="#6B7280"
              backgroundColor="#F9F9F9"
              activeBackgroundColor="#E1EBFF"
            />
          </View>

          {/* Pie Chart */}
          <View className="flex items-center justify-center gap-3">
            <PieChart
              data={pieData}
              donut
              radius={100}
              innerRadius={65}
              innerCircleColor="#fff"
              centerLabelComponent={() => (
                <View className="flex-col items-center">
                  <Text className="text-base text-[#6B7280]">
                    Tổng doanh thu
                  </Text>
                  <Text className="text-base font-bold text-black">
                    đ1.650.000.000
                  </Text>
                </View>
              )}
            />
            <View className="my-6">
              <View className="flex-row flex-wrap justify-center gap-4">
                {pieData.map((item, index) => (
                  <View
                    key={index}
                    className="w-[30%] flex-row items-center justify-center"
                  >
                    <View className="mr-2 flex items-center">
                      <View
                        style={{
                          backgroundColor: item.color,
                          width: 12,
                          height: 12,
                          borderRadius: 6,
                        }}
                      />
                    </View>
                    <Text className="text-base text-gray-700">{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <FlatList
            scrollEnabled={false}
            data={pieData}
            renderItem={renderItem}
            keyExtractor={(item) => item.text}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default StatisticsThroughPlatformScreen;

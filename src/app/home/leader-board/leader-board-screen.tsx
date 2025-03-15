import { Stack } from 'expo-router';
import React from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';

import SlidingTab from '@/components/custom/sliding-tab';

const PieChartScreen: React.FC = () => {
  const data = [
    {
      id: '1',
      rank: 1,
      title: 'Phòng 01 giường đôi 2 người',
      price: 'đ29,900,000',
      hasCrown: true,
    },
    {
      id: '2',
      rank: 2,
      title: 'Phòng 01 giường đôi 2 người',
      price: 'đ29,900,000',
      hasNotification: true,
    },
    {
      id: '3',
      rank: 3,
      title: 'Phòng 01 giường đôi 2 người',
      price: 'đ29,900,000',
    },
    {
      id: '4',
      rank: 1,
      title: 'Phòng 01 giường đôi 2 người',
      price: 'đ29,900,000',
    },
    {
      id: '5',
      rank: 2,
      title: 'Phòng 02 giường đơn 1 người',
      price: 'đ15,000,000',
    },
    {
      id: '6',
      rank: 3,
      title: 'Phòng 03 giường đôi 2 người hướng biển',
      price: 'đ35,000,000',
    },
    {
      id: '7',
      rank: 4,
      title: 'Phòng 04 giường đôi 2 người VIP',
      price: 'đ50,000,000',
    },
    {
      id: '8',
      rank: 5,
      title: 'Phòng 05 giường đơn 2 người',
      price: 'đ20,000,000',
    },
    {
      id: '9',
      rank: 6,
      title: 'Phòng 06 giường đôi 4 người',
      price: 'đ55,000,000',
    },
    {
      id: '10',
      rank: 7,
      title: 'Phòng 07 giường đôi 2 người cơ bản',
      price: 'đ40,000,000',
    },
  ];
  const renderItem = ({ item }: { item: any }) => (
    <View className="mx-2 flex-row items-center border-b border-gray-200 p-3">
      {/* Rank */}
      <Text className="mr-4 text-lg font-bold text-gray-600">#{item.rank}</Text>
      {/* Avatar */}
      <View className="relative">
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
          className="size-12 rounded-full"
        />
        {item.hasCrown && (
          <Image
            source={{ uri: 'https://via.placeholder.com/20' }} // Replace with crown icon URL
            className="absolute left-0 top-0 size-6"
          />
        )}
        {item.hasNotification && (
          <Image
            source={{ uri: 'https://via.placeholder.com/20' }} // Replace with notification icon URL
            className="absolute right-0 top-0 size-6"
          />
        )}
      </View>
      {/* Title and Price */}
      <View className="ml-4 flex-1">
        <Text className="text-base font-medium text-black">{item.title}</Text>
        <Text className="text-sm text-green-600">{item.price}</Text>
      </View>
    </View>
  );
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Hạng phòng bán chạy',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />
      <View className="my-2 h-[50px] w-full items-center justify-center">
        <SlidingTab
          tabs={[
            { key: 'quantity', label: 'Theo doanh thu' },
            { key: 'revenue', label: 'Theo lượt' },
          ]}
          initialTab="quantity"
          onTabChange={() => {}}
          activeColor="#0866FF"
          inactiveColor="#6B7280"
          backgroundColor="#F9F9F9"
          activeBackgroundColor="#E1EBFF"
        />
      </View>
      <ScrollView className="flex-1 bg-white">
        {/* Tab Buttons */}
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
    </>
  );
};

export default PieChartScreen;

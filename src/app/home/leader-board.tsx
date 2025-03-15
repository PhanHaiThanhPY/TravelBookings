import { Entypo, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

import SlidingTab from '@/components/custom/sliding-tab';
import { IconFlame } from '@/components/ui/icons/icon-flame';
import IconRanking1 from '@/components/ui/icons/icon-ranking1';

// Dữ liệu mẫu
const leaderboardData = [
  {
    rank: 1,
    image: 'https://via.placeholder.com/50', // URL placeholder cho hình ảnh phòng
    name: 'Phòng 01 giường đôi 2 người',
    amount: 'đ29.000.000',
    isTop: true,
  },
  {
    rank: 2,
    image: 'https://via.placeholder.com/50',
    name: 'Phòng 01 giường đôi 2 người',
    amount: 'đ29.000.000',
    isTop: false,
  },
  {
    rank: 3,
    image: 'https://via.placeholder.com/50',
    name: 'Phòng 01 giường đôi 2 người',
    amount: 'đ29.000.000',
    isTop: false,
  },
];

const LeaderBoard = () => {
  const renderItem = ({ item }: { item: any }) => {
    // Chọn icon dựa trên rank
    const getRankingIcon = () => {
      switch (item.rank) {
        case 1:
          return <IconRanking1 />;
        case 2:
          return <IconRanking1 />;
        case 3:
          return <IconRanking1 />;
        default:
          return null;
      }
    };

    return (
      <View className="flex-row items-center border-b border-gray-200 px-4 py-3">
        {/* Huy hiệu và thứ hạng */}
        <View className="mr-4">
          {getRankingIcon()}
          <Text className="mt-1 text-center text-lg text-gray-500">
            #{item.rank}
          </Text>
        </View>

        {/* Hình ảnh */}
        <Image
          source={{ uri: item.image }}
          className="mr-4 size-12 rounded-full"
        />

        {/* Thông tin phòng */}
        <View className="flex-1">
          <Text className="font-semibold text-black">{item.name}</Text>
          <Text className="text-gray-500">{item.amount}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="m-4 gap-1 rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <View className="w-full flex-row  items-center justify-between">
        <View className="flex-row items-center justify-start gap-2">
          <IconFlame />
          <Text className="text-base font-bold text-black">
            Hạng phòng bán chạy
          </Text>
        </View>
        <View className="flex-row items-center justify-between gap-1 rounded-full bg-[#F7F7F7] px-4 py-2">
          <Feather name="calendar" size={24} color="#374151" />
          <Text className="text-[16px] text-[#374151]">Tháng này</Text>
          <Entypo name="chevron-small-down" size={26} color="#374151" />
        </View>
      </View>
      {/* Tabs */}
      <View className="flex-1 items-center justify-center py-2">
        <SlidingTab
          tabs={[
            { key: 'quantity', label: 'Theo số lượng' },
            { key: 'revenue', label: 'Theo doanh thu' },
          ]}
          initialTab="quantity"
          onTabChange={() => {}}
          activeColor="#0866FF"
          inactiveColor="#6B7280"
          backgroundColor="#F9F9F9"
          activeBackgroundColor="#E1EBFF"
        />
      </View>

      {/* Danh sách xếp hạng */}
      <FlatList
        scrollEnabled={false}
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.rank.toString()}
        showsVerticalScrollIndicator={false}
      />

      {/* Nút Xem chi tiết */}
      <TouchableOpacity
        onPress={() => router.push('/home/leader-board/leader-board-screen')}
        className="mt-4 rounded-[12px] border border-[#0866FF] bg-white py-3"
      >
        <Text className="text-center font-bold text-[#0052D4]">
          Xem chi tiết
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LeaderBoard;

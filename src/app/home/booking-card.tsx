import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';

const BookingCard = () => {
  return (
    <View className="m-4 gap-4 rounded-lg border border-gray-200 bg-white  p-4">
      <View className="flex-row items-center gap-3">
        <View className="flex size-12 items-center justify-center rounded-full bg-[#E6F0FF]">
          <Ionicons name="calendar" size={20} color="#007AFF" />
        </View>
        <View className="flex-col">
          <Text className="text-xl font-bold text-black">Đặt phòng mới</Text>
          <Text className="text-base text-gray-500">Hôm nay 18/02/2025</Text>
        </View>
      </View>

      <View className="flex-row items-center gap-3 ">
        <Progress.Circle
          size={70}
          progress={4 / 16} // 25%
          thickness={6}
          color="#007AFF"
          unfilledColor="#E0E0E0"
          borderWidth={0}
          showsText
          formatText={() => '25%'}
          textStyle={{ fontSize: 14, fontWeight: 'bold', color: '#007AFF' }}
        />
        <View className="flex-col">
          <Text className="text-xl text-black">4/16 phòng</Text>
          <Text className="text-base text-gray-500">Khách đang sử dụng</Text>
        </View>
        <TouchableOpacity className="absolute right-4 top-4">
          <Ionicons name="chevron-forward" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;

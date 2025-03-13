import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';
const logoImage = require('../../components/ui/assets/bg-login.png');

const Header = () => {
  return (
    <View className="h-[100px] relative">
      <Image
        source={logoImage}
        className="absolute top-0 left-0 right-0 bottom-0 w-full"
        resizeMode="cover"
      />
      <View className="flex-1 flex-row justify-between items-center z-1 mt-10 p-4">
        <View className="flex-row items-center gap-2">
          <View className="flex-col items-start">
            <Text className="text-base text-white font-semibold">
              Chọn chi nhánh làm việc
            </Text>
            <View className="flex-row items-center justify-start gap-2">
              <EvilIcons name="location" size={28} color="white" />
              <Text className="text-2xl text-white font-bold">TP. HCM</Text>
              <Entypo name="chevron-right" size={28} color="white" />
            </View>
          </View>
        </View>
        <View className="flex-row items-center  gap-3">
          <TouchableOpacity className="flex-row bg-[#F7F7F7] rounded-full w-12 h-12 justify-center items-center">
            <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full justify-center items-center py-1 px-2">
              <Text className="text-xs text-white font-bold">99+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row w-12 h-12 justify-center items-center bg-[#F7F7F7] rounded-full">
            <Ionicons name="add" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

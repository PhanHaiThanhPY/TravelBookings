import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
const logoImage = require('../../components/ui/assets/bg-login.png');

const Header = () => {
  return (
    <View className="relative h-[100px] ">
      <Image
        source={logoImage}
        className="absolute inset-0 w-full"
        resizeMode="cover"
      />
      <View className="z-1 mt-10 flex-1 flex-row items-center justify-between p-4">
        <View className="flex-row items-center gap-2">
          <View className="flex-col items-start">
            <Text className="text-base font-semibold text-white">
              Chọn chi nhánh làm việc
            </Text>
            <View className="flex-row items-center justify-start gap-2">
              <EvilIcons name="location" size={28} color="white" />
              <Text className="text-2xl font-bold text-white">TP. HCM</Text>
              <Entypo name="chevron-right" size={28} color="white" />
            </View>
          </View>
        </View>
        <View className="flex-row items-center  gap-3">
          <TouchableOpacity className="size-12 flex-row items-center justify-center rounded-full bg-[#F7F7F7]">
            <Ionicons name="notifications-outline" size={24} color="#6B7280" />
            <View className="absolute -right-2 -top-2 items-center justify-center rounded-full bg-red-500 px-2 py-1">
              <Text className="text-xs font-bold text-white">99+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="size-12 flex-row items-center justify-center rounded-full bg-[#F7F7F7]">
            <Ionicons name="add" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

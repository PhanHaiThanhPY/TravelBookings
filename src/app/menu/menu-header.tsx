import { router } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const logoImage = require('../../components/ui/assets/bg-login.png');

export const USER_INFO = {
  NAME: 'Tonald Drump',
  LEVEL: 'Admin',
  PHONE: '0938277775',
} as const;

const ProfileInfo = () => (
  <View className="ml-3 flex-1">
    <Text className="text-lg font-semibold">{USER_INFO.NAME}</Text>
    <View className="flex-row items-center">
      <Text className="text-lg text-blue-600">{USER_INFO.LEVEL}</Text>
      <Text className="ml-2">| {USER_INFO.PHONE}</Text>
    </View>
  </View>
);

const MenuHeader = () => {
  const handleProfilePress = () => {
    router.push('/menu/components/detail-profile');
  };

  return (
    <View>
      <View className="relative">
        <Image
          source={logoImage}
          className="absolute inset-0 h-[180px] w-full"
          resizeMode="cover"
        />
        <View className="mt-6 px-4 pt-10">
          <TouchableOpacity onPress={handleProfilePress}>
            <View className="flex-row items-center rounded-xl bg-white p-4 shadow-sm">
              <Image
                source={{}}
                className="size-12 rounded-full"
                resizeMode="cover"
              />
              <ProfileInfo />
              <View className="justify-center">
                <Text className="text-xl text-gray-400">›</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuHeader;

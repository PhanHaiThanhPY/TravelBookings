import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface CustomerInfoProps {
  customerName: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
}

export const CustomerInfo = memo(
  ({ customerName, guests }: CustomerInfoProps) => (
    <View className="mb-4 flex-row items-center gap-2">
      <MaterialIcons name="people" size={20} color="#4B5563" />
      <Text className="text-lg font-medium text-gray-900">{customerName}</Text>
      <Text className="ml-auto text-sm text-gray-600">
        {guests.adults} người lớn & {guests.children} trẻ em & {guests.infants} giấy tờ
      </Text>
    </View>
  )
);
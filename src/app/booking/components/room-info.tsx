import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

interface RoomInfoProps {
  roomNumber: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
}

export const RoomInfo = memo(
  ({ roomNumber, roomType, checkIn, checkOut }: RoomInfoProps) => (
    <>
      <View className="mb-4 flex-row items-center gap-2">
        <MaterialIcons name="meeting-room" size={20} color="#4B5563" />
        <Text className="text-lg font-medium text-gray-900">
          {roomNumber} - {roomType}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <MaterialIcons name="access-time" size={20} color="#4B5563" />
        <Text className="text-lg font-medium text-gray-900">
          {checkIn} -&gt; {checkOut}
        </Text>
      </View>
    </>
  )
);
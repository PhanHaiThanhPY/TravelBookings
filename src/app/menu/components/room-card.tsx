import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { RoomBookingStatusColors } from '@/app/room-diagram/constants/colors';

import { type Room } from '../../room-diagram/types/room';
import { RoomStatusInfo } from './room-status-info';

interface RoomCardProps {
  room: Room;
  onPress?: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onPress }) => {
  const colorRoom = RoomBookingStatusColors[room.booking_status];

  return (
    <TouchableOpacity
      className="m-1 w-full flex-row justify-between rounded-lg border border-gray-100 bg-white p-3"
      onPress={() => onPress?.(room)}
    >
      <View className="w-[70%] items-start gap-2">
        <RoomStatusInfo
          booking_status={room.booking_status}
          occupants={room.occupants}
          isShowOccupants={true}
          height={32}
        />

        <View className="flex-row gap-2">
          <Text className="text-lg font-semibold text-gray-800">
            {room.number}
          </Text>

          <Text className={`text-xl ${colorRoom.text}`}>
            ({room.timeRemaining ?? '1 ngày 10 giờ 20 phút'})
          </Text>
        </View>

        <View className="flex-row items-center gap-2 space-x-1">
          <Ionicons name="bed-outline" size={24} color="#4B5563" />
          <Text className="ml-2 text-sm font-normal text-gray-600">
            {room.type}
          </Text>
        </View>
      </View>

      <View className="items-end justify-between">
        <TouchableOpacity
          className="mb-2 size-8 items-center justify-center rounded-full bg-gray-100"
          onPress={() => {
            /* TODO: Add your button action here */
          }}
        >
          <Text className="text-base text-gray-600">•••</Text>
        </TouchableOpacity>

        <Text className="text-base font-semibold text-blue-600">
          đ{room.price.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;

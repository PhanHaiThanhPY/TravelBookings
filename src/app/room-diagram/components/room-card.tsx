import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { roomStatusNames } from '../constants';
import { roomStatusColors } from '../constants/colors';
import { RoomStatus } from '../types';
import { type Room } from '../types/room';
import { OccupantCard } from './occupant-card';

interface RoomCardProps {
  room: Room;
  onPress?: (room: Room) => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onPress }) => {
  const colorRoom = roomStatusColors[room.status];

  const renderOccupants = () => {
    if (room.status !== RoomStatus.OCCUPIED || !room.occupants?.length) {
      return null;
    }

    const adultCount = room.occupants.filter((o) => !o.isChild).length;
    const childCount = room.occupants.filter((o) => o.isChild).length;

    return (
      <View className="h-full flex-row items-center gap-2">
        <OccupantCard count={adultCount} size={18} iconName={'person'} />
        <OccupantCard
          count={childCount}
          size={18}
          iconName={'person-outline'}
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      className="m-1 w-full flex-row justify-between rounded-lg border border-gray-100 bg-white p-3"
      onPress={() => onPress?.(room)}
    >
      <View className="w-[70%] items-start gap-2">
        <View className="flex-row items-start gap-2">
          <View className={`rounded-lg px-2 py-1 ${colorRoom.background}`}>
            <Text className={`px-2 text-sm ${colorRoom.text}`}>
              {roomStatusNames[room.status]}
            </Text>
          </View>
          {renderOccupants()}
        </View>

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

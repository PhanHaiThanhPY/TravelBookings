import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { RoomBookingStatusColors } from '@/app/room-diagram/constants/colors';
import { roomStatusName } from '@/app/room-diagram/constants';
import { type RoomStatus } from '@/app/room-diagram/types';
import { type Room } from '@/app/room-diagram/types/room';

interface RoomListProps {
  rooms: Room[];
  selectedRooms: string[];
  onSelectRoom: (roomId: string) => void;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  selectedRooms,
  onSelectRoom,
}) => {
  return (
    <ScrollView className="flex-1 p-2">
      {rooms.map((room) => {
        const floorNumber = 'Example';
        const statusBookingColor = RoomBookingStatusColors[room.booking_status];
        const isSelected = selectedRooms.includes(room.id);

        return (
          <TouchableOpacity
            key={room.id}
            className={`mb-3 rounded-xl border p-4 shadow-sm transition-all ${isSelected === false
                ? 'border-gray-100 bg-white'
                : 'border-gray-100 bg-blue-100'
              }`}
            onPress={() => onSelectRoom(room.id)}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View
                  className={`size-6 items-center justify-center rounded-full border-2 transition-colors ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}
                >
                  {isSelected && (
                    <Ionicons name="checkmark" size={16} color="white" />
                  )}
                </View>
                <View>
                  <Text className="text-lg font-semibold text-gray-900">
                    Phòng {room.number}
                  </Text>
                  <Text className="mt-1 text-sm text-gray-600">
                    Tầng {floorNumber}
                  </Text>
                </View>
              </View>
              <View
                className={`rounded-full px-3 py-1 ${statusBookingColor.background}`}
              >
                <Text className={statusBookingColor.text}>
                  {roomStatusName[room.status as RoomStatus]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
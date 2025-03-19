import React, { useMemo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { RoomCard } from '../../menu/components/room-card';
import { areaData } from '../constants';
import { mockRooms } from '../constants/rooms';
import { RoomBookingStatus } from '../types';
import { type RoomListProps } from '../types/room';

export const RoomList: React.FC<RoomListProps> = ({
  selectedArea,
  selectedStatuses,
  searchQuery = '',
  onRoomPress,
}) => {
  const filteredRooms = useMemo(() => {
    const isAllSelected = selectedStatuses.includes(RoomBookingStatus.ALL);
    const searchQueryLower = searchQuery.toLowerCase();

    return mockRooms.filter((room) => {
      if (selectedArea !== -1 && room.areaId !== selectedArea) return false;
      if (!isAllSelected && !selectedStatuses.includes(room.status))
        return false;
      if (
        searchQueryLower &&
        !room.number.toLowerCase().includes(searchQueryLower)
      )
        return false;
      return true;
    });
  }, [selectedArea, selectedStatuses, searchQuery]);

  const groupedRooms = useMemo(() => {
    const groups = new Map<number, typeof mockRooms>();
    filteredRooms.forEach((room) => {
      if (!groups.has(room.areaId)) {
        groups.set(room.areaId, []);
      }
      groups.get(room.areaId)?.push(room);
    });
    return groups;
  }, [filteredRooms]);

  if (!filteredRooms.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg text-gray-500">No rooms found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1">
      {Array.from(groupedRooms.entries()).map(([areaId, rooms]) => (
        <View key={areaId} className="">
          <View className="flex-row items-center justify-between px-5 py-1">
            <View className="flex-row items-center">
              <Text className="text-lg font-semibold text-gray-800">
                {areaData.find((area) => area.id === areaId)?.name}
              </Text>
              <Text className="ml-2 text-sm text-gray-500">
                ({rooms.length} phòng)
              </Text>
            </View>
          </View>

          <View className="flex-col flex-wrap p-2">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onPress={onRoomPress} />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default RoomList;

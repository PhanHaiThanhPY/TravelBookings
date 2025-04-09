import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchCustom from '@/components/custom/search-custom';
import { router, Stack } from 'expo-router';
import RoomItem from './room-item';
import { useRoom } from '@/lib/room';
import { Room } from '@/api/room/room';
import { formatPrice } from '@/lib';
import Header from '@/components/custom/header';
const generateRandomRooms = (count: number): Room[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: (index + 1).toString(),
    name: `P${Math.floor(Math.random() * 999)
      .toString()
      .padStart(3, '0')} - Tầng ${Math.floor(Math.random() * 5) + 1}`,
    status: Math.random() > 0.7 ? 'Chưa dọn' : '',
    type:
      Math.random() > 0.5
        ? 'Double/Phòng 01 giờ đến đối 2 nguồn'
        : 'Single/Phòng 01 giờ đến đối 1 nguồn',
    capacity:
      Math.random() > 0.5 ? '2 nguồn lớn, 0 trẻ em' : '1 nguồn lớn, 1 trẻ em',
    price: Math.floor(Math.random() * (2000000 - 800000) + 800000),
    selected: false,
  }));
};

const RoomSelectionScreen = () => {
  const { setRooms, rooms } = useRoom();
  const [localRooms, setLocalRooms] = useState<Room[]>(() => {
    const randomRooms = generateRandomRooms(10);
    return randomRooms.map((room) => ({
      ...room,
      selected: rooms.some((existingRoom) => existingRoom.id === room.id),
    }));
  });
  const [keySearch, setKeySearch] = useState('');

  const selectedRooms = localRooms.filter((room) => room.selected);
  const totalPrice = selectedRooms.reduce((sum, room) => sum + room.price, 0);

  const handleRoomSelect = (roomId: string) => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, selected: !room.selected } : room
      )
    );
  };

  const handleNavigateBack = () => {
    const selectedRoomData = localRooms.filter((room) => room.selected);
    router.back();
    setRooms(selectedRoomData);
  };

  const handleClearSelection = () => {
    setLocalRooms((prevRooms) =>
      prevRooms.map((room) => ({
        ...room,
        selected: false,
      }))
    );
  };

  return (
    <View className="flex-1">
      <Header title="Thêm phòng" onBackPress={() => router.back()} />
      <View className="mx-3 mb-3">
        <SearchCustom
          value={keySearch}
          onChangeText={(e) => {
            setKeySearch(e);
          }}
        />
      </View>

      <View className="flex-row justify-between px-4 mb-4">
        <TouchableOpacity className="flex-1 bg-white p-3 rounded-lg border border-gray-300 items-center mr-2">
          <Text className="text-sm text-gray-500">Nhận phòng</Text>
          <Text className="text-sm font-bold text-gray-800 mt-1">
            13:30 26/12
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 bg-white p-3 rounded-lg border border-gray-300 items-center mr-2">
          <Text className="text-sm text-gray-500">Trả phòng</Text>
          <Text className="text-sm font-bold text-gray-800 mt-1">
            13:00 26/12
          </Text>
        </TouchableOpacity>
        <View className="flex-[0.5] bg-white p-3 rounded-lg border border-gray-300 items-center justify-center">
          <Text className="text-sm font-bold text-gray-800">1 Ngày</Text>
        </View>
      </View>

      <View className="flex-1 mx-4">
        <FlatList
          data={localRooms}
          renderItem={({ item }) => (
            <RoomItem item={item} onSelect={() => handleRoomSelect(item.id)} type={'normal'} />
          )}
          keyExtractor={(item) => item.id}
          className="flex-1"
        />
      </View>

      <View className="flex-col justify-between p-4 bg-white border-t border-gray-200 gap-3 shadow-gray-200 shadow-md rounded-t-xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-medium flex-1">Tổng thanh toán</Text>
          <Text className="text-xl font-bold text-[#0866FF]">
            đ{formatPrice(totalPrice)}
          </Text>
          <Ionicons name="chevron-forward" size={20} color="#374151" />
        </View>
        <View className="flex-row justify-between items-center gap-3 m-4">
          <TouchableOpacity
            onPress={handleClearSelection}
            className="flex-1 border border-[#0866FF] rounded-lg py-3 items-center"
          >
            <Text className="text-[#0866FF] font-bold text-base">Bỏ chọn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNavigateBack}
            className="flex-1 bg-blue-500 rounded-lg py-3 items-center"
          >
            <Text className="text-white font-bold text-base">Chọn phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RoomSelectionScreen;

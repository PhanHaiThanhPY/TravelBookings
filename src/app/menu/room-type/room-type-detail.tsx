import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Animated,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { RoomBookingStatus } from '@/app/room-diagram/types';
import { BusinessStatus } from '@/app/room-diagram/types/business';

import { type Room } from '../../room-diagram/types/room';
import ImageSlider from './components/image-slider';
import { RoomList } from './components/room-list';
import { RoomTypeHeader } from './components/room-type-header';
import { type IRoomType } from './types';

const RoomTypeDetail = () => {
  const roomTypeDetail = useLocalSearchParams() as unknown as IRoomType;
  const { id } = roomTypeDetail;
  const [selectedTab, setSelectedTab] = useState('info');
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<string | null>(null);
  const roomTypes = [
    {
      id: '1',
      name: 'Standard Room',
      standardCapacity: 2,
      maxCapacity: 3,
      roomCount: 10,
      price: 500000,
    },
    {
      id: '2',
      name: 'Deluxe Room',
      standardCapacity: 2,
      maxCapacity: 4,
      roomCount: 8,
      price: 800000,
    },
    {
      id: '3',
      name: 'Suite Room',
      standardCapacity: 3,
      maxCapacity: 6,
      roomCount: 5,
      price: 1200000,
    },
  ];
  const [slideAnim] = useState(new Animated.Value(0));
  const [isEnabled, setIsEnabled] = useState(
    Number(roomTypeDetail.status) === BusinessStatus.DOING_BUSINESS
  );
  // const [showAmenities, setShowAmenities] = useState(false);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleTabChange = (tab: 'info' | 'rooms') => {
    setSelectedTab(tab);
  };

  const handleEditRoomType = () => {
    console.log('Edit room type');
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRooms(
      selectedRooms.includes(roomId)
        ? selectedRooms.filter((id) => id !== roomId)
        : [...selectedRooms, roomId]
    );
  };

  const renderHeader = () => (
    <RoomTypeHeader
      name={roomTypeDetail.name}
      description={roomTypeDetail.description}
      status={roomTypeDetail.status as unknown as BusinessStatus}
      selectedTab={selectedTab as 'info' | 'rooms'}
      roomCount={roomTypeDetail.roomCount}
      onTabChange={handleTabChange}
      onEdit={handleEditRoomType}
    />
  );

  const renderContent = () => {
    if (selectedTab === 'info') {
      const images = [1, 2, 3].map(
        (_, index) => `https://picsum.photos/400/300?random=${index}`
      );

      return (
        <View className="flex-1 flex-col gap-2 bg-white p-2">
          <ImageSlider images={images} />

          <View className="flex-row items-center justify-between px-2">
            <Text className="text-base font-normal">Business Status</Text>

            <Switch
              trackColor={{ false: '#CBD5E1', true: '#31A655' }}
              thumbColor={isEnabled ? '#FFFFFF' : '#94A3B8'}
              value={isEnabled}
              onValueChange={() => setIsEnabled(!isEnabled)}
            />
          </View>

          <View className="flex-1 gap-2 p-2">
            <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
              <View className="flex-row items-center gap-3">
                <Ionicons name="bed-outline" size={22} color="#6B7280" />
                <Text className="text-base font-normal">Number of Rooms</Text>
              </View>

              <Text className="text-black-600 text-base font-medium">
                {roomTypeDetail.roomCount ?? 0} room(s)
              </Text>
            </View>

            <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
              <View className="flex-row items-center gap-3">
                <Ionicons name="person-outline" size={22} color="#6B7280" />
                <Text className="text-base font-normal">
                  Standard Room Capacity
                </Text>
              </View>

              <Text className="text-black-600 text-base font-medium">
                {roomTypeDetail.standardCapacity ?? 0} người
              </Text>
            </View>
            <View className="flex-row items-center justify-between border-b border-gray-200 py-2">
              <View className="flex-row items-center gap-3">
                <Ionicons name="people-outline" size={22} color="#6B7280" />
                <Text className="text-base font-normal">
                  Maximum Room Capacity
                </Text>
              </View>
              <Text className="text-black-600 text-base font-medium">
                {roomTypeDetail.maxCapacity ?? 0} người
              </Text>
            </View>
            <View className="flex-row items-center justify-between py-3">
              <View className="flex-row items-center gap-3">
                <Ionicons name="cash-outline" size={22} color="#6B7280" />
                <Text className="text-base font-normal">Room Price</Text>
              </View>

              <Text className="text-base font-medium text-blue-600">
                đ{roomTypeDetail.price.toLocaleString()}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="mb-8 rounded-full bg-red-500 p-3"
            onPress={() => {
              // TODO: Add confirmation dialog and remove logic
              console.log('Remove room type');
            }}
          >
            <Text className="text-center text-base font-semibold text-white">
              Remove Room Type
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (selectedTab === 'rooms') {
      const rooms: Room[] = [
        {
          id: '1',
          number: 'P.205',
          type: 'Single',
          booking_status: RoomBookingStatus.AVAILABLE,
          price: roomTypeDetail.price,
          areaId: 1,
          occupants: [],
          status: 1,
        },
        {
          id: '2',
          number: 'P.206',
          type: 'Single',
          booking_status: RoomBookingStatus.OCCUPIED,
          price: roomTypeDetail.price,
          areaId: 1,
          occupants: [],
          status: 1,
        },
      ];

      return (
        <View className="">
          <View className="flex h-[70%] flex-col justify-between gap-2 bg-white p-2">
            <RoomList
              rooms={rooms}
              selectedRooms={selectedRooms}
              onSelectRoom={handleSelectRoom}
            />

            <View className="flex-row justify-between gap-2 border-t border-gray-100 bg-white p-4">
              <TouchableOpacity
                className={`flex-1 rounded-xl border border-gray-200 p-3 ${selectedRooms.length === 0 ? 'opacity-50' : ''}`}
                onPress={() => setSelectedRooms([])}
                disabled={selectedRooms.length === 0}
              >
                <Text className="text-center text-base font-semibold text-gray-700">
                  Clear Selection
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 rounded-xl bg-blue-600 p-3 ${selectedRooms.length === 0 ? 'opacity-50' : ''}`}
                onPress={() => setShowTransferModal(true)}
                disabled={selectedRooms.length === 0}
              >
                <Text className="text-center text-base font-semibold text-white">
                  {'Move Rooms' +
                    (selectedRooms.length ? ` (${selectedRooms.length})` : '')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {showTransferModal && (
            <View className="absolute inset-0 flex-1 items-center justify-center bg-black/50">
              <View className="m-4 w-full max-w-md rounded-xl bg-white p-4">
                <View className="mb-4 flex-row items-center justify-between">
                  <Text className="text-xl font-semibold text-gray-900">
                    Move to Room Type
                  </Text>
                  <TouchableOpacity onPress={() => setShowTransferModal(false)}>
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <Text className="mb-4 text-sm text-gray-600">
                  Select a room type to move {selectedRooms.length} room(s)
                </Text>

                <ScrollView className="max-h-96">
                  <View className="space-y-2">
                    {roomTypes.map((type) => (
                      <TouchableOpacity
                        key={type.id}
                        className={`flex-row items-center rounded-lg border p-3 ${selectedRoomType === type.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}
                        onPress={() => setSelectedRoomType(type.id)}
                      >
                        <View className="mr-3 size-5 items-center justify-center rounded-full border-2 border-gray-400">
                          {selectedRoomType === type.id && (
                            <View className="size-3 rounded-full bg-blue-600" />
                          )}
                        </View>
                        <View className="flex-1">
                          <Text className="text-base font-medium text-gray-900">
                            {type.name}
                          </Text>
                          <Text className="text-sm text-gray-500">
                            {type.standardCapacity} - {type.maxCapacity} người •{' '}
                            {type.roomCount} phòng
                          </Text>
                        </View>
                        <Text className="text-sm font-medium text-blue-600">
                          đ{type.price.toLocaleString()}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>

                <View className="mt-4 border-t border-gray-200 pt-4">
                  <TouchableOpacity
                    className={`w-full rounded-lg bg-blue-600 p-4 ${!selectedRoomType ? 'opacity-50' : ''}`}
                    disabled={!selectedRoomType}
                    onPress={() => {
                      // TODO: Implement room transfer logic
                      console.log('Transfer rooms to type:', selectedRoomType);
                      setShowTransferModal(false);
                      setSelectedRooms([]);
                      setSelectedRoomType(null);
                    }}
                  >
                    <Text className="text-center text-base font-semibold text-white">
                      Confirm Move
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          headerBackVisible: true,
          headerBackTitle: roomTypeDetail.name.toString(),
          headerTitle: roomTypeDetail.name.toString(),
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
      />
      <Animated.View
        style={{
          flex: 1,
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
        }}
      >
        <View>{renderHeader()}</View>
        {renderContent()}
      </Animated.View>
    </View>
  );
};

export default RoomTypeDetail;

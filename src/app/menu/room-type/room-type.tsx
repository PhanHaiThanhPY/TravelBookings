import { Ionicons } from '@expo/vector-icons';
import { Link, router, Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { SearchBar } from '../../room-diagram/components/search-bar';
import { BusinessStatus } from '../../room-diagram/types/business';
import { BusinessFilter } from './business-filter';
import { roomTypes } from './data/room-types';
import { RoomTypeCard } from './components/room-type-card';

const RoomType = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<BusinessStatus>(
    BusinessStatus.DOING_BUSINESS
  );

  const handleStatusChange = (status: BusinessStatus) => {
    setSelectedStatus(status);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: 'Hạng phòng',
          headerShadowVisible: false,
        }}
      />
      <View className="bg-white px-2">
        <SearchBar
          // value={searchQuery}
          // onChangeText={setSearchQuery}
          placeholder="Tìm kiếm hạng phòng"
        />
        <View className=" p-2">
          <BusinessFilter
            selectedStatus={selectedStatus}
            onStatusChange={handleStatusChange}
            roomCounts={{
              [BusinessStatus.ALL]: 48,
              [BusinessStatus.DOING_BUSINESS]: 36,
              [BusinessStatus.STOP_DOING_BUSINESS]: 12,
            }}
          />
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        {roomTypes.map((roomType) => (
          <TouchableOpacity
            key={roomType.id}
            onPress={() => {
              router.push({
                pathname: '/menu/room-type/room-type-detail',
                params: roomType as any,
              });
            }}
          >
            <RoomTypeCard
              name={roomType.name}
              description={roomType.description}
              status={roomType.status}
              roomCount={roomType.roomCount}
              price={roomType.price}
              dataDetail={roomType}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TODO: add new room type */}
      <Link href="/room-diagram/add-room-type" asChild>
        <TouchableOpacity className="absolute bottom-6 right-6 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg">
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default RoomType;

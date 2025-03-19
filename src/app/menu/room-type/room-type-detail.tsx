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

import {
  BusinessStatus,
  businessStatusColors,
  businessStatusNames,
} from '@/app/room-diagram/types/business';

import { ImageSlider } from './components/ImageSlider';
import { type IRoomType } from './types';

const RoomTypeDetail = () => {
  const roomTypeDetail = useLocalSearchParams() as unknown as IRoomType;
  const { id } = roomTypeDetail;
  const [selectedTab, setSelectedTab] = useState('info');
  const [slideAnim] = useState(new Animated.Value(0));
  const [isEnabled, setIsEnabled] = useState(
    Number(roomTypeDetail.status) === BusinessStatus.DOING_BUSINESS
  );
  const [showAmenities, setShowAmenities] = useState(false);

  React.useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderHeader = () => (
    <View className="bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold">{roomTypeDetail.name}</Text>
            <View
              className={`rounded-full px-3 py-1 ${businessStatusColors[roomTypeDetail.status as unknown as BusinessStatus].background}`}
            >
              <Text
                className={`text-sm font-bold ${businessStatusColors[roomTypeDetail.status as unknown as BusinessStatus].text}`}
              >
                {
                  businessStatusNames[
                  roomTypeDetail.status as unknown as BusinessStatus
                  ]
                }
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-base text-gray-600">
            {roomTypeDetail.description}
          </Text>
        </View>
        <TouchableOpacity
          className="rounded-full bg-blue-600 p-2 shadow-md"
          onPress={() => console.log('Edit room type')}
        >
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="mt-2 flex-row items-center justify-between rounded-xl bg-gray-50 p-1">
        <View className="flex-row rounded-xl bg-gray-50">
          <TouchableOpacity
            className={`flex-1 items-center rounded-lg border-2   p-2 ${selectedTab === 'info' ? ' border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
            onPress={() => setSelectedTab('info')}
          >
            <Text
              className={`font-semibold ${selectedTab === 'info' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center rounded-lg border-2   p-2 ${selectedTab === 'rooms' ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
            onPress={() => setSelectedTab('rooms')}
          >
            <Text
              className={`font-semibold ${selectedTab === 'rooms' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              Rooms
              {`Rooms (${roomTypeDetail.roomCount ?? 0})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    if (selectedTab === 'info') {
      const images = [1, 2, 3].map(
        (_, index) => `https://picsum.photos/400/300?random=${index}`
      );

      console.log(
        'roomTypeDetail.price.toLocaleString()',
        roomTypeDetail.price.toLocaleString()
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
            className="mt-8 rounded-full bg-red-500 p-3"
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
        <ScrollView>
          {renderHeader()}
          {renderContent()}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

export default RoomTypeDetail;

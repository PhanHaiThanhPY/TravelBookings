import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { type BusinessStatus } from '@/app/room-diagram/types/business';
import { businessStatusColors, businessStatusNames } from '@/app/room-diagram/types/business';

interface RoomTypeHeaderProps {
  name: string;
  description: string;
  status: BusinessStatus;
  selectedTab: 'info' | 'rooms';
  roomCount: number;
  onTabChange: (tab: 'info' | 'rooms') => void;
  onEdit: () => void;
}

export const RoomTypeHeader: React.FC<RoomTypeHeaderProps> = ({
  name,
  description,
  status,
  selectedTab,
  roomCount,
  onTabChange,
  onEdit,
}) => {
  return (
    <View className="bg-white p-4 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center gap-2">
            <Text className="text-2xl font-bold">{name}</Text>
            <View
              className={`rounded-full px-3 py-1 ${businessStatusColors[status].background}`}
            >
              <Text
                className={`text-sm font-bold ${businessStatusColors[status].text}`}
              >
                {businessStatusNames[status]}
              </Text>
            </View>
          </View>
          <Text className="mt-2 text-base text-gray-600">{description}</Text>
        </View>
        <TouchableOpacity
          className="rounded-full bg-blue-600 p-2 shadow-md"
          onPress={onEdit}
        >
          <Ionicons name="pencil" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View className="mt-2 flex-row items-center justify-between rounded-xl bg-gray-50 p-1">
        <View className="flex-row rounded-xl bg-gray-50">
          <TouchableOpacity
            className={`flex-1 items-center rounded-lg border-2 p-2 ${selectedTab === 'info' ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
            onPress={() => onTabChange('info')}
          >
            <Text
              className={`font-semibold ${selectedTab === 'info' ? 'text-blue-600' : 'text-gray-500'}`}
            >
              Information
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 items-center rounded-lg border-2 p-2 ${selectedTab === 'rooms' ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
            onPress={() => onTabChange('rooms')}
          >
            <Text
              className={`font-semibold ${selectedTab === 'rooms' ? 'text-blue-600' : 'text-gray-600'}`}
            >
              {`Rooms (${roomCount ?? 0})`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
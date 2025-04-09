import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { formatPrice } from '@/lib/utils';
import { Room } from '@/api/room/room';

interface RoomItemProps {
  item: Room;
  type: 'normal' | 'selected';
  onSelect?: () => void;
}

const RoomItem = ({ item, onSelect, type }: RoomItemProps) => (
  <TouchableOpacity
    onPress={onSelect}
    className={`flex-row items-center gap-2 p-3 rounded-lg bg-white border my-2 ${
      item.selected ? 'bg-blue-50 border-blue-500' : 'border-gray-200'
    }`}
  >
    <Image
      source={{ uri: 'https://placehold.co/400' }}
      className="w-20 h-20 rounded-lg mr-3"
    />
    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-gray-800">
          {item.name}
        </Text>
        <Text
          className={`text-base px-2 py-1 rounded ${
            !item.status
              ? 'text-emerald-600 bg-emerald-100'
              : 'text-red-500 bg-red-100'
          }`}
        >
          {item.status || 'Chưa đơn'}
        </Text>
      </View>
      <Text className="text-base text-gray-600">{item.type}</Text>
      <Text className="text-base text-gray-500">{item.capacity}</Text>
      <Text className="text-base font-semibold text-gray-800">
        đ{formatPrice(item.price)}
      </Text>
    </View>
    {item.selected && (
      <Ionicons
        name={`${type === 'selected' ? 'trash-outline' : 'checkmark-circle'}`}
        size={24}
        color={`${type === 'selected' ? '#ED3B36' : '#3B82F6'}`}
        className="ml-3"
      />
    )}
  </TouchableOpacity>
);

export default RoomItem;

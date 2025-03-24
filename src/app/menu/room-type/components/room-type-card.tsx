import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

import {
  type BusinessStatus,
  businessStatusColors,
  businessStatusNames,
} from '../../../room-diagram/types/business';
import { type IRoomType } from '../types';

interface RoomTypeCardProps {
  name: string;
  description: string;
  status: BusinessStatus;
  roomCount: number;
  price: number;
  imageUrl?: string;
  dataDetail: IRoomType;
}

export const RoomTypeCard: React.FC<RoomTypeCardProps> = ({
  name,
  description,
  status,
  roomCount,
  price,
  imageUrl,
  dataDetail,
}) => {
  const statusColor = businessStatusColors[status];

  return (
    <View className="mb-4 rounded-lg border border-gray-200 bg-white">
      <View className="flex-row">
        <View className="flex-1 p-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-3">
              <Image
                source={{
                  uri:
                    imageUrl ??
                    `https://picsum.photos/200/200?random=${Math.random()}`,
                }}
                className="size-[40px] rounded-full object-cover"
              />

              <View className="space-3 max-w-[80%] flex-col">
                <View className="flex-row gap-4">
                  <Text className="text-lg font-semibold text-gray-900">
                    {name}
                  </Text>
                  <View
                    className={`rounded-full p-2 ${statusColor.background} `}
                  >
                    <Text className={`text-xs font-bold ${statusColor.text}`}>
                      {businessStatusNames[status]}
                    </Text>
                  </View>
                </View>
                <Text className="line-clamp-2 text-wrap text-sm">
                  {description}
                </Text>
              </View>
            </View>
          </View>
          <View className="mt-2 h-px w-full bg-slate-200"></View>

          <View className="mt-3 flex-row items-center justify-between">
            <View className="flex-row items-center rounded-lg bg-gray-50 px-3 py-1.5">
              <Ionicons name="bed-outline" size={18} color="#4B5563" />
              <Text className="ml-2 text-sm font-medium text-gray-700">
                {roomCount} phòng
              </Text>
            </View>
            <Text className="text-lg font-semibold text-blue-600">
              đ{price.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

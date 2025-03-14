import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface OccupantCardProps {
  count: number;
  size: number;
  iconName: string;
}

export const OccupantCard: React.FC<OccupantCardProps> = ({
  count,
  size,
  iconName,
}) => {
  if (count <= 0) return null;

  return (
    <View className="round-lg h-full flex-row items-center rounded-lg bg-gray-100 px-2">
      <Ionicons name={iconName as any} size={size} color="#4B5563" />
      <Text className="ml-1 text-2xl text-gray-600">{count}</Text>
    </View>
  );
};

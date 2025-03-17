import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import {
  BusinessStatus,
  businessStatusNames,
} from '@/app/room-diagram/types/business';

export interface BusinessFilterProps {
  selectedStatus: BusinessStatus;
  onStatusChange: (status: BusinessStatus) => void;
  roomCounts?: Record<BusinessStatus, number>;
}

export const BusinessFilter: React.FC<BusinessFilterProps> = ({
  selectedStatus,
  onStatusChange,
  roomCounts = {},
}) => {
  const statusData = [
    { status: BusinessStatus.ALL },
    { status: BusinessStatus.DOING_BUSINESS },
    { status: BusinessStatus.STOP_DOING_BUSINESS },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row"
    >
      {statusData.map((item) => {
        const isSelected = selectedStatus === item.status;
        const statusColor = isSelected ? 'bg-blue-600' : 'bg-white';

        return (
          <TouchableOpacity
            key={item.status}
            className={`flex-row items-center ${statusColor} mr-2 rounded-full border border-gray-300 px-4 py-1`}
            onPress={() => onStatusChange(item.status)}
          >
            <Text className={`${isSelected ? 'text-white' : 'text-gray-700'}`}>
              {businessStatusNames[item.status]}
            </Text>
            <Text
              className={`ml-2 ${isSelected ? 'bg-white text-black' : 'bg-gray-500 text-white'} rounded-full px-2 text-xs`}
            >
              {roomCounts[item.status] ?? 0}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default BusinessFilter;

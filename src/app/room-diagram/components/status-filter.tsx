import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import { roomBookingStatusNames, statusData } from '../constants';
import { RoomBookingStatus, type StatusFilterProps } from '../types';

export const StatusFilter: React.FC<StatusFilterProps> = ({
  selectedStatuses,
  onToggleStatus,
  allowedStatuses,
}) => {
  const filteredStatusData = allowedStatuses
    ? statusData.filter((status) => allowedStatuses.includes(status.status))
    : statusData;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="flex-row"
    >
      {filteredStatusData.map((status) => {
        const isSelected = selectedStatuses.includes(status.status);
        const isAllStatus = status.status === RoomBookingStatus.ALL;

        return (
          <TouchableOpacity
            key={status.status}
            className={`flex-row items-center ${isSelected ? (isAllStatus ? 'bg-gray-800' : 'bg-blue-600') : 'bg-white'} mr-2 rounded-full border border-gray-300 px-4 py-1`}
            onPress={() => onToggleStatus(status.status)}
          >
            <Text className={`${isSelected ? 'text-white' : 'text-gray-700'}`}>
              {roomBookingStatusNames[status.status]}
            </Text>

            <Text
              className={`ml-2 ${isSelected ? 'bg-white text-black' : 'bg-gray-500 text-white'} rounded-full px-2 text-xs`}
            >
              {status.count}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default StatusFilter;

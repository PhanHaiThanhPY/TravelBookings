import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { AreaDropdown } from './components/area-dropdown';
import { SearchBar } from './components/search-bar';
import { StatusFilter } from './components/status-filter';
import { type Area, type RoomStatus } from './types';

interface RoomDiagramHeaderProps {
  selectedArea: Area;
  showAreaDropdown: boolean;
  selectedStatuses: RoomStatus[];
  searchQuery: string;
  onToggleStatus: (statusId: RoomStatus) => void;
  onSelectArea: (area: Area) => void;
  onToggleDropdown: () => void;
  setSearchQuery: (query: string) => void;
}

const RoomDiagramHeader: React.FC<RoomDiagramHeaderProps> = ({
  selectedArea,
  showAreaDropdown,
  selectedStatuses,
  onToggleStatus,
  onSelectArea,
  onToggleDropdown,
}) => {
  return (
    <View className="relative h-auto">
      <View className="z-1 flex-1 flex-row items-center justify-between gap-4 bg-white p-4">
        <View className="flex-row items-center">
          <View className="w-full flex-col items-start">
            <Text className="text-gray text-base">Chi nhánh 1</Text>
            <View className="mt-2 flex-row items-center justify-start gap-2">
              <Ionicons name="bed-outline" size={24} color="blue" />
              <Text className="text-2xl font-bold text-black">Sơ đồ phòng</Text>
            </View>

            <SearchBar />

            <View className="mt-4 flex w-full flex-row">
              <AreaDropdown
                selectedArea={selectedArea}
                showDropdown={showAreaDropdown}
                onToggleDropdown={onToggleDropdown}
                onSelectArea={onSelectArea}
              />

              <StatusFilter
                selectedStatuses={selectedStatuses}
                onToggleStatus={onToggleStatus}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RoomDiagramHeader;

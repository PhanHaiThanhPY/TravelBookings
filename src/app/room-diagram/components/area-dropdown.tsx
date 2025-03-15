import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { areaData } from '../constants';
import { type AreaDropdownProps } from '../types';

export const AreaDropdown: React.FC<AreaDropdownProps> = ({
  selectedArea,
  showDropdown,
  onToggleDropdown,
  onSelectArea,
  allowedAreas,
}) => {
  const filteredAreaData = allowedAreas
    ? areaData.filter((area) => allowedAreas.includes(area.id))
    : areaData;

  return (
    <View className="relative">
      <TouchableOpacity
        className="mr-3 flex-row items-center gap-1 rounded-md border border-gray-300 bg-white p-2"
        onPress={onToggleDropdown}
      >
        <Ionicons name="location-outline" size={20} color="black" />

        <Text className="text-base text-gray-800 ">{selectedArea.name}</Text>
        <Ionicons
          name={showDropdown ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#666"
          className=""
        />
      </TouchableOpacity>

      {showDropdown && (
        <>
          <TouchableWithoutFeedback onPress={onToggleDropdown}>
            <View className="fixed inset-0 bg-black/30" />
          </TouchableWithoutFeedback>
          <ScrollView className="absolute top-12 z-50 w-48 rounded-lg border border-gray-300 bg-white shadow-md">
            {filteredAreaData.map((area) => (
              <TouchableOpacity
                key={area.id}
                className={`w-full flex-row items-center border-b border-gray-100 px-4 py-3 ${selectedArea.id === area.id ? 'bg-blue-50' : 'bg-white'}`}
                onPress={() => onSelectArea(area)}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={selectedArea.id === area.id ? '#0866FF' : 'black'}
                />
                <Text
                  className={`ml-2 ${selectedArea.id === area.id ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
                >
                  {area.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

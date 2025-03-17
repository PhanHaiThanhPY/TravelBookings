import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AmenitiesListProps {
  amenities: string[];
  showAmenities: boolean;
  onToggleAmenities: () => void;
}

export const AmenitiesList: React.FC<AmenitiesListProps> = ({
  amenities,
  showAmenities,
  onToggleAmenities,
}) => {
  return (
    <View>
      <TouchableOpacity
        className="flex-row items-center justify-between"
        onPress={onToggleAmenities}
      >
        <Text className="text-lg font-semibold">Amenities</Text>
        <Ionicons
          name={showAmenities ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#4B5563"
        />
      </TouchableOpacity>

      {showAmenities && (
        <View className="mt-4 flex-row flex-wrap gap-2">
          {amenities.map((amenity, index) => (
            <View
              key={index}
              className="flex-row items-center rounded-full bg-blue-50 px-4 py-2"
            >
              <Ionicons name="checkmark-circle" size={16} color="#2563EB" />
              <Text className="ml-2 text-blue-700">{amenity}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface DropdownOption {
  id: number;
  name: string;
  icon: string;
}

interface CustomDropdownProps {
  selectedOption: DropdownOption;
  options: DropdownOption[];
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectOption: (option: DropdownOption) => void;
  icon?: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedOption,
  options,
  showDropdown,
  onToggleDropdown,
  onSelectOption,
  icon = 'location-outline',
  placeholder = 'Select an option',
}) => {
  console.log('options', options, 'showDropdown', showDropdown);

  return (
    <View className="relative">
      <TouchableOpacity
        className="max-w-30 min-w-30 mr-3 flex-row items-center gap-1 rounded-md border border-gray-300 bg-white p-2"
        onPress={onToggleDropdown}
        style={{
          width: 130,
        }}
      >
        <Ionicons name={icon as any} size={20} color="black" />

        <Text className="text-base text-gray-800">
          {selectedOption?.name || placeholder}
        </Text>
        <Ionicons
          name={showDropdown ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#666"
        />
      </TouchableOpacity>

      {showDropdown && (
        <>
          <TouchableWithoutFeedback onPress={onToggleDropdown}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            />
          </TouchableWithoutFeedback>
          <ScrollView
            style={{
              position: 'absolute',
              top: 48,
              width: 192,
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#e5e7eb',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              zIndex: 60,
            }}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                className={`w-full flex-row items-center border-b border-gray-100 px-4 py-3 ${selectedOption?.id === option.id ? 'bg-blue-50' : 'bg-white'}`}
                onPress={() => onSelectOption(option)}
              >
                <Ionicons
                  name={option.icon as any}
                  size={20}
                  color={selectedOption?.id === option.id ? '#0866FF' : 'black'}
                />
                <Text
                  className={`ml-2 ${selectedOption?.id === option.id ? 'font-semibold text-blue-600' : 'text-gray-700'}`}
                >
                  {option.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default CustomDropdown;

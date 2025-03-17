import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

import { type SearchBarProps } from '../types';

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Tìm kiếm theo số phòng, hạng phòng',
}) => (
  <View className="border-r-50 mt-4 w-full flex-row place-items-center rounded-full border border-gray-300 px-3 py-2">
    <Ionicons name="search-outline" size={24} color="gray" />
    <TextInput
      className="mb-1 ml-2 flex-1 text-base"
      placeholder={placeholder}
      placeholderTextColor="gray"
      // value={value}
      // onChangeText={onChangeText}
      clearButtonMode="while-editing"
    />
  </View>
);

export default SearchBar;

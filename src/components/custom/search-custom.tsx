import React, { useCallback } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { debounce } from 'lodash'; // Import debounce from lodash

interface SearchCustomProps {
  placeholder?: string;
  value: string; // Make value required since it's controlled
  onChangeText: (text: string) => void; // Make onChangeText required
}

const SearchCustom = ({
  placeholder = 'Tìm kiếm theo số phòng, hạng phòng',
  value,
  onChangeText,
}: SearchCustomProps) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={24} color="#6B7280" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="while-editing"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    marginTop: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1F2937',
  },
});

export default SearchCustom;

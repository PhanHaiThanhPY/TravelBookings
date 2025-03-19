import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SelectedDropdown = ({
  options = [],
  defaultValue = 'Chọn một tùy chọn',
  onSelect = (item: any) => {},
  placeholder = 'Chọn một tùy chọn',
  headerIcon = 'list',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const animValue = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    Animated.timing(animValue, {
      toValue: isOpen ? 0 : 1,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => {
      if (isOpen) setIsOpen(false);
    });
    if (!isOpen) setIsOpen(true);
  };

  const renderOption = ({ item }: { item: any }) => {
    const isSelected = item.label === selected;
    const itemAnim = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [20, 0],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          opacity: animValue.interpolate({
            inputRange: [0, 0.3, 1],
            outputRange: [0, 0.7, 1],
          }),
          transform: [{ translateY: itemAnim }],
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelected(item.label);
            toggleDropdown();
            onSelect(item);
          }}
          className={`flex-row items-center p-3  border-b border-gray-200 ${isSelected ? 'bg-[#E6F0FF] border-[#0866FF]' : ''}`}
        >
          {item.icon && (
            <MaterialIcons
              name={item.icon}
              size={20}
              color={isSelected ? '#0866FF' : '#374151'}
            />
          )}
          <Text
            className={`flex-1 ml-2 text-base ${isSelected ? 'text-[#0866FF]' : 'text-[#374151]'}`}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={{ maxWidth: 300, minWidth: 150 }}>
      <TouchableOpacity
        onPress={toggleDropdown}
        className="p-3 border-b  flex-row items-center justify-between bg-white rounded-lg border border-gray-300"
      >
        <View className="flex-row items-center gap-3">
          <MaterialIcons name={headerIcon as any} size={20} color="#6b7280" />
          <Text className="text-base text-gray-900">
            {selected === defaultValue ? placeholder : selected}
          </Text>
        </View>
        <MaterialIcons
          name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={20}
          color="#6b7280"
        />
      </TouchableOpacity>

      <Animated.View
        style={{
          position: 'absolute', // Đặt position absolute để nằm trên các view khác
          top: 50, // Điều chỉnh vị trí ngay dưới nút toggle (có thể thay đổi tùy theo chiều cao nút)
          left: 0,
          right: 0,
          zIndex: 10, // Đảm bảo hiển thị trên các view khác
          maxHeight: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 192],
            extrapolate: 'clamp',
          }),
          opacity: animValue,
          overflow: 'hidden',
          backgroundColor: 'white',
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#d1d5db',
          elevation: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 4],
          }),
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.1],
          }),
          shadowRadius: 4,
        }}
      >
        {isOpen && (
          <FlatList
            scrollEnabled={true}
            nestedScrollEnabled={true}
            data={options}
            renderItem={renderOption}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        )}
      </Animated.View>
    </View>
  );
};

export default SelectedDropdown;

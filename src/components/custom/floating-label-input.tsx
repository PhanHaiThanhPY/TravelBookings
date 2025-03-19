import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Animated } from 'react-native';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface InputProps {
  control: Control<any>;
  name: string;
  label: string;
  errors: FieldErrors;
  placeholder?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  disabled?: boolean;
  [key: string]: any;
}

export const FloatingLabelInput: React.FC<InputProps> = ({
  control,
  name,
  label,
  errors,
  placeholder,
  autoCapitalize = 'none',
  disabled = false,
  ...rest
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    if (disabled) return;
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (value: string) => {
    if (disabled) return;
    if (!value) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: 'absolute' as const,
    left: 12,
    backgroundColor: disabled ? '#F3F4F6' : 'white', // Nền label khớp với container
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [11, -10],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 14],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9CA3AF', '#1F2937'],
    }),
  };

  return (
    <View className="my-2">
      <View
        className={`relative border border-gray-300 rounded-xl ${
          disabled ? 'bg-[#F3F4F6]' : 'bg-white'
        }`}
      >
        <Animated.Text style={labelStyle}>{label}</Animated.Text>
        <View className="h-[40px] rounded-xl">
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInput
                  className="h-[40px] px-4 text-gray-700"
                  onFocus={handleFocus}
                  onBlur={() => {
                    onBlur();
                    handleBlur(value);
                  }}
                  onChangeText={onChange}
                  value={value || ''} // Đảm bảo value không bị undefined
                  autoCapitalize={autoCapitalize}
                  placeholder={placeholder}
                  placeholderTextColor="#6B7280" // Màu xám nhạt giống hình ảnh
                  editable={!disabled} // Vô hiệu hóa input khi disabled
                  style={{
                    backgroundColor: 'transparent', // Đảm bảo TextInput trong suốt
                    color: disabled ? '#1F2937' : '#1F2937', // Giữ màu text rõ ràng
                  }}
                  {...rest}
                />
              );
            }}
          />
        </View>
      </View>
      {errors[name] && (
        <Text className="text-red-500 mt-1 text-sm">
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </View>
  );
};

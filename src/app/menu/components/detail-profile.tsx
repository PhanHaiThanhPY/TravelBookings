import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { USER_INFO } from '../menu-header';

export default function ProfileEdit() {
  const [formData, setFormData] = useState({
    name: USER_INFO.NAME,
    phone: USER_INFO.PHONE,
    birthDate: '01/01/1999',
    address: '92 Yên Thế',
  });

  const [focused, setFocused] = useState({
    name: false,
    phone: false,
    address: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', address: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Họ và tên không được để trống';
      isValid = false;
    }

    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Địa chỉ không được để trống';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Form data:', formData);
    }
  };

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Thông tin cá nhân',
          headerShadowVisible: false,
          headerBackTitle: '',
        }}
      />
      <View className="flex-1 bg-white px-4">
        <View className="items-center py-6">
          <View className="relative">
            <Image
              source={{}}
              className="size-24 rounded-2xl bg-blue-100"
              resizeMode="cover"
            />
            <TouchableOpacity className="absolute -bottom-2 -right-2 rounded-full bg-blue-500 p-2">
              <Ionicons name="sync" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-col gap-4">
          <View className="">
            <Text className="text-sm font-medium text-gray-700">
              Họ và tên <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              className={`h-[50px] w-full rounded-lg border px-4 text-base text-gray-700 ${focused.name ? 'border-2 border-blue-500 shadow-sm' : 'border-gray-200'}`}
              onChangeText={(text) =>
                setFormData({ ...formData, name: text as any })
              }
              value={formData.name}
              autoCapitalize="none"
            />
            {errors.name ? (
              <Text className="text-sm text-red-500">{errors.name}</Text>
            ) : null}
          </View>

          <View className="">
            <Text className="text-sm font-medium text-gray-700">
              Số điện thoại
            </Text>
            <TextInput
              value={formData.phone}
              onChangeText={(text) =>
                setFormData({ ...formData, phone: text as any })
              }
              className={`h-[50px] w-full rounded-lg border px-4 text-base text-gray-700 ${focused.phone ? 'border-2 border-blue-500 shadow-sm' : 'border-gray-200'}`}
              keyboardType="phone-pad"
            />
            {errors.phone ? (
              <Text className="text-sm text-red-500">{errors.phone}</Text>
            ) : null}
          </View>

          <View className="">
            <Text className="text-sm font-medium text-gray-700">Địa chỉ</Text>
            <TextInput
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
              className={`h-[50px] w-full rounded-lg border px-4 text-base text-gray-700 ${focused.address ? 'border-2 border-blue-500 shadow-sm' : 'border-gray-200'}`}
            />
            {errors.address ? (
              <Text className="text-sm text-red-500">{errors.address}</Text>
            ) : null}
          </View>
        </View>

        <TouchableOpacity className="mb-10 mt-auto" onPress={handleSave}>
          <View className="rounded-xl bg-blue-500 p-4">
            <Text className="text-center text-base font-semibold text-white">
              Lưu
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

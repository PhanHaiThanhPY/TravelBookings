import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Header from '@/components/custom/header';
import SearchCustom from '@/components/custom/search-custom';
import IconUser from '../../../components/ui/assets/user.png';
import GradientButton from '@/components/custom/gradient-button';
import { generateMockCustomers } from '@/api/generate-mock-data';
import { useCustomer } from '@/lib/customer';

const ChooseCustomerScreen = () => {
  const [dataCustomers, setDataCustomers] = useState(generateMockCustomers(14));
  const { customers, setCustomers } = useCustomer();

  const handleSelectCustomer = (selectedId: string) => {
    const updatedCustomers = dataCustomers.map((customer) => ({
      ...customer,
      selected: customer.id === selectedId,
    }));
    setDataCustomers(updatedCustomers);
  };

  const handleChooseCustomer = () => {
    setCustomers(dataCustomers.filter((value) => value.selected)[0]);
    router.back();
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleSelectCustomer(item.id)}
      className={`flex-row items-center py-4 my-2 rounded-xl ${
        item.selected
          ? 'border border-[#0866FF] bg-[#E6F0FF]'
          : 'border border-[#E5E7EB] bg-white'
      }`}
    >
      <Image source={IconUser} className="size-12 mx-4" />
      <View>
        <Text
          className={`${item.selected ? 'text-[#0866FF]' : ''} font-medium`}
        >
          {item.name}
        </Text>
        <Text className="text-sm text-gray-500">{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header title="Chọn khách hàng" onBackPress={() => router.back()} />
      <View className="mx-4">
        <SearchCustom
          placeholder="Tìm theo tiềm khách hàng, số điện thoại"
          value=""
          onChangeText={(text) => {}}
        />
      </View>

      <FlatList
        data={dataCustomers}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        className="flex-1 mx-4 my-2"
      />

      <View className="h-14 w-14 flex items-center justify-center absolute bottom-24 rounded-full right-4 bg-[#0866FF]">
        <TouchableOpacity
          className="flex-row items-center "
          onPress={() => {
            router.push('/room-diagram/create-booking/create-customer-screen');
          }}
        >
          <Ionicons name="person-add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-col p-4 bg-white border-t border-gray-200 shadow-gray-200 shadow-md rounded-t-xl">
        <GradientButton title="Chọn" onPress={handleChooseCustomer} />
      </View>
    </>
  );
};

export default ChooseCustomerScreen;

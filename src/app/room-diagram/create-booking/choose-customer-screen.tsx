import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';

// Dữ liệu mẫu ban đầu cho danh sách khách hàng
const initialCustomers = [
  { id: '1', name: 'Lê Văn A', phone: '0938277777', selected: true },
  { id: '2', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '3', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '4', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '5', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '6', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '7', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '8', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '9', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '10', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '11', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '12', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '13', name: 'Lê Văn A', phone: '0938277777', selected: false },
  { id: '14', name: 'Lê Văn A', phone: '0938277777', selected: false },
];

const ChooseCustomerScreen = () => {
  // Sử dụng state để quản lý danh sách khách hàng và trạng thái selected
  const [customers, setCustomers] = useState(initialCustomers);

  // Hàm xử lý khi chọn khách hàng
  const handleSelectCustomer = (selectedId: string) => {
    // Cập nhật danh sách khách hàng: đặt selected thành true cho khách hàng được chọn, false cho các khách hàng khác
    const updatedCustomers = customers.map((customer) => ({
      ...customer,
      selected: customer.id === selectedId, // Chỉ khách hàng có id khớp với selectedId mới được chọn
    }));
    setCustomers(updatedCustomers);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => handleSelectCustomer(item.id)} // Gọi hàm khi nhấn vào khách hàng
      className={`flex-row items-center py-3 my-2 rounded-xl ${
        item.selected
          ? 'border border-[#0866FF] bg-[#E6F0FF]'
          : 'border border-[#E5E7EB] bg-white'
      }`}
    >
      <View className="mx-2">
        <Ionicons
          name={item.selected ? 'radio-button-on' : 'radio-button-off'}
          size={20}
          color={item.selected ? '#3B82F6' : '#6B7280'}
        />
      </View>
      <View className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center">
        <Ionicons name="person" size={20} color="#fff" />
      </View>
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
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Chọn khách hàng',
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#000',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      {/* Thanh tìm kiếm */}
      <View className="p-4 flex bg-white">
        <TextInput
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base"
          placeholder="Tìm theo tên khách hàng, số điện thoại"
          placeholderTextColor="#6B7280"
        />
      </View>

      {/* Danh sách khách hàng */}
      <View className="px-2 flex-1">
        <FlatList
          data={customers}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          className="flex-1"
        />
      </View>
      <View className="h-12 w-12 flex items-center justify-center absolute bottom-28 rounded-full right-4 bg-[#0866FF]">
        <TouchableOpacity
          className="flex-row items-center "
          onPress={() => {
            router.push('/room-diagram/create-booking/create-customer-screen');
          }}
        >
          <Ionicons name="person-add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      {/* Nút "Nhận phòng" ở dưới cùng */}
      <View className="flex-col p-4 bg-white border-t border-gray-200 shadow-gray-200 shadow-md rounded-t-xl">
        <TouchableOpacity className="bg-blue-500 rounded-lg py-3 items-center mb-4">
          <Text className="text-white font-bold text-base">Nhận phòng</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ChooseCustomerScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { IconEmpty } from '@/components/ui/icons/icon-empty';
import EmptyCustom from '@/components/custom/empty-custom';
import { styles } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';
import RoomItem from './room-item';
import { useRoom } from '@/lib/room';
import Header from '@/components/custom/header';
interface Room {
  id: string;
  name: string;
  status: string;
  type: string;
  capacity: string;
  price: number;
  selected: boolean;
}
const CreateBookingScreen = () => {
  const { rooms, setRooms } = useRoom();
  const [selectedRooms, setSelectedRooms] = useState<Room[]>([]);
  useEffect(() => {
    setSelectedRooms(rooms as any[]);
  }, [rooms]);

  const renderSelectedRooms = () => {
    if (selectedRooms.length === 0) {
      return <EmptyCustom />;
    }

    return selectedRooms.map((item) => <RoomItem key={item.id} item={item} />);
  };
  const handleBackPress = () => {
    setRooms([]);
    router.back();
  };
  return (
    <>
      <Header title="Thêm đặt phòng" onBackPress={handleBackPress} />
      <ScrollView className="flex-1 bg-white">
        <View className=" flex flex-col gap-3 p-4 ">
          <Text className="text-xl font-bold ">Thông tin khách hàng</Text>
          <TouchableOpacity
            className="flex-row items-center"
            onPress={() => {
              router.push(
                '/room-diagram/create-booking/choose-customer-screen'
              );
            }}
          >
            <Ionicons
              name="person-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Khách lẻ</Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-200"></View>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons
              name="people-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">
              1 người lớn & 0 trẻ em & 0 giặt tẩy
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
        <View className="w-full h-[10px] bg-gray-100"></View>
        {/* Thông tin phòng */}
        <View className=" flex flex-col p-4">
          <Text className="text-xl font-bold">Thông tin phòng</Text>
          {renderSelectedRooms()}
          <TouchableOpacity
            onPress={() => {
              router.push('/room-diagram/create-booking/room-selection-screen');
            }}
            className="flex-row border items-center justify-center border-[#0866FF] rounded-lg py-3  "
          >
            <Ionicons name="add" size={20} color="#0866FF" className="mr-3" />
            <Text className="text-[#0866FF] font-bold text-base">
              Thêm phòng
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-[10px] bg-gray-100"></View>
        {/* Thông tin dịch vụ */}
        <View className="flex flex-col gap-3 p-4">
          <Text className="text-xl font-bold">Thông tin dịch vụ</Text>
          <TouchableOpacity className="flex-row items-center  ">
            <Ionicons
              name="storefront-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Kênh bán</Text>
            <Text className="text-base font-bold text-[#001416] mr-2">
              Khách đến trực tiếp
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-200"></View>
          <TouchableOpacity className="flex-row items-center">
            <Ionicons
              name="person-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Nhân viên đặt</Text>
            <Text className="text-base font-bold text-[#001416] mr-2">
              Admin
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-200"></View>
          <TouchableOpacity className="flex-row items-center ">
            <Ionicons
              name="pricetag-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Bằng giá</Text>
            <Text className="text-base font-bold text-[#001416] mr-2">
              Mặc định
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-200"></View>
          <TouchableOpacity className="flex-row items-center ">
            <Ionicons
              name="time-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Thời gian đặt</Text>
            <Text className="text-base font-bold text-[#001416]">
              Thứ 2, 25/12/2024 - 14:00
            </Text>
          </TouchableOpacity>
          <View className="w-full h-[1px] bg-gray-200"></View>
          <TouchableOpacity className="flex-row items-center ">
            <Ionicons
              name="pencil-outline"
              size={20}
              color="#374151"
              className="mr-3"
            />
            <Text className="text-base flex-1">Ghi chú</Text>
            <Text className="text-base text-[#001416] mr-2">Nhập ghi chú</Text>
            <Ionicons name="chevron-forward" size={20} color="#374151" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Nút hành động */}
      <View className="flex-col justify-between p-4 bg-white border-t border-gray-200  gap-3 shadow-gray-200 shadow-md rounded-t-xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-medium flex-1">Tổng thanh toán</Text>
          <Text className="text-xl font-bold text-[#0866FF]">đ1,650,000</Text>
          <Ionicons name="chevron-forward" size={20} color="#374151" />
        </View>
        <View className="flex-row justify-between items-center gap-3  mb-4">
          <TouchableOpacity className="flex-1 border border-[#0866FF] rounded-lg py-3 items-center ">
            <Text className="text-[#0866FF] font-bold text-base">
              Đặt trước
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg py-3 items-center">
            <Text className="text-white font-bold text-base">Nhận phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CreateBookingScreen;

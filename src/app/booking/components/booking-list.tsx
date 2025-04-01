import { MaterialIcons } from '@expo/vector-icons';
import { router, type UnknownInputParams } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { RoomStatusInfo } from '@/app/menu/components/room-status-info';
import { RoomBookingStatus } from '@/app/room-diagram/types';

interface BookingItem {
  id: string;
  roomNumber: string;
  roomType: string;
  status: number;
  checkIn: string;
  checkOut: string;
  customerName: string;
  amount: number;
  booking_status: RoomBookingStatus;
  created_at: string;
  payment_status: number;
  total: number;
  paid: number;
  discount: number;
  note: string;
  guests: any;
  services: any[];
}

interface BookingListProps {
  bookings: BookingItem[];
}

const mockBookings: BookingItem[] = [
  {
    id: 'DPD00123',
    roomNumber: 'P205',
    roomType: 'Double',
    booking_status: RoomBookingStatus.AVAILABLE,
    checkIn: '19/12/2024 - 12:00',
    checkOut: '21/12/2024 - 12:00',
    customerName: 'Khách lẻ',
    amount: 2300000,
    status: 1,
    created_at: '20/03/2025 12:00',
    payment_status: 1,
    total: 2300000,
    paid: 1000000,
    discount: 100000,
    note: 'Khách VIP',
    guests: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    services: [
      {
        name: 'Giặt ủi',
        quantity: 2,
        price: 150000,
      },
      {
        name: 'Đồ ăn sáng',
        quantity: 3,
        price: 100000,
      },
      {
        name: 'Dịch vụ spa',
        quantity: 1,
        price: 500000,
      },
    ],
  },
  {
    id: 'DPD00124',
    roomNumber: 'P205',
    roomType: 'Double',
    booking_status: RoomBookingStatus.CLEANING,
    checkIn: '19/12/2024 - 12:00',
    checkOut: '21/12/2024 - 12:00',
    customerName: 'Khách lẻ',
    amount: 1650000,
    status: 1,
    created_at: '20/03/2025 12:00',
    payment_status: 1,
    total: 1650000,
    paid: 1000000,
    discount: 50000,
    note: '',
    guests: {
      adults: 2,
      children: 0,
      infants: 1,
    },
    services: [
      {
        name: 'Minibar',
        quantity: 1,
        price: 200000,
      },
      {
        name: 'Đồ ăn trưa',
        quantity: 2,
        price: 150000,
      },
    ],
  },
  {
    id: 'DPD00125',
    roomNumber: 'P205',
    roomType: 'Double',
    booking_status: RoomBookingStatus.OUT_OF_SERVICE,
    checkIn: '19/12/2024 - 12:00',
    checkOut: '21/12/2024 - 12:00',
    customerName: 'Khách lẻ',
    amount: 1650000,
    status: 1,
    created_at: '20/03/2025 12:00',
    payment_status: 2,
    total: 1650000,
    paid: 1650000,
    discount: 0,
    note: '',
    guests: {
      adults: 1,
      children: 2,
      infants: 0,
    },
    services: [
      {
        name: 'Đồ ăn tối',
        quantity: 3,
        price: 200000,
      },
    ],
  },
  {
    id: 'DPD00126',
    roomNumber: 'P205',
    roomType: 'Double',
    booking_status: RoomBookingStatus.OCCUPIED,
    checkIn: '19/12/2024 - 12:00',
    checkOut: '21/12/2024 - 12:00',
    customerName: 'Khách lẻ',
    amount: 1650000,
    status: 1,
    created_at: '20/03/2025 12:00',
    payment_status: 1,
    total: 1650000,
    paid: 500000,
    discount: 150000,
    note: 'Khách quen',
    guests: {
      adults: 2,
      children: 1,
      infants: 1,
    },
    services: [
      {
        name: 'Giặt ủi',
        quantity: 1,
        price: 150000,
      },
      {
        name: 'Đồ ăn sáng',
        quantity: 4,
        price: 100000,
      },
    ],
  },
];

export const BookingList: React.FC<BookingListProps> = () => {
  return (
    <ScrollView className="flex-1">
      {mockBookings.map((booking) => (
        <TouchableOpacity
          key={booking.id}
          className="mx-4 my-2 rounded-lg bg-white p-4 shadow-md"
          onPress={() => {
            router.push({
              pathname: `/booking/components/booking-detail`,
              params: booking as unknown as UnknownInputParams,
            });
          }}
        >
          <View className=" flex-row items-center justify-between">
            <RoomStatusInfo
              booking_status={booking.booking_status}
              occupants={[]}
              isShowOccupants={false}
              height={32}
            />
            <Text className="text-base text-gray-500">
              {booking.created_at}
            </Text>
          </View>
          <View className="my-2">
            <View className="mb-2 flex-row items-center gap-2">
              <MaterialIcons name="people" size={16} color="#4B5563" />
              <Text className="ml-2 flex-1 text-lg font-semibold ">
                {'Khách lẻ'}
              </Text>
            </View>
            <View className="mb-2 flex-row  gap-2">
              <MaterialIcons name="meeting-room" size={16} color="#4B5563" />
              <Text className="ml-2 flex-1 text-base font-normal ">
                {booking.roomNumber + ' - ' + booking.roomType}
              </Text>
            </View>
            <View className="mb-2 flex-row  gap-2">
              <MaterialIcons name="access-time" size={16} color="#4B5563" />
              <Text className="ml-2 flex-1 text-base font-normal ">
                {booking.checkIn} -&gt; {booking.checkOut}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center justify-between border-t border-gray-200 pt-3">
            <View className="flex-row items-center">
              <MaterialIcons name="house" size={24} />
              <View className="ml-2 flex-col items-start">
                <Text className="text-base font-normal text-gray-500">
                  Khách trực tiếp
                </Text>
                <Text className="text-lg font-normal">{booking.id}</Text>
              </View>
            </View>

            {booking.payment_status === 2 ? (
              <View className="flex-row items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
                <MaterialIcons name="check" size={20} color="#10B981" />
                <Text className="text-sm font-medium text-green-600">
                  Đã thanh toán
                </Text>
              </View>
            ) : (
              <View className="flex-row items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
                <MaterialIcons name="payments" size={20} color="#4B5563" />
                <Text className="text-base font-medium ">
                  đ{booking.amount.toLocaleString('vi-VN')}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default BookingList;

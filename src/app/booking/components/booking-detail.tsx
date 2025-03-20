import { MaterialIcons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { RoomStatusInfo } from '@/app/menu/components/room-status-info';
import { type RoomBookingStatus } from '@/app/room-diagram/types';

type ServiceInfo = {
  name: string;
  quantity: number;
  price: number;
};

type PaymentInfo = {
  total: number;
  paid: number;
  discount: number;
  note: string;
};

interface BookingItem extends PaymentInfo {
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
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  services: ServiceInfo[];
}

const CustomerInfo = memo(
  ({
    customerName,
    guests,
  }: {
    customerName: string;
    guests: BookingItem['guests'];
  }) => (
    <View className="mb-4 flex-row items-center gap-2">
      <MaterialIcons name="people" size={20} color="#4B5563" />
      <Text className="text-lg font-medium text-gray-900">{customerName}</Text>
      <Text className="ml-auto text-sm text-gray-600">
        {/* {guests.adults} người lớn & {guests.children} trẻ em & {guests.infants}{' '} */}
        giấy tờ
      </Text>
    </View>
  )
);

const RoomInfo = memo(
  ({
    roomNumber,
    roomType,
    checkIn,
    checkOut,
  }: {
    roomNumber: string;
    roomType: string;
    checkIn: string;
    checkOut: string;
  }) => (
    <>
      <View className="mb-4 flex-row items-center gap-2">
        <MaterialIcons name="meeting-room" size={20} color="#4B5563" />
        <Text className="text-lg font-medium text-gray-900">
          {roomNumber} - {roomType}
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <MaterialIcons name="access-time" size={20} color="#4B5563" />
        <Text className="text-lg font-medium text-gray-900">
          {checkIn} -&gt; {checkOut}
        </Text>
      </View>
    </>
  )
);

const ServiceInfo = () => (
  <View className="space-y-2">
    <View className="flex-row items-center gap-2">
      <MaterialIcons name="room-service" size={20} color="#4B5563" />
      <Text className="text-lg font-medium text-gray-900">
        Thông tin dịch vụ
      </Text>
    </View>
    {/* {services.map((service, index) => (
      <View key={index} className="flex-row items-center justify-between">
        <Text className="text-base text-gray-700">{service.name}</Text>
        <View className="flex-row items-center gap-4">
          <Text className="text-sm text-gray-600">x{service.quantity}</Text>
          <Text className="text-base font-medium text-gray-900">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(service.price)}
          </Text>
        </View>
      </View> */}
    {/* ))} */}
  </View>
);

const PaymentInfo = memo(({ payment }: { payment: PaymentInfo }) => (
  <View className="space-y-2">
    <View className="flex-row items-center justify-between">
      <Text className="text-base text-gray-700">Tổng tiền hàng</Text>
      <Text className="text-base font-medium text-gray-900">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(payment.total)}
      </Text>
    </View>
    <View className="flex-row items-center justify-between">
      <Text className="text-base text-gray-700">Khách đã trả</Text>
      <Text className="text-base font-medium text-green-600">
        -
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(payment.paid)}
      </Text>
    </View>
    <View className="flex-row items-center justify-between">
      <Text className="text-base text-gray-700">Giảm giá</Text>
      <Text className="text-base font-medium text-red-600">
        -
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(payment.discount)}
      </Text>
    </View>
    {payment.note && (
      <View className="mt-2">
        <Text className="text-base text-gray-700">Ghi chú:</Text>
        <Text className="text-sm text-gray-600">{payment.note}</Text>
      </View>
    )}
  </View>
));

const PaymentStatus = memo(
  ({ status, amount }: { status: number; amount: number }) => {
    if (status === 2) {
      return (
        <View className="flex-row items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
          <MaterialIcons name="check" size={20} color="#10B981" />
          <Text className="text-sm font-medium text-green-600">
            Đã thanh toán
          </Text>
        </View>
      );
    }

    function formatCurrency(amount: number): React.ReactNode {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
    }

    return (
      <View className="flex-row items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
        <MaterialIcons name="payments" size={20} color="#4B5563" />
        <Text className="text-sm font-medium text-gray-600">
          {formatCurrency(amount)}
        </Text>
      </View>
    );
  }
);

export const BookingDetail = () => {
  const params = useLocalSearchParams() as unknown as BookingItem;

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chi tiết booking',
          headerShown: true,
        }}
      />
      <ScrollView className="flex-1 gap-4 bg-white p-4">
        {/* Header Section */}
        <View className="flex-row items-center justify-between rounded-lg border border-gray-200 p-4">
          <View className="flex-row items-center gap-2">
            <MaterialIcons name="house" size={24} />
            <Text className="text-lg font-medium">Booking ID: {params.id}</Text>
          </View>
          <Text className="text-base text-gray-500">{params.created_at}</Text>
        </View>

        {/* Customer & Room Info Section */}
        <View className="space-y-4 rounded-lg border border-gray-200 p-4">
          <View className="flex-row items-center justify-between">
            <RoomStatusInfo
              booking_status={params.booking_status}
              occupants={[]}
              isShowOccupants={false}
              height={32}
            />
            <PaymentStatus
              status={params.payment_status}
              amount={params.amount}
            />
          </View>
          <CustomerInfo
            customerName={params.customerName}
            guests={params.guests}
          />
          <RoomInfo
            roomNumber={params.roomNumber}
            roomType={params.roomType}
            checkIn={params.checkIn}
            checkOut={params.checkOut}
          />
        </View>

        {/* Service Info Section */}
        <View className="rounded-lg border border-gray-200 p-4">
          <ServiceInfo services={params.services} />
        </View>

        {/* Payment Info Section */}
        <View className="rounded-lg border border-gray-200 p-4">
          <PaymentInfo
            payment={{
              total: params.total,
              paid: params.paid,
              discount: params.discount,
              note: params.note,
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};
export default BookingDetail;

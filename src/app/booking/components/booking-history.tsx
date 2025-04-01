import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { PAYMENT_STATUS } from './../utils';

// const PAYMENT_STATUS = {
//   PENDING: 'Chưa thanh toán',
//   PAID: 'Đã thanh toán',
// } as const;

type IHistoryItem = {
  id: string;
  roomNumber: string;
  roomType: string;
  location: string;
  date: string;
  amount: number;
  type: string;
  note: string;
  paymentStatus: number; // 'Chưa thanh toán' | 'Đã thanh toán'
};

const mockHistoryData: IHistoryItem[] = [
  {
    id: '1',
    roomNumber: 'P.205',
    roomType: 'Double',
    location: 'Hồ Chí Minh',
    date: '2024-03-21 12:30',
    amount: 1650000,
    type: 'Chưa thanh toán',
    note: 'Thanh toán phòng',
    paymentStatus: PAYMENT_STATUS.PAID,
  },
  {
    id: '2',
    roomNumber: 'P.202',
    roomType: 'Triple',
    location: 'Hồ Chí Minh',
    date: '21/03/2025 12:30',
    amount: 1650000,
    type: 'Chưa thanh toán',
    note: 'Thanh toán phòng',
    paymentStatus: PAYMENT_STATUS.UNPAID,
  },
  {
    id: '3',
    roomNumber: 'P.205',
    roomType: 'Double',
    location: 'Hồ Chí Minh',
    date: '21/03/2025 12:30',
    amount: 1650000,
    type: 'Chưa thanh toán',
    note: 'Thanh toán phòng',
    paymentStatus: PAYMENT_STATUS.UNPAID,
  },
];

const groupByDate = (items: IHistoryItem[]) => {
  const groups: { [key: string]: IHistoryItem[] } = {};
  const today = new Date().toISOString().split('T')[0];

  items.forEach((item) => {
    const itemDate = item.date.split(' ')[0];
    const key = itemDate === today ? 'Hôm nay' : itemDate;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });

  return Object.entries(groups);
};

const HistoryItem: React.FC<{ item: IHistoryItem }> = ({ item }) => {
  console.log('aaa');

  let paymentStatus = '';
  let statusColor = '';

  if (item.paymentStatus === PAYMENT_STATUS.PAID) {
    paymentStatus = '';
    statusColor = 'black';
  } else {
    paymentStatus = 'Chưa thanh toán';
    statusColor = 'blue-600';
  }

  return (
    <>
      <View className="mb-4 rounded-lg border border-gray-100 bg-white p-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-4">
            <Text className="text-lg font-medium text-gray-900">
              {item.roomNumber}
            </Text>
            <View
              className={`${item.paymentStatus === PAYMENT_STATUS.UNPAID ? 'bg-gray-100 border-' + statusColor : ''} rounded-full `}
            >
              <Text
                className={`mx-4 text-base font-medium ${'text-' + statusColor}`}
              >
                {paymentStatus}
              </Text>
            </View>
          </View>
          <Text className="text-sm text-gray-500">
            {item.date.split(' ')[1]}
          </Text>
        </View>

        <View className=" flex-row items-center justify-between gap-2">
          <View className="flex-col items-start">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="location-on" size={16} color="#4B5563" />
              <Text className="text-base text-gray-700">{item.location}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialIcons
                name="hotel"
                size={16}
                color="#4B5563"
                className=""
              />
              <Text className="text-base text-gray-700">{item.roomType}</Text>
            </View>
          </View>
          <Text
            className={`justify-items-end text-base font-medium ${'text-' + statusColor} `}
          >
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(item.amount)}
          </Text>
        </View>
      </View>
    </>
  );
};

export const BookingHistory: React.FC = () => {
  const groupedHistory = groupByDate(mockHistoryData);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {groupedHistory.map(([date, items]) => (
        <View key={date} className="mb-6">
          <Text className="mb-2 text-lg font-semibold text-gray-900">
            {date}
          </Text>
          {items.map((item) => (
            <HistoryItem key={item.id} item={item} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BookingHistory;

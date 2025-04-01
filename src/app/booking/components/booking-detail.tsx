import { MaterialIcons } from '@expo/vector-icons';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { type BookingItem, formatCurrency, TAB_TYPE } from '../utils';
import { BookingHistory } from './booking-history';
import { PaymentInfo } from './payment-info';
import ServiceInfo from './service-info';

export const BookingDetail: React.FC = () => {
  const params = useLocalSearchParams() as unknown as BookingItem as any;
  const [selectedTab, setSelectedTab] = useState('info');
  const countOrder = 1;

  const handleTabChange = (tab: (typeof TAB_TYPE)[keyof typeof TAB_TYPE]) => {
    setSelectedTab(tab as any);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Chi tiết booking',
          headerShown: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Section */}
        <View className="mt-2 flex-row items-center justify-between rounded-xl bg-gray-50 p-2">
          <View className="flex-row rounded-xl bg-gray-50">
            <TouchableOpacity
              className={`flex-1 items-center rounded-lg border-2 p-2 ${selectedTab === TAB_TYPE.INFO ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
              onPress={() => handleTabChange(TAB_TYPE.INFO)}
            >
              <Text
                className={`font-medium ${selectedTab === TAB_TYPE.INFO ? 'text-blue-600' : 'text-gray-500'}`}
              >
                Information
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 items-center rounded-lg border-2 p-2 ${selectedTab === TAB_TYPE.HISTORY ? 'border-gray-100 bg-white' : 'border-transparent bg-gray-50'}`}
              onPress={() => handleTabChange(TAB_TYPE.HISTORY)}
            >
              <Text
                className={`font-medium ${selectedTab === TAB_TYPE.HISTORY ? 'text-blue-600' : 'text-gray-600'}`}
              >
                {`Lịch sử hoá đơn (${countOrder})`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedTab === TAB_TYPE.HISTORY ? (
          <BookingHistory />
        ) : (
          <ScrollView className="flex bg-gray-100 p-2">
            <View className="flex-1 gap-4 space-y-4 pb-20">
              {/* Customer & Room Info Section */}
              <View className="flex-1 gap-2 rounded-lg border border-gray-200 bg-white p-4">
                <Text className="text-xl font-semibold text-gray-900">
                  Thông tin khách hàng
                </Text>

                <View className="mt-2 flex-1 gap-2">
                  {/* Customer Info */}
                  <TouchableOpacity
                    className="flex-row items-center gap-4"
                    onPress={() => {
                      console.log('view customer details');
                    }}
                  >
                    <MaterialIcons name="person" size={24} color="#4B5563" />
                    <View className="flex-1 items-start space-x-2">
                      <Text className="text-base text-black">
                        {params?.customerName || 'N/A'}
                      </Text>
                      <Text className="text-base text-black">
                        {params?.phone || '0362797727'}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={20}
                      color="#4B5563"
                    />
                  </TouchableOpacity>

                  {/* create a border bot  */}
                  <View className="h-0.5 bg-gray-200" />

                  {/* Guest Info */}
                  <TouchableOpacity className="flex-row items-center gap-4">
                    <MaterialIcons name="people" size={24} color="#4B5563" />
                    <View className="flex-1 items-start space-x-2">
                      <Text className="text-base text-black">
                        {`${params?.guests?.adults || 0} người lớn & ${params?.guests?.children || 0} trẻ em & ${params?.guests?.infants || 0} giấy tờ`}
                      </Text>
                    </View>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={20}
                      color="#4B5563"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Rooms Info Section */}
              <View className="flex-1 gap-2 rounded-lg border border-gray-200 bg-white p-4">
                <Text className="text-xl font-semibold text-gray-900">
                  {`Thông tin phòng (${params?.rooms?.length || 0})`}
                </Text>

                <View className="mt-2 flex-1 gap-4">
                  {/* Room Info */}
                  <View className="flex-row items-center gap-4">
                    <MaterialIcons name="hotel" size={24} color="#4B5563" />
                    <View className="flex-1 items-start space-y-2">
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex-col items-start">
                          <Text className="text-base font-medium text-black">
                            {`${params?.roomNumber || 'N/A'} - Tầng ${Math.floor(Number(params?.roomNumber?.slice(1)) / 100) || 'N/A'}`}
                          </Text>
                          <View className="flex-row items-center rounded-full bg-green-100 px-4 py-1.5">
                            <Text className="text-sm font-medium text-green-600">
                              {'Đã ở 2 phút'}
                            </Text>
                          </View>
                        </View>
                        <MaterialIcons
                          name="change-circle"
                          size={24}
                          color="#4B5563"
                          onPress={() => {
                            console.log('change room');
                          }}
                        />
                      </View>
                      <Text className="text-base text-gray-600">
                        {params?.roomType || 'N/A'} 1 giường đôi 2 người
                      </Text>
                      <View className="flex-1 items-start space-y-2">
                        <Text className="text-base text-black">
                          {`${params?.checkIn || 'N/A'}`} -&gt;{' '}
                          {`${params?.checkOut || 'N/A'}`}
                        </Text>
                      </View>

                      <View className="flex-row flex-wrap items-start">
                        <Text className="text-base text-black">
                          {`Thời gian dự kiến: ${2} ngày`}
                          {' | '}
                        </Text>
                        <Text className="text-base text-blue-700">
                          {formatCurrency(params?.amount) || '0'}
                        </Text>
                        <Text className="text-base text-black">x 1 đêm</Text>
                      </View>
                    </View>
                  </View>
                  <View className="h-0.5 bg-gray-200" />

                  <View className="flex-row items-center gap-4">
                    <MaterialIcons name="hotel" size={24} color="#4B5563" />
                    <View className="flex-1 items-start space-y-2">
                      <View className="flex w-full flex-row items-center justify-between">
                        <View className="flex-col items-start">
                          <Text className="text-base font-medium text-black">
                            {`${params?.roomNumber || 'N/A'} - Tầng ${Math.floor(Number(params?.roomNumber?.slice(1)) / 100) || 'N/A'}`}
                          </Text>
                          <View className="flex-row items-center rounded-full bg-green-100 px-4 py-1.5">
                            <Text className="text-sm font-medium text-green-600">
                              {'Đã ở 2 phút'}
                            </Text>
                          </View>
                        </View>
                        <MaterialIcons
                          name="change-circle"
                          size={24}
                          color="#4B5563"
                          onPress={() => {
                            console.log('change room');
                          }}
                        />
                      </View>
                      <Text className="text-base text-gray-600">
                        {params?.roomType || 'N/A'} 1 giường đôi 2 người
                      </Text>
                      <View className="flex-1 items-start space-y-2">
                        <Text className="text-base text-black">
                          {`${params?.checkIn || 'N/A'}`} -&gt;{' '}
                          {`${params?.checkOut || 'N/A'}`}
                        </Text>
                      </View>

                      <View className="flex-row flex-wrap items-start">
                        <Text className="text-base text-black">
                          {`Thời gian dự kiến: ${2} ngày`}
                          {' | '}
                        </Text>
                        <Text className="text-base text-blue-700">
                          {formatCurrency(params?.amount) || '0'}
                        </Text>
                        <Text className="text-base text-black">x 1 đêm</Text>
                      </View>
                    </View>
                  </View>
                  <View className="h-0.5 bg-gray-200" />
                </View>
              </View>

              {/* Service Info Section */}
              <View className="rounded-lg border border-gray-200 bg-white p-4">
                <ServiceInfo extendedInfo={params?.services || []} />
              </View>

              {/* Payment Info Section */}
              <View className="rounded-lg border border-gray-200 bg-white p-4">
                <PaymentInfo
                  payment={{
                    total: params.total,
                    paid: params.paid,
                    discount: params.discount,
                    note: params.note,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}

        {/* Footer Section */}
        <View className="m-2 flex-col gap-2 bg-white">
          <View className="flex-row items-center justify-between gap-2 p-2 ">
            <Text className="text-lg font-semibold text-gray-600">
              Tổng thanh toán
            </Text>
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={() => {
                const rooms = params.rooms?.map((room: any) => ({
                  roomNumber: room.roomNumber,
                  roomType: room.roomType,
                  amount: room.amount,
                  nights: 2, // Assuming 2 nights from the UI
                }));

                console.log('room', rooms);

                router.push({
                  pathname: '/booking/components/payment-screen',
                  params: {
                    total: params.total,
                    rooms: JSON.stringify(rooms),
                  },
                });
              }}
            >
              <Text className="text-xl font-bold text-blue-500">
                {formatCurrency(params?.total)}
              </Text>
              {/* icon > */}
              <MaterialIcons
                name="arrow-forward-ios"
                size={20}
                color="#4B5563"
              />
            </TouchableOpacity>
          </View>

          <View className="flex-row items-center justify-between gap-4">
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-red-50 p-2"
              onPress={() => { }}
            >
              <Text className="text-xl font-semibold text-red-600">
                Từ chối
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center rounded-xl bg-blue-700 p-2"
              onPress={() => { }}
            >
              <Text className=" text-xl font-semibold text-white">
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default BookingDetail;

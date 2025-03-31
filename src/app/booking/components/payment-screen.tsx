import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { formatCurrency } from '../utils';

interface PaymentScreenProps {
  total: number;
  rooms: {
    roomNumber: string;
    roomType: string;
    amount: number;
    nights: number;
  }[];
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({
  total: initialTotal,
  rooms,
}) => {
  rooms = [
    {
      roomNumber: '101',
      roomType: 'Phòng đơn',
      amount: 1000000,
      nights: 2,
    },

    {
      roomNumber: '103',
      roomType: 'Phòng đôi',
      amount: 2000000,
      nights: 3,
    },
  ];
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    'cash' | 'transfer' | 'refund'
  >('cash');

  const [paymentAmount, setPaymentAmount] = useState<number>(initialTotal);

  const totalAmount = rooms.reduce(
    (total, room) => total + room.amount * room.nights,
    0
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Thanh toán hóa đơn',
          headerShown: true,
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView className="flex bg-gray-100">
          <View className="flex-1 gap-4">
            {/* Payment Amount */}
            <View className="rounded-lg border border-gray-200 bg-white p-4">
              <Text className="text-xl font-semibold text-gray-900">
                Khách thanh toán
              </Text>
              <TextInput
                keyboardType="numeric"
                className="mt-2 w-auto border-b-2 border-blue-200 text-center text-3xl font-bold text-blue-600"
                value={formatCurrency(paymentAmount)}
                onChangeText={(text) => {
                  const numericValue = Number(text.replace(/[^0-9]/g, ''));
                  setPaymentAmount(isNaN(numericValue) ? 0 : numericValue);
                }}
              />

              {/* Payment Methods */}
              <View className="mt-4 flex gap-4 space-x-4">
                <TouchableOpacity
                  className={`flex-row items-center justify-between`}
                  onPress={() => setSelectedPaymentMethod('cash')}
                >
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons
                      name="payments"
                      size={24}
                      color={
                        selectedPaymentMethod === 'cash' ? '#2563EB' : '#4B5563'
                      }
                    />

                    <Text
                      className={`text-lg font-medium ${selectedPaymentMethod === 'cash' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      Tiền mặt
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      selectedPaymentMethod === 'cash'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                    color={
                      selectedPaymentMethod === 'cash' ? '#2563EB' : '#4B5563'
                    }
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  className={`flex-row items-center justify-between `}
                  onPress={() => setSelectedPaymentMethod('transfer')}
                >
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons
                      name="account-balance"
                      size={24}
                      color={
                        selectedPaymentMethod === 'transfer'
                          ? '#2563EB'
                          : '#4B5563'
                      }
                    />
                    <Text
                      className={`text-lg font-medium ${selectedPaymentMethod === 'transfer' ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      Chuyển khoản
                    </Text>
                  </View>
                  <MaterialIcons
                    name={
                      selectedPaymentMethod === 'transfer'
                        ? 'radio-button-checked'
                        : 'radio-button-unchecked'
                    }
                    size={24}
                    color={
                      selectedPaymentMethod === 'transfer'
                        ? '#2563EB'
                        : '#4B5563'
                    }
                  />
                </TouchableOpacity>

                <View className={`flex-row items-center justify-between `}>
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons
                      name="account-balance"
                      size={24}
                      color={'#4B5563'}
                    />
                    <Text className={`text-lg font-medium text-gray-700`}>
                      Hoàn khách
                    </Text>
                  </View>
                  <Text className="text-lg font-medium text-blue-700">
                    {formatCurrency(initialTotal)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Room Details */}
            <View className="rounded-lg border border-gray-200 bg-white p-4">
              <Text className="mb-4 text-xl font-semibold text-gray-900">
                Thông tin thanh toán
              </Text>

              <View className="my-4 flex-row items-center justify-between">
                <Text className="text-lg font-medium text-gray-900">
                  Loại phòng
                </Text>{' '}
                <Text className="text-lg font-medium text-gray-900">
                  Số lượng
                </Text>
              </View>

              <View className="h-0.5 bg-gray-200" />

              {rooms.map((room, index) => (
                <View
                  key={index}
                  className="my-4 gap-2 border-b border-gray-200 last:mb-0 last:border-b-0"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-lg text-gray-600">
                      {room.roomType}
                    </Text>
                    <Text className="text-lg text-gray-600">x 1 đêm</Text>
                  </View>

                  <View className="flex-row items-center justify-between">
                    <Text className="text-base font-medium text-gray-900">
                      {formatCurrency(room.amount)}
                    </Text>
                    <Text className="text-base font-semibold text-blue-600">
                      {formatCurrency(room.amount * room.nights)}
                    </Text>
                  </View>
                  <View className="h-0.5 bg-gray-200" />
                </View>
              ))}

              <View className="my-2 flex-row items-center justify-between">
                <Text className="text-lg font-medium text-gray-900">
                  Tổng thanh toán
                </Text>
                <Text className="text-lg font-semibold text-blue-600">
                  {formatCurrency(totalAmount)}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View className="border-t border-gray-200 bg-white p-4">
          <TouchableOpacity
            className="rounded-xl bg-blue-600 p-4"
            onPress={() => {
              // Handle payment confirmation
              console.log({
                paymentAmount,
                selectedPaymentMethod,
                rooms,
              });
            }}
          >
            <Text className="text-center text-lg font-semibold text-white">
              Thanh toán hoá đơn
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default PaymentScreen;

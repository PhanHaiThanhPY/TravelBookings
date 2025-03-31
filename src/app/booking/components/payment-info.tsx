import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

import { formatCurrency, type PaymentInfo as PaymentInfoType } from '../utils';

interface PaymentInfoProps {
  payment: PaymentInfoType;
}

export const PaymentInfo = ({ payment }: PaymentInfoProps) => (
  <View className="space-2 gap-2">
    <View className="flex-row items-center gap-2">
      <Text className="text-lg font-medium text-gray-900">
        Thông tin thanh toán
      </Text>
    </View>
    <View className="mt-2 flex-row items-center justify-between">
      <View className="flex-row gap-4">
        <MaterialIcons name="attach-money" size={24} color="#4B5563" />
        <Text className="items-start text-base text-gray-700">
          Tổng tiền hàng
        </Text>
      </View>
      <Text className="text-base font-medium text-gray-900">
        {formatCurrency(payment.total)}
      </Text>
    </View>
    <View className="h-0.5 bg-gray-200" />
    <View className="flex-row items-center justify-between">
      <View className="flex-row gap-4">
        <MaterialIcons name="money" size={24} color="#4B5563" />
        <Text className="text-base text-gray-700">Khách đã trả</Text>
      </View>

      <Text className="text-base font-medium text-green-600">
        -{formatCurrency(payment.paid)}
      </Text>
    </View>
    <View className="h-0.5 bg-gray-200" />

    <View className="flex-row items-center justify-between">
      <View className="flex-row gap-4">
        <MaterialIcons name="discount" size={24} color="#4B5563" />
        <Text className="text-base text-gray-700">Giảm giá</Text>
      </View>
      <Text className="text-base font-medium text-red-600">
        -{formatCurrency(payment.discount)}
      </Text>
    </View>
    <View className="h-0.5 bg-gray-200" />

    {payment.note && (
      <View className="mt-2">
        <Text className="text-base text-gray-700">Ghi chú:</Text>
        <Text className="text-sm text-gray-600">{payment.note}</Text>
      </View>
    )}
  </View>
);

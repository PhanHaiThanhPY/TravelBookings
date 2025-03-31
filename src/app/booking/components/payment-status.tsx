import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { formatCurrency, PAYMENT_STATUS } from '../utils';

interface PaymentStatusProps {
  status: number;
  amount: number;
}

export const PaymentStatus = memo(({ status, amount }: PaymentStatusProps) => {
  if (status === PAYMENT_STATUS.PAID) {
    return (
      <View className="flex-row items-center gap-2 rounded-full bg-green-50 px-3 py-1.5">
        <MaterialIcons name="check" size={20} color="#10B981" />
        <Text className="text-sm font-medium text-green-600">
          Đã thanh toán
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
      <MaterialIcons name="payments" size={20} color="#4B5563" />
      <Text className="text-sm font-medium text-gray-600">
        {formatCurrency(amount)}
      </Text>
    </View>
  );
});

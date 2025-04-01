import { MaterialIcons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';

type ServiceInfoExtended = {
  priceList: string;
  branch: string;
  staff: string;
  salesChannel: string;
  createdAt: string;
  createdBy: string;
};

interface ServiceInfoProps {
  extendedInfo: ServiceInfoExtended;
}

interface InfoRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}

const InfoRow = memo(({ icon, label, value }: InfoRowProps) => (
  <View className="flex-col space-y-1">
    <View className="flex-row items-center gap-2">
      <MaterialIcons name={icon} size={20} color="#4B5563" />
      <Text className="text-base text-gray-600">{label}</Text>
    </View>
    <Text className="text-lg font-normal text-black">{value}</Text>
    <View className="h-0.5 bg-gray-100" />
  </View>
));

const ServiceInfo = memo(({ extendedInfo }: ServiceInfoProps) => {
  extendedInfo = {
    priceList: 'Bảng giá 1',
    branch: 'Chi nhánh 1',
    staff: 'Nhân viên 1',
    salesChannel: 'Kênh bán 1',
    createdAt: '2024-03-21 12:00',
    createdBy: 'Người tạo 1',
  };
  const leftColumnInfo: InfoRowProps[] = [
    { icon: 'list-alt', label: 'Bảng giá', value: extendedInfo.priceList },
    { icon: 'location-on', label: 'Chi nhánh', value: extendedInfo.branch },
    { icon: 'person', label: 'Nhân viên', value: extendedInfo.staff },
  ];

  const rightColumnInfo: InfoRowProps[] = [
    { icon: 'store', label: 'Kênh bán', value: extendedInfo.salesChannel },
    {
      icon: 'access-time',
      label: 'Thời gian tạo',
      value: extendedInfo.createdAt,
    },
    {
      icon: 'account-circle',
      label: 'Tài khoản tạo',
      value: extendedInfo.createdBy,
    },
  ];

  return (
    <View className="mb-2 flex-col gap-4">
      <View className="flex-row items-center gap-2">
        <MaterialIcons name="room-service" size={20} color="#4B5563" />
        <Text className="text-lg font-medium text-gray-900">
          Thông tin dịch vụ
        </Text>
      </View>

      {/* <View className="h-0.5 bg-gray-200" /> */}

      <View className="flex-row items-start justify-between gap-4">
        <View className="flex-1 gap-4">
          {leftColumnInfo.map((info, index) => (
            <InfoRow key={index} {...info} />
          ))}
        </View>

        <View className="flex-1 gap-4">
          {rightColumnInfo.map((info, index) => (
            <InfoRow key={index} {...info} />
          ))}
        </View>
      </View>
    </View>
  );
});

export default ServiceInfo;

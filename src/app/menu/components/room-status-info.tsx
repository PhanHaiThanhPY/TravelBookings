import React from 'react';
import { Text, View } from 'react-native';

import { roomBookingStatusNames } from '@/app/room-diagram/constants';

import { OccupantCard } from '../../room-diagram/components/occupant-card';
import { RoomBookingStatusColors } from '../../room-diagram/constants/colors';
import { RoomBookingStatus } from '../../room-diagram/types';

interface RoomStatusInfoProps {
  booking_status: RoomBookingStatus;
  occupants?: { isChild: boolean }[];
  isShowOccupants?: boolean;
  height?: number;
}

export const RoomStatusInfo: React.FC<RoomStatusInfoProps> = ({
  booking_status,
  occupants,
  isShowOccupants = true,
}) => {
  const colorRoom = RoomBookingStatusColors[booking_status];

  const renderOccupants = () => {
    if (
      !isShowOccupants ||
      booking_status !== RoomBookingStatus.OCCUPIED ||
      !occupants?.length
    ) {
      return null;
    }

    const adultCount = occupants.filter((o) => !o.isChild).length;
    const childCount = occupants.filter((o) => o.isChild).length;

    return (
      <View className="flex-row items-center gap-2">
        <OccupantCard
          count={adultCount}
          size={18}
          iconName={'person-outline'}
        />
        <OccupantCard count={childCount} size={18} iconName={'child-care'} />
      </View>
    );
  };

  return (
    <View className="flex-row items-start gap-2">
      <View className={`rounded-lg px-2 py-1 ${colorRoom.background}`}>
        <Text className={`px-2 text-sm ${colorRoom.text}`}>
          {roomBookingStatusNames[booking_status]}
        </Text>
      </View>
      {renderOccupants()}
    </View>
  );
};

export default RoomStatusInfo;

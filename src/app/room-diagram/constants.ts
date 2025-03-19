import {
  type Area,
  RoomBookingStatus,
  type RoomBookingStatusData,
  RoomStatus,
} from './types';

export const roomBookingStatusNames: Record<RoomBookingStatus, string> = {
  [RoomBookingStatus.ALL]: 'Tất cả',
  [RoomBookingStatus.AVAILABLE]: 'Phòng trống',
  [RoomBookingStatus.OCCUPIED]: 'Đang sử dụng',
  [RoomBookingStatus.RESERVED]: 'Đã được đặt',
  [RoomBookingStatus.CLEANING]: 'Đang dọn dẹp',
  [RoomBookingStatus.MAINTENANCE]: 'Đang sửa chữa',
  [RoomBookingStatus.OUT_OF_SERVICE]: 'Không sẵn sàng',
};

export const roomStatusName: Record<RoomStatus, string> = {
  [RoomStatus.ALL]: 'Tất cả',
  [RoomStatus.ACTIVE]: 'Đang hoạt động',
  [RoomStatus.IN_ACTIVE]: 'Tạm ngưng',
};

export const areaData: Area[] = [
  { id: -1, name: 'Khu vực' },
  { id: 0, name: 'Tầng trệt' },
  { id: 1, name: 'Tầng 1' },
  { id: 2, name: 'Tầng 2' },
  { id: 3, name: 'Tầng 3' },
  { id: 4, name: 'Tầng 4' },
  { id: 5, name: 'Tầng 5' },
  { id: 6, name: 'Tầng 6' },
  { id: 7, name: 'Tầng 7' },
  { id: 8, name: 'Tầng 8' },
  { id: 9, name: 'Tầng 9' },
  { id: 10, name: 'Tầng 10' },
];

export const statusData: RoomBookingStatusData[] = [
  { status: RoomBookingStatus.ALL, count: 80 },
  { status: RoomBookingStatus.AVAILABLE, count: 80 },
  { status: RoomBookingStatus.OCCUPIED, count: 20 },
  { status: RoomBookingStatus.RESERVED, count: 20 },
  { status: RoomBookingStatus.CLEANING, count: 15 },
  { status: RoomBookingStatus.MAINTENANCE, count: 10 },
  { status: RoomBookingStatus.OUT_OF_SERVICE, count: 5 },
];

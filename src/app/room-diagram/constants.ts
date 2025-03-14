import { type Area, RoomStatus, type RoomStatusData } from './types';

export const roomStatusNames: Record<RoomStatus, string> = {
  [RoomStatus.ALL]: 'Tất cả',
  [RoomStatus.AVAILABLE]: 'Phòng trống',
  [RoomStatus.OCCUPIED]: 'Đang sử dụng',
  [RoomStatus.RESERVED]: 'Đã được đặt',
  [RoomStatus.CLEANING]: 'Đang dọn dẹp',
  [RoomStatus.MAINTENANCE]: 'Đang sửa chữa',
  [RoomStatus.OUT_OF_SERVICE]: 'Không sẵn sàng',
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

export const statusData: RoomStatusData[] = [
  { status: RoomStatus.ALL, count: 80 },
  { status: RoomStatus.AVAILABLE, count: 80 },
  { status: RoomStatus.OCCUPIED, count: 20 },
  { status: RoomStatus.RESERVED, count: 20 },
  { status: RoomStatus.CLEANING, count: 15 },
  { status: RoomStatus.MAINTENANCE, count: 10 },
  { status: RoomStatus.OUT_OF_SERVICE, count: 5 },
];

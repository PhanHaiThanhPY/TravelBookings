import { BusinessStatus } from '../../../room-diagram/types/business';
import { type IRoomType } from '../types';

export const roomTypes: IRoomType[] = [
  {
    id: 'single',
    name: 'Single',
    description: 'Phòng 01 giường đơn',
    status: BusinessStatus.DOING_BUSINESS,
    roomCount: 12,
    price: 1650000,
    standardCapacity: 1,
    maxCapacity: 1,
  },
  {
    id: 'triple',
    name: 'Triple',
    description: 'Phòng 01 giường đôi và 1 giường đơn cho 3 người',
    status: BusinessStatus.STOP_DOING_BUSINESS,
    roomCount: 12,
    price: 1650000,
    standardCapacity: 1,
    maxCapacity: 1,
  },
  {
    id: 'twin',
    name: 'Twin',
    description: 'Phòng 02 giường đơn',
    status: BusinessStatus.DOING_BUSINESS,
    roomCount: 12,
    price: 1650000,
    standardCapacity: 1,
    maxCapacity: 1,
  },
  {
    id: 'double',
    name: 'Double',
    description: 'Phòng 01 giường đôi cho 2 người',
    status: BusinessStatus.DOING_BUSINESS,
    roomCount: 12,
    price: 1650000,
    standardCapacity: 1,
    maxCapacity: 1,
  },
];

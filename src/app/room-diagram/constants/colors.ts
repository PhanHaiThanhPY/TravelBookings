import { RoomBookingStatus } from '../types';

export interface StatusColorConfig {
  background: string;
  text: string;
}

export const RoomBookingStatusColors: Record<
  RoomBookingStatus,
  StatusColorConfig
> = {
  [RoomBookingStatus.AVAILABLE]: {
    background: 'bg-gray-100 border border-gray-500 border-1',
    text: 'font-semibold text-gray-500',
  },
  [RoomBookingStatus.OCCUPIED]: {
    background: 'bg-green-100 border border-green-500 border-1',
    text: 'font-semibold text-green-500',
  },
  [RoomBookingStatus.RESERVED]: {
    background: 'bg-yellow-100 border border-yellow-500 border-1',
    text: 'font-semibold text-yellow-500',
  },
  [RoomBookingStatus.CLEANING]: {
    background: 'bg-purple-100 border border-purple-500 border-1',
    text: 'font-semibold text-purple-500',
  },
  [RoomBookingStatus.MAINTENANCE]: {
    background: 'bg-orange-100 border border-orange-500 border-1',
    text: 'font-semibold text-orange-500',
  },
  [RoomBookingStatus.OUT_OF_SERVICE]: {
    background: 'bg-red-100 border border-red-500 border-1',
    text: 'font-semibold text-red-500',
  },
  [RoomBookingStatus.ALL]: {
    background: 'bg-gray-100 border border-gray-500 border-1',
    text: 'font-semibold text-gray-500',
  },
};

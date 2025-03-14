import { RoomStatus } from '../types';

export interface StatusColorConfig {
  background: string;
  text: string;
}

export const roomStatusColors: Record<RoomStatus, StatusColorConfig> = {
  [RoomStatus.AVAILABLE]: {
    background: 'bg-gray-100 border border-gray-500 border-1',
    text: 'font-semibold text-gray-500',
  },
  [RoomStatus.OCCUPIED]: {
    background: 'bg-green-100 border border-green-500 border-1',
    text: 'font-semibold text-green-500',
  },
  [RoomStatus.RESERVED]: {
    background: 'bg-yellow-100 border border-yellow-500 border-1',
    text: 'font-semibold text-yellow-500',
  },
  [RoomStatus.CLEANING]: {
    background: 'bg-purple-100 border border-purple-500 border-1',
    text: 'font-semibold text-purple-500',
  },
  [RoomStatus.MAINTENANCE]: {
    background: 'bg-orange-100 border border-orange-500 border-1',
    text: 'font-semibold text-orange-500',
  },
  [RoomStatus.OUT_OF_SERVICE]: {
    background: 'bg-red-100 border border-red-500 border-1',
    text: 'font-semibold text-red-500',
  },
  [RoomStatus.ALL]: {
    background: 'bg-gray-100 border border-gray-500 border-1',
    text: 'font-semibold text-gray-500',
  },
};

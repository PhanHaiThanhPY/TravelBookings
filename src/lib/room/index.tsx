import { create } from 'zustand';

import { createSelectors } from '../utils';
import { Room } from '@/api/room/room';

interface RoomState {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

const _useRoom = create<RoomState>((set, get) => ({
  rooms: [],
  setRooms: (rooms) => set({ rooms }),
}));

export const useRoom = createSelectors(_useRoom);

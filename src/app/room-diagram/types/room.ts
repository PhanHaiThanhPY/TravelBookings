import { type RoomStatus } from '../types';
import { type Occupant } from './occupant';

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite';
  status: RoomStatus;
  price: number;
  areaId: number;
  occupants: Occupant[];
  timeRemaining?: string;
}

export interface RoomListProps {
  selectedArea: number;
  selectedStatuses: RoomStatus[];
  searchQuery?: string;
  onRoomPress?: (room: Room) => void;
}

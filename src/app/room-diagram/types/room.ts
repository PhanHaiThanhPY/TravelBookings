import { type RoomBookingStatus } from '../types';
import { type Occupant } from './occupant';

export interface Room {
  id: string;
  number: string;
  type: 'Single' | 'Double' | 'Suite';
  booking_status: RoomBookingStatus;
  price: number;
  areaId: number;
  occupants: Occupant[];
  timeRemaining?: string;
  status: number;
}

export interface RoomListProps {
  selectedArea: number;
  selectedStatuses: RoomBookingStatus[];
  searchQuery?: string;
  onRoomPress?: (room: Room) => void;
}

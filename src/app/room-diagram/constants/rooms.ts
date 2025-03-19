import { RoomBookingStatus } from '../types';
import { type Room } from '../types/room';

export const mockRooms: Room[] = [
  {
    id: 'P101',
    number: 'P101',
    type: 'Double',
    status: RoomBookingStatus.AVAILABLE,
    price: 1650000,
    areaId: 0,
    occupants: [
      {
        name: 'John Smith',
        id: 'ID001',
        age: 35,
        gender: 'male',
        isChild: false,
      },
      {
        name: 'Mary Smith',
        id: 'ID002',
        age: 32,
        gender: 'female',
        isChild: false,
      },
      {
        name: 'Tommy Smith',
        id: 'ID003',
        age: 8,
        gender: 'male',
        isChild: true,
      },
    ],
  },
  {
    id: 'P102',
    number: 'P102',
    type: 'Single',
    status: RoomBookingStatus.OCCUPIED,
    price: 1250000,
    areaId: 0,
    occupants: [
      {
        name: 'John Smith',
        id: 'ID001',
        age: 35,
        gender: 'male',
        isChild: false,
      },
      {
        name: 'Mary Smith',
        id: 'ID002',
        age: 32,
        gender: 'female',
        isChild: false,
      },
      {
        name: 'Tommy Smith',
        id: 'ID003',
        age: 8,
        gender: 'male',
        isChild: true,
      },
    ],
  },
  {
    id: 'P201',
    number: 'P201',
    type: 'Suite',
    status: RoomBookingStatus.RESERVED,
    price: 2150000,
    areaId: 1,
    occupants: [
      {
        name: 'John Smith',
        id: 'ID001',
        age: 35,
        gender: 'male',
        isChild: false,
      },
      {
        name: 'Mary Smith',
        id: 'ID002',
        age: 32,
        gender: 'female',
        isChild: false,
      },
      {
        name: 'Tommy Smith',
        id: 'ID003',
        age: 8,
        gender: 'male',
        isChild: true,
      },
    ],
  },
  {
    id: 'P202',
    number: 'P202',
    type: 'Double',
    status: RoomBookingStatus.CLEANING,
    price: 1650000,
    areaId: 1,
    occupants: [
      {
        name: 'John Smith',
        id: 'ID001',
        age: 35,
        gender: 'male',
        isChild: false,
      },
      {
        name: 'Mary Smith',
        id: 'ID002',
        age: 32,
        gender: 'female',
        isChild: false,
      },
      {
        name: 'Tommy Smith',
        id: 'ID003',
        age: 8,
        gender: 'male',
        isChild: true,
      },
    ],
  },
];

import { type BusinessStatus } from '../../../room-diagram/types/business';

export interface IRoomType {
  standardCapacity: number;
  maxCapacity: number;
  id: string;
  name: string;
  description: string;
  status: BusinessStatus;
  roomCount: number;
  price: number;
}

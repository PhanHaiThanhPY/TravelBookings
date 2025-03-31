import { type RoomBookingStatus } from '../room-diagram/types';

export const PAYMENT_STATUS = {
  UNPAID: 1,
  PAID: 2,
} as const;

export const TAB_TYPE = {
  INFO: 'info',
  HISTORY: 'history',
} as const;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount || 0);
}

export type PaymentInfo = {
  total: number;
  paid: number;
  discount: number;
  note: string;
};

export type ServiceInfo = {
  name: string;
  quantity: number;
  price: number;
};

export interface BookingItem extends PaymentInfo {
  id: string;
  roomNumber: string;
  roomType: string;
  status: number;
  checkIn: string;
  checkOut: string;
  customerName: string;
  amount: number;
  booking_status: RoomBookingStatus;
  created_at: string;
  payment_status: number;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  services: ServiceInfo[];
}

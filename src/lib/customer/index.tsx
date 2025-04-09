import { create } from 'zustand';

import { createSelectors } from '../utils';
import { Customer } from '@/api/customer';

interface CustomerState {
  customers: Customer;
  setCustomers: (customers: Customer) => void;
}

const _useCustomer = create<CustomerState>((set, get) => ({
  customers: {
    id: '',
    name: '',
    phone: '',
    selected: false,
  },
  setCustomers: (customers) => set({ customers }),
}));

export const useCustomer = createSelectors(_useCustomer);

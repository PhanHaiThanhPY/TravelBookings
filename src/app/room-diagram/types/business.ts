export enum BusinessStatus {
  ALL = 0,
  DOING_BUSINESS = 1,
  STOP_DOING_BUSINESS = 2,
}

export const businessStatusNames: Record<BusinessStatus, string> = {
  [BusinessStatus.ALL]: 'Tất cả',
  [BusinessStatus.DOING_BUSINESS]: 'Đang kinh doanh',
  [BusinessStatus.STOP_DOING_BUSINESS]: 'Ngừng kinh doanh',
};

export const businessStatusColors: Record<
  BusinessStatus,
  { background: string; text: string }
> = {
  [BusinessStatus.ALL]: {
    background: 'bg-gray-100',
    text: 'text-gray-500',
  },
  [BusinessStatus.DOING_BUSINESS]: {
    background: 'bg-green-100',
    text: 'text-green-500',
  },
  [BusinessStatus.STOP_DOING_BUSINESS]: {
    background: 'bg-red-100',
    text: 'text-red-500',
  },
};

export interface BusinessStatusCount {
  status: BusinessStatus;
  count: number;
}

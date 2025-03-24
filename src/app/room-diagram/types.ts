export enum RoomBookingStatus {
  ALL = -1,
  AVAILABLE = 1,
  OCCUPIED = 2,
  RESERVED = 3,
  CLEANING = 4,
  MAINTENANCE = 5,
  OUT_OF_SERVICE = 6,
}

export enum RoomStatus {
  ALL = -1,
  IN_ACTIVE = 1,
  ACTIVE = 2,
}

export interface Area {
  id: number;
  name: string;
}

export interface RoomBookingStatusData {
  status: RoomBookingStatus;
  count: number;
}

export interface AreaDropdownProps {
  selectedArea: Area;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onSelectArea: (area: Area) => void;
  allowedAreas?: number[];
}

export interface StatusFilterProps {
  selectedStatuses: RoomBookingStatus[];
  onToggleStatus: (status: RoomBookingStatus) => void;
  allowedStatuses?: RoomBookingStatus[];
}

export interface SearchBarProps {
  placeholder?: string;
}

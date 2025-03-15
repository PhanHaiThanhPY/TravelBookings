export enum RoomStatus {
  ALL = -1,
  AVAILABLE = 1,
  OCCUPIED = 2,
  RESERVED = 3,
  CLEANING = 4,
  MAINTENANCE = 5,
  OUT_OF_SERVICE = 6,
}

export interface Area {
  id: number;
  name: string;
}

export interface RoomStatusData {
  status: RoomStatus;
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
  selectedStatuses: RoomStatus[];
  onToggleStatus: (status: RoomStatus) => void;
  allowedStatuses?: RoomStatus[];
}

export interface SearchBarProps {
  placeholder?: string;
}

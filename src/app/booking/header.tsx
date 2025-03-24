import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import CustomDropdown from '../room-diagram/components/custom-dropdown';
import SearchBar from '../room-diagram/components/search-bar';
import StatusFilter from '../room-diagram/components/status-filter';
import { viewTypeData } from '../room-diagram/constants';
import { type RoomBookingStatus } from '../room-diagram/types';
import DatePickerModal from './components/date-picker-modal';

interface BookingHeaderProps {
  selectedViewType: any;
  showViewTypeDropdown: boolean;
  selectedStatuses: any[];
  searchQuery: string;
  onToggleStatus: (statusId: RoomBookingStatus) => void;
  onReloadData?: () => void;
  onSelectViewType: (select: any) => void;
  onToggleDropdown: () => void;
  setSearchQuery: (query: string) => void;
}

const BookingHeader: React.FC<BookingHeaderProps> = ({
  selectedViewType,
  showViewTypeDropdown,
  selectedStatuses,
  onToggleStatus,
  onSelectViewType,
  onToggleDropdown,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<number>(
    new Date().getDate()
  );
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    new Date().getMonth()
  );
  const [selectedYear, setSelectedYear] = React.useState<number>(
    new Date().getFullYear()
  );
  const scrollViewRef = React.useRef<ScrollView>(null);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isToday = (date: number) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    );
  };

  React.useEffect(() => {
    const today = new Date();
    if (
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    ) {
      const todayIndex = today.getDate() - 1;
      const itemWidth = 100;
      const offset = Math.max(0, todayIndex * itemWidth - 150);
      scrollViewRef.current?.scrollTo({ x: offset, animated: true });
    }
  }, [selectedMonth, selectedYear]);

  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const handleMonthYearPress = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (year: number, month: number, date: number) => {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDate(date);
  };

  const today = new Date();
  const isCurrentMonth =
    selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
  const monthDisplay = isCurrentMonth
    ? 'Tháng hiện tại'
    : `Tháng ${selectedMonth + 1}`;

  return (
    <View className="">
      <View className="z-10 flex-row items-center justify-between gap-2 bg-white p-4">
        <View className="flex-row items-center">
          <View className="w-full flex-col gap-2">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                className="flex-[2]"
                onPress={handleMonthYearPress}
              >
                <Text className="text-gray text-base">{monthDisplay}</Text>
                <View className="flex-row items-center justify-start gap-2">
                  <Ionicons name="calendar-outline" size={24} color="blue" />
                  <Text className="text-2xl font-bold text-black">
                    {`Tháng ${selectedMonth + 1} / ${selectedYear}`}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="blue" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity className="">
                <Ionicons name="filter-circle" size={32} color="gray" />
              </TouchableOpacity>
            </View>

            <SearchBar />

            <View className="w-full overflow-hidden">
              <ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                className=""
                contentContainerStyle={{
                  paddingHorizontal: 16,
                }}
                decelerationRate="normal"
                snapToInterval={100}
                snapToAlignment="center"
              >
                {Array.from(
                  { length: getDaysInMonth(selectedMonth, selectedYear) },
                  (_, i) => {
                    const date = i + 1;
                    const weekday = new Date(
                      selectedYear,
                      selectedMonth,
                      date
                    ).toLocaleDateString('vi-VN', { weekday: 'short' });
                    const isSelected = date === selectedDate;
                    const dateIsToday = isToday(date);

                    return (
                      <TouchableOpacity
                        key={date}
                        className={`mr-4 items-center justify-center rounded-xl px-4 py-2 ${isSelected
                            ? 'bg-blue-600'
                            : dateIsToday
                              ? 'bg-blue-100'
                              : 'bg-gray-100'
                          }`}
                        onPress={() => setSelectedDate(date)}
                      >
                        <Text
                          className={`text-sm ${isSelected
                              ? 'text-white'
                              : dateIsToday
                                ? 'text-blue-600'
                                : 'text-gray-600'
                            }`}
                        >
                          {weekday}
                        </Text>
                        <Text
                          className={`text-lg font-bold ${isSelected
                              ? 'text-white'
                              : dateIsToday
                                ? 'text-blue-600'
                                : 'text-gray-900'
                            }`}
                        >
                          {date}
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                )}
              </ScrollView>
            </View>

            <View className="flex w-full flex-row">
              <CustomDropdown
                selectedOption={selectedViewType}
                options={viewTypeData}
                showDropdown={showViewTypeDropdown}
                onToggleDropdown={onToggleDropdown}
                onSelectOption={onSelectViewType}
                icon={selectedViewType.icon}
                placeholder="Select"
              />

              <StatusFilter
                selectedStatuses={selectedStatuses}
                onToggleStatus={(status) => {
                  onToggleStatus(status);
                }}
              />
            </View>
          </View>
        </View>

        <DatePickerModal
          visible={showDatePicker}
          onClose={() => setShowDatePicker(false)}
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />
      </View>
    </View>
  );
};

export default BookingHeader;

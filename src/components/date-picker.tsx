import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';

type DateRange = {
  start: Date | null;
  end: Date | null;
};

interface DatePickerProps {
  onDateSelect?: (dateRange: DateRange) => void;
  initialDate?: Date;
  /** Tiêu đề của modal date picker */
  title?: string;
  /** Cho phép chọn một ngày duy nhất hay chọn khoảng thời gian */
  rangeSelection?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  onDateSelect,
  initialDate = new Date(),
  title = 'Lọc theo thời gian',
  rangeSelection = true,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: initialDate,
    end: initialDate,
  });

  // Text display for input fields
  const [startDateText, setStartDateText] = useState<string>(
    formatDate(initialDate)
  );
  const [endDateText, setEndDateText] = useState<string>(
    formatDate(initialDate)
  );

  // Update text whenever date range changes
  useEffect(() => {
    setStartDateText(dateRange.start ? formatDate(dateRange.start) : '');
    setEndDateText(dateRange.end ? formatDate(dateRange.end) : '');
  }, [dateRange]);

  const weekdays: string[] = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
  const months: string[] = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ];

  // Function to generate calendar days
  const generateCalendarDays = (): (number | null)[] => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let firstDayOfWeek = firstDayOfMonth.getDay();
    // Convert Sunday (0) to 7 to align with Vietnamese calendar (Monday first)
    firstDayOfWeek = firstDayOfWeek === 0 ? 7 : firstDayOfWeek;

    const days: (number | null)[] = [];

    // Add empty slots for days before first day of month
    for (let i = 1; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  // Functions to navigate months
  const goToPrevMonth = (): void => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = (): void => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Function to format date as string
  function formatDate(date: Date | null): string {
    if (!date) return '';
    return `${date.getDate()} thg ${date.getMonth() + 1}, ${date.getFullYear()}`;
  }

  // Function to handle day selection
  const handleDaySelect = (day: number | null): void => {
    if (!day) return;

    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);

    if (!rangeSelection) {
      // Single date selection mode
      const updatedRange = {
        start: newDate,
        end: newDate,
      };
      setDateRange(updatedRange);
      return;
    }

    // Range selection mode
    // If this is the first date selection, set as start date
    if (
      !dateRange.start ||
      (dateRange.start && dateRange.end && dateRange.start !== dateRange.end)
    ) {
      const updatedRange = {
        start: newDate,
        end: null,
      };
      setDateRange(updatedRange);
    }
    // If this is the second date selection, set as end date
    else if (dateRange.start && !dateRange.end) {
      let updatedRange;
      // Ensure end date is after start date
      if (newDate < dateRange.start) {
        updatedRange = {
          start: newDate,
          end: dateRange.start,
        };
      } else {
        updatedRange = {
          ...dateRange,
          end: newDate,
        };
      }
      setDateRange(updatedRange);
    }
  };

  // Function to apply selected date range
  const applyDateRange = (): void => {
    if (onDateSelect) {
      onDateSelect(dateRange);
    }
    setIsVisible(false);
  };

  // Check if a specific day is selected (either start or end date)
  const isDaySelected = (day: number | null): boolean => {
    if (!day) return false;

    const currentDate = new Date(currentYear, currentMonth, day);

    if (dateRange.start && dateRange.end) {
      return (
        (dateRange.start &&
          currentDate.getTime() === dateRange.start.getTime()) ||
        (dateRange.end && currentDate.getTime() === dateRange.end.getTime())
      );
    }

    return (
      dateRange.start !== null &&
      currentDate.getTime() === dateRange.start.getTime()
    );
  };

  // Check if a day is within the selected range
  const isDayInRange = (day: number | null): boolean => {
    if (!day || !dateRange.start || !dateRange.end) return false;

    const currentDate = new Date(currentYear, currentMonth, day);
    return currentDate > dateRange.start && currentDate < dateRange.end;
  };

  // Check if a day is today
  const isToday = (day: number | null): boolean => {
    if (!day) return false;

    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const days = generateCalendarDays();

  // Format date for display on the button
  const getDisplayText = (): string => {
    if (dateRange.start && dateRange.end && dateRange.start !== dateRange.end) {
      return `${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`;
    } else if (dateRange.start) {
      return formatDate(dateRange.start);
    }
    return 'Chọn ngày';
  };

  return (
    <View className="flex">
      {/* Date display that opens the picker when pressed */}
      <TouchableOpacity
        className="rounded-lg border border-gray-300 px-4 py-3"
        onPress={() => setIsVisible(true)}
      >
        <Text className="text-gray-600">{getDisplayText()}</Text>
      </TouchableOpacity>

      {/* Modal date picker */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View className="flex-1 items-center justify-center bg-black/50">
          <View className="w-11/12 max-w-md rounded-lg bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-gray-200 p-4">
              <Text className="flex-1 text-center text-xl font-bold">
                {title}
              </Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                className="absolute right-4"
              ></TouchableOpacity>
            </View>

            {/* Month navigation */}
            <View className="mx-4 mt-4 flex-row items-center justify-between rounded-lg bg-gray-100 p-2">
              <TouchableOpacity
                onPress={goToPrevMonth}
                className="p-2"
              ></TouchableOpacity>
              <Text className="text-lg font-semibold">
                {months[currentMonth]} - {currentYear}
              </Text>
              <TouchableOpacity
                onPress={goToNextMonth}
                className="p-2"
              ></TouchableOpacity>
            </View>

            {/* Weekday headers */}
            <View className="mt-4 flex-row justify-between px-4">
              {weekdays.map((day, index) => (
                <Text
                  key={index}
                  className={`w-10 text-center ${index >= 5 ? 'text-red-500' : 'text-gray-500'}`}
                >
                  {day}
                </Text>
              ))}
            </View>

            {/* Separator line */}
            <View className="mt-2 border-b border-gray-200" />

            {/* Calendar grid */}
            <View className="flex-row flex-wrap px-4 py-2">
              {days.map((day, index) => (
                <TouchableOpacity
                  key={index}
                  className="size-10 items-center justify-center"
                  onPress={() => handleDaySelect(day)}
                  disabled={!day}
                >
                  {day ? (
                    <View
                      className={`size-8 items-center justify-center rounded-full
                        ${isDaySelected(day) ? 'bg-blue-500' : ''}
                      `}
                    >
                      <Text
                        className={`
                          ${isDaySelected(day) ? 'font-bold text-white' : 'text-gray-700'}
                          ${isToday(day) && !isDaySelected(day) ? 'font-bold text-blue-500' : ''}
                          ${!isDaySelected(day) && day % 7 === 0 ? 'text-gray-400' : ''}
                        `}
                      >
                        {day}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>

            {/* Date range inputs */}
            <View className="mt-2 px-4 pb-4">
              <View className="border-y border-gray-200 py-4">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="mb-1 text-xs text-gray-500">Từ</Text>
                    <TextInput
                      className="rounded-lg border border-gray-300 p-3"
                      value={startDateText}
                      editable={false}
                    />
                  </View>
                  <Text className="mx-2 text-gray-400">–</Text>
                  <View className="flex-1">
                    <Text className="mb-1 text-xs text-gray-500">Đến</Text>
                    <TextInput
                      className="rounded-lg border border-gray-300 p-3"
                      value={endDateText}
                      editable={false}
                    />
                  </View>
                </View>
              </View>

              {/* Action buttons */}
              <View className="mt-4 flex-row justify-between">
                <TouchableOpacity
                  className="mr-2 flex-1 items-center rounded-lg border border-gray-300 p-4"
                  onPress={() => setIsVisible(false)}
                >
                  <Text className="font-semibold text-gray-700">Trở lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="ml-2 flex-1 items-center rounded-lg bg-blue-500 p-4"
                  onPress={applyDateRange}
                >
                  <Text className="font-semibold text-white">Áp dụng</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;

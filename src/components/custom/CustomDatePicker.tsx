import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import GradientButton from './gradient-button';
import { IconArrowLeft } from '../ui/icons/icon-arrow-left';
import { IconArrowRight } from '../ui/icons/icon-arrow-right';

const { width } = Dimensions.get('window');
const CELL_SIZE = Math.floor(width / 7);
const DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

interface CustomDatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  initialDate?: Date;
}

const CustomDatePickerModal: React.FC<CustomDatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  minDate,
  maxDate,
  initialDate = new Date(),
}) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState<(number | null)[]>([]);
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  useEffect(() => {
    generateCalendar(currentMonth, currentYear);
  }, [currentMonth, currentYear]);

  const generateCalendar = (month: number, year: number) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const offset = (firstDayOfMonth + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const blanks = Array(offset).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setCalendarDays([...blanks, ...days]);
  };

  const handleSelect = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    if (isDisabled(date)) return;
    setSelectedDate(date);
  };

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSameDay = (a: Date, b: Date): boolean =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const changeMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => changeMonth(-1)}
              className="py-1.5 px-2.5 border border-gray-200 rounded-md "
            >
              <IconArrowLeft />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowMonthYearPicker(true)}>
              <Text style={styles.monthText}>
                Tháng {currentMonth + 1} - {currentYear}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => changeMonth(1)}
              className="py-1.5 px-2.5 border border-gray-200 rounded-md"
            >
              <IconArrowRight />
            </TouchableOpacity>
          </View>

          {/* Weekday labels */}
          <View style={styles.weekdays}>
            {DAYS.map((d, i) => (
              <Text
                key={i}
                style={[styles.dayLabel, d === 'CN' && styles.sunday]}
              >
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <ScrollView contentContainerStyle={styles.calendar}>
            {calendarDays.map((day, i) => {
              if (!day) return <View key={i} style={styles.dayCell} />;
              const date = new Date(currentYear, currentMonth, day);
              const isToday = isSameDay(date, today);
              const isSelected = isSameDay(date, selectedDate);
              const disabled = isDisabled(date);

              return (
                <TouchableOpacity
                  key={i}
                  disabled={disabled}
                  style={[
                    styles.dayCell,
                    isSelected && styles.selected,
                    disabled && styles.disabled,
                  ]}
                  onPress={() => handleSelect(day)}
                >
                  <Text
                    style={[
                      styles.dayText,
                      isToday && styles.today,
                      isSelected && styles.selectedText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="flex flex-row justify-between items-center ">
            <GradientButton
              title=" Đóng"
              onPress={onClose}
              colors={['#F3F4F6', '#F3F4F6']}
              containerClassName="w-1/4"
              textClassName="text-[#9CA3AF] font-bold rounded-[8px]"
            />

            <GradientButton
              title=" Xác nhận"
              onPress={() => {
                onSelectDate(selectedDate);
                onClose();
              }}
              containerClassName="w-1/4 rounded-[8px]"
            />
          </View>
        </View>

        {/* Popup chọn tháng/năm */}
        {showMonthYearPicker && (
          <Modal transparent animationType="fade">
            <View style={styles.overlay}>
              <View style={styles.monthYearModal}>
                <Text className="text-center font-bold text-xl text-[#0866FF] pb-3">
                  Chọn Tháng và Năm
                </Text>
                <View style={styles.monthYearContainer}>
                  <ScrollView
                    style={styles.scrollCol}
                    contentContainerStyle={styles.scrollColContent}
                  >
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <TouchableOpacity
                          key={month}
                          onPress={() => setCurrentMonth(month - 1)}
                          style={styles.pickerItemContainer}
                        >
                          <Text
                            style={[
                              styles.pickerItem,
                              currentMonth === month - 1 && styles.selectedItem,
                            ]}
                          >
                            Tháng {month}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </ScrollView>

                  <ScrollView
                    style={styles.scrollCol}
                    contentContainerStyle={styles.scrollColContent}
                  >
                    {Array.from({ length: 50 }, (_, i) => 2000 + i).map(
                      (year) => (
                        <TouchableOpacity
                          key={year}
                          onPress={() => setCurrentYear(year)}
                          style={styles.pickerItemContainer}
                        >
                          <Text
                            style={[
                              styles.pickerItem,
                              currentYear === year && styles.selectedItem,
                            ]}
                          >
                            {year}
                          </Text>
                        </TouchableOpacity>
                      )
                    )}
                  </ScrollView>
                </View>
                <View className="flex flex-row justify-center items-center w-full">
                  <GradientButton
                    title=" Xác nhận"
                    onPress={() => setShowMonthYearPicker(false)}
                    containerClassName="w-1/3 rounded-[8px]"
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0005',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.95,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: { fontSize: 22, paddingHorizontal: 10, color: '#333' },
  monthText: { fontWeight: 'bold', fontSize: 16 },
  weekdays: { flexDirection: 'row' },
  dayLabel: {
    width: 50,
    textAlign: 'center',
    fontWeight: '600',
    paddingVertical: 4,
    color: '#444',
  },
  sunday: { color: 'red' },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayText: { fontSize: 16, color: '#111' },
  selected: {
    backgroundColor: '#2196F3',
    borderRadius: CELL_SIZE / 2,
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  today: {
    textDecorationLine: 'underline',
    color: '#2196F3',
  },
  disabled: {
    opacity: 0.3,
  },
  monthYearModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },

  scrollCol: {
    height: 200,
    width: 70,
  },

  selectedItem: {
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    borderRadius: 8,
    marginVertical: 2,
  },

  monthYearContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  scrollColContent: {
    alignItems: 'center',
  },
  pickerItemContainer: {
    width: '60%',
    alignItems: 'center',
  },
  pickerItem: {
    textAlign: 'center',
    paddingVertical: 8,
    fontSize: 16,
    width: '100%',
  },
});

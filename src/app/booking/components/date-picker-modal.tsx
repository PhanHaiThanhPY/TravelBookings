import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: number;
  onSelectDate: (year: number, month: number, date: number) => void;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  selectedYear,
  selectedMonth,
  selectedDate,
  onSelectDate,
}) => {
  const [tempYear, setTempYear] = React.useState(selectedYear);
  const [tempMonth, setTempMonth] = React.useState(selectedMonth);
  const [tempDate, setTempDate] = React.useState(selectedDate);

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - 5 + i
  );
  const months = Array.from({ length: 12 }, (_, i) => i);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handleConfirm = () => {
    onSelectDate(tempYear, tempMonth, tempDate);
    onClose();
  };

  const isToday = (date: number) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      tempMonth === today.getMonth() &&
      tempYear === today.getFullYear()
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="w-11/12 max-w-md rounded-2xl bg-white p-4">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-xl font-bold">Chọn ngày</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="gray" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-base font-medium text-gray-600">
              Năm
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-2"
            >
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  className={`mx-2 rounded-lg px-4 py-2 ${tempYear === year ? 'bg-blue-600' : 'bg-gray-100'}`}
                  onPress={() => setTempYear(year)}
                >
                  <Text
                    className={`text-base font-medium ${tempYear === year ? 'text-white' : 'text-gray-700'}`}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View className="mb-4">
            <Text className="mb-2 text-base font-medium text-gray-600">
              Tháng
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-2"
            >
              {months.map((month) => (
                <TouchableOpacity
                  key={month}
                  className={`mx-2 rounded-lg px-4 py-2 ${tempMonth === month ? 'bg-blue-600' : 'bg-gray-100'}`}
                  onPress={() => setTempMonth(month)}
                >
                  <Text
                    className={`text-base font-medium ${tempMonth === month ? 'text-white' : 'text-gray-700'}`}
                  >
                    {month + 1}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View>
            <Text className="mb-2 text-base font-medium text-gray-600">
              Ngày
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="-mx-2"
            >
              {Array.from(
                { length: getDaysInMonth(tempMonth, tempYear) },
                (_, i) => i + 1
              ).map((date) => {
                const isSelected = date === tempDate;
                const dateIsToday = isToday(date);

                return (
                  <TouchableOpacity
                    key={date}
                    className={`mx-2 items-center rounded-lg px-4 py-2 ${isSelected ? 'bg-blue-600' : dateIsToday ? 'bg-blue-100' : 'bg-gray-100'}`}
                    onPress={() => setTempDate(date)}
                  >
                    <Text
                      className={`text-base font-medium ${isSelected ? 'text-white' : dateIsToday ? 'text-blue-600' : 'text-gray-700'}`}
                    >
                      {date}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View className="mt-6 flex-row justify-end gap-2">
            <TouchableOpacity
              className="rounded-lg border border-gray-300 px-4 py-2"
              onPress={onClose}
            >
              <Text className="text-base font-medium text-gray-700">Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg bg-blue-600 px-4 py-2"
              onPress={handleConfirm}
            >
              <Text className="text-base font-medium text-white">Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DatePickerModal;

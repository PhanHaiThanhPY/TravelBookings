import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import GradientButton from './gradient-button';

const TimePicker = ({ visible, onClose, onConfirm }: any) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const seconds = Array.from({ length: 60 }, (_, i) => i);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.container}>
        <View className="m-5 p-4 bg-white rounded-xl">
          <Text className="text-center font-bold text-xl text-[#0866FF] pb-3">
            Chọn thời gian
          </Text>
          <View className="flex flex-row justify-center items-center">
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContainer}
            >
              {hours.map((h) => (
                <TouchableOpacity
                  key={h}
                  onPress={() => setHour(h)}
                  className={`${hour === h ? 'bg-[#0866FF] rounded-lg' : 'bg-white'} py-1.5  my-1.5 w-12 items-center`}
                >
                  <Text
                    className={`${hour === h ? 'text-white font-bold' : 'font-medium text-black'} text-lg`}
                  >
                    {h.toString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.separator}>:</Text>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContainer}
            >
              {minutes.map((m) => (
                <TouchableOpacity
                  key={m}
                  onPress={() => setMinute(m)}
                  className={`${minute === m ? ' bg-[#0866FF] rounded-lg' : 'bg-white'} py-1.5 w-12 my-1.5 items-center`}
                >
                  <Text
                    className={`${minute === m ? 'text-white font-bold' : 'font-medium text-black'} text-lg`}
                  >
                    {m.toString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.separator}>:</Text>

            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContainer}
            >
              {seconds.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setSecond(s)}
                  className={`${second === s ? ' bg-[#0866FF] rounded-lg' : 'bg-white'} py-1.5  w-12 my-1.5 items-center`}
                >
                  <Text
                    className={`${second === s ? 'text-white font-bold' : 'font-medium text-black'} text-lg`}
                  >
                    {s.toString()}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.buttonRow}>
            <GradientButton
              title=" Đóng"
              onPress={onClose}
              colors={['#F3F4F6', '#F3F4F6']}
              containerClassName="w-1/4"
              textClassName="text-[#9CA3AF] font-bold rounded-[8px]"
            />

            <GradientButton
              title=" Xác nhận"
              onPress={() => onConfirm({ hour, minute, second })}
              containerClassName="w-1/4 rounded-[8px]"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
  },

  scroll: { height: 160, width: 60 },
  scrollContainer: { alignItems: 'center' },
  separator: { fontSize: 24, paddingHorizontal: 5 },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default TimePicker;

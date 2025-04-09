import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BookingCard from '../home/booking-card';
import CombinedRevenueChart from '../home/combined-revenue-chart';
import DonutChartSection from '../home/donut-chart-section';
import Header from '../home/header';
import LeaderBoard from '../home/leader-board';
import LineChartSection from '../home/line-chart-section';
import CustomDatePicker from '@/components/custom/CustomDatePicker';
import CustomDatePickerModal from '@/components/custom/CustomDatePicker';

export default function HomeScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle="dark-content"
        showHideTransition="slide"
      />

      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Header />
          <BookingCard />
          {/* <TimePicker
            visible={true}
            onClose={() => {}}
            onConfirm={(time: any) => {
              console.log('Đã chọn:', time); // { hour: XX, minute: XX, second: XX }
            }}
          /> */}
          {/* <CustomDatePickerModal
            visible={true}
            onClose={() => {}}
            onSelectDate={(date) => {
              console.log(date);
            }}
            minDate={new Date(2024, 0, 1)} // 1/1/2024
            maxDate={new Date(2025, 11, 31)} // 31/12/2025
          /> */}

          <CombinedRevenueChart />
          <LineChartSection />
          <DonutChartSection />
          <LeaderBoard />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

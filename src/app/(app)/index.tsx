import React from 'react';
import { ScrollView, StyleSheet, StatusBar } from 'react-native';
import Header from '../home/header';
import CommentsList from '../home/comments-list';
import DonutChartSection from '../home/donut-chart-section';
import LineChartSection from '../home/line-chart-section';
import RevenueCard from '../home/revenue-card';
import UsageBarChart from '../home/usage-bar-chart';
import { Stack } from 'expo-router';
import BookingCard from '../home/booking-card';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Header />
          <BookingCard />
          <RevenueCard />
          <UsageBarChart />
          <LineChartSection />
          <DonutChartSection />
          <CommentsList />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

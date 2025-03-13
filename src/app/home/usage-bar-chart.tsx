import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const UsageBarChart = () => {
  const barData = [
    { value: 20, label: 'Jan', frontColor: '#00C4B4' },
    { value: 45, label: 'Feb', frontColor: '#00C4B4' },
    { value: 28, label: 'Mar', frontColor: '#00C4B4' },
    { value: 80, label: 'Apr', frontColor: '#00C4B4' },
    { value: 99, label: 'May', frontColor: '#00C4B4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mức Sử Dụng</Text>
        <Text style={styles.time}>Tháng Này</Text>
      </View>
      <BarChart
        data={barData}
        barWidth={30}
        spacing={20}
        height={200}
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={5}
        maxValue={100}
        showGradient
        gradientColor="#00C4B4"
        initialSpacing={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default UsageBarChart;

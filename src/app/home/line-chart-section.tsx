import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const LineChartSection = () => {
  const lineData = [
    { value: 20, label: '1/12', frontColor: '#0000FF' },
    { value: 45, label: '3/12', frontColor: '#0000FF' },
    { value: 28, label: '5/12', frontColor: '#0000FF' },
    { value: 80, label: '7/12', frontColor: '#0000FF' },
    { value: 99, label: '9/12', frontColor: '#0000FF' },
    { value: 43, label: '11/12', frontColor: '#0000FF' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mức Độ Kết Nối</Text>
        <Text style={styles.time}>Tháng Này</Text>
      </View>
      <LineChart
        data={lineData}
        height={200}
        width={300}
        yAxisThickness={0}
        xAxisThickness={0}
        noOfSections={5}
        maxValue={100}
        thickness={2}
        color="#0000FF"
        showVerticalLines
        verticalLinesColor="#E0E0E0"
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

export default LineChartSection;

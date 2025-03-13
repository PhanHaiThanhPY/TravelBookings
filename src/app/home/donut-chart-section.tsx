import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const DonutChartSection = () => {
  const pieData = [
    { value: 21500000, color: '#FF5733', text: 'Tiền Gửi 000' },
    { value: 2800000, color: '#C70039', text: 'Tiền Nợ' },
    { value: 5270000, color: '#900C3F', text: 'Lợi Nhuận' },
    { value: 8530000, color: '#581845', text: 'Chi Phí' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Thống Kê Ngân Tiền</Text>
        <Text style={styles.time}>Tháng Này</Text>
      </View>
      <PieChart
        data={pieData}
        donut
        showText
        textColor="#000"
        radius={80}
        innerRadius={50}
        innerCircleColor="#fff"
        textSize={12}
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
    alignItems: 'center',
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

export default DonutChartSection;

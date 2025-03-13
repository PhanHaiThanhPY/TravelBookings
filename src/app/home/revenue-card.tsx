import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RevenueCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Doanh Thu</Text>
        <Text style={styles.time}>Tháng Này</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.percentage}>25%</Text>
        <Text style={styles.amount}>4,716 Triệu Đồng</Text>
        <Text style={styles.subtitle}>Không Đạt Được</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    marginTop: 10,
  },
  percentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00C4B4',
  },
  amount: {
    fontSize: 16,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default RevenueCard;

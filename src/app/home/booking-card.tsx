import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const BookingCard = () => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="calendar" size={20} color="#007AFF" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Đặt phòng mới</Text>
          <Text style={styles.subtitle}>Hôm nay 18/02/2025</Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Progress.Circle
          size={80}
          progress={0.25} // 25% như trong hình
          thickness={8}
          color="#007AFF"
          unfilledColor="#E0E0E0"
          borderWidth={0}
          showsText={true}
          formatText={() => '25%'}
          textStyle={styles.progressText}
        />
        <View style={styles.stats}>
          <Text style={styles.statsNumber}>4/16 phòng</Text>
          <Text style={styles.statsLabel}>Khách đang sử dụng</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.arrow}>
        <Ionicons name="chevron-forward" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: '#E6F0FA',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'center',
  },
  stats: {
    marginTop: 10,
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statsLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  arrow: {
    padding: 10,
  },
});

export default BookingCard;

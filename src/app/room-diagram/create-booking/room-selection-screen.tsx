import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchCustom from '@/components/custom/search-custom';

const RoomSelectionScreen = () => {
  // Initial room data with selected state
  const [rooms, setRooms] = useState([
    {
      id: '1',
      name: 'P205 - Tầng 2',
      status: 'Chưa dọn',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000, // Store price as a number for calculation
      selected: true,
    },
    {
      id: '2',
      name: 'P205 - Tầng 2',
      status: '',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
    {
      id: '3',
      name: 'P205 - Tầng 2',
      status: 'Chưa dọn',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
    {
      id: '4',
      name: 'P205 - Tầng 2',
      status: '',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
    {
      id: '5',
      name: 'P205 - Tầng 2',
      status: '',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
    {
      id: '6',
      name: 'P205 - Tầng 2',
      status: '',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
    {
      id: '7',
      name: 'P205 - Tầng 2',
      status: '',
      type: 'Double/Phòng 01 giờ đến đối 2 nguồn',
      capacity: '2 nguồn lớn, 0 trẻ em',
      price: 1650000,
      selected: false,
    },
  ]);

  // Calculate total price and selected count
  const selectedRooms = rooms.filter((room) => room.selected);
  const totalPrice = selectedRooms.reduce((sum, room) => sum + room.price, 0);
  const selectedCount = selectedRooms.length;

  // Handle room selection change
  const handleRoomSelect = (roomId: string) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, selected: !room.selected } : room
      )
    );
  };

  // Handle deselect all
  const handleDeselectAll = () => {
    setRooms((prevRooms) =>
      prevRooms.map((room) => ({ ...room, selected: false }))
    );
  };

  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Render each room item
  const renderRoomItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.roomItem, item.selected && styles.selectedRoomItem]}
      onPress={() => handleRoomSelect(item.id)}
    >
      <Image
        source={{ uri: 'https://via.placeholder.com/40' }} // Replace with actual image URL
        style={styles.roomImage}
      />
      <View style={styles.roomDetails}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomName}>{item.name}</Text>
          {item.status ? (
            <Text style={styles.roomStatus}>! {item.status}</Text>
          ) : (
            <View style={styles.emptyStatus} />
          )}
        </View>
        <Text style={styles.roomType}>{item.type}</Text>
        <Text style={styles.roomCapacity}>{item.capacity}</Text>
        <Text style={styles.roomPrice}>đ{formatPrice(item.price)}</Text>
      </View>
      {item.selected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#3B82F6"
          style={styles.checkIcon}
        />
      )}
    </TouchableOpacity>
  );

  const [keySearch, setKeySearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View className="mx-3 mb-3">
        <SearchCustom
          value={keySearch}
          onChangeText={(e) => {
            setKeySearch(e);
          }}
        />
      </View>

      {/* Date Selection */}
      <View style={styles.dateContainer}>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>Nhận phòng</Text>
          <Text style={styles.dateValue}>13:30 26/12</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dateButton}>
          <Text style={styles.dateText}>Trả phòng</Text>
          <Text style={styles.dateValue}>13:00 26/12</Text>
        </TouchableOpacity>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>1 Ngày</Text>
        </View>
      </View>

      {/* Room List */}
      <FlatList
        data={rooms}
        renderItem={renderRoomItem}
        keyExtractor={(item) => item.id}
        style={styles.roomList}
      />

      {/* Footer */}
      {/* <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Tổng tiền</Text>
          <Text style={styles.totalAmount}>đ{formatPrice(totalPrice)}</Text>
          {selectedCount > 0 && (
            <TouchableOpacity onPress={handleDeselectAll}>
              <Text style={styles.removeSelectionText}>
                Bỏ chọn ({selectedCount})
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Chọn</Text>
        </TouchableOpacity>
      </View> */}

      <View className="flex-col justify-between p-4 bg-white border-t border-gray-200  gap-3 shadow-gray-200 shadow-md rounded-t-xl">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-medium flex-1">Tổng thanh toán</Text>
          <Text className="text-xl font-bold text-[#0866FF]">đ1,650,000</Text>
          <Ionicons name="chevron-forward" size={20} color="#374151" />
        </View>
        <View className="flex-row justify-between items-center gap-3">
          <TouchableOpacity className="flex-1 border border-[#0866FF] rounded-lg py-3 items-center ">
            <Text className="text-[#0866FF] font-bold text-base">
              Đặt trước
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-blue-500 rounded-lg py-3 items-center">
            <Text className="text-white font-bold text-base">Nhận phòng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  dateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  dateValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  durationContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.5,
  },
  durationText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  roomList: {
    flex: 1,
  },
  roomItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 8,
    borderRadius: 8,
    marginHorizontal: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedRoomItem: {
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  roomImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  roomDetails: {
    flex: 1,
  },
  roomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  roomStatus: {
    fontSize: 12,
    color: '#EF4444',
    marginLeft: 8,
  },
  emptyStatus: {
    width: 0,
  },
  roomType: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  roomCapacity: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  roomPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  checkIcon: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  totalContainer: {
    flex: 1,
  },
  totalText: {
    fontSize: 14,
    color: '#6B7280',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 4,
  },
  removeSelectionText: {
    fontSize: 14,
    color: '#3B82F6',
  },
  submitButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  submitButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default RoomSelectionScreen;

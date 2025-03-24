import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookingList } from '../booking/components/booking-list';
import BookingHeader from '../booking/header';
import { viewTypeData } from '../room-diagram/constants';
import { RoomBookingStatus } from '../room-diagram/types';

export default function RoomDiagramScreen() {
  const [selectedViewType, setSelectedViewType] = useState<any>(
    viewTypeData[0]
  );
  const [showViewTypeDropdown, setShowViewTypeDropdown] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<RoomBookingStatus[]>(
    [RoomBookingStatus.ALL]
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (statusId: RoomBookingStatus) => {
    if (statusId === RoomBookingStatus.ALL) {
      setSelectedStatuses([RoomBookingStatus.ALL]);
    } else {
      let newSelectedStatuses = selectedStatuses.filter(
        (id) => id !== RoomBookingStatus.ALL
      );

      if (newSelectedStatuses.includes(statusId)) {
        newSelectedStatuses = newSelectedStatuses.filter(
          (id) => id !== statusId
        );
      } else {
        newSelectedStatuses.push(statusId);
      }

      if (newSelectedStatuses.length === 0) {
        setSelectedStatuses([RoomBookingStatus.ALL]);
      } else {
        setSelectedStatuses(newSelectedStatuses);
      }
    }
  };

  const handleSelectViewType = (viewType: any) => {
    setSelectedViewType(viewType);
    setShowViewTypeDropdown(false);
  };

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
        <View style={styles.container}>
          <BookingHeader
            selectedViewType={selectedViewType}
            showViewTypeDropdown={showViewTypeDropdown}
            selectedStatuses={selectedStatuses}
            searchQuery={searchQuery}
            onToggleStatus={toggleStatus}
            onSelectViewType={handleSelectViewType}
            onToggleDropdown={() =>
              setShowViewTypeDropdown(!showViewTypeDropdown)
            }
            setSearchQuery={setSearchQuery}
          />

          <BookingList bookings={[]} />
        </View>
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

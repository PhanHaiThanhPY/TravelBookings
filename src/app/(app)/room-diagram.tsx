import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RoomList } from '../room-diagram/components/room-list';
import { areaData } from '../room-diagram/constants';
import RoomDiagramHeader from '../room-diagram/header';
import { type Area, RoomBookingStatus } from '../room-diagram/types';

export default function RoomDiagramScreen() {
  const [selectedArea, setSelectedArea] = useState<Area>(areaData[0]);
  const [showAreaDropdown, setShowAreaDropdown] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<RoomBookingStatus[]>([
    RoomBookingStatus.ALL,
  ]);
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

  const handleSelectArea = (area: Area) => {
    setSelectedArea(area);
    setShowAreaDropdown(false);
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
          <View style={styles.headerContainer}>
            <RoomDiagramHeader
              selectedArea={selectedArea}
              showAreaDropdown={showAreaDropdown}
              selectedStatuses={selectedStatuses}
              searchQuery={searchQuery}
              onToggleStatus={toggleStatus}
              onSelectArea={handleSelectArea}
              onToggleDropdown={() => setShowAreaDropdown(!showAreaDropdown)}
              setSearchQuery={setSearchQuery}
            />
          </View>
          <ScrollView style={styles.scrollContainer}>
            <RoomList
              selectedArea={selectedArea.id}
              selectedStatuses={selectedStatuses}
              searchQuery={searchQuery}
            />
          </ScrollView>
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
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 200, // Adjust this value based on your header height
  },
});

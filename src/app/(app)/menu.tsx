import { Stack } from 'expo-router';
import * as React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { SafeAreaView, ScrollView } from '@/components/ui';

import MenuHeader from '../menu/menu-header';
import MenuList from '../menu/menu-list';

export default function Menu() {
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
          <MenuHeader />
          <MenuList />
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

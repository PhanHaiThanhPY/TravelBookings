/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/lib';
import IconBooking from '@/components/ui/icons/icon-booking';
import IconDiagram from '@/components/ui/icons/icon-diagram';
import { View, Pressable } from 'react-native';
import IconHome from '@/components/ui/icons/icon-home';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  if (isFirstTime) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/auth/login/login" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tổng quan',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute w-20 h-1 bg-blue-600 rounded-md" />
              )}
              <IconHome isActive={focused} />
            </View>
          ),
          headerRight: () => <CreateNewPostLink />,
          tabBarButtonTestID: 'home-tab',
          tabBarLabelStyle: {
            fontSize: 14,
            marginVertical: 5,
          },
          tabBarActiveTintColor: '#0866FF', // Màu khi tab được chọn
          tabBarInactiveTintColor: '#6B7280', // Màu khi tab không được chọn
        }}
      />

      <Tabs.Screen
        name="style"
        options={{
          title: 'Sơ đồ phòng',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute w-20 h-1 bg-blue-600 rounded-md" />
              )}
              <IconDiagram isActive={focused} />
            </View>
          ),
          headerRight: () => <CreateNewPostLink />,
          tabBarButtonTestID: 'style-tab',
          tabBarLabelStyle: {
            fontSize: 14,
            marginVertical: 5,
          },
          tabBarActiveTintColor: '#0866FF', // Màu khi tab được chọn
          tabBarInactiveTintColor: '#6B7280', // Màu khi tab không được chọn
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Booking',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute w-20 h-1 bg-blue-600 rounded-md" />
              )}
              <IconBooking isActive={focused} />
            </View>
          ),
          headerRight: () => <CreateNewPostLink />,
          tabBarButtonTestID: 'settings-tab',
          tabBarLabelStyle: {
            fontSize: 14,
            marginVertical: 5,
          },
          tabBarActiveTintColor: '#0866FF', // Màu khi tab được chọn
          tabBarInactiveTintColor: '#6B7280', // Màu khi tab không được chọn
        }}
      />
    </Tabs>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        {/* <Text className="px-3 text-primary-300">Create</Text> */}
      </Pressable>
    </Link>
  );
};

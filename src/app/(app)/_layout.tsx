import { Link, Redirect, SplashScreen, Tabs } from 'expo-router';
import React, { useCallback, useEffect } from 'react';
import { Pressable, View } from 'react-native';

import IconBooking from '@/components/ui/icons/icon-booking';
import IconDiagram from '@/components/ui/icons/icon-diagram';
import IconHome from '@/components/ui/icons/icon-home';
import { useAuth, useIsFirstTime } from '@/lib';

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
                <View className="absolute h-1 w-20 rounded-md bg-blue-600" />
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
        name="room-diagram"
        options={{
          title: 'Sơ đồ phòng',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute h-1 w-20 rounded-md bg-blue-600" />
              )}
              <IconDiagram isActive={focused} />
            </View>
          ),
          tabBarButtonTestID: 'room-diagram-tab',
          tabBarLabelStyle: {
            fontSize: 14,
            marginVertical: 5,
          },
          tabBarActiveTintColor: '#0866FF', // Màu khi tab được chọn
          tabBarInactiveTintColor: '#6B7280', // Màu khi tab không được chọn
        }}
      />

      {/* <Tabs.Screen
        name="style"
        options={{
          title: 'Sơ đồ phòng',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute h-1 w-20 rounded-md bg-blue-600" />
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
      /> */}

      {/* <Tabs.Screen
        name="settings"
        options={{
          title: 'Booking',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute h-1 w-20 rounded-md bg-blue-600" />
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
      /> */}

      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <View className="items-center pt-2">
              {focused && (
                <View className="absolute h-1 w-20 rounded-md bg-blue-600" />
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

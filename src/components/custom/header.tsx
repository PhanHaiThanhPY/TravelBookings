import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onBackPress }) => {
  return (
    <Stack.Screen
      options={{
        headerShown: true,
        title: title,
        headerLeft: () => (
          <TouchableOpacity onPress={onBackPress}>
            <Ionicons name="chevron-back" size={24} color="#374151" />
          </TouchableOpacity>
        ),
      }}
    />
  );
};

export default Header;

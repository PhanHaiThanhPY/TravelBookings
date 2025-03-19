import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface ChooseSelectInputProps {
  value: string;
  onPress: () => void;
  placeholder?: string;
  errors: FieldErrors;
  name: string;
  control: Control<any>;
}

const ChooseSelectInput = ({
  value,
  onPress,
  placeholder,
  errors,
  name,
  control,
}: ChooseSelectInputProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.inputWrapper}>
        <Controller
          control={control}
          name={name}
          disabled={true}
          render={({ field: {} }) => (
            <TextInput
              value={value || ''}
              placeholder={placeholder}
              placeholderTextColor="#6B7280"
              editable={false}
              style={[
                styles.textInput,
                {
                  backgroundColor: 'transparent',
                  color: '#1F2937',
                },
              ]}
            />
          )}
        />
        <Ionicons
          name="chevron-down"
          size={24}
          color="#6B7280"
          className="mr-2"
        />
      </View>
      {errors[name] && (
        <Text style={styles.errorText}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
    flexDirection: 'row', // Added to align input and icon
    alignItems: 'center', // Center items vertically
  },
  textInput: {
    flex: 1, // Takes remaining space
    height: 40,
    paddingLeft: 12,
    paddingRight: 8, // Added right padding for icon spacing
    fontSize: 14,
  },

  errorText: {
    color: '#EF4444',
    marginTop: 4,
    fontSize: 12,
  },
});

export default ChooseSelectInput;

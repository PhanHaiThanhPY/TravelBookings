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
  errors?: FieldErrors;
  name: string;
  control?: Control<any>;
  disabled?: boolean;
  type?: number;
  setModalType?: (value: number) => void;
}

const ChooseSelectInput = ({
  value,
  onPress,
  placeholder,
  errors,
  name,
  control,
  disabled = false,
  type,
  setModalType,
}: ChooseSelectInputProps) => {
  const handlePress = () => {
    onPress();
    if (setModalType && type !== undefined) {
      setModalType(type);
    }
  };

  const inputStyles = [
    styles.textInput,
    { backgroundColor: 'transparent', color: '#1F2937' },
  ];

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View style={styles.inputWrapper}>
        {control ? (
          <Controller
            control={control}
            name={name}
            render={({ field: { value: fieldValue } }) => (
              <TextInput
                value={fieldValue || ''} // Lấy giá trị từ field.value của Controller
                placeholder={placeholder}
                placeholderTextColor="#6B7280"
                editable={false}
                style={inputStyles}
              />
            )}
          />
        ) : (
          <TextInput
            value={value || ''} // Sử dụng giá trị từ props khi không có control
            placeholder={placeholder}
            placeholderTextColor="#6B7280"
            editable={false}
            style={inputStyles}
          />
        )}
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#6B7280"
          style={{ marginRight: 8 }}
        />
      </View>
      {errors?.[name] && (
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    height: 40,
    paddingLeft: 12,
    paddingRight: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#EF4444',
    marginTop: 4,
    fontSize: 12,
  },
});

export default ChooseSelectInput;

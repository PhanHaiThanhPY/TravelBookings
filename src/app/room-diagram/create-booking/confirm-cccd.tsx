// screens/ConfirmCCCD.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';



const ConfirmCCCD: React.FC = () => {
  const handleConfirm = async () => {
    try {
      // const formData = new FormData();
      // formData.append('image', {
      //   uri: imageUri,
      //   type: 'image/jpeg',
      //   name: 'cccd_image.jpg',
      // });

      // const response = await fetch('https://your-api-endpoint/upload', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });

      // const result = await response.json();
      // if (response.ok) {
      //   Alert.alert('Success', 'CCCD image uploaded successfully!');
      //   // Optionally navigate to another screen or reset the flow
      //   // navigation.navigate('ScanCCCD');
      // } else {
      //   Alert.alert('Error', 'Failed to upload CCCD image.');
      // }
    } catch (error) {
      console.log('Upload Error: ', error);
      Alert.alert('Error', 'An error occurred during upload.');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* Image Preview */}
      <View className="w-64 h-64 rounded-lg overflow-hidden border-2 border-white">
        {/* <Image
          source={{ uri: imageUri }}
          className="w-full h-full"
          resizeMode="cover"
        /> */}
        {/* Success Message */}
        <View className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex-row items-center">
          {/* <Ionicons name="checkmark-circle" size={20} color="#22C55E" /> */}
          <Text className="ml-1 text-sm text-gray-800 font-medium">
            Chụp hình thành công
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View className="flex-row mt-8">
        <TouchableOpacity
          className="bg-transparent border-2 border-white rounded-lg px-6 py-3 mr-4"
          // onPress={}
        >
          <Text className="text-white text-base font-medium">Chụp lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3"
          onPress={handleConfirm}
        >
          <Text className="text-white text-base font-medium">Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmCCCD;

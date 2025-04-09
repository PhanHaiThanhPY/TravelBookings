import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const ConfirmCCCD: React.FC = () => {
  const cameraRef = useRef<RNCamera>(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const options = {
          quality: 0.5,
          base64: false,
        };
        const data = await cameraRef.current.takePictureAsync(options);
        console.log('Image captured:', data.uri);
        // Handle the captured image here
      } catch (error) {
        console.log('Error taking picture:', error);
      }
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-black">
      {/* <RNCamera
        ref={cameraRef}
        className="w-64 h-64 rounded-lg overflow-hidden"
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          console.log(barcodes);
        }}
      >
        <View className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full flex-row items-center">
          <Text className="ml-1 text-sm text-gray-800 font-medium">
            Chụp hình thành công
          </Text>
        </View>
      </RNCamera> */}
      <RNCamera
          // style={styles.camera}
          type={RNCamera.Constants.Type.back}
          ref={cameraRef}
          captureAudio={false}
          onBarCodeRead={() => {}}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        />

      <View className="flex-row mt-8">
        <TouchableOpacity
          className="bg-transparent border-2 border-white rounded-lg px-6 py-3 mr-4"
          onPress={takePicture}
        >
          <Text className="text-white text-base font-medium">Chụp lại</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-blue-600 rounded-lg px-6 py-3">
          <Text className="text-white text-base font-medium">Xác nhận</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmCCCD;

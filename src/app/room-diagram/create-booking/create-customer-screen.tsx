import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FloatingLabelInput } from '@/components/custom/floating-label-input';
import { schemaCreateCustomer } from '../schema/schema-validation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Options, OptionType, useModal } from '@/components/ui';
import ChooseSelectInput from '@/components/custom/choose-select-input';
import { LoginFormProps } from '@/components/login-form';
import { ADMINISTRATIVE_UNITS_TYPE } from '@/types';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { router } from 'expo-router';
const CreateCustomerScreen = () => {
  const [modalType, setModalType] = useState<number>(
    ADMINISTRATIVE_UNITS_TYPE.CITY
  );

  const {
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schemaCreateCustomer),
    mode: 'onChange',
    defaultValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      address: '',
      city_id: '',
      district_id: '',
      ward_id: '',
      customer_type_id: '',
    },
  });

  // const cityId = useWatch({ control, name: 'city_id', defaultValue: null });
  // const districtId = useWatch({
  //   control,
  //   name: 'district_id',
  //   defaultValue: null,
  // });

  // const isDistrictDisabled = !cityId || cityId === '';
  // const isWardDisabled = !districtId || districtId === '';

  const countryData = [
    { label: '1', value: 'Việt Nam' },
    { label: '2', value: 'Thái Lan' },
    { label: '3', value: 'Singapore' },
    { label: '4', value: 'Malaysia' },
    { label: '5', value: 'Indonesia' },
    { label: '6', value: 'Philippines' },
    { label: '7', value: 'Cambodia' },
  ];

  const groupCustomerData = [
    { label: '1', value: 'Vip' },
    { label: '2', value: 'Vip 2' },
    { label: '3', value: 'Vip 3' },
    { label: '4', value: 'Vip 4' },
    { label: '5', value: 'Vip 5' },
    { label: '6', value: 'Vip 6' },
    { label: '7', value: 'Vip 7' },
  ];

  // Tạo hai instance modal riêng biệt
  const administrativeModal = useModal();
  const customerTypeModal = useModal();

  const onSelectAdministrative = useCallback(
    (option: OptionType) => {
      switch (modalType) {
        case ADMINISTRATIVE_UNITS_TYPE.CITY:
          setValue('city_id', option.value);
          clearErrors('city_id');
          break;
        case ADMINISTRATIVE_UNITS_TYPE.DISTRICT:
          setValue('district_id', option.value);
          clearErrors('district_id');
          break;
        case ADMINISTRATIVE_UNITS_TYPE.WARD:
          setValue('ward_id', option.value);
          clearErrors('ward_id');
          break;
        default:
          break;
      }
      administrativeModal.dismiss();
    },
    [modalType, clearErrors, administrativeModal]
  );

  const onSelectCustomerType = useCallback(
    (option: OptionType) => {
      setValue('customer_type_id', option.value);
      customerTypeModal.dismiss();
    },
    [customerTypeModal]
  );

  const handleGetValue = () => {
    switch (modalType) {
      case ADMINISTRATIVE_UNITS_TYPE.CITY:
        return getValues('city_id');
      case ADMINISTRATIVE_UNITS_TYPE.DISTRICT:
        return getValues('district_id');
      case ADMINISTRATIVE_UNITS_TYPE.WARD:
        return getValues('ward_id');
      default:
        return '';
    }
  };

  const handleTitleHeaderModal = () => {
    switch (modalType) {
      case ADMINISTRATIVE_UNITS_TYPE.CITY:
        return 'Chọn Tỉnh/Thành phố';
      case ADMINISTRATIVE_UNITS_TYPE.DISTRICT:
        return 'Chọn Quận/Huyện';
      case ADMINISTRATIVE_UNITS_TYPE.WARD:
        return 'Chọn Phường/Xã';
      default:
        return '';
    }
  };

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
  };

  const [imageUri, setImageUri] = useState<string | null>(null);

  // Function to handle image selection
  const handleChooseImage = () => {
    const options: any = {
      mediaType: 'photo', // 'photo' or 'video'
      quality: 1, // 0 to 1, controls image quality
      maxWidth: 500, // Resize image
      maxHeight: 500,
      includeBase64: false, // Set to true if you need base64 data
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log(
          'ImagePicker Error: ',
          response.errorCode,
          response.errorMessage
        );
        Alert.alert(
          'Error',
          `Something went wrong: ${response.errorMessage || 'Unknown error'}`
        );
      } else if (response.assets && response.assets.length > 0) {
        const selectedImageUri = response.assets[0].uri;
        if (selectedImageUri) {
          setImageUri(selectedImageUri);
          // handleUploadImage(selectedImageUri); // Call upload function
        }
      }
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="flex flex-col px-3 py-3">
            <View className="w-full flex flex-row items-center justify-start gap-2">
              <TouchableOpacity
                className="bg-blue-50 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center active:bg-blue-100 w-24 h-24"
                onPress={handleChooseImage}
              >
                <Ionicons name="image-outline" size={30} color="#3B82F6" />
                <Text className="text-sm text-gray-800 font-medium text-center">
                  Tải ảnh lên
                </Text>
              </TouchableOpacity>
              {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  className="w-24 h-24 rounded-lg"
                  resizeMode="cover"
                />
              )}
            </View>

            <View className="flex flex-row gap-2 mt-4">
              <View className="flex-1">
                <FloatingLabelInput
                  control={control}
                  name="customer_name"
                  label="Tên khách hàng"
                  errors={errors}
                />
              </View>
              <TouchableOpacity
                className="bg-blue-50 border-2 border-dashed border-blue-500 rounded w-14 h-14 flex items-center justify-center active:bg-blue-100 relative"
                onPress={() => {
                  router.push('/room-diagram/create-booking/confirm-cccd');
                }}
              >
                {/* Corner markers */}
                <View className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-blue-500" />
                <View className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-blue-500" />
                <View className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-blue-500" />
                <View className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-blue-500" />

                {/* Icon */}
                <Ionicons name="document-outline" size={18} color="#3B82F6" />
              </TouchableOpacity>
            </View>
            <FloatingLabelInput
              control={control}
              name="customer_email"
              label="Email"
              errors={errors}
            />
            <FloatingLabelInput
              control={control}
              name="customer_phone"
              label="Số điện thoại"
              errors={errors}
            />

            <View className="">
              <Text className="text-base text-gray-700 mb-2">Giới tính</Text>
              <View className="flex-row">
                <TouchableOpacity className="flex-row items-center mr-4">
                  <Ionicons name="radio-button-on" size={25} color="#3B82F6" />
                  <Text className="text-base">Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Ionicons name="radio-button-off" size={25} color="#6B7280" />
                  <Text className="text-base">Nữ</Text>
                </TouchableOpacity>
              </View>
            </View>

            <FloatingLabelInput
              control={control}
              name="address"
              label="Địa chỉ"
              errors={errors}
            />

            <View className="flex flex-col my-1">
              <Text className="text-sm text-gray-700 mb-2">Tỉnh/Thành phố</Text>
              <ChooseSelectInput
                value={getValues('city_id')}
                placeholder="Chọn Tỉnh/Thành phố"
                onPress={administrativeModal.present}
                errors={errors}
                name="city_id"
                control={control}
                type={ADMINISTRATIVE_UNITS_TYPE.CITY}
                setModalType={setModalType}
              />
            </View>

            <View className="flex flex-col my-1">
              <Text className="text-sm text-gray-700 mb-2">Quận/Huyện</Text>
              <ChooseSelectInput
                value={getValues('district_id')}
                placeholder="Chọn Quận/Huyện"
                onPress={administrativeModal.present}
                errors={errors}
                name="district_id"
                control={control}
                type={ADMINISTRATIVE_UNITS_TYPE.DISTRICT}
                setModalType={setModalType}
              />
            </View>

            <View className="flex flex-col my-1">
              <Text className="text-sm text-gray-700 mb-2">Phường/Xã</Text>
              <ChooseSelectInput
                value={getValues('ward_id')}
                placeholder="Chọn Phường/Xã"
                onPress={administrativeModal.present}
                errors={errors}
                name="ward_id"
                control={control}
                type={ADMINISTRATIVE_UNITS_TYPE.WARD}
                setModalType={setModalType}
              />
            </View>

            <View className="flex flex-col my-1">
              <Text className="text-sm text-gray-700 mb-2">
                Nhóm khách hàng
              </Text>
              <ChooseSelectInput
                value={getValues('customer_type_id')}
                placeholder="Chọn nhóm khách hàng"
                onPress={customerTypeModal.present}
                errors={errors}
                name="customer_type_id"
                control={control}
              />
            </View>
            <View className="flex flex-col my-1">
              <View className="flex flex-row items-center justify-between mb-2">
                <Text className="text-sm text-gray-700">Ghi chú</Text>
                <Text className="text-xs text-gray-500">0/150 ký tự</Text>
              </View>
              <TextInput
                className="w-full h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                placeholder=""
                placeholderTextColor="#6B7280"
                multiline
              />
            </View>
          </View>
        </ScrollView>
        <View className="p-4 border-t border-gray-200 bg-white">
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 items-center"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white font-bold text-base">Lưu</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Modal cho administrative units */}
      <Options
        ref={administrativeModal.ref}
        options={countryData}
        onSelect={onSelectAdministrative}
        value={handleGetValue()}
        titleHeader={handleTitleHeaderModal()}
      />

      {/* Modal cho customer type */}
      <Options
        ref={customerTypeModal.ref}
        options={groupCustomerData}
        onSelect={onSelectCustomerType}
        value={getValues('customer_type_id')}
        titleHeader="Chọn nhóm khách hàng"
      />
    </GestureHandlerRootView>
  );
};

export default CreateCustomerScreen;

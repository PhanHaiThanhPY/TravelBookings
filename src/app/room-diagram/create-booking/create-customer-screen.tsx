import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
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
import { useCallback } from 'react';
import { ADMINISTRATIVE_UNITS_TYPE } from '@/types';

const CreateCustomerScreen = () => {
  const {
    handleSubmit,
    control,
    setValue,
    getValues,
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
    },
  });

  const cityId = useWatch({ control, name: 'city_id', defaultValue: null });
  const districtId = useWatch({
    control,
    name: 'district_id',
    defaultValue: null,
  });

  const isDistrictDisabled = !cityId || cityId === '';
  const isWardDisabled = !districtId || districtId === '';

  const countryData = [
    { label: '1', value: 'Việt Nam' },
    { label: '2', value: 'Thái Lan' },
    { label: '3', value: 'Singapore' },
    { label: '4', value: 'Malaysia' },
    { label: '5', value: 'Indonesia' },
    { label: '6', value: 'Philippines' },
    { label: '7', value: 'Cambodia' },
  ];

  const modal = useModal();

  const onSelect = useCallback(
    (option: OptionType) => {
      switch (option.value) {
        case ADMINISTRATIVE_UNITS_TYPE.CITY:
          setValue('city_id', option.value);
          break;
        case ADMINISTRATIVE_UNITS_TYPE.DISTRICT:
          setValue('district_id', option.value);
          break;
        case ADMINISTRATIVE_UNITS_TYPE.WARD:
          setValue('ward_id', option.value);
          break;
        default:
          break;
      }
      modal.dismiss();
    },
    [modal]
  );

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    // signIn({ access: 'access-token', refresh: 'refresh-token' });
    // router.push('/');
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView>
          <View className="flex px-3 w-full gap-1">
            <View className="mx-2 mt-4">
              <TouchableOpacity className="w-20 h-20 border border-dashed border-[#0866FF] rounded-lg flex items-center justify-center">
                <Ionicons name="image-outline" size={24} color="#6B7280" />
              </TouchableOpacity>
              <Text className="text-sm text-gray-700 mt-2">Tải ảnh lên</Text>
            </View>
            <FloatingLabelInput
              control={control}
              name="customer_name"
              label="Tên khách hàng"
              errors={errors}
            />
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

            <View className="mb-4">
              <Text className="text-base text-gray-700 mb-2">Giới tính</Text>
              <View className="flex-row">
                <TouchableOpacity className="flex-row items-center mr-4">
                  <Ionicons
                    name="radio-button-on"
                    size={25}
                    color="#3B82F6"
                    className="mr-2"
                  />
                  <Text className="text-base">Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-row items-center">
                  <Ionicons
                    name="radio-button-off"
                    size={25}
                    color="#6B7280"
                    className="mr-2"
                  />
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

            <ChooseSelectInput
              value={getValues('city_id')}
              placeholder="Chọn Tỉnh/Thành phố"
              onPress={modal.present}
              errors={errors}
              name="city_id"
              control={control}
            />

            <ChooseSelectInput
              value={getValues('district_id')}
              placeholder="Chọn Quận/Huyện"
              onPress={modal.present}
              errors={errors}
              name="district_id"
              control={control}
            />

            <FloatingLabelInput
              control={control}
              name="ward_id"
              label="Chọn Phường/Xã"
              errors={errors}
              disabled={isWardDisabled}
            />

            <View className="mb-4">
              <Text className="text-sm text-gray-700 mb-2">
                Nhóm khách hàng
              </Text>
              <TouchableOpacity className="w-full h-12 border border-gray-300 rounded-lg px-4 flex-row items-center justify-between">
                <Text className="text-sm text-gray-500">Chọn nhóm</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View className="mb-4">
              <Text className="text-sm text-gray-700 mb-2">Ghi chú</Text>
              <TextInput
                className="w-full h-24 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                placeholder=""
                placeholderTextColor="#6B7280"
                multiline
              />
              <Text className="text-xs text-gray-500 mt-1">0/150 ký tự</Text>
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

      <Options
        ref={modal.ref}
        options={countryData}
        onSelect={onSelect}
        value={getValues('city_id')}
      />
    </GestureHandlerRootView>
  );
};

export default CreateCustomerScreen;

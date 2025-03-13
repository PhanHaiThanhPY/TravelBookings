import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, useRef } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as z from 'zod';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Pressable,
  Keyboard,
  Animated,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import logoImage from '../components/ui/assets/bg-login.png'; // Replace with the actual logo path
import logo from '../components/ui/assets/logo.png'; // Replace with the actual logo path
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';

const schema = z.object({
  username: z
    .string()
    .min(2, 'Tên đăng nhập phải lớn hơn 2 kí tự')
    .max(50, 'Tên đăng nhập phải tối đa 50 kí tự')
    .regex(
      /^[a-zA-Z0-9_.]+$/,
      'Tên đăng nhập chỉ được chứa chữ cái, số, dấu gạch dưới (_) và dấu chấm (.)'
    )
    .regex(
      /^(?!.*[_.]{2})[a-zA-Z0-9_].*[a-zA-Z0-9_]$/,
      'Tên đăng nhập không được bắt đầu hoặc kết thúc bằng dấu đặc biệt và không có kí tự đặc biệt liên tiếp'
    ),
  password: z
    .string()
    .min(2, 'Mật khẩu phải lớn hơn 2 kí tự')
    .max(50, 'Mật khẩu phải tối đa 50 kí tự'),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

const { width, height } = Dimensions.get('window');
const SPACING = 16;

export const LoginForm = ({ onSubmit = () => {} }: LoginFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const [isPasswordVisible, setPasswordVisible] = useState(true);
  const [isRemembered, setIsRemembered] = useState(false);

  // Animation states for username and password labels
  const usernameAnim = useRef(new Animated.Value(0)).current;
  const passwordAnim = useRef(new Animated.Value(0)).current;
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleRememberMe = () => {
    setIsRemembered(!isRemembered);
  };

  // Handle animation for floating label
  const handleFocus = (
    anim: Animated.Value,
    setFocused: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFocused(true);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = (
    anim: Animated.Value,
    setFocused: React.Dispatch<React.SetStateAction<boolean>>,
    value: string
  ) => {
    if (!value) {
      setFocused(false);
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  // Interpolate animation for label position and size
  const usernameLabelStyle = {
    top: usernameAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -10], // Move label up
    }),
    fontSize: usernameAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 16], // Shrink label when floating
    }),
    color: usernameAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9CA3AF', '#1F2937'], // Gray to dark when floating
    }),
  };

  const passwordLabelStyle = {
    top: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -10], // Move label up
    }),
    fontSize: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 16], // Shrink label when floating
    }),
    color: passwordAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['#9CA3AF', '#1F2937'], // Gray to dark when floating
    }),
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }}></Stack.Screen>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        className="relative"
      >
        <Pressable className="flex-1 relative" onPress={Keyboard.dismiss}>
          {/* Header with Logo */}
          <View className="flex justify-center items-center">
            <Image source={logoImage} className="w-full" />
            <Image source={logo} className="absolute w-32 h-32 -bottom-10" />
          </View>

          {/* Form Container */}
          <View className="mt-20" style={{ width, padding: SPACING }}>
            <View style={{ gap: SPACING / 2, marginBottom: SPACING * 2 }}>
              <Text className="font-bold text-[24px] text-neutral-900">
                Đăng nhập tài khoản
              </Text>
              <Text className="text-[15px] text-neutral-500">
                Xin chào, chào mừng bạn trở lại với tài khoản của chúng tôi
              </Text>
            </View>

            {/* Username Input with Floating Label */}
            <View className="my-2">
              <View className="relative border border-gray-300 rounded-2xl">
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Animated.Text
                        style={[
                          {
                            position: 'absolute',
                            left: 12,
                            backgroundColor: 'white',
                            fontSize: 16,
                          },
                          usernameLabelStyle,
                        ]}
                      >
                        Tên đăng nhập
                      </Animated.Text>
                      <TextInput
                        className="h-[50px] px-4 text-gray-700 "
                        onFocus={() =>
                          handleFocus(usernameAnim, setIsUsernameFocused)
                        }
                        onBlur={() => {
                          onBlur();
                          handleBlur(usernameAnim, setIsUsernameFocused, value);
                        }}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                      />
                    </>
                  )}
                />
              </View>
              {errors.username && (
                <Text className="text-red-500 mt-1">
                  {errors.username.message}
                </Text>
              )}
            </View>

            {/* Password Input with Floating Label */}
            <View className="my-4">
              <View className="relative border border-gray-300 rounded-2xl flex-row items-center">
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Animated.Text
                        style={[
                          {
                            position: 'absolute',
                            left: 12,
                            backgroundColor: 'white',
                            fontSize: 16,
                          },
                          passwordLabelStyle,
                        ]}
                      >
                        Mật khẩu
                      </Animated.Text>
                      <TextInput
                        className="flex-1 h-[50px] px-4 text-gray-700 "
                        secureTextEntry={isPasswordVisible}
                        onFocus={() =>
                          handleFocus(passwordAnim, setIsPasswordFocused)
                        }
                        onBlur={() => {
                          onBlur();
                          handleBlur(passwordAnim, setIsPasswordFocused, value);
                        }}
                        onChangeText={onChange}
                        value={value}
                        autoCapitalize="none"
                      />
                    </>
                  )}
                />
                <TouchableOpacity
                  onPress={togglePasswordVisibility}
                  className="p-3"
                >
                  <Ionicons
                    name={isPasswordVisible ? 'eye-off' : 'eye'}
                    size={24}
                    color="#9CA3AF"
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Remember Me and Forgot Password */}
            <View className="flex-row justify-between mb-4">
              <TouchableOpacity
                onPress={toggleRememberMe}
                className="flex-row items-center"
              >
                <View
                  className={`w-5 h-5 border border-gray-400 rounded-sm mr-2 ${isRemembered ? 'bg-blue-500' : ''}`}
                />
                <Text className="text-[14px] text-neutral-900">
                  Lưu đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-[14px] text-blue-500">
                  Quên mật khẩu?
                </Text>
              </TouchableOpacity>
            </View>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              className="flex-1 rounded-[12px] mb-4"
              disabled={!isValid}
            >
              <LinearGradient
                colors={['#3985FF', '#0866FF']}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text className="py-4 text-white font-bold">Đăng nhập</Text>
              </LinearGradient>
            </Pressable>

            <TouchableOpacity
              onPress={() => {}}
              className="rounded-[12px] py-4 bg-gray-200"
            >
              <Text className="text-center text-[#001416] font-bold">Thoát</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </KeyboardAwareScrollView>
    </>
  );
};

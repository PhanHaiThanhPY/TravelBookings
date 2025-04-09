import React from 'react';
import { Text, Pressable, PressableProps, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GradientButtonProps extends PressableProps {
  title: string;
  colors?: string[];
  containerClassName?: string;
  gradientClassName?: string;
  textClassName?: string;
}

const GradientButton = ({
  title,
  colors = ['#3985FF', '#0866FF'],
  disabled,
  containerClassName = 'rounded-[8px] w-[100px]',
  gradientClassName = '',
  textClassName = 'py-3 font-bold text-white text-base',
  ...props
}: GradientButtonProps) => {
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      className={`${containerClassName ?? 'rounded-[8px] w-[100px]'}`}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <Animated.View style={{ transform: [{ scale: animatedValue }] }}>
        <LinearGradient
          colors={colors}
          className={gradientClassName}
          style={{
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <Text
            className={`${textClassName ?? 'text-white'} py-3 font-bold  text-base`}
          >
            {title}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
};

export default GradientButton;

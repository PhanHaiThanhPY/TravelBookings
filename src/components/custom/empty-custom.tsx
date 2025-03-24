import React from 'react';
import { View, Image, Text } from 'react-native';
interface EmptyCustomProps {
  title?: string;
  classNameImage?: string;
}

const EmptyCustom = ({
  title = 'Bạn chưa thêm phòng nào!',
  classNameImage = 'w-[200px] h-[100px]',
}: EmptyCustomProps) => {
  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require('../ui/assets/bg-empty.png')}
        className={`${classNameImage} `}
      />
      <Text className="text-center text-lg font-bold text-neutral-500 dark:text-neutral-300 my-1">
        {title}
      </Text>
    </View>
  );
};
export default EmptyCustom;

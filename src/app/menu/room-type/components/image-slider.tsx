import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ImageSliderProps {
  images: string[];
  onImagePress?: () => void;
}

export const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: '/menu/room-type/image-viewer' as any,

            params: {
              imageUrl: images[currentImageIndex],
            },
          });
        }}
      >
        <Image
          source={{
            uri: images[currentImageIndex],
          }}
          className="h-64 w-full rounded-lg"
          contentFit="cover"
        />
      </TouchableOpacity>

      <View className="absolute inset-x-0 bottom-4 flex-row items-center justify-center space-x-2">
        {images.map((_, index) => (
          <View
            key={index}
            className={`size-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </View>

      <View className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1">
        <Text className="text-sm font-medium text-white">
          {currentImageIndex + 1}/{images.length}
        </Text>
      </View>

      <TouchableOpacity
        className="absolute left-4 top-[45%] rounded-full bg-black/50 p-2"
        onPress={handlePrevImage}
      >
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute right-4 top-[45%] rounded-full bg-black/50 p-2"
        onPress={handleNextImage}
      >
        <Ionicons name="chevron-forward" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type MenuSection = {
  title: string;
  items: MenuItem[];
};

const menuData: MenuSection[] = [
  {
    title: 'Sắp xếp phòng',
    items: [
      { id: 1, icon: 'bed-outline', title: 'Hạng phòng' },
      { id: 2, icon: 'calendar-outline', title: 'Phòng và lịch kết nối' },
      { id: 3, icon: 'layers-outline', title: 'Khu vực/Tầng' },
    ],
  },
  {
    title: 'Quản lí',
    items: [
      { id: 1, icon: 'people-outline', title: 'Khách hàng' },
      { id: 2, icon: 'receipt-outline', title: 'Hóa đơn' },
    ],
  },
  {
    title: 'Báo cáo',
    items: [{ id: 1, icon: 'stats-chart-outline', title: 'Báo cáo' }],
  },
  {
    title: 'Bảo mật',
    items: [{ id: 1, icon: 'lock-closed-outline', title: 'Thay đổi mật khẩu' }],
  },
  {
    title: 'Cài đặt',
    items: [
      { id: 1, icon: 'notifications-outline', title: 'Thông báo' },
      { id: 2, icon: 'pricetags-outline', title: 'Thiết lập bảng giá' },
      { id: 3, icon: 'link-outline', title: 'Liên kết nền tảng', badge: 'Mới' },
    ],
  },
  {
    title: 'Hỗ trợ',
    items: [
      { id: 1, icon: 'help-circle-outline', title: 'Câu hỏi thường gặp' },
      { id: 2, icon: 'book-outline', title: 'Chính sách nền tảng' },
      { id: 3, icon: 'headset-outline', title: 'Liên hệ hỗ trợ' },
      { id: 4, icon: 'git-branch-outline', title: 'Phiên bản 22.0.6' },
      {
        id: 5,
        icon: 'log-out-outline',
        title: 'Đăng xuất',
        textColor: '#DC2626',
      },
    ],
  },
];

// Update the MenuItem type to include optional textColor
type MenuItem = {
  id: number;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  badge?: string;
  textColor?: string;
};

const MenuList = () => {
  const router = useRouter();

  const handleMenuItemPress = (title: string) => {
    switch (title) {
      case 'Hạng phòng':
        router.push('/menu/room-type/room-type');
        break;
      default:
        break;
    }
  };

  return (
    <View className="mt-4 px-4">
      {menuData.map((section, sectionIndex) => (
        <View key={sectionIndex} className="mb-6">
          <Text className="mb-2 text-lg font-bold">{section.title}</Text>
          <View className="overflow-hidden rounded-2xl bg-white">
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => handleMenuItemPress(item.title)}
              >
                <View className="flex-row items-center border-b border-gray-100 p-4 last:border-b-0">
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.textColor ?? '#666'}
                  />
                  <Text
                    className={`ml-3 flex-1 text-base`}
                    style={{ color: item.textColor ?? '#000' }}
                  >
                    {item.title}
                  </Text>
                  {item.badge && (
                    <View className="rounded-full bg-blue-500 px-2 py-1">
                      <Text className="text-xs text-white">{item.badge}</Text>
                    </View>
                  )}
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={item.textColor ?? '#999'}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default MenuList;

import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface TabData {
  key: string;
  label: string;
}

interface SlidingTabProps {
  tabs: TabData[];
  initialTab?: string;
  onTabChange?: (key: string) => void;
  activeColor?: string;
  inactiveColor?: string;
  backgroundColor?: string;
  activeBackgroundColor?: string;
}

const SlidingTab: React.FC<SlidingTabProps> = ({
  tabs,
  initialTab,
  onTabChange,
  activeColor = '#0866FF',
  inactiveColor = '#6B7280',
  backgroundColor = '#F9F9F9',
  activeBackgroundColor = '#E1EBFF',
}) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.key);
  const [tabWidths, setTabWidths] = useState<number[]>([]); // Lưu chiều rộng từng tab
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  // Khi tabs thay đổi, reset tabWidths
  useEffect(() => {
    setTabWidths(new Array(tabs.length).fill(0));
  }, [tabs]);

  const handleTabLayout = (event: LayoutChangeEvent, index: number) => {
    const { width } = event.nativeEvent.layout;
    setTabWidths((prev) => {
      const newWidths = [...prev];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const handleTabChange = (key: string) => {
    const newIndex = tabs.findIndex((tab) => tab.key === key);
    setActiveTab(key);

    // Tính toán vị trí translateX dựa trên tổng chiều rộng các tab trước đó
    const translateX = tabWidths
      .slice(0, newIndex)
      .reduce((sum, width) => sum + width, 0);

    Animated.timing(slideAnim, {
      toValue: translateX,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Cuộn đến tab được chọn
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: translateX - tabWidths[newIndex] / 2, // Cuộn để tab nằm giữa
        animated: true,
      });
    }

    onTabChange?.(key);
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.tabWrapper}>
          {tabWidths.length === tabs.length && tabWidths.some((w) => w > 0) && (
            <Animated.View
              style={[
                styles.activeBackground,
                {
                  width: tabWidths[tabs.findIndex((t) => t.key === activeTab)],
                  transform: [{ translateX: slideAnim }],
                  backgroundColor: activeBackgroundColor,
                  borderColor: activeColor,
                },
              ]}
            />
          )}
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab.key}
              onPress={() => handleTabChange(tab.key)}
              style={styles.tab}
              onLayout={(event) => handleTabLayout(event, index)}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === tab.key ? activeColor : inactiveColor,
                  },
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 4,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabWrapper: {
    flexDirection: 'row',
    position: 'relative',
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    borderRadius: 6,
    borderWidth: 1,
  },
});

export default SlidingTab;

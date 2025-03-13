import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const commentsData = [
  {
    id: '1',
    user: 'Phương 01',
    comment: 'Giao diện 01 đẹp quá nhé',
    time: '10 phút trước',
  },
  {
    id: '2',
    user: 'Phương 01',
    comment: 'Giao diện 01 đẹp quá nhé',
    time: '10 phút trước',
  },
  {
    id: '3',
    user: 'Phương 01',
    comment: 'Giao diện 01 đẹp quá nhé',
    time: '10 phút trước',
  },
];

const CommentsList = () => {
  const renderItem = ({ item }: any) => (
    <View style={styles.comment}>
      <Image
        source={{ uri: 'https://via.placeholder.com/40' }}
        style={styles.avatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.text}>{item.comment}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hướng Thiện Chân Thật</Text>
        <Text style={styles.time}>Tháng Này</Text>
      </View>
      <FlatList
        scrollEnabled={false}
        data={commentsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 16,
    padding: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
  comment: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  user: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#333',
  },

  // time: {
  //   fontSize: 12,
  //   color: '#666',
  // },
});

export default CommentsList;

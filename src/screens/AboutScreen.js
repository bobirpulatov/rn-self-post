import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const AboutScreen = () => {
  return <View style={styles.center}>
    <Text>Это лучшее приложение для заметок.</Text>
    <Text>Версия: 0.0.1</Text>
  </View>;
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
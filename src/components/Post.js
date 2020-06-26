import React from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import {} from 'react'

export const Post = ({post, onOpen}) => {

  return <View style={styles.post}>
    <TouchableOpacity activeOpacity={0.7} onPress={ onOpen }>
      <ImageBackground source={{uri: post.img}} style={styles.image}>
        <View style={styles.textWrap}>
          <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </View>
};

const styles = StyleSheet.create({
  post: {marginBottom: 15, overflow: 'hidden'},
  image: {width: '100%', height: 200},
  textWrap: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 5,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    color: 'white',
    fontFamily: 'mon-bold'
  }
});
import React, {useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert, ScrollView} from 'react-native';
import {THEME} from "../../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {useDispatch, useSelector} from "react-redux";
import {removePost, toggleBooked} from "../store/actions/postActions";


export const PostScreen = (props) => {
  const {route} = props;
  const allPosts = useSelector(state => state.post.allPosts);
  const post = allPosts.find(p => p.id === route.params.postId);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const iconName = (post && post.booked) ? 'ios-star' : 'ios-star-outline';
    props.navigation.setOptions({
      headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={"Booked"} iconName={iconName}
              onPress={ () => dispatch(toggleBooked(post))}
        />
      </HeaderButtons>
    });
  });

  const removeHandler = () => {
    Alert.alert(
      'Delete post',
      'Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove', style: 'destructive', onPress: () => {
            props.navigation.goBack();
            dispatch(removePost(post.id));
          }
        }
      ],
      {cancelable: false}
    );
  };

  if (!post)
    return <View />;


  return <ScrollView>
    <Image style={styles.image} source={{uri: post.img}}/>
    <View style={styles.textWrap}>
      <Text style={styles.title}>{post.text}</Text>
    </View>
    <Button title={'Remove'} onPress={removeHandler} color={THEME.DANGER_COLOR}/>
  </ScrollView>
};


const styles = StyleSheet.create({
  textWrap: {
    padding: 10
  },

  title: {
    fontFamily: 'mon-regular'
  },

  image: {
    width: '100%',
    height: 200,
  }
});
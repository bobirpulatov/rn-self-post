import React, {useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {DATA} from "../data";
import {Post} from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/actions/postActions";

export const BookedScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const bookedPosts = useSelector(state => state.post.bookedPosts);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const goToPost = (id, date, booked) => {
    navigation.push('PostScreen', {postId: id, postDate: date, booked})
  };

  return <View style={styles.wrapper}>
    {
      bookedPosts.length == 0
        ? <View><Text>No items</Text></View>
        : <FlatList
          data={bookedPosts}
          keyExtractor={post => post.id.toString()}
          renderItem={({item}) => <Post post={item} navigation={navigation}
                                        onOpen={() => goToPost(item.id, item.date, item.booked)}/>}
        />
    }
  </View>;
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  }
});
import React, {useEffect} from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet, FlatList} from 'react-native';
import {DATA} from "../data";
import {Post} from "../components/Post";
import {useDispatch, useSelector} from 'react-redux';
import {loadPosts} from "../store/actions/postActions";
import {AppLoading} from 'expo';

export const MainScreen = ({navigation, route}) => {

  const dispatch = useDispatch();
  const allPosts = useSelector(state => state.post.allPosts);
  const isLoading = useSelector(state => state.post.isLoading);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  const goToPost = (id, date, booked) => {
    navigation.push('PostScreen', {postId: id, postDate: date, booked})
  };

  if (isLoading)
    return <View style={styles.wrapper2}><ActivityIndicator /></View>;

  return <View style={styles.wrapper}>
    {
      allPosts.length == 0
        ? <View><Text style={styles.card}>No items</Text></View>
        : <FlatList
          data={allPosts}
          keyExtractor={post => post.id.toString()}
          renderItem={({item}) => <Post post={item} navigation={navigation}
                                        onOpen={() => goToPost(item.id, item.date, item.booked)}/>}
        />
    }
  </View>;

};

const styles = StyleSheet.create({
  wrapper2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    padding: 10,
  },
  card: {
    fontSize: 20,
    fontFamily: 'mon-bold',
    textAlign: 'center',
    marginTop: 20
  }
});
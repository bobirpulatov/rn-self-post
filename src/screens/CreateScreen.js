import React, {useState} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';
import {THEME} from "../../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/postActions";
import {PhotoPicker} from "../components/ImagePicker";


export const CreateScreen = ({navigation}) => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();

  const imgPickHandler = uri => {
    setImg(uri);
  };
  const saveHandler = () => {
    const post = {
      id: Date.now().toString(),
      img: img,
      text: text,
      date: new Date().toJSON(),
      booked: true
    };

    dispatch(addPost(post));
    navigation.navigate('HomePage');
  };

  return <ScrollView>
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Create new post</Text>
        <TextInput
          style={styles.textArea}
          placeholder={"Input post data"}
          onChangeText={setText}
          multiline
          value={text}
        />
        <PhotoPicker imgPick={ imgPickHandler } />
        <Button
          disabled={!text || !img}
          title="Create post"
          color={THEME.MAIN_COLOR}
          onPress={saveHandler}
        />
      </View>
    </TouchableWithoutFeedback>
  </ScrollView>
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingBottom: 30
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'mon-bold'
  },
  textArea: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10
  }
});
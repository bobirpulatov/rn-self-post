import React from 'react';
import * as ImagePicker from "expo-image-picker";
import {View, StyleSheet, Alert, Image, Button} from "react-native";
import * as Permissions from "expo-permissions";

async function askForPermission() {
  const {status} = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  );

  if (status !== 'granted') {
    Alert.alert('Camera error', 'Camera not granted');
    return false;
  }else{
    return true;
  }
}

export const PhotoPicker = ({imgPick}) => {

  const [image, setImage] = React.useState(null);

  const takePhoto = async () => {
    const hasPermissions = await askForPermission();
    if (!hasPermissions)
      return;

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
      aspect: [16, 9]
    });

    if (!img.cancelled ){
      setImage(img.uri);
      imgPick(img.uri);
    }

  };

  return <View style={styles.wrapper}>
    <Button title="Take photo" onPress={takePhoto}/>
    {image ? <Image style={styles.image} source={{ uri: image }}/> : null}
  </View>
};

const styles = StyleSheet.create({
  wrapper : {
    marginBottom: 20
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
});
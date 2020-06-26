import * as Font from 'expo-font'
import {DB} from "./db";

export async function bootstrap() {
  try{
    await Font.loadAsync({
      'mon-bold': require('../assets/fonts/Montserrat-Bold.otf'),
      'mon-regular': require('../assets/fonts/Montserrat-Regular.otf')
    });

    await DB.init();

    console.log('Database started ...');
  }catch (e) {
    console.log(e);
  }

}
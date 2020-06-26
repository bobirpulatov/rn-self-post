import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {AppHeaderIcon} from "./../components/AppHeaderIcon";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Ionicons} from '@expo/vector-icons';
import {THEME} from "../../theme";
import {BookedScreen} from "../screens/BookmarkedScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {AboutScreen} from "../screens/AboutScreen";
import {CreateScreen} from "../screens/CreateScreen";

const Stack = createStackNavigator();
const AboutStack = createStackNavigator();
const CreateStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const AppNavigation = () => {
  return <NavigationContainer theme={DefaultTheme}>
    <Drawer.Navigator
      initialRouteName="HomePage"
      edgeWidth={400}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        labelStyle: { fontFamily: 'mon-bold' },
      }}
    >
      <Drawer.Screen
        name="HomePage" options={{ title: 'Главная страница',}} component={MainPage} />
      <Drawer.Screen name="AboutStack" options={{title: 'О нас'}} component={AboutStackScreen} />
      <Drawer.Screen name="CreateStack" options={{title: 'Создать пост'}} component={CreateStackScreen} />
    </Drawer.Navigator>
  </NavigationContainer>;
};

const CreateStackScreen = ({}) => {
  return <CreateStack.Navigator>
    <CreateStack.Screen
      name="CreateScreen" component={CreateScreen}
      options={({navigation}) => {
        return {
          title: 'Создать пост',
          headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={"GoBack"} iconName={'ios-menu'}
                  onPress={ () => navigation.toggleDrawer() }
            />
          </HeaderButtons>
        }
      }}
    />
  </CreateStack.Navigator>
};

const AboutStackScreen = ({}) => {
  return <AboutStack.Navigator>
    <AboutStack.Screen
      name="AboutScreen" component={AboutScreen}
      options={({navigation}) => {
        return {
          title: 'О нас',
          headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title={"drawer"} iconName={'ios-menu'}
                  onPress={ () => navigation.toggleDrawer() }
            />
          </HeaderButtons>
        }
      }}
    />
  </AboutStack.Navigator>
};

const MainPage = () => {
  return <Tab.Navigator
    screenOptions={({ route }) => {
      return {
        tabBarIcon: ({focused}) => {
          const color = focused ? THEME.MAIN_COLOR : 'gray';
          const iconName = route.name === 'AllPostsScreen' ? 'ios-albums' : 'ios-add';
          return <Ionicons name={iconName} size={24} color={color} />
        }
      }
    }}
    tabBarOptions={{
      activeTintColor: THEME.MAIN_COLOR,
      inactiveTintColor: 'gray',
    }}
  >
    <Tab.Screen name="AllPostsScreen" component={AllPostNavigator} options={{title: 'Все посты',}} />
    <Tab.Screen name="BookedScreen" component={BookedNavigator} options={{title: 'Избранные'}}/>
  </Tab.Navigator>
};

const BookedNavigator = () => {
  return <Stack.Navigator>
    <Stack.Screen
      name="BookedScreen"
      component={BookedScreen}
      options={ ({navigation, route}) => ({
        title: "Избранные",
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={"Take photo"} iconName={'ios-camera'}
                onPress={ () => navigation.navigate('CreateStack')}
          />
        </HeaderButtons>,

        headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={"Toggle drawer"} iconName={'ios-menu'}
                onPress={ () => navigation.toggleDrawer() }
          />
        </HeaderButtons>

      }) }/>
    <Stack.Screen
      name="PostScreen"
      component={PostScreen}
      options={({navigation, route}) => {
        return {headerBackTitle: "Назад",
          title: "Post from "+ new Date(route.params.postDate).toLocaleDateString()
        }
      }}
    />
  </Stack.Navigator>
};

const AllPostNavigator = () => {
  return <Stack.Navigator>
    <Stack.Screen
      name="MainScreen"
      component={MainScreen}
      options={ ({navigation, route}) => ({
        title: "Главная страница",
        headerRight: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={"Take photo"} iconName={'ios-camera'}
                onPress={ () => navigation.navigate('CreateStack')}
          />
        </HeaderButtons>,

        headerLeft: () => <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={"Toggle drawer"} iconName={'ios-menu'}
                onPress={ () => navigation.toggleDrawer()}
          />
        </HeaderButtons>

      }) }/>
    <Stack.Screen
      name="PostScreen"
      component={PostScreen}
      options={({navigation, route}) => {

        return {headerBackTitle: "Назад",
          title: "Post from "+ new Date(route.params.postDate).toLocaleDateString()
        }
      }}
    />
  </Stack.Navigator>
};

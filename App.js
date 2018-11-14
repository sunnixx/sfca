import React, { Component } from 'react';
import { Icon, Root } from 'native-base';
import { View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { createStackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation';

//Screens
import LoginScreen from './Screens/LoginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import RegisterScreen from './Screens/RegisterScreen';

const DrawerStack = DrawerNavigator({
  Dashboard: { screen: DashboardScreen }
})

const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerLeft: <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.toggleDrawer()}><Icon name='menu' style={{ color: '#fafafa' }} /></TouchableOpacity>,
      headerStyle: {
        backgroundColor: '#9b59b6'
      }
    })
  });

const LoginStack = createStackNavigator({
  Register: { screen: RegisterScreen },
  Login: { screen: LoginScreen },
},{
  initialRouteName: 'Login',
  headerMode: 'none'
})

const PrimaryNav = createStackNavigator({
  LoginStack: { screen: LoginStack },
  DrawerStack: { screen: DrawerNavigation }
}, {
    initialRouteName: 'LoginStack',
    headerMode: 'none'
  });

class App extends Component {
  render() {
    return (
      <Root>
        <PrimaryNav />
        {/* <LoginStack /> */}
      </Root>
    )
  }
}

export default App;
import React, { Component } from 'react';
import { Container, Content, Text, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import RNAccountKit from 'react-native-facebook-account-kit';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    
    this.handleSMS = this.handleSMS.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.checkIfUserIsLogged = this.checkIfUserIsLogged.bind(this);

    RNAccountKit.configure({
      responseType: 'code',
      defaultCountry: 'PK',
      initialEmail: 'sumair.hamza@gmail.com',
      initialPhoneNumber: '+923312514211'
    });
  }

  componentDidMount() {
    this.checkIfUserIsLogged();
  }

  checkIfUserIsLogged() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (!token) {
          //Do nothing  
        } else {
          // console.log("Load dashboard")
          AsyncStorage.getItem('firstTime')
            .then(response => {
              if (response !== 'true' && response !== null) {
                this.props.navigation.navigate('DrawerStack');
              } else {
                this.props.navigation.navigate('Profile');
              }
            }).catch(err => { console.error(err) })
        }
      })
  }

  handleEmail() {
    RNAccountKit.loginWithEmail()
      .then((token) => {
        if (!token) {
          console.log('Login cancelled')
        } else {
          AsyncStorage.setItem('token', JSON.stringify(token))
            .then(() => {
              // console.log("Load Dashboard");
              AsyncStorage.getItem('firstTime')
                .then(response => {
                  console.log(response);
                  if (response !== 'true' && response !== null) {
                    this.props.navigation.navigate('DrawerStack');
                  } else {
                    this.props.navigation.navigate('Profile');
                  }
                }).catch(err => { console.error(err) })
            })
        }
      })
  }

  handleSMS() {
    RNAccountKit.loginWithPhone()
      .then((token) => {
        if (!token) {
          console.log('Login Cancelled')
        } else {
          // console.log(token);
          AsyncStorage.setItem('token', JSON.stringify(token))
            .then(() => {
              // console.log(token);
              AsyncStorage.getItem('firstTime')
                .then(response => {
                  // console.log(response);
                  if (response !== 'true' && response !== null) {
                    this.props.navigation.navigate('DrawerStack');
                  } else {
                    this.props.navigation.navigate('Profile');
                  }
                }).catch(err => { console.error('Error for firstTime' + err) })
            }).catch(err => console.log('error for token' + err)) 
        }
      }).catch(err => console.log('Account Kit Error' + err))
  }

  render() {
    return (
      <Container>
        <Content>
          <Button onPress={this.handleSMS}>
            <Text> Login With SMS </Text>
          </Button>
          <Button onPress={this.handleEmail}>
            <Text> Login With Email </Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

export default LoginScreen;
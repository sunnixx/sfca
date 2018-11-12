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
      initialEmail: 'johndoe@example.com',
      initialPhoneNumber: '+923'
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
          this.props.navigation.navigate('DrawerStack');
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
              this.props.navigation.navigate('DrawerStack');
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
          AsyncStorage.setItem('token', token)
            .then(() => {
              // console.log("Load Dashboard");
              this.props.navigation.navigate('DrawerStack');

            })
        }
      })
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
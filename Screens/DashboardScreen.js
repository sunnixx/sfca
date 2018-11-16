/**
 * I AM REMOVING ALL KEYS IN THE DASHBOARD
 * REMEMBER TO FIX THIS IN THE FUTURE 
 * YOU HAVE TO LEAVE "firstTime" KEY INTACT
 * SO THAT THE USER SHOULDN'T GET THE REGISTRATION SCREEN ON STARTUP
 */


import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import RNAccountKit from 'react-native-facebook-account-kit';

import api from '../Api';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {email: this.props.navigation.getParams('email'),user: ''}

        this.handleLogout = this.handleLogout.bind(this);
        this.getCurrentAccount = this.getCurrentAccount.bind(this);
    }

    handleLogout() {
        RNAccountKit.logout()
            .then(() => {
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('firstTime');

                this.props.navigation.navigate('LoginStack');
            })
    }

    getCurrentAccount() {
        api.existingAccount(this.state.email,(status,user) => {
            if(status !== true) {
                AsyncStorage.setItem('user',JSON.stringify(user));
                this.setState({user:user});
            }
        })
    }

    componentDidMount() {
        this.getCurrentAccount();
    }

    render() {
        return (
            <Container>
                <Content>
                    <Button onPress={this.handleLogout}>
                        <Text>Logout</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

export default DashboardScreen
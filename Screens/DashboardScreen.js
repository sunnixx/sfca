import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';
import RNAccountKit from 'react-native-facebook-account-kit';

class DashboardScreen extends Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        RNAccountKit.logout()
            .then(() => {
                AsyncStorage.removeItem('token')
                    .then(() => {
                        this.props.navigation.navigate('Login');
                    })
            })
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
import React, { Component } from 'react';
import { Container, Header, Picker, Body, Title, Content, Text, Left, Form, List, ListItem, Input, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import api from '../Api';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: "mr" }

        this.name = '';
        this.email = '';
        this.alreadyAccount = false;
        this.alreadyEmail = '';

        AsyncStorage.setItem('firstTime', 'false')

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAccount = this.handleAccount.bind(this);
        this.handleAlreadyAccount = this.handleAlreadyAccount.bind(this);
        this.getAccountInfo = this.getAccountInfo.bind(this);
    }

    handleAlreadyAccount() {
        if(this.alreadyAccount !== '') {
            api.existingAccount(this.alreadyEmail,(status,user) => {
                if(status !== true) {
                    //User doesn't exist
                    alert("This email isn't registered with us, create a new user by going back!")
                } else {
                    //User exists
                    this.props.navigation.navigate('DrawerStack',{user})
                }
            })
        } else {
            alert("Fields can't be empty")
        }
    }

    handleAccount() {
        this.alreadyAccount = false;
            return(
                <Content>
                    <Form>
                        <List>
                            <ListItem>
                                <Input placeholder="Enter Email" onChangeText={(e) => this.alreadyEmail = e} />
                            </ListItem>
                            <ListItem style={{flex: 1, justifyContent: 'space-between'}}>
                                <Button onPress={this.handleAlreadyAccount}>
                                    <Text>Submit</Text>
                                </Button>
                                <Button onPress={() => {this.setState({})}}>
                                    <Text>Back</Text>
                                </Button>
                            </ListItem>
                        </List>
                    </Form>
                </Content>
            )
    }

    onValueChange(value) {
        this.setState({ selected: value })
    }

    handleSubmit() {
        if (this.name !== '' && this.email !== '') {
            api.addParent(this.name, this.email, this.state.selected, (message,status) => {
                console.log(message);
                if(status !== true) {
                    alert(message);
                } else {
                    this.props.navigation.navigate('Register',{email:this.email}); //Jump to Student registration page
                }
            })
        } else {
            alert("Fields can't be empty")
        }
    }

    getAccountInfo() {
        return(
            <Content>
                    <Form>
                        <List>
                            <ListItem>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: '100%' }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="Mr." value="mr" />
                                    <Picker.Item label="Miss." value="ms" />
                                    <Picker.Item label="Mrs." value="mrs" />
                                </Picker>
                            </ListItem>

                            <ListItem>
                                <Input placeholder="Full Name" onChangeText={(e) => this.name = e} />
                            </ListItem>

                            <ListItem>
                                <Input placeholder="Email" onChangeText={(e) => this.email = e} />
                            </ListItem>

                            <ListItem>
                                <Button onPress={this.handleSubmit}>
                                    <Text>Signup</Text>
                                </Button>
                            </ListItem>
                            
                            <ListItem>
                                <Button onPress={() => {this.alreadyAccount = true; this.setState({})}}>
                                    <Text>Already have an account ?</Text>
                                </Button>
                            </ListItem>
                        </List>
                    </Form>
                </Content>
        )
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Add Your Information</Title>
                    </Body>
                </Header>
                {this.alreadyAccount !== true ? this.getAccountInfo() : this.handleAccount()}
            </Container>
        )
    }
}

export default CreateProfile;
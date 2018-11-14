import React, { Component } from 'react';
import { Container, Header, Picker, Content, Left, Form, List, ListItem, Input, Button } from 'native-base';
import { AsyncStorage } from 'react-native';
import api from '../Api';

class CreateProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {selected: "mr"}

        this.name = '';
        this.email = '';

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onValueChange(value) {
        this.setState({selected: value})
    }

    handleSubmit() {
        if(this.name !== '' && this.email !== '') {
            api.addParent(this.name,this.email,this.state.selected,(message) => {
                console.log(message);
                this.props.navigation.navigate('DrawerStack'); //Jump to dashboard
            })
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Text>Add your information</Text>
                </Header>
                <Content>
                    <Form>
                        <List>
                            <ListItem>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{width: '100%'}}
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

                        </List>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default CreateProfile;
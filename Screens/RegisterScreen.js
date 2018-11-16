import React, { Component } from 'react';
import { Container, Content, Button, Left, Form, Input, List, Header, ListItem, Label, Text, Body, Title } from 'native-base';
import { AsyncStorage } from 'react-native';
import api from '../Api';

class RegisterScreen extends Component {

    constructor(props) {
        super(props);

        this.firstName = '';
        this.lastName = '';
        this.grade = '';
        this.isStudentAdded = false;

        this.textInput01 = React.createRef();
        this.textInput02 = React.createRef();
        this.textInput03 = React.createRef();

        this.state = {email: this.props.navigation.getParam('email')}

        // const userEmail = navigation.getParam('email');

        this.addMoreStudents = this.addMoreStudents.bind(this);
        this.finishAddingStudents = this.finishAddingStudents.bind(this);
    }

    componentDidMount() {
        
    }

    addMoreStudents() {
        this.textInput01.current._root.clear();
        this.textInput02.current._root.clear();
        this.textInput03.current._root.clear();
        
        if(this.firstName !== '' && this.lastName !== '' && this.grade !== '') {
            api.addStudents(this.firstName, this.lastName, this.grade,this.state.email,(message) => {
                this.isStudentAdded = true;
                alert(message);
            })
        } else {
            alert('No fields should be empty');
        }
    }

    finishAddingStudents() {
        if(this.isStudentAdded === true) {
            this.props.navigation.navigate('DrawerStack',{email:this.state.email});
        } else {
            alert('Add atleast one student')
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Add Children</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <List>
                            <ListItem>
                                <Input ref={this.textInput01} placeholder="Enter First Name" onChangeText={(text) => this.firstName = text} />
                            </ListItem>
                            <ListItem>
                                <Input ref={this.textInput02} placeholder="Enter Last Name" onChangeText={(text) => this.lastName = text} />
                            </ListItem>
                            <ListItem>
                                <Input ref={this.textInput03} placeholder="Grade" onChangeText={(text) => this.grade = text} />
                            </ListItem>
                            <ListItem style={{flex: 1, justifyContent: 'space-between'}}>
                                <Button onPress={this.addMoreStudents}><Text>Add More</Text></Button>
                                <Button onPress={this.finishAddingStudents}><Text>Finish</Text></Button>
                            </ListItem>
                        </List>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default RegisterScreen;
import React, { Component } from 'react';
import { Container, Content, Button, Form, Input, List, ListItem, Picker, Label, Text, Fab, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';

class RegisterScreen extends Component {

    constructor(props) {
        super(props);

        this.state = { selectedValue: '', elements: [] }

        this.students = [];
        this.firstTime = true;

        this.textInput = React.createRef();

        AsyncStorage.setItem('firstTime', 'true')

        this.renderForm = this.renderForm.bind(this);
        this.handleStudentInfo = this.handleStudentInfo.bind(this);
    }

    onValueChange(value) {
        this.setState({ selectedValue: value })
    }

    renderForm() {
        this.students = []; //Resetting the array so extra value shouldn't be added in the final array
        this.state.elements = [];
        
        if (this.state.selectedValue !== '' && this.state.selectedValue !== "0") {
                
            for (let i = 0; i < this.state.selectedValue.charAt(3); i++) {
                this.students.push({})
                this.state.elements.push(
                    <List key={`List${i}`}>
                        <ListItem key={`firstlistitem${i}`}>
                            <Label key={`listlabel${i}`}>
                                <Text key={`labelkey${i}`}>{`Enter Kid ${i + 1} Info`}</Text>
                            </Label>
                        </ListItem>
                        <ListItem key={`secondListItem${i}`}>
                            <Input key={`firstInput${i}`} ref={this.textInput} onChangeText={(e) => this.students[i].firstName = e} placeholder="Enter First Name" />
                        </ListItem>
                        <ListItem key={`thirdListItem${i}`}>
                            <Input key={`secondInput${i}`} ref={this.textInput} onChangeText={(e) => this.students[i].lastName = e} placeholder="Enter Last Name" />
                        </ListItem>
                        <ListItem key={`fourthItem${i}`}>
                            <Input key={`thirdInput${i}`} ref={this.textInput} onChangeText={(e) => this.students[i].grade = e} placeholder="Enter Grade" />
                        </ListItem>
                    </List>
                )
            }
            this.firstTime = false;
            return (
                <Button onPress={this.handleStudentInfo}>
                    <Text>Submit</Text>
                </Button>
            )
        }
    }

    handleStudentInfo() {
        console.log(this.students);
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <List>
                            <ListItem>
                                <Label>
                                    <Text>How many Children you have?</Text>
                                </Label>
                            </ListItem>
                            <ListItem>
                                <Picker
                                    note
                                    mode="dropdown"
                                    style={{ width: '100%' }}
                                    selectedValue={this.state.selectedValue}
                                    onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="0" value="0" />
                                    <Picker.Item label="1" value="kid1" />
                                    <Picker.Item label="2" value="kid2" />
                                    <Picker.Item label="3" value="kid3" />
                                    <Picker.Item label="4" value="kid4" />
                                    <Picker.Item label="5" value="kid5" />
                                    <Picker.Item label="6" value="kid6" />
                                    <Picker.Item label="7" value="kid7" />
                                    <Picker.Item label="8" value="kid8" />
                                    <Picker.Item label="9" value="kid9" />
                                    <Picker.Item label="10" value="kid10" />
                                </Picker>
                            </ListItem>
                            {this.renderForm()}
                            {this.state.elements}
                        </List>
                    </Form>
                </Content>
            </Container>
        )
    }
}

export default RegisterScreen;
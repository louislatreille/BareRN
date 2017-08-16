import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, Alert } from 'react-native';
import styles from './styles';

export default class GameWindow extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.navigation.params);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Main Screen!</Text>
                <Text>{this.props.navigation.state.params.name}</Text>
            </View>
        )
    }
}
import React, { Component } from 'react';
import { View, Text, TextInput, Image, Button, Alert } from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import styles from './styles';

var AWS = require('aws-sdk/dist/aws-sdk-react-native');

//Admob instantiation
AdMobInterstitial.setAdUnitID('ca-app-pub-7866535775797150/4825565241');
AdMobInterstitial.setTestDeviceID('EMULATOR');

export default class GameWindow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null
        };
    }

    componentDidMount() {
        this.setupGoogleSignin();
    }

    async setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                webClientId: '315235906465-alvt7a6nbh0fdgcll1cbvcitbe9hd349.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            this.authenticateGoogleUser(user);
        } catch(err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    signIn() {
        GoogleSignin.signIn()
        .then((user) => {
            this.authenticateGoogleUser(user);
        })
        .catch((err) => {
            console.log('WRONG SIGNIN', err);
        })
        .done();
    }

    signOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).then(() => {
            this.setState({user: null});
        })
        .done();
    }

    authenticateGoogleUser(user) {
        this.setState({user: user});
        console.log(user.idToken);

        /*AWS.config = new AWS.Config({
            region: "us-east-2",
            credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: 'us-east-2:ff5bcbaa-a52e-4a9f-b9b3-4bedcdf4bc46',
                Logins: {
                    'accounts.google.com': user.idToken
                }
            })
        });

        AWS.config.credentials.get((err, data) => {
            if (err) {
                Alert.alert('Error authenticating user!', err);
            } else {
                console.log('Authentified!');
            }
        });*/
    }

    begin() {
        this.props.navigation.navigate('Main', this.state.user);
    }

    render() {
        if (!this.state.user) {
            return (
                <View style={styles.container}>
                    <Text style={{fontSize: 30}}>Welcome to (AppName)!</Text>
                    <Text style={{textAlign: 'center', fontSize: 20}}>To begin, log in with your Google account.</Text>
                    <GoogleSigninButton style={{width: 230, height: 48}} color={GoogleSigninButton.Color.Light} size={GoogleSigninButton.Size.Standard} onPress={() => this.signIn() }/>
                </View>
            );
        }

        if (this.state.user) {
            return (
                <View style={styles.container}>
                    <Text style={{flex:1, fontSize: 30}}>(AppName)</Text>
                    <View style={styles.innerContainer}>
                        <Button title="Begin!" onPress={() => this.begin()} color='blue'/>
                        <Button title="Log out" onPress={() => this.signOut()}/>
                    </View>
                </View>
            );
        }
    }
};
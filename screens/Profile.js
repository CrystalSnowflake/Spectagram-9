import React, { Component } from 'react';
import {Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, Image, Switch} from 'react-native';
import {getAuth} from 'firebase/auth';
import {ref, update, onValue} from 'firebase/database';
import db from '../config';

export default class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            light_theme: true,
            name: "",
            isEnabled: false
        }
    }

    async fetchUser() {
        let theme, name;
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        /*firebase.database()
        .ref("/user/")
        .on("value", (snapshot)=>{
            theme = snapshot.val().currentTheme
        })
        */
        onValue(ref(db, '/user/' + userId), (snapshot) => {
            theme = snapshot.val().current_theme
            name = `${snapshot.val().first_name}${snapshot.val().last_name}`
            this.setState({light_theme: theme === 'light' ? true : false, isEnabled : theme === 'light' ? fasle : true, name: name})
        }) //short version


    }

    componentDidMount(){
        this.fetchUser();
    }

    toggleSwitch(){
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? 'dark' : 'light';

        const auth = getAuth();
        const user = auth.currentUser;

        if(user){
            var updates = {};
            updates['users/' + user.uid + '/current_theme'] = theme;

            const dbRef = ref(db, '/');
            update(dbRef, updates);

            this.setState({isEnabled: !previous_state, light_theme: previous_state });
        }
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <SafeAreaView/>
                
                <View style = {styles.appTitle}>

                    <View style = {styles.appIcon}>
                        <Image source = {require('../assets/logo.png')}
                            styles = {styles.logo}></Image>
                    </View>

                    <View styles = {styles.titleText}>
                        <Text> Title </Text>
                    </View>

                </View>

                
                <View styles = {styles.screenContainer}>
                    <Image source = {{uri: this.state.profile_image}}></Image>
                    <Text style = {styles.imageText}> {this.state.name} </Text>
                </View>


                <View style = {styles.themeContainer}>
                    <Text styles = {styles.darkT}>  </Text>
                    <Switch 
                        styles = {styles.switch}
                        trackColor = {{false: 'black', true: 'white'}}
                        thumbColor = {this.state.isEnabled ? 'blue' : 'pink'}
                        onValueChange = {() => {
                            this.toggleSwitch()
                        }}
                        value = {this.state.isEnabled}
                    />
                </View>


                <Text>Profile</Text>

            </View>
        )
    }
}
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getAuth, signOut} from 'firebase/auth';

export default class LogOut extends Component{
    componentDidMount(){
        const auth = getAuth();

        signOut(auth)
        .then(() => {
            this.props.navigation.replace("Login")
        })
        .catch((error) => {
            alert(error.message)
        })
    }

    render(){
        returnt(
            <View style = {styles.container}>
                <Text style = {styles.text}>LOG OUT</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        fontSize: 20,
        color: 'magenta'
    }
})
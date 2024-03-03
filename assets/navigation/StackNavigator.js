import React, {Component} from 'react';
import BottomTab from './TabNavigator';
import Post from '../screens/CreatePost';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const StackNav = () => {
    return(
    <Stack.Navigator initialRouteName = "Post"
        screenOptions = {{
            headershown: false,
            gestureEnabled: false
        }}>
            <Stack.Screen name = "Post" component = {Post}/>
            <Stack.Screen name = "Bottom" component = {BottomTab}/>
        </Stack.Navigator>
    );
};

export default StackNav;
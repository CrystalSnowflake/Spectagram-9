import React, {Component} from 'react';
import StackNav from './StackNavigator';
import Profile from '../screens/Profile';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    return(
        <Drawer.Navigator screenOptions = {{
            headershown: false,
            gestureEnabled: false
        }}>
            <Drawer.Screen name = "Home" component = {StackNav}/> 
            <Drawer.Screen name = "Profile" component = {Profile}/>
        </Drawer.Navigator>
    );
};

export default DrawerNav;
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {RFValue} from 'react-native-responsive-fonts';
import {Ionicons} from 'react-native-vector-icons/Ionicons';

import Feed from '../screens/Feed';
import Post from '../screens/CreatePost';

const Tab = createMaterialBottomTabNavigator();

const BottomTab = () => {
    <Tab.Navigator
    labeled = {false}
            barStyle = {styles.bottomTabStyle}
            screenOptions = {({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if(route.name === "Feed"){
                        iconName = focused ? 'home' : 'home-outline';
                    } else if(route.name === 'CreatePost'){
                        iconName = focused ? 'add-circle' : 'add-circle-outline';
                    }
                    return(
                        <Ionicons
                            name= {iconName}
                            size = {RFValue(25)}
                            color= {color}
                            style = {styles.icons}
                            />
                    );
                },
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            })}>

                <Tab.Screen name = 'Feed' component = {Feed}/>
                <Tab.Screen name = 'Post' component = {Post}/>
            </Tab.Navigator>
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: '#2a2a2a',
        height: '8%',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        position: 'absolute',
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30),
    },
});

export default BottomTab;
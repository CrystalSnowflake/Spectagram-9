import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image,
    ScrollView,
    TextInput,
    Button
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";

export default class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: "image_1",
            dropdownHeight: 40,
            light_theme: true,
            caption: "",
            name: "",
            profileImage: ""
        };
    }

    componentDidMount() {

    }

    async addPost() {
        if(this.state.caption){
            let postData = {
                preview_image: this.state.previewImage,
                caption: this.state.caption,
                author: firebase.auth().currentUser.displayName,
                createdOn: new Date(),
                authorUID: firebase.auth().currentUser.uid,
                profileImage: this.state.profileImage,
                likes: 0
            }
            await firebase.database()
            .ref("/posts/" + Math.random().toString(36).slice(2))
            .set(postData)
            .then(function(snapshot){});
            this.props.setUpdateToTrue();
            this.props.navigation.navigate("Feed");
        } else {
            alert("error", "All fields are required!", 
            [{text: "ok", onPress: ()=>console.log("ok pressed")}], {cancelable: false});
        }
    }

    render() {
        let preview_images = {
            image_1: require("../assets/boat.png"),
            image_2: require("../assets/cycling.png"),
            image_3: require("../assets/forest.png"),
            image_4: require("../assets/golf.png"),
            image_5: require("../assets/salad.png"),
            image_6: require("../assets/yoga.png")
        };
        return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>New Post</Text>
                    </View>
                </View>
                <View style={styles.fieldsContainer}>
                    <ScrollView>
                        <Image
                            source={preview_images[this.state.previewImage]}
                            style={styles.previewImage}
                        ></Image>
                        <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                            <DropDownPicker
                                items={[
                                    { label: "Image 1", value: "image_1" },
                                    { label: "Image 2", value: "image_2" },
                                    { label: "Image 3", value: "image_3" },
                                    { label: "Image 4", value: "image_4" },
                                    { label: "Image 5", value: "image_5" },
                                    { label: "Image 6", value: "image_6" },
                                    { label: "Image 7", value: "image_7" }
                                ]}
                                defaultValue={this.state.previewImage}
                                containerStyle={{
                                    height: 40,
                                    borderRadius: 20,
                                    marginBottom: 10
                                }}
                                onOpen={() => {
                                    this.setState({ dropdownHeight: 170 });
                                }}
                                onClose={() => {
                                    this.setState({ dropdownHeight: 40 });
                                }}
                                style={{ backgroundColor: "transparent" }}
                                itemStyle={{
                                    justifyContent: "flex-start"
                                }}
                                dropDownStyle={{ backgroundColor: "#2a2a2a" }}
                                labelStyle={{
                                    color: "white"
                                }}
                                arrowStyle={{
                                    color: "white"
                                }}
                                onChangeItem={item =>
                                    this.setState({
                                        previewImage: item.value
                                    })
                                }
                            />
                        </View>

                        <TextInput
                            style={this.state.light_them ? styles.inputFontLight : styles.inputFont}
                            onChangeText={caption => this.setState({ caption })}
                            placeholder={"Write your story here."}
                            placeholderTextColor="grey"
                        />
                        <View style = {styles.button}>
                            <Button onPress ={()=>this.addPost()}
                            title = "Submit"
                            color = "blue"/>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flex: 0.08 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.3,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.7,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28)
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28)
    },
    fieldsContainer: {
        flex: 0.85
    },
    previewImage: {
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont: {
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white"
    },
    inputFontLight: {
        height: RFValue(40),
        borderColor: "black",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "black"
    },
    button: {
        alignItem: 'center',
        justifyContent: 'center',
        marginTop: RFValue(20)
    }
});

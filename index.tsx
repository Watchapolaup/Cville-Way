import { Text, TextInput, View } from "react-native";
import { useState } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import React from "react";
import { useFonts } from 'expo-font';
//import DropDownPicker from "react-native-dropdown-picker";
import {Textinput1, Textinput2, Textinput3, Textinput4} from "../components/textinput"

export default function Index() {
  const [start,setStart]=useState("None")
  const [miles,setMiles]=useState("None")
  const [fav,setfav]=useState("None")
  const [dest,setdest]=useState("None")
  const [fontsLoaded] = useFonts({
    Belleza: require("../components/text/Belleza-Regular.ttf"),
    Lora: require("../components/text/Lora-Regular.ttf")
  });
  return (
    <View>
      <View style={styles.bannerTop}>
        <Image style={{height:230, width:230}} source={require('../components/images/Iconnew.jpg')}/>
      </View>
      <View style={styles.main_zone}>
        <Text style={styles.subtitle}>How many miles are you running today?</Text>
        <Textinput1/>
        <Text style={styles.subtitle}>Where are you starting?</Text>
        <Textinput2/>
        <Text style={styles.subtitle}>Do you have any favorite locations you’d like to include in your routes? (e.g., your favorite coffee shop, bookstore, or park)
        </Text>
        <Textinput3/>
        <Text style={styles.subtitle}> Where would you like to end your run?
        </Text>
        <Textinput4/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bannerTop:{
    height: 250, //edit height after load on phone
    backgroundColor: "#edeceb",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {   
    fontFamily: "Belleza",
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontFamily: "Lora",
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  buttonText: {
    lineHeight: 30,
    fontSize: 16,
    color: 'white',
  },
  main_zone:{
    height: 400,
    alignItems: "center",
    backgroundColor: "#f8f7f4",
    justifyContent: "center",
  },
  button: {
    height:100,
    width: 200,
    borderRadius: 10,
    backgroundColor: "#232D4B",
    justifyContent: "center",
    alignItems: "center",
  }

});
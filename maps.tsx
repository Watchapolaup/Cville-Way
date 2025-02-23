import { View, Text, StyleSheet, } from "react-native";
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function MapsScreen() {
    const [fontsLoaded] = useFonts({
        Belleza: require("../components/text/Belleza-Regular.ttf"),
        Lora: require("../components/text/Lora-Regular.ttf")
     });
    return(
        <View>
            <View style={styles.bannerTop}>
                <Text style={styles.title}>CVILLE WAY</Text>
            </View>
            <View style={styles.main_zone}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 38.0293, 
                    longitude: -78.4767,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                    }}
                >
                    <Marker
                    coordinate={{ latitude: 38.0293, longitude: -78.4767 }}
                    title="Charlottesville, VA"
                    description="Home of UVA"
                    />
                </MapView>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    bannerTop:{
      height: 200, //edit height after load on phone
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
    main_zone:{
        height: 400,
        alignItems: "center",
        backgroundColor: "#f8f7f4",
        justifyContent: "center",
      },
    map: {
        width: '100%',
        height: '100%',
    },
    routeInfo: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: 10,
    },
});
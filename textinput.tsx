import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";

export function Textinput1() {
    const [miles, setMiles] = useState("");
    return (
        <View>
            <TextInput 
                onChangeText={(text) => setMiles(text)}
                style={{ borderRadius: 3, borderWidth: 1, borderColor: "#ccc", padding: 5 }}
                keyboardType="numeric"
            />
            <Text>{miles}</Text>
        </View>
    );
}

export function Textinput2() {
    const [start, setStart] = useState("None");

    return (
        <View>
            <TextInput 
                onChangeText={(text) => setStart(text)}
                style={{ borderRadius: 3, borderWidth: 1, borderColor: "#ccc", padding: 5 }}
            />
            <Text>{start}</Text>
        </View>
    );
}

export function Textinput3() {
    const [fav, setFav] = useState("None");

    return (
        <View>
            <TextInput 
                onChangeText={(text) => setFav(text)}
                style={{ borderRadius: 3, borderWidth: 1, borderColor: "#ccc", padding: 5 }}
            />
            <Text>{fav}</Text>
        </View>
    );
}

export function Textinput4() {
    const [dest, setDest] = useState("0");

    return (
        <View>
            <TextInput 
                onChangeText={(text) => setDest(text)}
                style={{ borderRadius: 3, borderWidth: 1, borderColor: "#ccc", padding: 5 }}
            />
            <Text>{dest}</Text>
        </View>
    );
}

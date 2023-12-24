import React from "react";
import { StyleSheet, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colorPalettes } from "../config/Constants";

export const NoThumb = () => {
    return (
        <View style={styles.fullSize}>
            <Fontisto name="shopping-bag-1" size={35} color={colorPalettes.ceil} />
        </View>
    );
}

const styles = StyleSheet.create({
    fullSize: {
        width:'100%',
        height:'100%',
        backgroundColor:colorPalettes.azureishWhite,
        borderWidth:1,
        borderColor: colorPalettes.ceil,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    }
});
import React, { memo, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { colorPalettes } from "../config/Constants";

export const Search = ({setSearchKeyword, searchKeyWord}:any) => {

    const [val, setVal] = useState(searchKeyWord);

    const updateValue = (txt:any) => {
        setVal(txt);
        (setSearchKeyword) && setSearchKeyword(txt);
    }

    return (
        <>
            <View style={[styles.inputContainer, { borderColor: colorPalettes.azureishWhite }]}>
                <Icon name="search" size={20} color={`${colorPalettes.black}${colorPalettes.opacity}`} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={val}
                    keyboardType="web-search"
                    onChangeText={(text) => updateValue(text)}
                />
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 50,
        marginLeft: 8,
        color: colorPalettes.black,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        backgroundColor: colorPalettes.white,
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
    },
    icon: {
        marginLeft: 16,
    }
});
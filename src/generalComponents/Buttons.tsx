import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { colorPalettes, fonts } from "../config/Constants";

export const Button1 = ({
    handleEvent,
    isDisabled,
    label = 'Submit',
    isSpinner = false,
}: any) => {
    return (
        <>
            <TouchableOpacity disabled={isDisabled} style={styles.button} onPress={handleEvent}>
                <Text style={styles.buttonText}>{label}</Text>
                {isSpinner &&
                <>
                    <View style={{ paddingHorizontal: 5 }} />
                    <ActivityIndicator size={'small'} color={colorPalettes.white} />
                </>}
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colorPalettes.chineseBlue,
        padding: 14,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonText: {
        color: colorPalettes.white,
        fontSize: fonts.size.h4,
        fontFamily: fonts.family.poppins
    },
});
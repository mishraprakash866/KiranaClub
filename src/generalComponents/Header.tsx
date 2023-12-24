import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colorPalettes, fonts, routeNames } from "../config/Constants";

export const Header = ({
    navigation,
    title,
    isBackIcon = true,
    isHomeIcon = false
}: any) => {

    const handleBackEvent = () => {
        if(navigation.canGoBack()){
            navigation.goBack();
        }else{
            navigation.reset({
                index:0,
                routes:[{name: routeNames.home}]
            })
        }
    }

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.iconCtn}>
                    {isBackIcon &&
                        <Pressable onPress={handleBackEvent} style={{width:'100%', marginTop:-3}}>
                            <MaterialIcons name="arrow-back-ios-new" size={fonts.size.h3} color={colorPalettes.black} />
                        </Pressable>
                    }
                    {isHomeIcon &&
                        <MaterialIcons name="storefront" size={fonts.size.h3} color={colorPalettes.chineseBlue} />
                    }
                </View>
                <Text style={styles.headerTxt}>{title}</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        backgroundColor: colorPalettes.white,
        borderBottomWidth: 1,
        borderColor: colorPalettes.azureishWhite,
        flexDirection: 'row'
    },
    iconCtn: {
        width: 30
    },
    headerTxt: {
        fontSize: fonts.size.h3,
        fontFamily: fonts.family.poppins,
        color: colorPalettes.black
    }
});
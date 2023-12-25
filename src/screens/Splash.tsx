import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colorPalettes, fonts, routeNames } from "../config/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeUserData } from "../services/Store";

const Splash = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            checkValidation();
        }, 1000);
    }, [])

    const checkValidation = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
            storeUserData.storeVal(JSON.parse(userData));
            navigation.replace(routeNames.home);
        } else {
            navigation.replace(routeNames.auth.login)
        }
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colorPalettes.cultured }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.txt, { color: colorPalettes.white, borderTopLeftRadius:8, borderBottomLeftRadius:8, paddingLeft:10, paddingRight:5, backgroundColor:colorPalettes.chineseBlue }]}>
                        {`Kirana`}
                    </Text>
                    <Text style={[styles.txt, { color: colorPalettes.chineseBlue, borderTopRightRadius:8, borderBottomRightRadius:8, paddingLeft:5, paddingRight:10 }]}>
                        {`Club`}
                    </Text>
                </View>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    txt: {
        fontFamily: fonts.family.rubik,
        textTransform: 'uppercase',
        fontSize: fonts.size.h1,
        fontWeight: 'bold',
        borderWidth:1, 
        borderColor:colorPalettes.chineseBlue,
        paddingVertical:5
    }
});

export default Splash;
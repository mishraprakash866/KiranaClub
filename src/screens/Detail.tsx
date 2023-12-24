import React from "react";
import { StyleSheet, View } from "react-native";
import { colorPalettes, fonts } from "../config/Constants";
import { Header } from "../generalComponents/Header";

const Detail = ({navigation, route}:any) => {

    const {item} = route.params;

    console.log(item);

    return (
        <>
            <View style={styles.container}>
                <Header
                    navigation={navigation}
                    title={item.name}
                    isBackIcon={true}
                    isHomeIcon={false}
                />
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Detail;
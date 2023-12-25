import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colorPalettes, fonts } from "../config/Constants";
import { Header } from "../generalComponents/Header";
import { DetailImgColEle } from "../generalComponents/ImageTemp";

const Detail = ({ navigation, route }: any) => {

    const { item } = route.params;

    return (
        <>
            <View style={styles.container}>
                <Header
                    navigation={navigation}
                    title={item.name}
                    isBackIcon={true}
                    isHomeIcon={false}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.imgCollection}>
                    <DetailImgColEle item={item} />
                </View>
                <View style={styles.infoBox}>
                    {Object.keys(item)?.map((ele: any, index: number) => (
                        <View key={index?.toString()} style={[styles.row, {borderBottomWidth : (index == (Object.keys(item).length - 1)) ? 0 : 1}]}>
                            <View style={{width:'40%'}}>
                                <Text style={styles.label}>{ele}</Text>
                            </View>
                            <View style={{width:'60%'}}>
                                <Text style={styles.value}>{item[ele]}</Text>
                            </View>
                        </View>
                    ))}
                </View>
                </ScrollView>
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imgCollection: {
        width: '100%',
        height: 250,
        marginVertical: 30,
        paddingHorizontal: 16,
    },
    infoBox: {
        paddingHorizontal: 16,
        marginBottom:20
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:100,
        width:'100%',
        borderColor:colorPalettes.azureishWhite,
        paddingHorizontal:16
    },
    label:{
        fontFamily:fonts.family.rubik,
        fontSize:fonts.size.h5,
        fontWeight:'bold',
        color:colorPalettes.black,
        textTransform:'capitalize'
    },
    value: {
        fontFamily:fonts.family.rubik,
        fontSize:fonts.size.h5,
        fontWeight:'400',
        color:colorPalettes.black,
        textTransform:'capitalize'
    }
});

export default Detail;
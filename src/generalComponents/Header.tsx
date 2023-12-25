import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, BackHandler } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colorPalettes, errCode, fonts, routeNames } from "../config/Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllFilterValue } from "../services/API";
import { FilterModal } from "./FilterModal";

export const Header = ({
    navigation,
    title,
    isBackIcon = true,
    isHomeIcon = false,
    isLogoutIcon = false,
    isFilterIcon = false,
    outputEvent,
    prev_filterData
}: any) => {

    const [isLoader, setLoader] = useState(isFilterIcon);
    const [filterData, setFilterData] = useState([]);
    const [isFilterModal, setFilterModal] = useState(false);

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', function () {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                Alert.alert('Warning', 'Are you sure, You want to quit the app ?', [
                    {
                        text: 'No'
                    },
                    {
                        text: 'Yes',
                        onPress: () => BackHandler.exitApp()
                    }
                ]);
            }
            return true;
        });
    }, []);

    useEffect(() => {
        if (isFilterIcon) {
            callFilterApi();
        }
    }, []);

    const callFilterApi = () => {
        getAllFilterValue().then((res: any) => {
            if (res && res != errCode) {
                setLoader(false);
                setFilterData(res);
            }
        })
            .catch((e: any) => {
                console.log(e);
            })
    }

    const handleBackEvent = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: routeNames.home }]
            })
        }
    }

    const handlelogOutEvent = () => {
        Alert.alert('Warning', 'Are you sure, You want to logout ?', [
            {
                text: 'No'
            },
            {
                text: 'Yes',
                onPress: async () => {
                    await AsyncStorage.clear();
                    navigation.replace(routeNames.auth.login);
                }
            }
        ])
    }

    return (
        <>
            <View style={styles.topBar}>
                <View style={styles.iconCtn}>
                    {isBackIcon &&
                        <Pressable onPress={handleBackEvent} style={{ width: '100%', marginTop: -3 }}>
                            <MaterialIcons name="arrow-back-ios-new" size={fonts.size.h3} color={colorPalettes.black} />
                        </Pressable>
                    }
                    {isHomeIcon &&
                        <MaterialIcons name="storefront" size={fonts.size.h3} color={colorPalettes.chineseBlue} />
                    }
                </View>
                <View style={{ flex: 1 }}>
                    <Text numberOfLines={1} style={styles.headerTxt}>{title}</Text>
                </View>
                {(isFilterIcon && !isLoader) &&
                    <View style={styles.iconCtn}>
                        <TouchableOpacity onPress={() => setFilterModal(true)} style={{ width: '100%', height: 30, borderRadius: 8, elevation: 5, alignItems: 'flex-end', paddingRight: 5, justifyContent: 'center', backgroundColor: colorPalettes.chineseBlue }}>
                            <MaterialIcons name="sort" size={fonts.size.h4} color={colorPalettes.azureishWhite} />
                        </TouchableOpacity>
                    </View>}
                {(isFilterIcon && isLogoutIcon) &&
                    <View style={{ marginHorizontal: 5 }} />
                }
                {isLogoutIcon &&
                    <View style={styles.iconCtn}>
                        <TouchableOpacity onPress={handlelogOutEvent} style={{ width: '100%', height: 30, borderRadius: 8, elevation: 5, alignItems: 'flex-end', paddingRight: 4, justifyContent: 'center', backgroundColor: colorPalettes.chineseBlue }}>
                            <MaterialIcons name="logout" size={fonts.size.h4} color={colorPalettes.azureishWhite} />
                        </TouchableOpacity>
                    </View>}
            </View>
            {isFilterModal &&
                <FilterModal
                    filterData={filterData}
                    isFilterModal={isFilterModal}
                    setFilterModal={setFilterModal}
                    outputEvent={outputEvent}
                    prev_filterData={prev_filterData}
                />
            }
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
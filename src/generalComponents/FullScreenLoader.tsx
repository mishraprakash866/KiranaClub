import React from "react";
import { ActivityIndicator, Modal, PermissionsAndroid, Platform, Pressable, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { colorPalettes, fonts } from "../config/Constants";

export const FullScreenLoader = ({
    isVisible = false,
    setVisible,
    checkPermissions,
    isLoader
}: any) => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
            >
                <Pressable onPress={() => (!isLoader && setVisible(false))} style={{ flex: 1, position: 'relative', backgroundColor: `${colorPalettes.black}${colorPalettes.opacity}`, justifyContent: 'center', alignItems: 'center' }}>
                    {isLoader &&
                        <View style={{ width: '80%', height: 70, backgroundColor: colorPalettes.white, borderRadius: 8, alignSelf: 'center', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ width: '25%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size={30} color={colorPalettes.chineseBlue} />
                            </View>
                            <View style={{ width: '75%', height: '100%', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ fontFamily: fonts.family.rubik, fontSize: fonts.size.h5, fontWeight: '500', color: colorPalettes.black }}>Please wait a moment...</Text>
                            </View>
                        </View>
                    }
                    {!isLoader &&
                        <Pressable style={{ width: '70%', position: 'absolute', zIndex: 9, height: 100, backgroundColor: colorPalettes.white, borderRadius: 8, alignSelf: 'center', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => checkPermissions(PermissionsAndroid.PERMISSIONS.CAMERA)} style={{ width: 60, height: 60, backgroundColor: colorPalettes.azureishWhite, borderRadius: 8, borderWidth: 1, borderColor: colorPalettes.ceil, justifyContent: 'center', alignItems: 'center' }}>
                                <Entypo name="camera" size={25} color={colorPalettes.ceil} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 5 }} />
                            <TouchableOpacity onPress={() => {
                                if (Platform.Version >= '33') {
                                    checkPermissions(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
                                } else {
                                    checkPermissions(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
                                }
                            }} style={{ width: 60, height: 60, backgroundColor: colorPalettes.azureishWhite, borderRadius: 8, borderWidth: 1, borderColor: colorPalettes.ceil, justifyContent: 'center', alignItems: 'center' }}>
                                <Entypo name="folder-images" size={25} color={colorPalettes.ceil} />
                            </TouchableOpacity>
                        </Pressable>
                    }
                </Pressable>
            </Modal>
        </>
    );
}
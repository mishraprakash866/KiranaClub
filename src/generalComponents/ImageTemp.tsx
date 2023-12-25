import React, { useState } from "react";
import { Alert, Linking, PermissionsAndroid, StyleSheet, TouchableOpacity, View } from "react-native";
import Fontisto from "react-native-vector-icons/Fontisto";
import { colorPalettes, errCode } from "../config/Constants";
import { FullScreenLoader } from "./FullScreenLoader";
import { chooseFile, takePicture } from "../services/General";
import { uploadImg } from "../services/API";
import FastImage from "react-native-fast-image";

export const NoThumb = () => {
    return (
        <View style={styles.fullSize}>
            <Fontisto name="shopping-bag-1" size={35} color={colorPalettes.ceil} />
        </View>
    );
}

export const ThumbIcon = ({ uri }: any) => {
    return (
        <View style={styles.fullSize}>
            <FastImage
                source={{ uri: uri }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
}

export const DetailImgColEle = ({ item }: any) => {

    const [isVisible, setVisible] = useState(false);
    const [isLoader, setLoader] = useState(false);

    const [imgcol, setImgCol] = useState((item?.imgCol) ? item?.imgCol : []);

    const uploadLimit = (3 - imgcol.length);

    const handleOutputEvent = ({ data, type }: any) => {
        if (data.length <= uploadLimit) {
            uploadImg({ data, type, docID: item?.id }).then((res: any) => {
                setVisible(false);
                setLoader(false);
                if (res && res != errCode) {
                    setImgCol(res.imgCol);
                    item['imgCol'] = res.imgCol;
                } else {
                    Alert.alert('Message', 'Oops something went\nPlease check your internet connection.');
                }
            }).catch((e: any) => {
                console.log(e);
                setVisible(false);
                setLoader(false);
                Alert.alert('Message', 'Oops something went\nPlease check your internet connection.');
            })
        } else {
            setVisible(false);
            setLoader(false);
            Alert.alert('Warning', 'You can only upload maximum 3 Images.', [{
                text:'Okay'
            }]);
        }
    }

    const checkPermissions = async (permissionType: any) => {
        let type = 0;
        switch (permissionType) {
            case PermissionsAndroid.PERMISSIONS.CAMERA:
                type = 1;
                break;

            default:
                type = 0;
                break;
        }
        try {
            const granted = await PermissionsAndroid.request(
                permissionType
            );
            console.log(granted);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setLoader(true);
                if (type == 1) {
                    takePicture({ outputEvent: (data: any) => handleOutputEvent({ data, type }) });
                } else {
                    chooseFile({ limit: uploadLimit, outputEvent: (data: any) => handleOutputEvent({ data, type }) });
                }
            } else {
                if (granted == PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
                    Alert.alert('Message', `${(type == 1) ? `Camera` : `Gallery`} Permission has been blocked\nPlease enable manually.`, [
                        {
                            text: 'Cancel'
                        },
                        {
                            text: 'Open Setting',
                            onPress: () => Linking.openSettings()
                        }
                    ])
                } else {
                    console.log('Camera permission denied');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                {imgcol[0] ?
                    <View style={[styles.imgBox, { width: '59%', height: '100%' }]}>
                        <FastImage
                            source={{ uri: imgcol[0] }}
                            resizeMode="cover"
                            style={{ width: '100%', height: '100%' }}
                        />
                    </View>
                    :
                    <TouchableOpacity onPress={() => setVisible(true)} style={[styles.imgBox, { width: '59%', height: '100%' }]}>
                        <Fontisto name="plus-a" size={25} color={colorPalettes.ceil} />
                    </TouchableOpacity>
                }
                <View style={{ width: '39%', height: '100%', flexDirection: 'column', justifyContent: 'space-between' }}>
                    {imgcol[1] ?
                        <View style={[styles.imgBox, { width: '100%', height: '49%' }]}>
                            <FastImage
                                source={{ uri: imgcol[1] }}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        :
                        <TouchableOpacity onPress={() => setVisible(true)} style={[styles.imgBox, { width: '100%', height: '49%' }]}>
                            <Fontisto name="plus-a" size={16} color={colorPalettes.ceil} />
                        </TouchableOpacity>
                    }
                    {imgcol[2] ?
                        <View style={[styles.imgBox, { width: '100%', height: '49%' }]}>
                            <FastImage
                                source={{ uri: imgcol[2] }}
                                resizeMode="cover"
                                style={{ width: '100%', height: '100%' }}
                            />
                        </View>
                        :
                        <TouchableOpacity onPress={() => setVisible(true)} style={[styles.imgBox, { width: '100%', height: '49%' }]}>
                            <Fontisto name="plus-a" size={16} color={colorPalettes.ceil} />
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <FullScreenLoader
                isVisible={isVisible}
                setVisible={setVisible}
                checkPermissions={checkPermissions}
                isLoader={isLoader}

            />
        </>
    );
}

const styles = StyleSheet.create({
    fullSize: {
        width: '100%',
        height: '100%',
        backgroundColor: colorPalettes.azureishWhite,
        borderWidth: 1,
        borderColor: colorPalettes.ceil,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    imgBox: {
        backgroundColor: colorPalettes.azureishWhite,
        borderWidth: 1,
        borderColor: colorPalettes.ceil,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    }
});
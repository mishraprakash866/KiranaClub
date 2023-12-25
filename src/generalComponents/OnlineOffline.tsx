import React from "react";
import { Modal, Text, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colorPalettes, fonts } from "../config/Constants";

export const OnlineOffline = () => {
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
            >
                <View style={{ flex: 1, position: 'relative', backgroundColor: `${colorPalettes.black}${colorPalettes.opacity}`, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{width:'100%', height:'50%', justifyContent:'center', alignItems:'center', borderTopLeftRadius:25, borderTopRightRadius:25, position:'absolute', bottom:0, backgroundColor:colorPalettes.white}}>
                        <MaterialIcons name="signal-wifi-statusbar-connected-no-internet-4" size={200} color={colorPalettes.azureishWhite} />
                        <Text style={{paddingTop:10, fontFamily:fonts.family.rubik, fontSize:fonts.size.h2, fontWeight:'700', color:colorPalettes.azureishWhite}}>Network Disconnected</Text>
                    </View>
                </View>
            </Modal>
        </>
    );
}
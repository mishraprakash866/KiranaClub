import React, { useEffect, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colorPalettes, fonts } from "../config/Constants";

export const FilterModal = ({
    filterData,
    setFilterModal,
    isFilterModal,
    outputEvent,
    prev_filterData
}: any) => {

    const [outPutfilter, setOutput] = useState((prev_filterData) ? prev_filterData :
        filterData?.map((ele: any) => {
            return {
                ...ele,
                value: 'all'
            }
        })
    );

    const handleSelectEvent = ({ val = 'all', index }: any) => {
        let tempNewData = [...outPutfilter];
        tempNewData[index].value = val;
        setOutput(tempNewData);
    }

    const handleResetEvent = () => {
        let tempOutput = filterData?.map((ele: any) => {
            return {
                ...ele,
                value: 'all'
            }
        });
        setOutput(tempOutput);
        setFilterModal(false);
        (outputEvent) && outputEvent(tempOutput);
    }

    const handleApplyEvent = () => {
        setFilterModal(false);
        (outputEvent) && outputEvent(outPutfilter);
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isFilterModal}
            >
                <Pressable onPress={() => setFilterModal(false)} style={styles.mainContainer}>
                    <Pressable style={styles.bodyCtn}>
                        <View style={{ backgroundColor: colorPalettes.white, borderBottomWidth: 1, borderColor: colorPalettes.azureishWhite }}>
                            <Text style={styles.title}>Filter</Text>
                        </View>
                        <View style={{ flex: 1, marginVertical: 16 }}>
                            {outPutfilter?.map((ele: any, index: number) => (
                                <View key={index?.toString()} style={{ paddingVertical: 10, borderBottomWidth: (index == (outPutfilter.length - 1)) ? 0 : 1, borderColor: colorPalettes.azureishWhite }}>
                                    <Text style={styles.label}>{ele.type}</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 50 }}>
                                        <View style={styles.row}>
                                            <TouchableOpacity onPress={() => handleSelectEvent({ index })} style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                                                <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: colorPalettes.azureishWhite, borderWidth: 1, borderColor: colorPalettes.ceil, borderRadius: 10 }}>
                                                    {ele.value == 'all' && <View style={{ width: 10, height: 10, backgroundColor: colorPalettes.ceil, borderRadius: 10 }} />}
                                                </View>
                                                <Text style={styles.value}>All</Text>
                                            </TouchableOpacity>
                                            {ele?.list?.map((ele2: any) => (
                                                <TouchableOpacity onPress={() => handleSelectEvent({ val: ele2, index })} key={ele2?.toString()} style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
                                                    <View style={{ width: 20, height: 20, backgroundColor: colorPalettes.azureishWhite, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: colorPalettes.ceil, borderRadius: 10 }}>
                                                        {ele.value == ele2 && <View style={{ width: 10, height: 10, backgroundColor: colorPalettes.ceil, borderRadius: 10 }} />}
                                                    </View>
                                                    <Text style={styles.value}>{ele2}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </ScrollView>
                                </View>
                            ))}

                            <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: 16, position: 'absolute', bottom: 0, justifyContent: 'space-between', alignItems: 'center' }}>
                                <TouchableOpacity onPress={handleResetEvent} style={[styles.btn, { backgroundColor: colorPalettes.white }]}>
                                    <Text style={[styles.btnTxt, { color: colorPalettes.chineseBlue }]}>Reset</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleApplyEvent} style={styles.btn}>
                                    <Text style={styles.btnTxt}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        position: 'relative',
        backgroundColor: `${colorPalettes.black}${colorPalettes.opacity}`,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyCtn: {
        width: '100%',
        height: '70%',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        bottom: 0,
        backgroundColor: colorPalettes.cultured,
        overflow: 'hidden'
    },
    title: {
        fontFamily: fonts.family.poppins,
        fontSize: fonts.size.h2,
        fontWeight: '400',
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingVertical: 15,
        color: colorPalettes.black
    },
    label: {
        fontFamily: fonts.family.poppins,
        fontSize: fonts.size.h3,
        fontWeight: '400',
        color: colorPalettes.black,
        textTransform: 'capitalize',
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    value: {
        fontFamily: fonts.family.rubik,
        fontSize: fonts.size.h6,
        color: colorPalettes.black,
        textTransform: 'capitalize',
        paddingLeft: 10
    },
    btn: {
        width: '49%',
        height: 50,
        borderWidth: 1,
        borderColor: colorPalettes.chineseBlue,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colorPalettes.chineseBlue
    },
    btnTxt: {
        fontFamily: fonts.family.poppins,
        fontSize: fonts.size.h5,
        color: colorPalettes.white,
        letterSpacing: 0.5
    }
});
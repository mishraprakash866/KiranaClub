import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storeUserData } from "../services/Store";
import { ActivityIndicator, StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { colorPalettes, errCode, fonts, routeNames } from "../config/Constants";
import { Header } from "../generalComponents/Header";
import { getStoreList } from "../services/API";
import { FlashList } from "@shopify/flash-list";
import { Search } from "../generalComponents/Search";
import { NoThumb } from "../generalComponents/ImageTemp";

const Home = ({ navigation }: any) => {

    const userData = storeUserData.getVal();
    const limit = 20;

    const [allIDs, setAllIDs] = useState(userData?.stores);
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any>([]);

    const isEndHit = useRef(false);
    const searchKeyword = useRef('');

    useEffect(() => {
        callHomeAPi();
    }, [])

    const callHomeAPi = () => {
        let tempAllList = [...allIDs];
        let specificIDs = tempAllList.splice(0, limit);
        getStoreList([...specificIDs]).then((res: any) => {
            console.log(res);
            setLoader(false);
            setAllIDs(tempAllList);
            if (res && res != errCode) {
                setData((prev: any) => [...prev, ...res]);
                isEndHit.current = false;
            }
        }).catch((e) => {
            console.log(e);
            setLoader(false);
        })
    }

    const handleEndReachEvent = () => {
        if (!isEndHit.current) {
            isEndHit.current = true;
            callHomeAPi();
        }
    }

    const keyExtractor = (item: any, index: number) => index.toString();

    const MemorizedElement = useCallback((txt: string) => {
        searchKeyword.current = txt;
    }, []);

    const handleSearchEvent = () => {
        console.log(searchKeyword.current);
        setLoader(true);
        setData([]);
        setAllIDs(userData?.stores);
        setTimeout(() => {
            callHomeAPi();
        }, 100);
    }

    const handleNavigation = (item:any) => {
        console.log(item);
        navigation.navigate(routeNames.detail, {item});
    }

    return (
        <>
            <View style={styles.container}>
                <Header
                    navigation={navigation}
                    title={`${userData?.name}'s Collections`}
                    isBackIcon={false}
                    isHomeIcon={true}
                />
                {loader ?
                    <View style={styles.body}>
                        <ActivityIndicator size={"large"} color={colorPalettes.chineseBlue} />
                    </View>
                    :
                    <FlashList
                        data={data}
                        keyExtractor={keyExtractor}
                        // ListHeaderComponent={() => (
                        //     <View style={{ width: '100%', height: 100, paddingHorizontal: 16, justifyContent: 'center' }}>
                        //         <Search setSearchKeyword={MemorizedElement} handleSearchEvent={handleSearchEvent} />
                        //     </View>
                        // )}
                        onEndReached={handleEndReachEvent}
                        estimatedItemSize={Dimensions.get('window').height}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={() => (
                            <>
                                <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                    {allIDs.length > 0 &&
                                        <ActivityIndicator size={"small"} color={colorPalettes.chineseBlue} />
                                    }
                                </View>
                            </>
                        )}
                        renderItem={({ item, index }) => (
                            <>
                                <TouchableOpacity onPress={()=>handleNavigation(item)} style={{ width: '100%', height: 90, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ width: 72, height: 72, borderRadius: 10, overflow: 'hidden' }}>
                                        <NoThumb />
                                    </View>
                                    <View style={{ flex: 0.95, height: 60, justifyContent: 'space-between' }}>
                                        <Text numberOfLines={2} style={{ fontFamily: fonts.family.poppins, fontSize: fonts.size.h5, color: colorPalettes.black, fontWeight: 'bold' }}>{item?.name}</Text>
                                        <Text style={[styles.subTxt]}>{item?.type}</Text>
                                        <Text style={[styles.subTxt, { paddingTop: 5 }]}><Text style={{ fontWeight: 'bold', fontFamily: fonts.family.poppins }}>Area: </Text>{item?.area}</Text>
                                    </View>
                                </TouchableOpacity>
                                {(data.length - 1) != index &&
                                    <View style={{ flex: 1, height: 1, marginHorizontal: 16, backgroundColor: colorPalettes.azureishWhite, marginVertical: 8 }} />
                                }
                            </>
                        )}
                    />
                }
            </View>
        </>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subTxt: {
        fontFamily: fonts.family.rubik,
        fontSize: fonts.size.h6,
        fontWeight: '300',
        color: colorPalettes.black
    }
});

export default Home;
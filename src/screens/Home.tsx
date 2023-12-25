import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { storeUserData } from "../services/Store";
import { ActivityIndicator, StyleSheet, Text, View, Dimensions, TouchableOpacity, RefreshControl } from "react-native";
import { colorPalettes, errCode, fonts, routeNames } from "../config/Constants";
import { Header } from "../generalComponents/Header";
import { getStoreList } from "../services/API";
import { FlashList } from "@shopify/flash-list";
import { Search } from "../generalComponents/Search";
import { NoThumb, ThumbIcon } from "../generalComponents/ImageTemp";

const Home = ({ navigation }: any) => {

    const userData = storeUserData.getVal();
    const limit = 20;

    const [allIDs, setAllIDs] = useState(userData?.stores);
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState<any>([]);
    const [searchData, setSearchData] = useState<any>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchKeyWord, setSearchKeyword] = useState('');

    const [isEndHit, setIsEndHit] = useState(false);
    const [filterData, setFilterData] = useState<any>(null);

    useEffect(() => {
        callHomeAPi();
    }, [])

    useEffect(() => {
        if (searchKeyWord?.length > 0) {
            const filteredData = data?.filter((ele: any) => (ele.name.toLowerCase()).includes(searchKeyWord.toLowerCase()));
            setSearchData(filteredData);
        }
    }, [searchKeyWord])

    const callHomeAPi = (paramData: any = undefined) => {
        let tempAllList = (paramData) ? [...paramData] : [...allIDs];
        let specificIDs = tempAllList.splice(0, limit);
        getStoreList([...specificIDs], filterData).then((res: any) => {
            if (res && res != errCode) {
                setLoader(false);
                setAllIDs(tempAllList);
                setData((prev: any) => [...prev, ...res]);
                setIsEndHit(false);
            } else {
                if (tempAllList.length > 0) {
                    callHomeAPi(tempAllList);
                } else {
                    setLoader(false);
                    setAllIDs(tempAllList);
                }
            }
        }).catch((e) => {
            console.log(e);
            setLoader(false);
        })
    }

    const handleEndReachEvent = () => {
        if (!isEndHit && searchKeyWord?.length == 0) {
            setIsEndHit(true);
            callHomeAPi();
        }
    }

    const keyExtractor = (item: any, index: number) => index.toString();

    const handleNavigation = (item: any) => {
        console.log(item);
        navigation.navigate(routeNames.detail, { item });
    }

    const outputEvent = (filterData: any) => {
        setFilterData(filterData);
        setLoader(true);
        setData([]);
        setAllIDs(userData?.stores);
    }

    useEffect(() => {
        if (filterData) {
            callHomeAPi(userData?.stores);
        }
    }, [filterData])

    const onRefresh = () => {
        setLoader(true);
        setData([]);
        setRefreshing(false);
        setAllIDs(userData?.stores);
        setTimeout(() => {
            callHomeAPi(userData?.stores);
        }, 100);
    };

    return (
        <>
            <View style={styles.container}>
                <Header
                    navigation={navigation}
                    title={`${userData?.name}'s Collections`}
                    isBackIcon={false}
                    isHomeIcon={true}
                    isLogoutIcon={true}
                    isFilterIcon={true}
                    prev_filterData={filterData}
                    outputEvent={outputEvent}
                />
                {loader ?
                    <View style={styles.body}>
                        <ActivityIndicator size={"large"} color={colorPalettes.chineseBlue} />
                    </View>
                    :
                    <>
                        <View style={{ width: '100%', padding: 16, height: 80 }}>
                            <Search setSearchKeyword={setSearchKeyword} searchKeyWord={searchKeyWord} />
                        </View>
                        <FlashList
                            data={(searchKeyWord?.length > 0) ? searchData : data}
                            keyExtractor={keyExtractor}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                            onEndReached={handleEndReachEvent}
                            estimatedItemSize={Dimensions.get('window').height}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={() => (
                                <>
                                    <View style={{ width: '100%', height: 60, justifyContent: 'center', alignItems: 'center' }}>
                                        {(allIDs.length > 0 && searchKeyWord?.length == 0 && data.length > 7) &&
                                            <ActivityIndicator size={"small"} color={colorPalettes.chineseBlue} />
                                        }
                                    </View>
                                </>
                            )}
                            renderItem={({ item, index }) => (
                                <>
                                    <TouchableOpacity onPress={() => handleNavigation(item)} style={{ width: '100%', height: 90, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ width: 72, height: 72, borderRadius: 10, overflow: 'hidden' }}>
                                            {item?.imgCol ?
                                                <ThumbIcon uri={item?.imgCol[0]} />
                                                :
                                                <NoThumb />
                                            }
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
                    </>
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
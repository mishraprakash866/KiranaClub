import firestore, { Filter } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { errCode } from '../config/Constants';

export const checkUser = ({ username, password }: any) => {
    return firestore()
        .collection('users')
        .where('name', '==', username)
        .where('password', '==', password)
        .get()
        .then((querySnapshot: any) => {
            if (!querySnapshot.empty) {
                let tempData = {};
                querySnapshot.forEach((doc: any) => {
                    tempData = { id: doc.id, ...doc.data() };
                });
                return tempData;
            } else {
                return false;
            }
        })
        .catch((e: any) => {
            return errCode;
        });
};

export const getStoreList = async (storeIds: string[], filterData: object[]) => {
    const chunkSize = 10; // Maximum number of elements in the 'in' array
    const chunks = [];

    // Split the array into chunks of size 'chunkSize'
    for (let i = 0; i < storeIds.length; i += chunkSize) {
        chunks.push(storeIds.slice(i, i + chunkSize));
    }

    const tempData: any[] = [];

    // Iterate through each chunk and fetch data
    for (const chunk of chunks) {
        try {

            if (filterData) {
                const shopCategory: any = filterData.find((ele: any) => ele.type == 'category');
                const areaList: any = filterData.find((ele: any) => ele.type == 'area');
                const routeList: any = filterData.find((ele: any) => ele.type == 'route');

                let baseQuery = firestore().collection('stores').where(firestore.FieldPath.documentId(), 'in', chunk);

                if (shopCategory?.value !== 'all') {
                    baseQuery = baseQuery.where('type', '==', shopCategory?.value);
                }

                if (areaList?.value !== 'all') {
                    baseQuery = baseQuery.where('area', '==', areaList?.value);
                }

                if (routeList?.value !== 'all') {
                    baseQuery = baseQuery.where('route', '==', routeList?.value);
                }

                const querySnapshot = await baseQuery.get();


                querySnapshot.forEach((docSnapshot) => {
                    if (docSnapshot.exists) {
                        tempData.push({ ...docSnapshot.data(), id: docSnapshot.id });
                    }
                });
            } else {
                const querySnapshot = await firestore()
                    .collection('stores')
                    .where(firestore.FieldPath.documentId(), 'in', chunk)
                    .get();

                querySnapshot.forEach((docSnapshot) => {
                    if (docSnapshot.exists) {
                        tempData.push({ ...docSnapshot.data(), id: docSnapshot.id });
                    }
                });
            }

        } catch (error) {
            console.log(error);
            return errCode;
        }
    }

    // Check if there is any data
    if (tempData.length > 0) {
        return tempData;
    } else {
        // Handle the case where there is no data
        return false;
    }
};

export const uploadImg = async ({ data, type, docID }: any) => {
    if (type == 1) {
        try {
            const reference = storage().ref(`images/${data.fileName}`);
            await reference.putFile(data.uri);
            const imageURL = await reference.getDownloadURL();
            const querySnapshot = await firestore()
                .collection('stores')
                .doc(docID)
                .get();
            let userData: any = querySnapshot.data();
            if (userData?.imgCol?.length > 0) {
                userData.imgCol = [...userData.imgCol, imageURL];
            } else {
                userData['imgCol'] = [imageURL];
            }
            await firestore().collection('stores').doc(docID).set(userData);
            // console.log({ msg: 'Image uploaded successfully', uri: imageURL, data: userData });
            return userData;
        } catch (error) {
            console.log(error);
            return errCode;
        }
    } else {
        let tempData: any = {};

        try {
            const querySnapshot = await firestore()
                .collection('stores')
                .doc(docID)
                .get();

            tempData = querySnapshot.data();
        } catch (error) {
            console.log(error);
            return errCode;
        }

        for (const ele of data) {
            try {
                const reference = storage().ref(`images/${ele.fileName}`);
                await reference.putFile(ele.uri);
                const imageURL = await reference.getDownloadURL();
                let userData: any = tempData;
                if (userData?.imgCol?.length > 0) {
                    userData.imgCol = [...userData.imgCol, imageURL];
                } else {
                    userData['imgCol'] = [imageURL];
                }
                tempData = userData;
                console.log({ msg: 'Image uploaded successfully', uri: imageURL, data: userData });
            } catch (error) {
                console.log(error);
                return errCode;
            }
        }

        if (Object.keys(tempData).length > 0) {
            await firestore().collection('stores').doc(docID).set(tempData);
            return tempData;
        } else {
            return errCode;
        }

    }
}

export const getParticularData = ({ docID }: any) => {
    return firestore().collection('stores').doc(docID).get().then((res: any) => {
        return res.data();
    })
        .catch((e: any) => {
            console.log(e);
            return errCode;
        })
}

export const getAllFilterValue = async () => {
    try {

        const filterData: any = [];

        const shopCategory: any = await firestore().collection('shopCategory').get();
        const routeList: any = await firestore().collection('routeList').get();
        const areaList: any = await firestore().collection('areaList').get();

        shopCategory.forEach((docSnapshot: any) => {
            filterData.push({ type: 'category', ...docSnapshot.data() });
        })

        routeList.forEach((docSnapshot: any) => {
            filterData.push({ type: 'route', ...docSnapshot.data() });
        })

        areaList.forEach((docSnapshot: any) => {
            filterData.push({ type: 'area', ...docSnapshot.data() });
        })

        return filterData;

    } catch (error) {
        console.log(error);
        return errCode;
    }
}
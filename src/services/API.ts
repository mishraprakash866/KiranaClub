import firestore from '@react-native-firebase/firestore';
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

export const getStoreList = async (storeIds: string[]) => {
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

            const querySnapshot = await firestore()
                .collection('stores')
                .where(firestore.FieldPath.documentId(), 'in', chunk)
                .get();

            querySnapshot.forEach((docSnapshot) => {
                if (docSnapshot.exists) {
                    tempData.push({...docSnapshot.data(), id:docSnapshot.id});
                }
            });

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
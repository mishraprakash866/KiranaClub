import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export const takePicture = async ({outputEvent}:any) => {
    let options: any = {
        title: 'Select Image',
        maxHeight: 800,
        maxWidth: 800,
        quality: 0.99,
        includeBase64: true,
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option',
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const result = await launchCamera(options);
    const newImage = result?.assets?.find(item => ({
        base64: item.base64,
        fileName: item.fileName,
        type: item.type,
        uri: item.uri
    }));

    outputEvent(newImage);
};

export const chooseFile = async ({ limit, outputEvent }: any) => {
    let options: any = {
        maxHeight: 600,
        maxWidth: 600,
        quality: 0.5,
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option',
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
        includeBase64: true,
        selectionLimit: (limit)
    };
    const result = await launchImageLibrary(options);
    const newImage = result?.assets?.map(item => ({
        base64: item.base64,
        fileName: item.fileName,
        type: item.type,
        uri: item.uri
    }));

    outputEvent(newImage);
};
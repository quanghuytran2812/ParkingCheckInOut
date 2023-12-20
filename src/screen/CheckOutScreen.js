import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import OnTimeModal from '../Modal/OnTimeModal';
import OverTimeModal from '../Modal/OverTimeModal';
import { apiCheckOut } from '../store/checkInSlice';

const CheckOutScreen = () => {
    const dispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openModalF, setOpenModalF] = useState(false);
    const [scannerEnabled, setScannerEnabled] = useState(true);

    const [data, setData] = useState({});
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleToggleScanner = () => {
        setScannerEnabled(!scannerEnabled);
    };

    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Please grant camera permissions to app.</Text>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanData(data);
        if (data) {
            dispatch(apiCheckOut(data))
                .then((result) => {
                    if (result.payload.statusCode === 200) {
                        setData(result.payload)
                        setOpenModal(true)
                    } else {
                        setData(result.payload)
                        setOpenModalF(true)
                    }
                })
                .catch((error) => {
                    console.log(error)
                });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {scannerEnabled ? (
                <>
                    <BarCodeScanner
                        style={StyleSheet.absoluteFillObject}
                        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
                    />
                    {scanData &&
                        <View style={styles.buttonAgain}>
                            <Button title='Scan Again?' buttonStyle={styles.buttonAgain} onPress={() => setScanData(undefined)} />
                        </View>}
                </>
            ) : (
                <Text>Scanner is turned off.</Text>
            )}
            <Button
                title={scannerEnabled ? 'Turn Off Scanner' : 'Turn On Scanner'}
                onPress={handleToggleScanner}
            />
            <StatusBar style="auto" />
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}>
                <OnTimeModal
                    onClose={() => setOpenModal(false)}
                    dataS={data}
                />
            </Modal>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModalF}>
                <OverTimeModal
                    onClose={() => setOpenModalF(false)}
                    dataF={data}
                />
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAgain: {
        height: 40,
        borderRadius: 5,
        shadowColor: '#02aab0',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    }
});
export default CheckOutScreen;

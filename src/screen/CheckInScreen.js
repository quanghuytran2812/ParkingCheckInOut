import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from 'react-redux';
import { apiCheckIn } from '../store/checkInSlice';
import { SafeAreaView } from 'react-native';
import { Modal } from 'react-native';
import FailModal from '../Modal/FailModal';
import SuccessModal from '../Modal/SuccessModal';

const CheckInScreen = ({ navigation }) => {
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
    }, [hasPermission]);

    const handleToggleScanner = () => {
        setScannerEnabled(!scannerEnabled);
    };


    if (!hasPermission) {
        return (
            <View style={styles.container}>
                <Text>Vui lòng cấp quyền camera cho ứng dụng.</Text>
            </View>
        );
    }

    const handleBarCodeScanned = ({ type, data }) => {
        setScanData(data);
        if (data) {
            dispatch(apiCheckIn(data))
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
            <View style={styles.buttonTranferGate}>
                <Button
                    title="QUÉT RA CỔNG"
                    buttonStyle={styles.buttonTranferGate}
                    onPress={() => navigation.navigate('QUÉT RA CỔNG')}
                />
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}>
                <SuccessModal
                    onClose={() => setOpenModal(false)}
                    dataS={data}
                />
            </Modal>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModalF}>
                <FailModal
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
    buttonTranferGate: {
        height: 40,
        borderRadius: 5,
        shadowColor: '#fff',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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

export default CheckInScreen

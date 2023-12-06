import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SuccessModal from '../Modal/SuccessModal';
import FailModal from '../Modal/FailModal';

const CheckInScreen = ({ navigation }) => {
    const [openModal, setOpenModal] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        // Implement your check-in logic here using the scanned QR code data
        alert(`Check-in successful with code: ${data}`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <BarCodeScanner
                style={{ width: 490, height: 300, alignItems: 'center', justifyContent: 'center' }}
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            />
            <View style={{ padding: 30 }}>
                <Button
                    title="QUÉT RA CỔNG"
                    onPress={() => navigation.navigate('QUÉT RA CỔNG')}
                />
            </View>

            <View style={{ padding: 30 }}>
                <Button
                    title="Huy ngu"
                    onPress={() => setOpenModal(true)}
                />
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}>
                <SuccessModal
                    onClose={() => setOpenModal(false)}
                />
            </Modal>
        </View>
    );
};

export default CheckInScreen

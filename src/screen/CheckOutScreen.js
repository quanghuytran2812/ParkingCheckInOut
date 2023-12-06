import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import OverTimeModal from '../Modal/OverTimeModal';
import OnTimeModal from '../Modal/OnTimeModal';

const CheckOutScreen = () => {
    const [openModal1, setOpenModal1] = useState(false);
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
        // Implement your check-out logic here using the scanned QR code data
        alert(`Check-out successful with code: ${data}`);
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
                    title="Check ra cổng"
                    onPress={() => setOpenModal1(true)}
                />
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal1}>
                <OnTimeModal
                    onClose={() => setOpenModal1(false)}
                />
            </Modal>
        </View>
    );
};

export default CheckOutScreen;

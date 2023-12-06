import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../contants';


const SuccessModal = ({ onClose, dataF }) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                <View style={styles.ModalCommonForm}>
                    <View style={styles.Success}>
                        <View style={styles.modalIcon}>
                            <MaterialCommunityIcons
                                name='check-bold' size={60}
                            />
                        </View>
                        <View style={styles.modalContent}>
                            <View style={{marginBottom:10 , alignItems:'center' , justifyContent:'center'}}>
                                <Text style={{fontSize:30, marginBottom:20}}> Được vào cổng </Text>
                            </View>
                            <TouchableOpacity 
                            style={{alignItems:'center' , justifyContent:'center', backgroundColor:Colors.DEFAULT_YELLOW , borderRadius:20, padding:15}}
                            onPress={onClose}
                            >
                                <Text style={{fontSize:30 , color:Colors.DEFAULT_WHITE }}> Xác nhận </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ModalCommonoverlay: {
        backgroundColor: 'rgba(49, 49, 49, 0.8)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ModalCommonmodalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        margin: 0,
    },
    ModalCommonForm: {
        width: 320,
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 4,
    },
    Success: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalIcon: {
        backgroundColor: Colors.DEFAULT_YELLOW,
        height: 100,
        width: 100,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -100
    },
    modalContent:{
        paddingTop:20
    }
})

export default memo(SuccessModal)

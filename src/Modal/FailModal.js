import React, { memo } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../contants';
import moment from 'moment';


const FailModal = ({ onClose, dataF }) => {
    const handleClick = (e) => {
        e.stopPropagation();
    };

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                <View style={styles.ModalCommonForm}>
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <MaterialCommunityIcons
                            name='alert' size={60} color="#fff"
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.modalformHeading}>Kiểm soát khi vào</Text>
                        <View style={styles.MainCont}>
                            <View style={{ ...styles.MainContCard, justifyContent: 'center' }}>
                                {dataF?.data?.message ? (
                                    <Text style={{
                                        color: Colors.DEFAULT_RED,
                                        fontWeight: '600',
                                        letterSpacing: 1,
                                        fontSize: 18,
                                        textAlign: 'center'
                                    }}>{dataF.data.message}</Text>
                                ) : (
                                    <Text style={{
                                        color: Colors.DEFAULT_RED,
                                        fontWeight: '600',
                                        letterSpacing: 1,
                                        fontSize: 18,
                                        textAlign: 'center'
                                    }}>{dataF.message}</Text>
                                )}

                            </View>
                            {dataF?.data?.checkInDate && (
                                <View style={styles.MainContCard}>
                                    <Text style={styles.MainContTextL}>Ngày kiểm tra vào</Text>
                                    <Text style={styles.MainContTextR}>{moment(dataF.data.checkInDate).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                                </View>
                            )}
                            {dataF?.data?.startDate && (
                                <View style={styles.MainContCard}>
                                    <Text style={styles.MainContTextL}>Ngày bắt đầu</Text>
                                    <Text style={styles.MainContTextR}>{moment(dataF.data.startDate).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                                </View>
                            )}
                            {dataF?.data?.endDate && (
                                <View style={styles.MainContCard}>
                                    <Text style={styles.MainContTextL}>Ngày kết thúc</Text>
                                    <Text style={styles.MainContTextR}>{moment(dataF.data.endDate).format('DD/MM/YYYY hh:mm:ss A')}</Text>
                                </View>
                            )}
                            <TouchableOpacity style={styles.btnCommon1} onPress={onClose}>
                                <Text style={styles.btnTextCommon1}>Xác nhận</Text>
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
        position: 'relative',
    },
    closeBtn: {
        backgroundColor: Colors.DEFAULT_RED,
        position: 'absolute',
        left: '45%',
        top: -40,
        borderRadius: 100,
        justifyContent: 'center',
        zIndex: 1,
        height: 90,
        width: 90,
        alignItems: 'center'
    },
    modalformHeading: {
        textTransform: 'uppercase',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: '#333',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        borderStyle: 'solid',
        textAlign: 'center',
        paddingTop: 20
    },
    MainCont: {
        marginTop: 10,
    },
    MainContCard: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    MainContTextL: {
        flex: 1,
        color: '#6e6e6e'
    },
    MainContTextR: {
        flex: 1,
        fontWeight: '600',
    },
    btnCommon1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: Colors.DEFAULT_RED,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    },
})

export default memo(FailModal)

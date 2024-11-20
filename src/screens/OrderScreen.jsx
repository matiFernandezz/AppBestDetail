import React, { useEffect } from 'react';
import { StyleSheet, Text, FlatList, ActivityIndicator } from 'react-native';
import SingleCard from '../components/SingleCard';
import { useGetOrdersQuery } from '../services/orderService';
import { useIsFocused } from '@react-navigation/native';

const OrderScreen = () => {
    const isFocused = useIsFocused(); 
    const { data: orders, error, isLoading, refetch } = useGetOrdersQuery(); 
    useEffect(() => {
        if (isFocused) {
            refetch(); 
        }
    }, [isFocused]);

    const renderOrderItem = ({ item }) => {
        const dateOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };

        return (
            <SingleCard style={styles.orderContainer}>
                <Text style={styles.title}>Orden de compra nro: {item.id}</Text>
                <Text style={styles.date}>
                    Creado el {new Date(item.createdAt).toLocaleString('es-Ar', dateOptions)} Hs.
                </Text>
                <Text style={styles.total}>Total: ${item.total}</Text>
            </SingleCard>
        );
    };

    return (
        <>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text>Error al cargar las órdenes</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderOrderItem}
                />
            )}
        </>
    );
};

export default OrderScreen

const styles = StyleSheet.create({
  orderContainer: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
},
title: {
    fontSize: 16,
    fontFamily: 'RobotoBold',
    marginBottom: 4,
},
date: {
    fontSize: 14,
    fontFamily: 'Roboto',
    color: '#666',
    marginBottom: 4,
},
total: {
    fontSize: 16,
    fontFamily: 'RobotoBold',
    fontWeight: '600',
    marginBottom: 4,
},
iconEye: {
  position: 'absolute',
  right: 10,
  bottom: 5,
    
},
})
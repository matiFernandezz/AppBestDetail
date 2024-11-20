import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { useGetUserLocationQuery } from '../../services/userService';
import SingleCard from '../../components/SingleCard';
import { colors } from '../../global/colors';

const SavedLocationScreen = ({ navigation }) => {
    const localId = useSelector((state) => state.authReducer.value.localId);
    const { data: userLocation, isLoading, isError } = useGetUserLocationQuery(localId);

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error loading address</Text>;
    }

    if (!userLocation || !userLocation.latitude || !userLocation.longitude || !userLocation.address) {
        return <Text>No location data available</Text>;
    }

    const { latitude, longitude, address } = userLocation;

    return (
        <>
        <SingleCard style={styles.placeContainer}>
            <View  style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude,  
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={{ latitude, longitude }} />
            </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.direccion}>Dirección Guardada:</Text>
               <Text style={styles.addressText}>{address}</Text> 
            </View>
            

        </SingleCard>        
        <Pressable
            style={styles.changeButton}
            onPress={() => navigation.navigate('Address')} 
            >
        <Text style={styles.changeButtonText}>Cambiar Dirección</Text>
        </Pressable>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
      },
    placeContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 16,
        margin: 10,
        gap: 24
      },
      mapContainer: {
        width: 100,
        height: 100,
        borderRadius: 75,
        overflow: "hidden",
        elevation: 5,
      },
      map: {
        width: 120,
        height: 120,
      },
      direccion: {
        fontFamily: 'RobotoBold',
        fontSize: 16,
        textAlign: 'center'
      },
      address: {
        fontFamily: 'Roboto',
        fontSize: 16
      },
      placeDescriptionContainer: {
        width: '60%',
        padding: 8
      },
      changeButton: {
        backgroundColor: colors.backOrange,
        padding: 10,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        width: 'auto'
    },
    changeButtonText: {
        color: 'white',
        fontSize: 16,
    }
});

export default SavedLocationScreen;

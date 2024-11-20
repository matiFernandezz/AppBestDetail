import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../global/colors';
import Toast from 'react-native-toast-message';
import SingleCard from '../../components/SingleCard';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useDispatch, useSelector } from 'react-redux';
import { usePostUserLocationMutation } from '../../services/userService';
import { setUserLocation } from '../../features/auth/authSlice';
import { useGetUserLocationQuery } from '../../services/userService';

const AddressScreen = ({ navigation }) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const localId = useSelector((state) => state.authReducer.value.localId);
    const dispatch = useDispatch();
    const [triggerPost, { isSuccess }] = usePostUserLocationMutation();


    const { data: userLocation, refetch } = useGetUserLocationQuery(localId);

    useEffect(() => {
        if (userLocation) {
            setAddress(userLocation.address);
            setLocation({ latitude: userLocation.latitude, longitude: userLocation.longitude });
        }
    }, [userLocation]);

    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000,
        });
    };

    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permiso denegado para acceder a la ubicación');
            return false;
        }
        return true;
    };

    const getLocation = async () => {
        const permissionOk = await getPermissions();
        if (!permissionOk) return;

        try {
            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);

            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.coords.latitude},${currentLocation.coords.longitude}&key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`
            );
            const data = await response.json();

            if (data.status === 'OK') {
                const formattedAddress = data.results[0]?.formatted_address || 'Dirección no disponible';
                setAddress(formattedAddress);
                showToast('success', '¡Ubicación obtenida correctamente!');
            } else {
                throw new Error(data.error_message || 'Error en geocodificación inversa');
            }
        } catch (error) {
            setErrorMsg('No se pudo obtener la ubicación');
            showToast('error', `Error: ${error.message}`);
        }
    };

    const confirmAddress = () => {
        if (!location || !location.latitude || !location.longitude) {
            showToast('error', 'Faltan datos de ubicación');
            return;
        }

        const locationFormatted = {
            latitude: location.latitude,
            longitude: location.longitude,
            address: address || 'Dirección desconocida',
        };

        triggerPost({ location: locationFormatted, localId })
            .unwrap()
            .then(() => {
                dispatch(setUserLocation(locationFormatted));
                showToast('success', '¡Ubicación guardada correctamente!');
                refetch();
                // Navegar a SavedLocationScreen automáticamente después de guardar la ubicación
                navigation.navigate('Perfil');
            })
            .catch((error) => {
                console.error('Error al guardar la ubicación:', error);
                showToast('error', 'No se pudo guardar la ubicación');
            });
    };

    return (
        <ScrollView style={styles.container}>
            <SingleCard>
            <View style={styles.inputContainer}>
                 <TextInput style={styles.textInput} placeholder="Ingresa un título" onChangeText={(text) => setTitle(text)} value={title} />
            <Pressable onPress={getLocation}><Icon name="location-on" color={colors.brightOrange} size={24} /></Pressable>
            </View>
           
            <MapView
                style={styles.map}
                initialRegion={{
                latitude: location?.latitude || userLocation?.latitude || 0,
                longitude: location?.longitude || userLocation?.longitude || 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                }}      
            >
            {(location || userLocation) && (
            <Marker
            coordinate={{
                latitude: location?.latitude || userLocation?.latitude,
                longitude: location?.longitude || userLocation?.longitude,
            }}
            />
            )}
            </MapView>
            <Text style= {styles.title}>Titulo: {title} </Text>
            <Text style={styles.addressText}>
                 {address || 'Esperando a que cargues tu ubicacion...'}
            </Text>

            <Pressable style={styles.button} onPress={confirmAddress}>
                <Text style={styles.buttonText}>Confirmar Dirección</Text>
            </Pressable>                
            </SingleCard>

            <Toast/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
      },
    title: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 20,
      }, 
      textInput: {
        flex: 1,
        height: 40,
        borderColor: colors.darkGray,
        backgroundColor: colors.lightGray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: colors.darkGray,
        fontSize: 16,
        marginRight: 10,
      },
    map: {
        width: 130,
        height: 130,
        marginBottom: 16,
        alignSelf: 'center',
    },
    title:{
        fontSize: 18,
        fontFamily: 'RobotoBold',
        textAlign: 'center',

    },
    addressText: {
        fontSize: 16,
        marginBottom: 16,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    button: {
        backgroundColor: colors.backOrange,
        padding: 10,
        borderRadius: 10,
        marginBottom: 5,
        alignItems: 'center',
        width: 'auto'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default AddressScreen;

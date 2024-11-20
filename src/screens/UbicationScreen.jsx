import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, TextInput, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../global/colors';
import Toast from 'react-native-toast-message';
import SingleCard from '../components/SingleCard';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';

const MyPlacesScreen = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null); 
    const [places, setPlaces] = useState([{ "id": 1, "title": "Best Detail, Mendoza", "coords": {"latitude":-32.89104608367226,"longitude":-68.82976630138252},"address":"Av. Gdor. Ricardo Videla 627, M5519 San José, Mendoza" }])
    const [address, setAddress] = useState("")
    const showToast = (type, message) => {
        Toast.show({
            type: type,
            text1: message,
            visibilityTime: 2000, 
        });
    };
    const getPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            return false;
        }
        return true
    }
    const renderPlaceItem = ({ item }) => (
        <SingleCard style={styles.placeContainer}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: item.coords.latitude,
                        longitude: item.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={{ "latitude": item.coords.latitude, "longitude": item.coords.longitude }} title={"Best Detail"} />
                </MapView>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <Text style={styles.mapTitle}>{item.title}</Text>
                <Text style={styles.address}>{item.address}</Text>
            </View>
        </SingleCard>
    )
    const getLocation = async () => {
        const permissionOk = await getPermissions()
        if (!permissionOk) {
            setErrorMsg('Permission to access location was denied');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            if (location) {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GEOCODING_API_KEY}`
                  );
                  const data = await response.json();
                  
                  if (data.status === "OK") {
                    const formattedAddress = data.results[0].formatted_address;
                    setAddress(formattedAddress);
                  } else {
                    console.log("Error en geocodificación inversa:", data.error_message);
                  }
                  showToast("success", "¡Ubicación obtenida!");
                
            } else {
                setErrorMsg('Error getting location');
                showToast("error", "No se pudo obtener la ubicación")
            }
            setLocation(location.coords);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Encuentranos!</Text>
            <FlatList
                data={places}
                keyExtractor={item => item.id}
                renderItem={renderPlaceItem}
            />

            <Toast />
        </View>
    );
}
export default MyPlacesScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      padding: 20,
    },
    subtitle: {
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: '600',
      color: colors.black,
      marginBottom: 10,
      textAlign: 'center',
    },
    placesContainer: {
        marginTop: 16
      },
      placeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 4,
        gap: 24
      },
      mapContainer: {
        width: 170,
        height: 170,
        borderRadius: 20,
        overflow: "hidden",
    
      },
      map: {
        width: 170,
        height: 170,
      },
      mapTitle: {
        fontWeight: '700'
      },
      address: {
    
      },
      placeDescriptionContainer: {
        width: '90%',
        padding: 8
      }
  });
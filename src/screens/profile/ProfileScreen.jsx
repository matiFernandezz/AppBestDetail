import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { colors } from '../../global/colors';
import CameraIcon from '../../components/CameraIcon';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { setProfilePicture } from '../../features/auth/authSlice';
import { usePutProfilePictureMutation, useGetUserLocationQuery } from '../../services/userService';

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.authReducer.value.email);
  const image = useSelector((state) => state.authReducer.value.profilePicture);
  const localId = useSelector((state) => state.authReducer.value.localId);
  const dispatch = useDispatch();
  
  const [triggerPutProfilePicture] = usePutProfilePictureMutation();
  const { data: userLocation, isLoading, isError } = useGetUserLocationQuery(localId);
  
  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    const permissionOk = await verifyCameraPermissions();
    if (permissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.7,
      });
      if (!result.canceled) {
        dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`));
        triggerPutProfilePicture({ image: `data:image/jpeg;base64,${result.assets[0].base64}`, localId });
      }
    }
  };

  const launchLocation = () => {
    if (isLoading) {
      return; 
    }

    if (userLocation) {
      navigation.navigate('SavedLocation');
    } else {
      navigation.navigate('Address');
    }
  };

  return (
    <View style={styles.profileContainer}>
      <View style={styles.imageProfileContainer}>
        {image ? (
          <Image source={{ uri: image }} resizeMode="cover" style={styles.profileImage} />
        ) : (
          <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }, styles.cameraIcon]}
        >
          <CameraIcon />
        </Pressable>
      </View>
      <Text style={styles.profileData}>Email: {user}</Text>
      <Pressable onPress={launchLocation} style={styles.locationButton}>
        <Text style={styles.locationText}>Mi dirección</Text>
      </Pressable>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  imageProfileContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.backOrange,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    position: 'relative',
    elevation: 8, 
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.white,
  },
  textProfilePlaceHolder: {
    fontSize: 45,
    color: colors.white,
    fontFamily: 'RobotoBold'
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 36,
    height: 36,
    backgroundColor: colors.orange,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  profileData: {
    fontSize: 18,
    fontFamily: 'Roboto',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 15,
    textAlign: 'center',
    width: '80%',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  locationButton: {
    backgroundColor: colors.backOrange,
    width: '70%',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 10,
    elevation: 6, 
  },
  locationText: {
    fontSize: 16,
    color: colors.white,
    fontFamily: 'RobotoBold',
    textAlign: 'center',
  },
});

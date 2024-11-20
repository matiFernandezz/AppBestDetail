import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import Toast from 'react-native-toast-message';
import { useState, useEffect } from 'react';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../services/authService';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {insertSession, clearSessions} from '../../db'

const textInputWidth = Dimensions.get('window').width * 0.8

const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const dispatch = useDispatch()

    const [triggerLogin, result] = useLoginMutation()
    const showToast = (type, message) => {
      Toast.show({
          type: type,
          text1: message,
          visibilityTime: 2000, 
      });
  };

  useEffect(() => {
    if (result.isSuccess) {
      console.log("Usuario logueado con éxito")
      dispatch(setUser(result.data))

      if (rememberMe) {
        clearSessions().then(() => console.log("Sesiones eliminadas")).catch(error => console.log("Error al eliminar las sesiones: ", error))
        insertSession({
          localId: result.data.localId,
          email: result.data.email,
          token: result.data.idToken
        })
          .then(res => console.log("Usuario insertado con éxito",res))
          .catch(error => console.log("Error al insertar usuario",error))
      }

    }else if(result.status === "rejected"){
      showToast("error", "Error al iniciar sesión")
    }
  }, [result,rememberMe])

const onsubmit = ()=>{     
    triggerLogin({email,password})
}

    return (
        <LinearGradient
            colors={['#FFA500', '#FF4500']}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
            style={styles.gradient}
        >
            <Text style={styles.subTitle}>Iniciá sesión</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />

            </View>
            <View style={styles.rememberMeContainer}>
                <Text style={styles.whiteText}>Mantener sesión iniciada</Text>
                {
                    rememberMe
                    ?
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="check-box" size={32} color={colors.brightOrange} /></Pressable>
                    :
                    <Pressable onPress={() => setRememberMe(!rememberMe)}><Icon name="check-box-outline-blank" size={32} color={colors.lightGray} /></Pressable>
                }
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Signup')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Crea una
                    </Text>
                </Pressable>
            </View>

            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Iniciar sesión</Text></Pressable>

            <View style={styles.guestOptionContainer}>
                <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
                <Pressable onPress={()=>dispatch(setUser({email:"BestDetail@gmail.com",token:"demo"}))}>
                  <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
                </Pressable>
            </View>
            <Toast />
        </LinearGradient>
    )
}
export default LoginScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      subTitle: {
        fontSize: 30,
        fontFamily: 'RobotoBold',
        color: colors.white,
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
      },
      inputContainer: {
        width: '80%',
        marginBottom: 20,
      },
      textInput: {
        width: textInputWidth,
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 7,
        color: colors.white,
        fontSize: 16,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
      },
      footTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
      },
      whiteText: {
        color: colors.white,
        fontSize: 14,
        fontFamily: 'Roboto',
      },
      underLineText: {
        textDecorationLine: 'underline',
        marginLeft: 5,
        fontFamily: 'Roboto',
      },
      btn: {
        backgroundColor: colors.brightOrange,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      btnText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: 'RobotoBold',
        textAlign: 'center',
      },
      guestOptionContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
      strongText: {
        marginTop: 5,
        fontFamily: 'RobotoBold',
      },
      rememberMeContainer: {
        flexDirection: "row",
        gap: 5,
        justifyContent: "space-around",
        alignItems: "center",
        marginVertical: 8,
      }
})
import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors';
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';

const textInputWidth = Dimensions.get('window').width * 0.8
const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
    const [genericValidationError, setGenericValidationError] = useState("")
    const [errorAddUser,setErrorAddUser] = useState(false)

    const [triggerSignup, result] = useSignupMutation()
    const dispatch = useDispatch()
    useEffect(()=>{
        if(result.status==="rejected"){
            setErrorAddUser("Se ha producido un error al agregar el usuario")
        }else if(result.status==="fulfilled"){
            dispatch(setUser(result.data))
        }
    },[result])
    const onsubmit = ()=>{
        
        try {
          validationSchema.validateSync({ email, password, confirmPassword })
          setErrorEmail("")
          setErrorPassword("")
          setErrorConfirmPassword("")
          triggerSignup({ email, password })
      } catch (error) {
          switch (error.path) {
              case "email":
                  setErrorEmail(error.message)
                  break
              case "password":
                  setErrorPassword(error.message)
                  break
              case "confirmPassword":
                  setErrorConfirmPassword(error.message)
                  break
              default:
                  setGenericValidationError(error.message)
                  break
          }
      } 
    }
    return (
        <LinearGradient
            colors={['#FFA500', '#FF4500']}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}   
            style={styles.gradient}
        >
            <Text style={styles.subTitle}>Registrate</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder="Email"
                    style={styles.textInput}
                />
              {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholderTextColor="#EBEBEB"
                    placeholder='Repetir contraseña'
                    style={styles.textInput}
                    secureTextEntry
                />
                {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
            </View>
            <View style={styles.footTextContainer}>
                <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={
                        {
                            ...styles.whiteText,
                            ...styles.underLineText
                        }
                    }>
                        Iniciar sesión
                    </Text>
                </Pressable>
            </View>
            <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
            {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}

        </LinearGradient>
    )
}
export default SignupScreen

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
        marginTop: 7,
        color: colors.white,
        fontSize: 16,
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderWidth: 1,
        fontFamily: 'Roboto',
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
        marginBottom: 7,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      btnText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'RobotoBold',
        
      },
      guestOptionContainer: {
        marginTop: 10,
        alignItems: 'center',
      },
      strongText: {
        fontFamily: 'RobotoBold',
        marginTop: 5,
      },
      error: {
        color: colors.red,
        textAlignt: 'center',
        margin: 4,
        fontFamily: 'Roboto',
      }
})
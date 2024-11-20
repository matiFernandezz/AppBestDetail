import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import { colors } from '../global/colors'
import LogoBest from '../../assets/BestLogo.png'
import Icon  from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../features/auth/authSlice'
import { clearSessions } from '../db'

const Header = () => {

  const user = useSelector(state => state.authReducer.value.email)
  const dispatch = useDispatch()
  const onLogout = ()=>{
    dispatch(clearUser())
    clearSessions()
      .then(()=>console.log("Sesión eliminada"))
      .catch((error)=>console.log("Error al eliminar la sesión"))
  }
  return (
    <View  style={styles.header}>
     <Image source={LogoBest} style={styles.logo} resizeMode='cover'></Image>
    {
      user && <Pressable onPress={onLogout} style={styles.access}><Icon name="logout" size={16} color="#fff" /></Pressable>
    }


    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkGray,
        flexDirection: "column"
        
    },
    logo: {
      width: 300,
      height: 100,
      alignSelf: 'center',
      

    },
    access:{
      alignSelf: "flex-end",
      marginRight: 5
   
    } 
})
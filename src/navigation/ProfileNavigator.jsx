import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AdressScreen from "../screens/profile/AdressScreen";
import SavedLocationScreen from "../screens/profile/SavedLocationScreen";

const Stack = createNativeStackNavigator()

const ProfileNavigator = ()=>(
    <Stack.Navigator>
        <Stack.Screen name="Perfil" component={ProfileScreen}
                options={{  title: "Tu Perfil", 
                    headerStyle: {backgroundColor: "#f4511e", },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                }} />
        <Stack.Screen name="Address" component={AdressScreen}
                options={{  title: "Guarda tu Direccion", 
                    headerStyle: {backgroundColor: "#f4511e", },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                }} />
        <Stack.Screen name="SavedLocation" component={SavedLocationScreen}
                options={{  title: "Tu Direccion", 
                    headerStyle: {backgroundColor: "#f4511e", },
                    headerTintColor: "#fff",
                    headerTitleAlign: "center",
                    headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                }} />
    </Stack.Navigator>
)

export default ProfileNavigator
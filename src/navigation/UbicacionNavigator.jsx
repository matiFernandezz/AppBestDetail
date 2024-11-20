import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UbicationScreen from "../screens/UbicationScreen";

const Stack = createNativeStackNavigator()
const UbicacionNavigator = ()=>(
    <Stack.Navigator >
        <Stack.Screen name="Ubicacion" component={UbicationScreen}
                        options={{  title: "Nuestra Ubicación", 
                            headerStyle: {backgroundColor: "#f4511e", },
                            headerTintColor: "#fff",
                            headerTitleAlign: "center",
                            headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                        }} />
    </Stack.Navigator>
)
export default UbicacionNavigator
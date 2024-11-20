import { createNativeStackNavigator } from "@react-navigation/native-stack"
import OrderScreen from "../screens/OrderScreen"

const Order = createNativeStackNavigator()

const OrderNavigator = () => {
  return (
    <Order.Navigator>
        <Order.Screen name="OrdenCompra" component={OrderScreen}
        options={{  title: "Ordenes de Compra", 
            headerStyle: {backgroundColor: "#f4511e", },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
        }} />
    </Order.Navigator>
  )
}

export default OrderNavigator


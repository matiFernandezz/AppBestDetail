import { createNativeStackNavigator } from "@react-navigation/native-stack"
import CartScreen from "../screens/CartScreen";



const Cart = createNativeStackNavigator()

const CartNavigator = () => {
  return (
    <Cart.Navigator>
        <Cart.Screen name="Cart" component={CartScreen} 
        options={{  title: "Tu carrito", 
          headerStyle: {backgroundColor: "#f4511e" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
      }}/>
    </Cart.Navigator>
  )
}

export default CartNavigator


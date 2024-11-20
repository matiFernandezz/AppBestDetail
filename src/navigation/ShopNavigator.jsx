
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import {CategoriesScreen, ProductsScreen, ProductScreen} from "../screens/shop"

const Stack = createNativeStackNavigator()

const ShopNavigator = () => {
  return (
    
        <Stack.Navigator>
            <Stack.Screen name="Categorias" component={CategoriesScreen}
            options={{  title: "Categorias", 
                        headerStyle: {backgroundColor: "#f4511e", },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center",
                        headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                    }}/>

            <Stack.Screen name="Productos" component={ProductsScreen} 
                        options={{  title: "Productos", 
                            headerStyle: {backgroundColor: "#f4511e", },
                            headerTintColor: "#fff",
                            headerTitleAlign: "center",
                            headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
                        }}
            />
            <Stack.Screen name="Producto" component={ProductScreen} 
                        options={{  title: "Producto", 
                            headerStyle: {backgroundColor: "#f4511e", },
                            headerTintColor: "#fff",
                            headerTitleAlign: "center",
                            headerTitleStyle: {fontWeight: "bold", fontFamily: "Roboto"}                        
            }}
            />
        </Stack.Navigator>
    
  )
}

export default ShopNavigator


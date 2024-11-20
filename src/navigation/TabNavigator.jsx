import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShopNavigator from "./ShopNavigator";
import CartNavigator from "./CartNavigator";
import OrderNavigator from "./OrderNavigator";
import { colors } from "../global/colors";
import ProfileNavigator from "./ProfileNavigator";
import UbicacionNavigator from "./UbicacionNavigator";
import { useSelector } from "react-redux"; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const cartLength = useSelector((state) => state.cartReducer.value.cartLenght);

  return (
    <Tab.Navigator
      initialRouteName="Shop"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabNav,
      }}
    >
      <Tab.Screen 
        name="Shop" 
        component={ShopNavigator} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="store" 
              size={30} 
              color={focused ? colors.black : colors.darkGray} 
            />
          ),
        }}    
      />
      <Tab.Screen 
        name="Carrito" 
        component={CartNavigator} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="shopping-cart" 
              size={30} 
              color={focused ? colors.black : colors.darkGray} 
            />
          ),
          tabBarBadge: cartLength > 0 ? cartLength : null, 
          tabBarBadgeStyle: styles.badgeStyle, 
        }}     
      />
      <Tab.Screen 
        name="Orders" 
        component={OrderNavigator} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="receipt" 
              size={30} 
              color={focused ? colors.black : colors.darkGray} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="person" 
              size={30} 
              color={focused ? colors.black : colors.darkGray} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Ubication" 
        component={UbicacionNavigator} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              name="location-on" 
              size={30} 
              color={focused ? colors.black : colors.darkGray} 
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabNav: {
    height: 60,
    backgroundColor: colors.backOrange,
  },
  badgeStyle: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 12,
    height: 18,
    minWidth: 18,
    borderRadius: 9,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

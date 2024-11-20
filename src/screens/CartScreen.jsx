import { FlatList, StyleSheet, Text, View, Image, Pressable} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import React from 'react'
import SingleCard from '../components/SingleCard'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { usePostOrderMutation} from '../services/orderService'
import {clearCart} from '../features/cart/cartSlice'
import { removeItem } from '../features/cart/cartSlice'

const CartScreen = ({navigation}) => {


    const cart = useSelector(state => state.cartReducer.value.cartItems)
    const total = useSelector(state => state.cartReducer.value.total)
    const dispatch = useDispatch()
    const [triggerPost, result] = usePostOrderMutation()
    const FooterComponent = () => (
        <View style={styles.footerContainer}>
            <Text style={styles.total}>Total: $ {total} </Text>
            <Pressable style={styles.confirmButton} onPress={()=>{
                triggerPost({cart,total,createdAt: Date.now()})
                dispatch(clearCart())
                navigation.navigate("Orders")
            }} >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
            </Pressable>
        </View>
    )

    const renderCartItem = ({item}) => (
        <SingleCard style={styles.cartContainer}>
            <View>
                <Image
                    source={{ uri: item.image }}
                    style={styles.cartImage}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.cartDescription}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.shortDescription}</Text>
                <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
                <Text stlyle={styles.quantity}>Cantidad: {item.quantity}</Text>
                <Text style={styles.total}>Total: $ {item.quantity * item.price}</Text>
                <Pressable
                    onPress={() => dispatch(removeItem(item.id))} // Dispatch de la acción con el id del producto
                >
                <Icon name="delete" size={24} color="#FC7A5E" style={styles.trashIcon} />
                </Pressable>
            </View>
        </SingleCard>
    )
  return cart.length === 0 ? ( 
    <View style={styles.emptyCartContainer}>
    <Text style={styles.emptyCartText}>No hay productos en el carrito</Text>
    </View>
  ):(
    <FlatList style={styles.FlatStyle}
    data={cart}
    keyExtractor={item=> item.id}
    renderItem={renderCartItem}
    ListHeaderComponent={<Text style={styles.cartTitle}>Productos seleccionados: </Text>}
    ListFooterComponent={<FooterComponent/>}
    />
  )
}

export default CartScreen

const styles = StyleSheet.create({

    cartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 10,
        borderRadius: 10,
        gap: 10,
    },
    cartImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 12,
    },
    cartDescription: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: 'RobotoBold',
        textAlign: 'center',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    price: {
        fontSize: 14,
        fontFamily: 'Roboto',
        marginBottom: 4,
    },
    quantity: {
        fontSize: 14,
        fontFamily: 'Roboto',
        marginBottom: 4,
    },
    total: {
        fontSize: 16,
        fontFamily: 'RobotoBold',
        marginTop: 4,
    },
    trashIcon: {
        position: 'absolute',
        right: 5,
        bottom: 5,
    },
    cartTitle:{
        fontSize: 18,
        fontFamily: 'Roboto',
        textAlign: 'left',
        padding: 8,
        margin: 10,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.lightGray,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    total: {
        fontSize: 18,
        fontFamily: 'RobotoBold',
    },
    confirmButton: {
        backgroundColor: colors.brightOrange,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    confirmButtonText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: '#FFF',
        textAlign: 'center',
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#333',
        fontFamily: 'RobotoBold',
    },
})
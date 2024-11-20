import { StyleSheet, Text, View, Pressable, Image, useWindowDimensions, ScrollView, ActivityIndicator  } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colors } from '../../global/colors'
import { useDispatch } from 'react-redux'
import { addItem } from '../../features/cart/cartSlice'
import { useSelector } from 'react-redux'
import { useGetProductQuery } from '../../services/shopService'
const ProductScreen = ({route }) => {

    const {width,heigth} = useWindowDimensions()

    const productId = useSelector(state=>state.shopReducer.value.productId)
   
    
    const { data: productFound, error, isLoading } = useGetProductQuery(productId)

    const dispatch = useDispatch()
  return (
    <>
      {
        isLoading
         ?
        <ActivityIndicator size="large" color={colors.verdeNeon} />
         :
         error
         ?
        <Text>Error al cargar el producto</Text>
        :
        <ScrollView style={styles.scrollView} >
        <View style={styles.container}>
          <Text style={styles.title}>{productFound.title}</Text>
          <View style={styles.rowContainer}>
          <Image source={{uri: productFound.image}} 
              style={styles.image} 
              alt= {productFound.title}
              width={width}
              height={width*.75}
              resizeMode='contain'/>
          <View style={styles.infoContainer}>
          <Text style={styles.stock}>Stock Disponible: {productFound.stock}</Text>
          <Text style={styles.precio}>Precio: ${productFound.price}</Text> 
           <Pressable 
        style={({pressed}) =>[{opacity: pressed ? 0.90 : 1},styles.addToCart]} 
        onPress={()=> dispatch(addItem({...productFound, quantity:1}))}>  
          <Text style={styles.cartText}>Añadir</Text>
          <Icon  name="add-circle" size={24} color={colors.darkGray} />
        </Pressable> 

          </View>

          </View>

          <Text style={styles.description}>{productFound.description}</Text>          

       
        </View>
        </ScrollView>

      }
    </>

  )
}

export default ProductScreen

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },

  container: {
    paddingVertical: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    margin: 17,
    alignItems: 'center',
    shadowColor: colors.darkGray,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    
  },
  title: {
    fontSize: 22,
    fontFamily: 'RobotoBold',
    marginBottom: 10,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  infoContainer: {
    padding: 20,

  },
  image: {
    width:150,
    height:150,
    borderRadius: 8,
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  stock: {
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 8,
  },
  precio: {
    fontSize: 20,
    fontFamily: 'RobotoBold',
    marginBottom: 15,
  },
  addToCart: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backOrange,
    padding: 12,
    marginTop: 1,
    borderRadius: 10,
    borderColor: colors.brightOrange,
    borderWidth: 1,
    width: 100,
    justifyContent: 'space-between',
    shadowColor: colors.darkGray,
    shadowRadius: 8,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  cartText: {
    fontSize: 16,
    fontFamily: 'RobotoBold',
  },
});
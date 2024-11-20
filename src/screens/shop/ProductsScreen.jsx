import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator} from 'react-native'
import SingleCard from '../../components/SingleCard'
import { colors } from '../../global/colors'
import { useEffect, useState } from 'react'
import Search from '../../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import { useGetProductsByCategoryQuery, useGetProductsQuery } from '../../services/shopService'
import { setProductId } from '../../features/shop/shopSlice'

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [search, setSearch] = useState("")
    
    const category = useSelector(state => state.shopReducer.value.categorySelected)
    const { data: productsFilteredByCategory, error, isLoading } =
    category === "Todos los Productos"
        ? useGetProductsQuery()
        : useGetProductsByCategoryQuery(category);
 

     dispatch = useDispatch()

    useEffect(() => {
        setProductsFiltered(productsFilteredByCategory)
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())))
        }
    }, [search,productsFilteredByCategory])

    const renderProductItem = ({ item }) => {
        return (
                 <Pressable onPress={()=> {
                    dispatch(setProductId(item.id))
                    navigation.navigate('Producto')
                    }}>  
            
                <SingleCard style={styles.productContainer}>              
                <View>
                    <Image source={{uri:item.image}} style={styles.productImage} resizeMode="contain"></Image>
                </View>
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                    {
                        item.stock <= 0 ? (<Text style={styles.outOfStock}>Sin Stock</Text>) : ""
                    }
                    <Text style={styles.precio}>Precio: ${item.price}</Text>
                </View>
                
                </SingleCard>
                </Pressable>
        )
    }
  return (
    <>
      {
                isLoading
                ?
                <ActivityIndicator size="large"  />
                :
                error
                ?
                <Text>Error al cargar los productos</Text>
                :
                <> 
                <Search setSearch={setSearch}/>  
                <FlatList 
                    data = {productsFiltered}
                    keyExtractor={item => item.id}
                    renderItem={renderProductItem}
                />
                </>
    }
    </> 
  )
}

export default ProductsScreen

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: "row",
        padding: 20, 
        justifyContent: "flex-start",
        gap: 20,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    productImage: {
        width: 100,
        height: 100,

    },
    productInfo: {
        width: "65%",

    },
    productTitle: {
        fontSize: 20,
        fontFamily: 'RobotoBold',
    },
    inStock: {
        backgroundColor: colors.brightOrange,
        padding: 7,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    outOfStock: {
        color: 'red'
    },
    precio: { 
        fontSize: 15,
        fontFamily: 'RobotoBold'
    },
    volver: {
        padding: 5,
        
        },
    
})
import { StyleSheet, Text, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator } from "react-native";
import SingleCard from "../../components/SingleCard";
import { useEffect, useState } from "react";
import {  useDispatch } from "react-redux";
import { setCategory } from "../../features/shop/shopSlice";
import {useGetCategoriesQuery}  from "../../services/shopService";


const CategoriesScreen = ({ navigation }) => {

    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const dispatch = useDispatch()

    useEffect(() => {
        if (width > height) {
            setIsPortrait(false)
        } else {
            setIsPortrait(true)
        }
    },
        [width, height])


    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable onPress={() => {
                dispatch(setCategory(item.tittle))
                navigation.navigate('Productos')
            }}>
                <SingleCard style={
                        { ...styles.singleCardContainer, ...styles.row }
                }>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <Text style={styles.tittle}>{item.tittle}</Text>
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
                <Text>Error al cargar las categorías</Text>
                :
                <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
            />
            }
        </>
    )
}

export  default CategoriesScreen;

const  styles = StyleSheet.create({
    singleCardContainer: {
        justifyContent:  'space-around',
        alignItems: 'center',
        margin: 10,
        padding:  20,
        borderRadius: 20
        
    },
    image:{
        width: 150,
        height: 120,
        margin: 10,
        borderRadius: 40
    },
    tittle: {
        fontSize: 17,
        fontWeight: "bold",
        margin: 10,
        paddingLeft: 15
    },
    row: {
        flexDirection: "row"
    },

})



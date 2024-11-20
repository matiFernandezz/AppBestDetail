import { View, StyleSheet } from 'react-native'
import { colors } from '../global/colors'

const SingleCard = ({children, style}) => {
  return (
    <View style={{...styles.cardContainer, ...style}}>
      {children}
    </View>
  )
}

export default SingleCard

const  styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 1,
        shadowRadius: 1,
        shadowOffset: {width: 3,  height: 5},
        shadowOpacity: 0.2,
        elevation: 8,
    }
})

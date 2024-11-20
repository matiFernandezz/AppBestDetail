import { View, Text, StyleSheet } from 'react-native'


const RobotoBoldText = ({children, style}) => {
  return (

      <Text style={{...styles.textRobotoBold, ...style}}> {children}</Text>
    
  )
}

export default RobotoBoldText

const styles = StyleSheet.create({
    textRobotoBold: {
        fontFamily: 'Roboto-Bold',
    }
})
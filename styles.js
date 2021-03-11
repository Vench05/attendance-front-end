import { StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: getStatusBarHeight(),
        
    },
    form_container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        paddingTop: getStatusBarHeight(),
        
    },
    login_button: {
        marginTop: 50
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 50,
        bottom: 100,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    ViewTitle: {
        alignContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'red',
        fontSize: 35
    },
    flipButton: {
        fontWeight: 'bold',
        fontSize: 50,
        flex: 1,
        marginLeft: 20
    },
    bellowButton: {
        flex: 1,
        position: "absolute",
        bottom: 100,
        alignSelf: "flex-start",
        backgroundColor: 'black',
        width: Dimensions.get('window').width
    },
    capture: {
        color: 'white',
        display: 'flex'
    }
})
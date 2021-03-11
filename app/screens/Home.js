import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Fab, Item, Input, Label, Left, Body, Right, Title, Button, Icon, Text, List, ListItem } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import CameraOn from './CameraOn'


export default function Home({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [active, setActive] = useState(false)
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
    })

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        console.log('Change');
    }, []);

    if (isReady) {
        return (
            <Container>
                <Header>
                    <Left style={{ flex: 1 }} > 
                        <Button transparent onPress={() => navigation.navigate('Login')}>
                            <Icon name='arrow-back' />
                            <Text>Logout</Text>
                        </Button>
                    </Left>
                    {/* <Body style={{ justifyContent: 'center' }}><Title>{navigation.state.routeName}</Title></Body> */}
                    <Right style={{ flex: 1 }}>
                        <Button onPress={() => navigation.navigate("Setting")} transparent><AntDesign name="setting" size={24} color="#f3f3f3" /></Button>
                    </Right>
                </Header>

                {true ? <CameraOn /> : <View /> }
                
                
                <Fab
                    active={active}
                    direction="up"
                    // containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => setActive(!active)}>
                    <Icon name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={() => console.log('camera')} >
                        <Icon name="ios-camera" />
                    </Button>
                </Fab>
                
            </Container>
        )
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

}

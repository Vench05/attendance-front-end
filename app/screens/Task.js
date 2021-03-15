import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Fab, Item, Input, Label, Left, Body, Right, Title, Button, Icon, Text, Card, CardItem } from 'native-base'

import * as Font from 'expo-font';
import { Ionicons, AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View, TouchableOpacity, Image } from 'react-native'


export default function Task({ navigation }) {
    const [isReady, setIsReady] = useState(false)
    const [data, setData] = useState()

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
        setData(navigation.getParam('data'))
    })

    if (isReady) {
        return (
            <Container>
                <Header>
                    <Left style={{ flex: 1 }} >
                        <Button transparent onPress={() => navigation.navigate('Home')}>
                            <Icon name='arrow-back' />
                            {/* <Text>Logout</Text> */}
                        </Button>
                    </Left>
                    <Body style={{ justifyContent: 'center' }}>
                        <Title>{data.project}</Title>
                    </Body>
                    <Body style={{ justifyContent: 'center' }}>
                        <Title>{data.log}</Title>
                    </Body>
                    {/* <Right style={{ flex: 1 }}>
                        <Button onPress={() => navigation.navigate("Setting")} transparent><AntDesign name="setting" size={24} color="#f3f3f3" /></Button>
                    </Right> */}
                </Header>

                <Content padder>
                    <Card>
                        <CardItem header bordered>
                            <Text> { `Task: ${data.task}`} </Text>
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Text>
                                    {`${data.project} \n ${data.description}`}                                    
                                </Text>
                            </Body>
                        </CardItem>
                        <CardItem footer bordered>
                            <Text>Log: {data.log}</Text>
                        </CardItem>
                    </Card>
                </Content>

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

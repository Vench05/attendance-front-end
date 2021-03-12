import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title, Button, Icon, Text } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View } from 'react-native'


export default function Setting({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [url, setUrl] = useState('192.168.10.100')
    const [port, setPort] = useState('1369')

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
    })

    function save() {
        console.log('save');
    }

    function back() {
        console.log('back');
    }

    if (isReady) {
        return (
            <Container>
                <Header >
                    <Left style={{ flex: 1 }}>
                        <Button transparent onPress={() => navigation.navigate('Home')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body ><Title>{navigation.state.routeName}</Title></Body>
                    <Right  />
                </Header>
                <Content>
                    <Form style={styles.form_container}>
                        <Item floatingLabel>
                            <Label>URL</Label>
                            <Input
                                value={url}
                                onChangeText={txt => setUrl(txt)}
                                style={{paddingLeft: 10}}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Port</Label>
                            <Input 
                                value={port}
                                onChangeText={txt => setPort(txt)}
                                style={{ padding: 10 }}
                            />
                        </Item>
                        <Button block style={styles.login_button} onPress={save}>
                            <Text>Save</Text>
                        </Button>
                    </Form>
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

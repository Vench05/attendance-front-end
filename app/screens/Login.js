import React, { useEffect, useState } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title, Button, Icon, Text } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View } from 'react-native'


export default function Login({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
    })

    function login() {
        navigation.navigate("Home")
    }

    if (isReady) {
        return (
            <Container>
                <Header>
                    <Left style={{ flex: 1 }} />
                    <Body><Title>{navigation.state.routeName}</Title></Body>
                    <Right>
                        <Button onPress={() => navigation.navigate("Setting")} transparent><AntDesign name="setting" size={24} color="#f3f3f3" /></Button>
                    </Right>
                </Header>
                <Content>
                    <Form style={styles.form_container}>
                        <Item floatingLabel>
                            <Label>Email</Label>
                            <Input 
                                value={email}
                                onChangeText={txt => setEmail(txt)}
                                style={{ padding: 10 }}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input secureTextEntry
                                value={password}
                                onChangeText={txt => setPassword(txt)}
                                style={{ padding: 10 }}
                            />
                        </Item>
                        <Button block style={styles.login_button} onPress={login}>
                            <Text>Login</Text>
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

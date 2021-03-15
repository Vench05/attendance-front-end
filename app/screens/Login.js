import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Body, Right, Title, Button, Root, Text, Toast } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View } from 'react-native'
import axios from 'axios'
import env from '../../my_env'
import { UserContext } from '../contexts/UserContext'



export default function Login({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
    }, [])

    async function login() {
        if (email.length < 1 || password.length < 1) {
            Toast.show({
                text: 'Email or password Cannot be empty',
                buttonText: "Dismiss",
                duration: 3000,
                position: "bottom"
            })
            return
        }

        let bodyFormData = new FormData()
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        console.log(`${env.api_url}/api/login?email${email},password=${password}`)
        await axios({
            method: 'post',
            url: `${env.api_url}/api/login`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            switch (res.data.status) {
                case 'denied':
                    Toast.show({
                        text: 'Wrong email or password',
                        buttonText: "Dismiss",
                        duration: 3000,
                        position: "bottom"
                    })
                    setPassword('')
                    break;
                case 'error':
                    Toast.show({
                        text: 'Server Error',
                        buttonText: "Dismiss",
                        duration: 3000
                    })
                    setPassword('')
                    break;
                default:                    
                    console.log(res.data);
                    setPassword('')
                    setUser(res.data)
                    navigation.navigate("Home")
                    break;
            }
        }).catch(e => Toast.show({
            text: 'Server Error',
            buttonText: "Dismiss",
            duration: 3000,
            position: "bottom"
        }))
        // navigation.navigate("Home")
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
                        {/* <Text>{error}</Text> */}
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

import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Fab, Item, Input, Label, Left, Body, Right, Title, Button, Icon, Text, List, ListItem, Toast } from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera';
import CameraOn from './CameraOn'
import axios from 'axios'
import env from '../../my_env'
import { UserContext } from '../contexts/UserContext'


export default function Home({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [active, setActive] = useState(false)
    const [cameraActive, setCameraActive] = useState(false)
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraAction, setCameraAction] = useState('')
    const [timesheet, setTimesheet] = useState([])

    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))
        // setCameraActive(!cameraActive)
    })

    useEffect(() => {      
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        setCameraActive(false)
        getTimesheet()
    }, []);

    // useEffect(() => {         
    //     getTimesheet()
    // }, [])

    async function getTimesheet() {
        await axios.get(`${env.api_url}/api/attendance/info/get?token=${user.token}`)
            .then(res => setTimesheet(res.data.timesheet))
    }

    function signIn() {
        setCameraActive(!cameraActive)
        setCameraAction('Time-In')
        setActive(!active)
    }

    function cameraOff() {
        setCameraActive(false)
        setCameraAction('')
        setActive(false)
        getTimesheet()
    }

    function signOut() {
        console.log(timesheet);
        const inProgress = timesheet.filter(data => !data.in_id)
        console.log(inProgress);
        if (inProgress.length > 0){
            setCameraActive(!cameraActive)
            setCameraAction('Time-Out')
            setActive(!active)
        } else {
            Toast.show({
                text: 'You don\'t have inprogress Task',
                buttonText: 'Dismiss',
                duration: 3000,
                position: 'bottom'
            })
            setActive(!active)
        }
    }

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
                

                {cameraActive ? <CameraOn timesheet={timesheet} cameraOff={cameraOff} title={cameraAction} navigation={navigation} /> : 
                    <Content>
                        <List >
                            {timesheet.map(data => (
                                <ListItem onPress={() => navigation.navigate("Task", {"data": data})} noIndent style={{ backgroundColor: data.log === 'In' ? "#cde1f9" : "#ffcc00" }} key={data.id}>
                                    <Left>
                                        <Text>{data.date}</Text>
                                    </Left>
                                    <Text>{data.project}</Text>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            ))}

                        </List>
                    </Content>
                }
                
                
                <Fab
                    active={active}
                    direction="up"
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => setActive(!active)}
                    >
                    <Icon name="add" />
                    <Button style={{ backgroundColor: '#34A34F' }} onPress={signIn} >
                        <Octicons name="sign-in" size={24} color="black" />
                    </Button>
                    <Button style={{ backgroundColor: 'red' }} onPress={signOut} >
                        <Octicons name="sign-out" size={24} color="black" />
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

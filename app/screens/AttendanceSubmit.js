import React, { useEffect, useState, useContext } from 'react';
import { Container, Header, Content, Toast, Item, Input, Textarea, Left, Body, Right, Title, Button, Icon, Text, ListItem} from 'native-base'
import * as Font from 'expo-font';
import { Ionicons, AntDesign, Entypo, Feather, Octicons } from '@expo/vector-icons';
import styles from '../../styles'
import { ActivityIndicator, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

import axios from 'axios'
import env from '../../my_env'
import { UserContext } from '../contexts/UserContext'

export default function AttendanceSubmit({navigation}) {
    const [isReady, setIsReady] = useState(false)
    const [project, setProject] = useState('')
    const [task, setTask] = useState('')
    const [description, setDescription] = useState('')
    const [timesheet, setTimesheet] = useState([])
    const [timeIn, setTimeIn] = useState('')
    const [timeInId, setTimeInId] = useState(0)

    const { user } = useContext(UserContext)

    useEffect(() => {
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }).then(() => setIsReady(true))        
        const inprogress = navigation.getParam('timesheet').filter(data => !data.in_id)
        setTimesheet(inprogress)
    }, [])

    async function submit() {
        let bodyFormData = new FormData()
        bodyFormData.append('project', project);
        bodyFormData.append('task', task);
        bodyFormData.append('description', description);
        bodyFormData.append('token', user.token);
        bodyFormData.append('type', navigation.getParam('title'));
        if (timeInId) { bodyFormData.append('timeInId', timeInId) }
        
        await axios({
            method: 'post',
            url: `${env.api_url}/api/attendance/info`,
            data: bodyFormData,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (res.data.status == 'success') {
                Toast.show({
                    text: 'Success',
                    buttonText: "Dismiss",
                    duration: 3000,
                    position: "bottom"
                })
                navigation.getParam('cameraOff')()
                navigation.navigate("Home")
            }
            else{
                Toast.show({
                    text: 'Server Error',
                    buttonText: "Dismiss",
                    duration: 3000,
                    position: "bottom"
                })
            }
        }).catch(e => Toast.show({
            text: `Server Error, ${e}`,
            buttonText: "Dismiss",
            duration: 3000,
            position: "bottom"
        }))
    }

    if (isReady) {
        return (
            <Container>
                <Header>
                    <Left style={{ flex: 1 }} >
                        <Button transparent 
                            onPress={() => navigation.navigate('Home')}
                            >
                            <Icon name='home' />
                            {/* <Text>Home</Text> */}
                        </Button>
                    </Left>
                    <Body style={{ justifyContent: 'center' }}><Title>Attendance</Title></Body>
                    <Right />
                </Header>
                <Content>
                    <Item disabled success style={{ marginTop: 15 }}>
                        <Input disabled value={navigation.getParam('title')} style={{ textAlign: 'center' }} />
                        <Icon name='information-circle' />
                    </Item>

                    {navigation.getParam('title') === 'Time-Out' ?
                        (
                            <Picker
                                selectedValue={timeIn}
                                onValueChange={(itemValue, itemIndex) => {
                                    const selected = timesheet.filter(data => data.id === itemValue)
                                    console.log(selected);
                                    setTimeIn(itemValue)
                                    setProject(selected[0].project)
                                    setTask(selected[0].task)
                                    setDescription(selected[0].description)
                                    setTimeInId(itemValue)
                                }}>
                                {timesheet.map(data =>
                                    <Picker.Item key={data.id} label={data.project} value={data.id} />
                                )}
                            </Picker>
                                
                        )

                    : <View />} 
                    
                    <Item regular style={{marginTop: 15}}>
                        <Input placeholder='Project' 
                            value={project}
                            onChangeText={txt => setProject(txt)}
                        />
                    </Item>
                    <Item regular style={{ marginTop: 15 }}>
                        <Input placeholder='Task'
                            value={task}
                            onChangeText={txt => setTask(txt)}
                        />
                    </Item>
                    <Textarea rowSpan={5} bordered placeholder="Description" style={{ marginTop: 15 }} 
                        value={description}
                        onChangeText={txt => setDescription(txt)}
                    />                    
                </Content>
                <Button block success onPress={submit}>
                    <Text>Submit</Text>
                </Button>
                <Button block danger onPress={() => navigation.navigate("Home")}>
                    <Text>Cancel</Text>
                </Button>
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

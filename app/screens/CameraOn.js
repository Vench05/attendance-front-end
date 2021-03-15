import React, { useState, useEffect, useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../../styles'
import { Feather } from '@expo/vector-icons';
import { Button, Icon, Text, Toast } from 'native-base'
import * as FaceDetector from 'expo-face-detector'
import * as ImageManipulator from 'expo-image-manipulator';
import axios from 'axios'
import env from '../../my_env'
import { UserContext } from '../contexts/UserContext'

export default function CameraOn({ title, navigation, cameraOff, timesheet}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faces, setFaces] = useState([])
    const [cameraSnap, setCameraSnap] = useState({})
    const [imageData, setImageData] = useState({})
    const { user } = useContext(UserContext)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    function handleFacesDetected({ faces }) {
        if (faces.length > 0){
            setFaces(faces)
        }
        else{
            setFaces({})
        }
    }

    async function snap() {
        console.log('snap');
        await cameraSnap.takePictureAsync()
            .then(data => {
                setImageData(data)
                cropImage(data)
            })
    }

    async function cropImage(data) {
        await ImageManipulator.manipulateAsync(
            data.uri,
            [{
                resize: {
                    height: data.height / 4,
                    width: data.width / 4
                },
            }],
            { base64: true }        
        ).then(res => attendance(res.base64))
        
    }
    
    async function attendance(imgBase64) {
        if (imgBase64) {
            console.log('attendance');
            let bodyFormData = new FormData()
            // if (title === 'Time-In') {                
                bodyFormData.append('token', user.token);
                bodyFormData.append('image', imgBase64);
                bodyFormData.append('type', title);
                await axios({
                    method: 'post',
                    url: `${env.api_url}/api/attendance`,
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }).then(res => {
                    if (res.data.status == 'success'){
                        Toast.show({
                            text: 'Success',
                            buttonText: "Dismiss",
                            duration: 3000,
                            position: "bottom"
                        })
                        navigation.navigate("AttendanceSubmit", { "title": title, "cameraOff": cameraOff, "timesheet": timesheet})
                    }
                    else if (res.data.status == 'not-clear'){
                        Toast.show({
                            text: 'Did not Match\nPlease Try Again',
                            buttonText: "Dismiss",
                            duration: 3000,
                            position: "bottom"
                        })
                    }
                    else {
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
            // }            
        }
        
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{flex: 1}}>
            <Camera style={{ flex: 1 }} type={type}
                ref={ref => setCameraSnap(ref)}
                onFacesDetected={handleFacesDetected}
                faceDetectorSettings={{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.all,
                    runClassifications: FaceDetector.Constants.Classifications.none,
                    minDetectionInterval: 200,
                    tracking: false,
                }}
            >
                <View style={{flex: 1}}>
                    <View style={styles.ViewTitle}><Text style={styles.title}> {title} </Text></View>
                    <View style={{ flexDirection: "row", flex: 1, position: "absolute", bottom: 50, left: 0, right: 50, justifyContent: 'space-between', padding: 15 }}>
                        <TouchableOpacity  
                            style={styles.flipButton}
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}
                        >
                            <Feather name="rotate-ccw" size={24} color="white" style={styles.flipButton} />
                            {/* <Text>Rotate</Text> */}
                        </TouchableOpacity>
                        <Button iconRight disabled={ faces.length > 0 ? false: true} 
                            onPress={snap}
                        >
                            <Text>Capture</Text>
                            <Icon name="camera" />
                        </Button>
                    </View>
                </View>
            </Camera>
        </View>
    );
}

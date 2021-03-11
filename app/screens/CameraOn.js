import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import styles from '../../styles'
import { Feather } from '@expo/vector-icons';
import { Button, Icon, Text } from 'native-base'
import * as FaceDetector from 'expo-face-detector'
import * as ImageManipulator from 'expo-image-manipulator';

export default function CameraOn({title}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.front);
    const [faces, setFaces] = useState([])
    const [cameraSnap, setCameraSnap] = useState({})
    const [imageData, setImageData] = useState({})

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
        await cameraSnap.takePictureAsync()
            .then(data => {
                console.log(data)
                setImageData(data)
                cropImage()
            })
    }

    async function cropImage() {
        await ImageManipulator.manipulateAsync(
            imageData.uri,
            [{
                resize: {
                    height: imageData.height / 4,
                    width: imageData.width / 4
                },
            }],
            { base64: true }        
        ).then(res => console.log(res))
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

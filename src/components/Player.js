import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, SafeAreaView, ActivityIndicator, View, Text, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button, IconButton } from 'react-native-paper';

import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';
Sound.setCategory('Playback'); // Enable playback in silence mode

import Styles from '../styles/Styles';

export default Player = () => {
    const [data, setData] = useState();
    const [soundId, setSoundId] = useState(0);
    const [soundDuration, setSoundDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [isPlaying, setIsPlaying] = useState(false);
    const [soundProgress, setSoundProgress] = useState(0);
    const [soundTime, setSoundTime] = useState(0);


    const downloadDir = RNFetchBlob.fs.dirs.DownloadDir;

    useEffect(() => {
        const getData = async () => {
            const files = await RNFetchBlob.fs.ls(downloadDir);
            const list = files.filter((elem) => elem.endsWith("mp3"));
            setData(list);
            setIsLoading(false);
        }
        getData();
    }, [])

    useEffect(() => {
        if (!isLoading) {
            music = new Sound(downloadDir + '/' + data[soundId], Sound.MAIN_BUNDLE, () => {
                setSoundDuration(music.getDuration());
            });
            const interval = setInterval(() => {
                music.getCurrentTime((seconds) => {
                    setSoundProgress(seconds / music.getDuration());
                    setSoundTime(seconds);
                });
            }, 500)
            return () => {
                clearInterval(interval);
                setIsPlaying(false);
                music.release(); // Unmount the audio player resource
            }
        }
    }, [isLoading])

    const getTime = (time) => {
        let minutes = Math.floor(time / 60);
        minutes = minutes > 9 ? minutes : "0" + minutes;
        let seconds = Math.floor(time % 60);
        seconds = seconds > 9 ? seconds : "0" + seconds;
        return minutes + ':' + seconds;
    }

    const playSound = () => {
        music.play(() => {
            setIsPlaying(false);
        });
        setIsPlaying(true);
    }

    const pauseSound = () => { music.pause(); setIsPlaying(false); }

    const nextSound = () => {
        music.release(); // Release the audio player resource
        let newSoundId = (soundId == data.length - 1) ? 0 : soundId + 1;
        music = new Sound(downloadDir + '/' + data[newSoundId], Sound.MAIN_BUNDLE, () => {
            setSoundProgress(0);
            setSoundDuration(music.getDuration());
            setSoundId(newSoundId);
            playSound();
        });
    }

    const previousSound = () => {
        music.release(); // Release the audio player resource
        let newSoundId = ((soundId == 0) ? data.length - 1 : soundId - 1);
        music = new Sound(downloadDir + '/' + data[newSoundId], Sound.MAIN_BUNDLE, () => {
            setSoundProgress(0);
            setSoundDuration(music.getDuration());
            setSoundId(newSoundId);
            playSound();
        });
    }

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <View style={styles.bodyContainer}>
                    <View style={styles.infoSection}>
                        <Text numberOfLines={1} style={styles.title}>{data[soundId].substring(0, data[soundId].length - 4)}</Text>
                        <Text style={styles.singer}>Hello World!</Text>
                    </View>
                    <View style={styles.coverSection}>
                        <Image style={styles.trackCover} source={{ uri: 'https://aloonak.com/wp-content/uploads/2014/11/Mohsen-Yeganeh-Hobab.jpg' }} />
                    </View>
                    <View style={styles.controllerSection}>
                        <Slider
                            style={styles.slider}
                            value={soundProgress}
                            thumbTintColor="#333"
                            minimumTrackTintColor="#333"
                            maximumTrackTintColor="#333"
                            onValueChange={(newValue) => music.setCurrentTime(newValue * music.getDuration())}
                        />
                        <View style={styles.times}>
                            <Text style={styles.time}>{getTime(soundTime)}</Text>
                            <Text style={styles.time}>{getTime(soundDuration)}</Text>
                        </View>
                        <View style={styles.buttons}>
                            <IconButton style={styles.button} icon="skip-previous" color="#333" size={35} onPress={previousSound} />
                            {isPlaying ?
                                <IconButton style={styles.boldButton} icon="pause" color="#fff" size={40} onPress={pauseSound} />
                                :
                                <IconButton style={styles.boldButton} icon="play" color="#fff" size={40} onPress={playSound} />
                            }
                            <IconButton style={styles.button} icon="skip-next" color="#333" size={35} onPress={nextSound} />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
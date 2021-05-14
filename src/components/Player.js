import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, SafeAreaView, ActivityIndicator, View, Text, Image } from 'react-native';
import Slider from '@react-native-community/slider';
import { Button, IconButton } from 'react-native-paper';

import RNFetchBlob from 'rn-fetch-blob';
import Sound from 'react-native-sound';
Sound.setCategory('Playback'); // Enable playback in silence mode

import Styles from '../styles/Styles';

export default Player = () => {
    const [trackId, setTrackId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

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
            music = new Sound(downloadDir + '/' + data[trackId]);
            const interval = setInterval(() => {
                music.getCurrentTime((seconds) => setProgress(seconds / music.getDuration()));
            }, 1000)
            return () => {
                clearInterval(interval);
                setIsPlaying(false);
                music.release(); // Unmount the audio player resource
            }
        }
    }, [isLoading])

    const playSound = () => {
        music.play(() => {
            setIsPlaying(false);
        });
        setIsPlaying(true);
    }

    const pauseSound = () => { music.pause(); setIsPlaying(false); }

    const nextSound = () => {
        music.release(); // Release the audio player resource
        let newTrackId = ((trackId == data.length - 1) ? 0 : trackId + 1);
        music = new Sound(downloadDir + '/' + data[newTrackId]);
        setTrackId(newTrackId);
        setTimeout(() => playSound(), 250);
    }

    const previousSound = () => {
        music.release(); // Release the audio player resource
        let newTrackId = ((trackId == 0) ? data.length - 1 : trackId - 1);
        music = new Sound(downloadDir + '/' + data[newTrackId]);
        setTrackId(newTrackId);
        setTimeout(() => {
            playSound();
        }, 250);
    }

    return (
        <SafeAreaView>
            {isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                <View style={styles.bodyContainer}>
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={1} style={styles.trackTitle}>{data[trackId].substring(0, data[trackId].length - 4)}</Text>
                        <Text style={styles.trackSinger}>hghgh h hhh k j</Text>
                    </View>
                    <View style={styles.coverContainer}>
                        <Image style={styles.trackCover} source={{ uri: 'https://aloonak.com/wp-content/uploads/2014/11/Mohsen-Yeganeh-Hobab.jpg' }} />
                    </View>
                    <View style={styles.playerContainer}>
                        <Slider
                            style={{ width: '100%' }}
                            value={progress}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#453574"
                            maximumTrackTintColor="#45357488"
                            onValueChange={(newValue) => music.setCurrentTime(newValue * music.getDuration())}
                        />
                        <View style={styles.playerButtons}>
                            <IconButton icon="skip-previous" color="#333" size={35} onPress={previousSound} />
                            {isPlaying ?
                                <IconButton icon="pause" color="#333" size={50} onPress={pauseSound} />
                                :
                                <IconButton icon="play" color="#333" size={50} onPress={playSound} />
                            }
                            <IconButton icon="skip-next" color="#333" size={35} onPress={nextSound} />
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
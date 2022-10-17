import React, { Component } from 'react';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS, interruptionModeIOS } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 2000);

const ukuleleImage = require('./images/ukulele.png')
const ukuleleAudio = require('./music/ukulele.mp3')
const drumsImage = require('./images/drums.png')
const drumsAudio = require('./music/drums.mp3')

export default class App extends Component {
  state = {
    isPlayingUkulele: false,
    isPlayingDrums:  false,
    playbackInstance: new Audio.Sound(),
    volume: 1.0,
  }

  handleUkulelePlayPause = async () => {
    let { isPlayingUkulele, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
    }
    const source = ukuleleAudio;
    const status = {
      shouldPlay:  this.state.isPlayingUkulele,
      volume:  this.state.volume,
    };

    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);
    await playbackInstance.playAsync();

    isPlayingUkulele ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

    this.setState({
      playbackInstance,
      isPlayingUkulele:  !isPlayingUkulele,
    })
  }

  handleDrumsPlayPause = async () => {
    let { isPlayingDrums, playbackInstance } = this.state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
    }
    const source = drumsAudio;
    const status = {
      shouldPlay:  this.state.isPlayingDrums,
      volume:  this.state.volume,
    };

    playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await playbackInstance.loadAsync(source, status, false);
    await playbackInstance.playAsync();

    isPlayingDrums ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();

    this.setState({
      playbackInstance,
      isPlayingDrums:  !isPlayingDrums,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Aloha Music
        </Text>
        <Image
          style={styles.images}
          source= {ukuleleImage}
        />
        <TouchableOpacity
          style={styles.control}
          onPress={this.handleUkulelePlayPause}
          >
          {this.state.isPlayingUkulele ?
            <Feather name="pause" size={32} color="#563822"/> :
            <Feather name="play" size={32} color="##563822"/>
          }
        </TouchableOpacity>
        <Image
          style={styles.images}
          source= {drumsImage}
        />
        <TouchableOpacity
          style={styles.control}
          onPress={this.handleDrumsPlayPause}
          >
          {this.state.isPlayingDrums ?
            <Feather name="pause" size={32} color="#563822"/> :
            <Feather name="play" size={32} color="##563822"/>
          }
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4e3cf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading:  {
    fontSize:  28,
    fontWeight:  '600',
    color:  '000000',
    backgroundColor:  '#da9547',
    width:  350,
    textAlign:  'center',
    marginBottom:  25
  },
  images:  {
    height:  210,
    width:  350,
    marginBottom:  10
  },
  control: {
    margin: 20,
    marginBottom:  25,
    color:  '#563822'
  },
});

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useAudioPlayer, useAudioPlayerStatus, AudioSource } from 'expo-audio';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import { Play, Pause } from 'lucide-react-native';

interface AudioPlayerProps {
  audio: string;
  isPractice: boolean;
  isAutoPlay?: boolean;
}

export default function AudioPlayer({ audio, isPractice, isAutoPlay = true }: AudioPlayerProps) {
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // 1. Create audio source object
  const audioSource: AudioSource = { uri: audio };

  // 2. Use the useAudioPlayer hook to create a player instance
  const player = useAudioPlayer(audioSource);

  // 3. Use useAudioPlayerStatus to get reactive status updates for the UI
  const status = useAudioPlayerStatus(player);

  // Speed options for practice mode
  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5];
  const currentSpeedIndex = speedOptions.indexOf(playbackSpeed);

  useEffect(() => {
    // Set player properties once it's created
    player.loop = false;
  }, [player]);

  useEffect(() => {
    // Effect for setting playback rate
    if (isPractice) {
      player.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed, isPractice, player]);

  useEffect(() => {
    // Effect for handling auto-play in non-practice mode
    if (status.isLoaded && isAutoPlay) {
      console.log('auto play');
      player.play();
    }
  }, [status.isLoaded, player, isAutoPlay]);

  const togglePlayPause = () => {
    if (status.playing) {
      player.pause();
    } else {
      // if end audio, reset audio
      if (status.currentTime >= status.duration) {
        player.seekTo(0);
      }
      player.play();
    }
  };

  const onSeek = (value: number) => {
    if (status.duration) {
      // The slider value is between 0 and 1
      const seekPositionInSeconds = value * status.duration;
      player.seekTo(seekPositionInSeconds);
    }
  };

  const changePlaybackSpeed = () => {
    if (!isPractice) return;

    const nextSpeedIndex = (currentSpeedIndex + 1) % speedOptions.length;
    const newSpeed = speedOptions[nextSpeedIndex];

    // setPlaybackRate is synchronous and doesn't return a promise
    player.setPlaybackRate(newSpeed);
    setPlaybackSpeed(newSpeed);
  };

  // 4. Get UI values from the reactive status object
  const currentPosition = status.currentTime ?? 0;
  const currentDuration = status.duration ?? 0;
  const isPlayerLoading = status.isBuffering || !status.isLoaded;

  return (
    <View className="mb-3 -mt-3 overflow-hidden rounded-2xl bg-white p-4 pb-1 shadow-sm">
      {/* Main Controls */}
      <View className="mb-4 flex-row items-center">
        <TouchableOpacity
          onPress={togglePlayPause}
          disabled={isPlayerLoading}
          className="mr-4 h-12 w-12 items-center justify-center rounded-full shadow-lg">
          <LinearGradient
            colors={['#3b82f6', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 100,
            }}
            className="h-full w-full items-center justify-center rounded-full">
            {isPlayerLoading ? (
              <View className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : status.playing ? (
              <Pause size={20} color="#ffffff" />
            ) : (
              <Play size={20} color="#ffffff" />
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View className="flex-1">
          {isPractice ? (
            <Slider
              style={{ width: '100%', height: 20 }}
              minimumValue={0}
              maximumValue={1}
              value={currentDuration > 0 ? currentPosition / currentDuration : 0}
              onSlidingComplete={onSeek} // Use onSlidingComplete to avoid seeking too often
              minimumTrackTintColor="#3b82f6"
              maximumTrackTintColor="#e5e7eb"
              thumbTintColor="#3b82f6"
            />
          ) : (
            <View className="h-2 overflow-hidden rounded-full bg-slate-200">
              <View
                className="h-full rounded-full bg-blue-500"
                style={{ width: `${currentDuration > 0 ? (currentPosition / currentDuration) * 100 : 0}%` }}
              />
            </View>
          )}
        </View>

        {isPractice && (
          <TouchableOpacity
            onPress={changePlaybackSpeed}
            className="ml-4 rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
            <Text className="text-sm font-semibold text-slate-700">{playbackSpeed}x</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
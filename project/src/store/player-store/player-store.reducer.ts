import {createSlice} from '@reduxjs/toolkit';

import {NameSpace} from '../../const';
import {getTimeLeftString} from './player.action';

type PlayerState = {
  readonly isPlaying: boolean;
  readonly isFullScreen: boolean;
  readonly currentToggler: number;
  readonly timeLeft: string
};

const initialState: PlayerState = {
  isPlaying: false,
  isFullScreen: false,
  currentToggler: 0,
  timeLeft: '00:00:00'
};

export const playerStoreReducer = createSlice({
  name: NameSpace.PlayerStore,
  initialState,
  reducers: {
    setNewStateIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTime: (state, action) => {
      state.currentToggler = action.payload.currentToggler;
      state.timeLeft = getTimeLeftString(action.payload.timeLeft);
    },
    setNewStateIsFullScreen: (state) => {
      state.isFullScreen = !state.isFullScreen;
    }
  }
});

export const {
  setNewStateIsPlaying,
  setCurrentTime,
  setNewStateIsFullScreen
} = playerStoreReducer.actions;

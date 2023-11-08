import { IMedia, ITeam } from "@lib/models";
import { PickItem } from "@lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ManageTeamState {
  defaultTeam?: {
    id: number;
    name: string;
    city: string;
    gender: string;
    coach: {
      id?: number;
      name: string;
      surname: string;
    };
    players: number[];
    logo?: IMedia;
    teamImage?: IMedia;
  };
  newValues: {
    name: string;
    city: string;
    gender: string;
    coach: {
      id?: number;
      name: string;
      surname: string;
    };
    players: number[];
    logo?: IMedia;
    teamImage?: IMedia;
  };
  availablePlayers: PickItem[];
  avaliableCoaches: {
    id: number;
    title: string;
  }[];
}

const initialState: ManageTeamState = {
  newValues: {
    name: "",
    city: "",
    gender: "",
    coach: {
      name: "",
      surname: "",
    },
    players: [],
  },
  availablePlayers: [],
  avaliableCoaches: [],
};

export const manageTeamSlice = createSlice({
  name: "manageTeam",
  initialState,
  reducers: {
    setDefaultTeam: (state, action: PayloadAction<ITeam>) => {
      state.defaultTeam = {
        id: action.payload.id,
        name: action.payload.name,
        city: action.payload.city,
        gender: action.payload.gender,
        coach: action.payload.coach,
        players: action.payload.players.map((player) => player.id),
        logo: action.payload.logo,
        teamImage: action.payload.teamImage,
      };
      state.newValues = {
        name: action.payload.name,
        city: action.payload.city,
        gender: action.payload.gender,
        coach: action.payload.coach,
        players: action.payload.players.map((player) => player.id),
        logo: action.payload.logo,
        teamImage: action.payload.teamImage,
      };
    },
    setAvailablePlayers: (state, action: PayloadAction<any[]>) => {
      state.availablePlayers = action.payload;
    },
    setAvailableCoaches: (state, action: PayloadAction<any[]>) => {
      state.avaliableCoaches = action.payload;
    },
    setInputValue: (
      state,
      action: PayloadAction<{ name: string; value: string }>
    ) => {
      if (state.newValues.hasOwnProperty(action.payload.name)) {
        (state.newValues as any)[action.payload.name] = action.payload.value;
      }
    },
    setCoach: (
      state,
      action: PayloadAction<{ name: string; surname: string }>
    ) => {
      state.newValues.coach = action.payload;
    },
    setPlayers: (state, action: PayloadAction<number[]>) => {
      state.newValues.players = action.payload;
    },
    setLogo: (state, action: PayloadAction<IMedia>) => {
      state.newValues.logo = action.payload;
    },
    setTeamImage: (state, action: PayloadAction<IMedia>) => {
      state.newValues.teamImage = action.payload;
    },
  },
});

export const {
  setDefaultTeam,
  setInputValue,
  setCoach,
  setPlayers,
  setLogo,
  setTeamImage,
  setAvailableCoaches,
  setAvailablePlayers,
} = manageTeamSlice.actions;

export const selectManageTeam = (state: any) =>
  state.manageTeam as ManageTeamState;

export const manageTeamReducer = manageTeamSlice.reducer;

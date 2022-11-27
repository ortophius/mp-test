import { action, makeAutoObservable, observable, reaction, runInAction } from "mobx";

import { createContext } from "react";
import sample from "./data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export interface TestLocation {
  locationID: Location["locationID"];
  envID: Env["envID"];
  hint: string;
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];

  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  };

  constructor() {
    makeAutoObservable(this);
    this.fetchData();
  }

  getServers(locationID: Location["locationID"], envID: Env["envID"]) {
    return this.servers.filter(server => server.locationID === locationID && server.envID === envID);
  }
}



export function createTestLocation(store: Store) {
  const newTestLocation = {
    locationID: (store.isLoaded) ? store.locations[0].locationID : 0,
    envID: (store.isLoaded) ? store.envs[0].envID : 0,
    hint: ""
  }
  makeAutoObservable(newTestLocation);
  reaction(
    () => store.isLoaded,
    () => {
      newTestLocation.locationID = store.locations[0].locationID;
      newTestLocation.envID = store.envs[0].envID;
    }
  );

  return newTestLocation;
}

export const store = new Store();
export const storeContext = createContext(store);

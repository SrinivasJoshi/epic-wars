export interface PlayerObject {
    socketID: string;
    address: string;
    nftID: string;
  }
  
export interface MatchData {
    roomIdentifier: string;
    opponent: PlayerObject;
    turnAddress: string;
}

export interface ServerToClientEvents {
    "match": (data: MatchData) => void;
    "got-attribute": (attribute: number) => void;
}
  
export interface ClientToServerEvents {
    "match": (data: MatchData) => void; 
    "got-attribute": (attribute: number) => void;
    "add-queue": (playerObject: PlayerObject) => void;
    "share-attribute": ({
      socketIDopponent,
      attribute,
    }: {
      socketIDopponent: string;
      attribute: any;
    }) => void;
}
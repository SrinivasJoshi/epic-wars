export interface ICardItem {
  name: string;
  imageUrl: string;
}

export interface ICard {
  item: ICardItem;
  index: Number;
  isSold: Boolean;
  isLoading: Boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<Boolean>>;
}

export interface ICardData {
  data: ICardItem[];
}

export interface IPlayer2Object {
  socketID: string;
  address: string;
  nftID: string;
}
interface PlayerObject {
  socketID: string;
  address: string;
  nftID: string;
}

interface MatchData {
  roomIdentifier: string;
  opponent: PlayerObject;
  turnAddress: string;
}

export interface ServerToClientEvents {
  match: (data: MatchData) => void;
  "got-attribute": (attribute: number) => void;
}

export interface ClientToServerEvents {
  match: (data: MatchData) => void;
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

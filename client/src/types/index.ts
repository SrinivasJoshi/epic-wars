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

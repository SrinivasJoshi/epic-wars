export interface ICardItem {
  name: string;
  imageUrl: string;
}

export interface ICard {
  item: ICardItem;
  index: Number;
  isSold: Boolean;
}

export interface ICardData {
  data: ICardItem[];
}

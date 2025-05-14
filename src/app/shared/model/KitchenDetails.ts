export interface KitchenDetails {
    [franchiseType: number]: {
      name: string;
      subTypes: {
        [modelName: string]: {
          [extension: string]: { price: number; uid: number };
        };
      };
    };
  }
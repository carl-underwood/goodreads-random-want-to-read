import Alpine from "alpinejs";
import type { GoodreadsLibraryItem } from "./types";

const pickRandomWantToRead = () => {
    const store = Alpine.store("wantToReadStore");
    const randomIndex = Math.floor(Math.random() * store.wantToReadRecords.length);
    store.randomWantToRead = store.wantToReadRecords[randomIndex];
};

const wantToReadStore: { 
    wantToReadRecords: ReadonlyArray<GoodreadsLibraryItem>,
    randomWantToRead: null | GoodreadsLibraryItem,
    setWantToReadRecords: (wantToReadRecords: GoodreadsLibraryItem[]) => void,
    pickRandomWantToRead: () => void
} = {
    wantToReadRecords: [],
    randomWantToRead: null,
    setWantToReadRecords: (wantToReadRecords: GoodreadsLibraryItem[]) => {
        const store = Alpine.store("wantToReadStore");
        store.wantToReadRecords = wantToReadRecords;
        pickRandomWantToRead();
    },
    pickRandomWantToRead,
};

declare module "alpinejs" {
    interface Stores {
        "wantToReadStore": typeof wantToReadStore;
    }
}

export default wantToReadStore;
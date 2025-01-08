import { expectedColumns, type GoodreadsLibraryItem } from "./types";
import { parse } from "csv-parse/browser/esm/sync";
import Alpine from "alpinejs";

const handleCsvFile = (event: Event) => {
    Alpine.store("fileLoadingStore").error = null;

    if (!event.target) {
        return;
    }

    const fileInput = event.target as HTMLInputElement;

    if (!fileInput.files || !fileInput.files.length) {
        return;
    }
    
    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
        readCsv(fileReader.result as string);
    });

    fileReader.readAsText(file);
}

const readCsv = (csv: string) => {
    const records = parse(csv, { columns: true, delimiter: "," }) as GoodreadsLibraryItem[];

    const firstRecordColumns = Object.getOwnPropertyNames(records[0]);
    

    if (expectedColumns.find(expectedColumn => !firstRecordColumns.includes(expectedColumn))) {
        Alpine.store("fileLoadingStore").error = "Unexpected CSV format!";
        return;
    }
    
    const wantToReadRecords = records.filter(record => record["Exclusive Shelf"] === "to-read");
    Alpine.store("wantToReadStore").setWantToReadRecords(wantToReadRecords);
}

const fileLoadingStore: { handleCsvFile: typeof handleCsvFile, error: string | null } = {
    error: null,
    handleCsvFile,
};

declare module "alpinejs" {
    interface Stores {
        "fileLoadingStore": typeof fileLoadingStore;
    }
}

export default fileLoadingStore;
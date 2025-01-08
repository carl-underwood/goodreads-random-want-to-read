import "./style.css";
import fileLoadingStore from "./fileLoadingStore.ts";
import wantToReadStore from "./wantToReadStore.ts";

import Alpine from "alpinejs";

Alpine.store("fileLoadingStore", fileLoadingStore);
Alpine.store("wantToReadStore", wantToReadStore);

Alpine.start();

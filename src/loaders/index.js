import { loadImage } from "./loaders/image";
import { loadScript } from "./loaders/script";
import { loadStyle } from "./loaders/style";
import { loadView } from "./loaders/view";
import { loadJSON } from "./loaders/json";

export default [
  { ext: /(png|jpg|jpeg|gif|apng|svg|bmp|ico)$/, load: loadImage },
  { ext: /(js)/, load: loadScript },
  { ext: /(css)/, load: loadStyle },
  { ext: /(html)/, load: loadView },
  { ext: /(json)/, load: loadJSON }
];

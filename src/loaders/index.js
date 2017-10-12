import { loadImage } from "./image";
import { loadScript } from "./script";
import { loadStyle } from "./style";
import { loadView } from "./view";
import { loadJSON } from "./json";

export default [
  { ext: /(png|jpg|jpeg|gif|apng|svg|bmp|ico)$/, load: loadImage },
  { ext: /(js)$/, load: loadScript },
  { ext: /(css)$/, load: loadStyle },
  { ext: /(html)$/, load: loadView },
  { ext: /(json)$/, load: loadJSON }
];

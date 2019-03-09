import "./utils/array-helpers.js"; // instancia e carregamento do prototype em memória
import { log } from "./utils/promise-helpers.js";
import { notasService as service } from "./notas/service.js";
import {
  takeUntil,
  debounceTime,
  partialize,
  pipe
} from "./utils/operators.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  service
    .sumItems("2143")
    .then(console.log)
    .catch(console.log)
);

/**
 * Clique do botão que realiza o calculo
 */
document.querySelector("#myButton").onclick = action;

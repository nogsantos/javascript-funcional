import "./utils/array-helpers.js"; // instancia e carregamento do prototype em memória
import { log } from "./utils/promise-helpers.js";
import { notasService as service } from "./notas/service.js";
import { takeUntil, debounceTime } from "./utils/operators.js";

const action = debounceTime(
  500,
  takeUntil(3, () =>
    service
      .sumItems("2143")
      .then(console.log)
      .catch(console.log)
  )
);

/**
 * Clique do botão que realiza o calculo
 */
document.querySelector("#myButton").onclick = action;

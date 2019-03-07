import "./utils/array-helpers.js"; // instancia e carregamento do prototype em memória
import { log } from "./utils/promise-helpers.js";
import { notasService as service } from "./notas/service.js";

/**
 * Calculo
 */
document.querySelector("#myButton").onclick = () =>
  service
    .sumItems("2143")
    .then(log)
    .catch(log);

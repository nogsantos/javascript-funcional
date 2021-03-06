import "./utils/array-helpers.js"; // instancia e carregamento do prototype em memória
import { log, timeoutPromise, retry } from "./utils/promise-helpers.js";
import { notasService as service } from "./notas/service.js";
import {
  takeUntil,
  debounceTime,
  partialize,
  pipe
} from "./utils/operators.js";

import { EventEmitter } from "./utils/event-emitter.js";

const operations = pipe(
  partialize(takeUntil, 3),
  partialize(debounceTime, 500)
);

const action = operations(() =>
  retry(3, 3000, () => timeoutPromise(200, service.sumItems("2143")))
    .then(total => EventEmitter.emit("totalized-items", total))
    .catch(console.log)
);

/**
 * Clique do botão que realiza o calculo
 */
document.querySelector("#myButton").onclick = action;

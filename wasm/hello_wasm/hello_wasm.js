import { startWorkers } from "./snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js";

let wasm;

const cachedTextDecoder =
  typeof TextDecoder !== "undefined"
    ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true })
    : {
        decode: () => {
          throw Error("TextDecoder not available");
        },
      };

if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (
    cachedUint8Memory0 === null ||
    cachedUint8Memory0.buffer !== wasm.memory.buffer
  ) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];

  heap[idx] = obj;
  return idx;
}
/**
 */
export function greet() {
  wasm.greet();
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
  if (
    cachedUint32Memory0 === null ||
    cachedUint32Memory0.buffer !== wasm.memory.buffer
  ) {
    cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 4, 4) >>> 0;
  getUint32Memory0().set(arg, ptr / 4);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
/**
 * @param {Int32Array} numbers
 * @returns {number}
 */
export function sum(numbers) {
  const ptr0 = passArray32ToWasm0(numbers, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.sum(ptr0, len0);
  return ret;
}

function getObject(idx) {
  return heap[idx];
}

function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}

function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
/**
 * @param {number} num_threads
 * @returns {Promise<any>}
 */
export function initThreadPool(num_threads) {
  const ret = wasm.initThreadPool(num_threads);
  return takeObject(ret);
}

/**
 * @param {number} receiver
 */
export function wbg_rayon_start_worker(receiver) {
  wasm.wbg_rayon_start_worker(receiver);
}

/**
 */
export class wbg_rayon_PoolBuilder {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
    obj.__wbg_ptr = ptr;

    return obj;
  }

  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;

    return ptr;
  }

  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
  }
  /**
   * @returns {number}
   */
  numThreads() {
    const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @returns {number}
   */
  receiver() {
    const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
    return ret;
  }
  /**
   */
  build() {
    wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
  }
}

async function __wbg_load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn(
            "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
            e
          );
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}

function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_alert_8755b7883b6ce0ef = function (arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_throw = function (arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbindgen_module = function () {
    const ret = __wbg_init.__wbindgen_wasm_module;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function () {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_startWorkers_6fd3af285ea11136 = function (
    arg0,
    arg1,
    arg2
  ) {
    const ret = startWorkers(
      takeObject(arg0),
      takeObject(arg1),
      wbg_rayon_PoolBuilder.__wrap(arg2)
    );
    return addHeapObject(ret);
  };

  return imports;
}

function __wbg_init_memory(imports, maybe_memory) {
  imports.wbg.memory =
    maybe_memory ||
    new WebAssembly.Memory({ initial: 18, maximum: 16384, shared: true });
}

function __wbg_finalize_init(instance, module) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module;
  cachedUint32Memory0 = null;
  cachedUint8Memory0 = null;

  wasm.__wbindgen_start();
  return wasm;
}

function initSync(module, maybe_memory) {
  if (wasm !== undefined) return wasm;

  const imports = __wbg_get_imports();

  __wbg_init_memory(imports, maybe_memory);

  if (!(module instanceof WebAssembly.Module)) {
    module = new WebAssembly.Module(module);
  }

  const instance = new WebAssembly.Instance(module, imports);

  return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input, maybe_memory) {
  if (wasm !== undefined) return wasm;

  if (typeof input === "undefined") {
    input = new URL("hello_wasm_bg.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();

  if (
    typeof input === "string" ||
    (typeof Request === "function" && input instanceof Request) ||
    (typeof URL === "function" && input instanceof URL)
  ) {
    input = fetch(input);
  }

  __wbg_init_memory(imports, maybe_memory);

  const { instance, module } = await __wbg_load(await input, imports);

  return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

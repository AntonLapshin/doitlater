import { loadImage } from "./loaders/image";
import { loadScript } from "./loaders/script";
import { loadStyle } from "./loaders/style";
import { loadView } from "./loaders/view";

/**
 * Run Later: Ideally run smth when nothing happens
 * @param {function} callback
 */
const runLater =
  window.requestIdleCallback ||
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  (fn => window.setTimeout(fn, 16));

/**
 * Defer implementation
 * @returns {Defer}
 */
const createDefer = () => {
  const d = {};
  d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
  });
  return d;
};

const _defers = {};

/**
 * Add defer if it doesn't exist
 * @param {string} name 
 */
const addDefer = name => {
  if (!_defers[name]) {
    _defers[name] = createDefer();
  }
  return _defers[name];
};

const doitlater = {
  /**
   * Get promise from storage
   * @param {string} name
   * @returns {Promise}
   */
  get: name => addDefer().promise,

  /**
   * Add promise to storage
   * @param {string} name
   * @param {Promise} promise
   */
  add: (name, promise) => {
    addDefer().promise = promise;
  },

  /**
   * Load resource
   * @param {string} name
   * @param {string|function|Array<string|function>} resources
   * @param {Promise} waitForIt [optional] Promise that has to be completed before execution
   * @returns {Promise}
   */
  load: (name, resources, waitForIt) => {
    if (typeof resources === "string") {
      resources = [resources];
    }
    const promises = resources.map(resource => {
      return new Promise((resolve, reject) => {
        (waitForIt || Promise.resolve()).then(() => {
          runLater(() => {
            if (typeof resource === "function"){            
              resource();
              resolve();
            } else {
              const ext = resource.split(".").pop();
              loaders[ext](resource, resolve, reject);
            }
          });
        });
      });
    });
    return addDefer(name).promise = Promise.all(promises);
  },

  runLater,
  createDefer
};

export default doitlater;

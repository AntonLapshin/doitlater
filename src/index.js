import loaders from "./loaders";

/**
 * Run Later: Ideally run smth when nothing happens
 * @param {function} callback
 */
export const runLater =
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
export const createDefer = () => {
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
const addDefer = name => _defers[name] || (_defers[name] = createDefer());

/**
 * Get a promise from storage by name
 * @param {string} name
 * @returns {Promise}
 */
export const get = name => addDefer().promise;

/**
 * Add a promise to storage
 * @param {string} name
 * @param {Promise} promise
 */
export const add = (name, promise) => (addDefer().promise = promise);

/**
 * Load resource
 * @param {string} name
 * @param {string|function|Array<string|function>} resources
 * @param {Promise} waitForIt [optional] Promise that has to be completed before execution
 * @returns {Promise}
 */
export const load = (name, resources, waitForIt) => {
  if (typeof resources === "string") {
    resources = [resources];
  }
  const promises = resources.map(resource => {
    return new Promise((resolve, reject) => {
      (waitForIt || Promise.resolve()).then(() => {
        runLater(() => {
          if (typeof resource === "function") {
            resource();
            resolve();
          } else {
            const ext = resource.split(".").pop();
            const loader = loaders.find(l => l.ext.test(ext));
            if (!loader) {
              throw new Error(
                `Loader for <${ext}> files has not been implemented yet`
              );
            }
            loader(resource, resolve, reject);
          }
        });
      });
    });
  });
  return (addDefer(name).promise = Promise.all(promises));
};

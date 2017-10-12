import loaders from "./loaders";

/**
 * Run Later: Ideally run smth when nothing happens
 * @param {function} fn
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
export const waitFor = name => addDefer(name).promise;

/**
 * Add a promise to storage
 * @param {string} name
 * @param {Promise} promise
 */
export const add = (name, promise) => {
  const defer = addDefer(name);
  promise.then(defer.resolve, defer.reject);
  return defer.promise;
}

/**
 * Load resource
 * @param {string} name
 * @param {string|function|Array<string|function>} resources
 * @returns {Promise}
 */
export const load = (name, resources) => {
  if (resources.constructor !== Array) {
    resources = [resources];
  }
  const promises = resources.map(resource => {
    return new Promise((resolve, reject) => {
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
          loader.load(resource, resolve, reject);
        }
      });
    });
  });
  return add(name, Promise.all(promises));
};

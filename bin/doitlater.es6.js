(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.doitlater = global.doitlater || {})));
}(this, (function (exports) { 'use strict';

const loadImage = (url, resolve) => {
  const img = new Image();
  img.onload = () => {
    resolve(img);
  };
  img.src = url;
};

const loadScript = (url, resolve) => {
  const script = document.createElement("script");
  script.onload = function() {
    resolve(script);
  };
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const loadStyle = (url, resolve) => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
  resolve(link);
};

const loadView = (url, resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.responseText.length > 0) {
      resolve(xhr.responseText);
    }
  };
  xhr.send();
};

const loadJSON = (url, resolve) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      resolve(data);
    } else {
      reject();
    }
  };
  request.onerror = reject;
  xhr.send();
};

var loaders = [
  { ext: /(png|jpg|jpeg|gif|apng|svg|bmp|ico)$/, load: loadImage },
  { ext: /(js)/, load: loadScript },
  { ext: /(css)/, load: loadStyle },
  { ext: /(html)/, load: loadView },
  { ext: /(json)/, load: loadJSON }
];

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
const addDefer = name => _defers[name] || (_defers[name] = createDefer());

/**
 * Get a promise from storage by name
 * @param {string} name
 * @returns {Promise}
 */
const get = name => addDefer().promise;

/**
 * Add a promise to storage
 * @param {string} name
 * @param {Promise} promise
 */
const add = (name, promise) => (addDefer().promise = promise);

/**
 * Load resource
 * @param {string} name
 * @param {string|function|Array<string|function>} resources
 * @param {Promise} waitForIt [optional] Promise that has to be completed before execution
 * @returns {Promise}
 */
const load = (name, resources, waitForIt) => {
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

exports.runLater = runLater;
exports.createDefer = createDefer;
exports.get = get;
exports.add = add;
exports.load = load;

Object.defineProperty(exports, '__esModule', { value: true });

})));

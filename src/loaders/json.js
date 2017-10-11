export const loadJSON = (url, resolve) => {
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

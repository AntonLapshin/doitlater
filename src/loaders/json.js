export const loadJSON = (url, resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      const data = JSON.parse(xhr.responseText);
      resolve(data);
    } else {
      reject();
    }
  };
  xhr.onerror = reject;
  xhr.send();
};

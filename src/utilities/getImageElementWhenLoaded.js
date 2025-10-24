export function getImageElementWhenLoaded(selectedImage) {
  const image = document.createElement('img');
  image.classList.add('image');
  image.src = selectedImage;

  return new Promise(function (resolve, reject) {
    image.onload = function () {
      resolve(image);
    };
    image.onerror = function () {
      reject(image);
    };
  });
}

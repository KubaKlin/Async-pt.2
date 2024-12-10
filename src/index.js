import './style.css';

const images = [
  'https://picsum.photos/5000?random=1',
  'https://picsum.photos/5000?random=2',
  'https://picsum.photos/5000?random=3',
  'https://picsum.photos/5000?random=4',
];

const buttonsWrapper = document.querySelector('.buttons-wrapper');
const informationParagraph = document.querySelector('.loading-info');

images.forEach(function (image) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerText = images.indexOf(image) + 1;
  buttonsWrapper.appendChild(button);

  button.addEventListener('click', function () {
    const buttonIndex = Array.from(button.parentNode.children).indexOf(button);
    const selectedImage = images[buttonIndex];
    informationParagraph.innerText = 'loading...';

    function getImageElementWhenLoaded() {
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

    getImageElementWhenLoaded(image)
      .then(function (image) {
        informationParagraph.innerText = '';
        informationParagraph.after(image);
        image.classList.toggle('loaded');
      })
      .catch(function () {
        informationParagraph.innerText = 'loading error';
      });
  });
});

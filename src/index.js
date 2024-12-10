import './style.css';

const images = [
  'https://picsum.photos/5000?random=1',
  'https://picsum.photos/5000?random=2',
  'https://picsum.photos/5000?random=3',
  'https://picsum.photos/5000?random=4',
];

const buttonsWrapper = document.querySelector('.buttons-wrapper');
const informationParagraph = document.querySelector('.loading-info');

for (let i = 0; i < images.length; i++) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerText = i + 1;
  buttonsWrapper.appendChild(button);
}

const buttons = document.querySelectorAll('.button');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const buttonIndex = Array.from(button.parentNode.children).indexOf(button);
    const selectedImage = images[buttonIndex];

    const image = document.createElement('img');
    image.classList.add('image');
    image.src = selectedImage;
    informationParagraph.innerText = 'loading...';

    function getImageElementWhenLoaded() {
      return new Promise(function (resolve, reject) {
        image.onload = function () {
          resolve();
        };
        image.onerror = function () {
          reject();
        };
      });
    }

    getImageElementWhenLoaded()
      .then(function () {
        informationParagraph.innerText = '';
        informationParagraph.after(image);
        setTimeout(function () {
          image.classList.add('loaded');
        }, 10);
      })
      .catch(function () {
        informationParagraph.innerText = 'loading error';
      });
  });
});

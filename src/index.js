import './style.css';
import { getImageElementWhenLoaded } from './components/getImageElementWhenLoaded';
import { wait } from './components/wait';

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
    const imageWrapper = document.querySelector('.image-wrapper');
    informationParagraph.innerText = 'loading...';

    getImageElementWhenLoaded(selectedImage, imageWrapper)
      .then(function (image) {
        const currentImage = imageWrapper.querySelector('img');

        if (currentImage) {
          currentImage.classList.remove('loaded');
          wait(700).then(function () {
            currentImage.remove();
          });
          wait(700).then(function () {
            imageWrapper.append(image);
          });
          wait(710).then(function () {
            image.classList.add('loaded');
          });
        } else {
          imageWrapper.append(image);
          wait(10).then(function () {
            image.classList.add('loaded');
          });
        }
        informationParagraph.innerText = '';
      })
      .catch(function () {
        informationParagraph.innerText = 'loading error';
      });
  });
});

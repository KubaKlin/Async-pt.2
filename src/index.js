import './style.css';
import { getImageElementWhenLoaded } from './utilities/getImageElementWhenLoaded';
import { wait } from './utilities/wait';

const images = [
  'https://picsum.photos/5000?random=1',
  'https://picsum.photos/5000?random=2',
  'https://picsum.photos/5000?random=3',
  'https://picsum.photos/5000?random=4',
];

const buttonsWrapper = document.querySelector('.buttons-wrapper');
const informationParagraph = document.querySelector('.loading-info');

images.forEach(function (image, index) {
  const button = document.createElement('button');
  button.classList.add('button');
  button.innerText = index + 1;
  buttonsWrapper.appendChild(button);

  button.addEventListener('click', function () {
    const buttonIndex = Array.from(button.parentNode.children).indexOf(button);
    const selectedImage = images[buttonIndex];
    const imageWrapper = document.querySelector('.image-wrapper');
    informationParagraph.innerText = 'loading...';

    getImageElementWhenLoaded(selectedImage, imageWrapper)
      .then(function (image) {
        const currentImage = imageWrapper.querySelector('img');
        informationParagraph.innerText = '';

        if (!currentImage) {
          imageWrapper.append(image);
          return wait(10).then(function () {
            image.classList.add('loaded');
          });
        }

        currentImage.classList.remove('loaded');
        return wait(700)
          .then(function () {
            currentImage.remove();
            imageWrapper.append(image);
            return wait(10);
          })
          .then(function () {
            image.classList.add('loaded');
          });
      })
      .catch(function () {
        informationParagraph.innerText = 'loading error';
      });
  });
});

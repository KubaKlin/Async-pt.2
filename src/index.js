import './style.css';
import { getImageElementWhenLoaded } from "./components/getImageElementWhenLoaded";
import { wait } from "./components/wait";

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

    getImageElementWhenLoaded(selectedImage)
      .then(function (image) {
        informationParagraph.innerText = '';
        image.remove();
        informationParagraph.after(image);

        wait(2000).then(function() {
          image.classList.add('loaded');
        });
      })
      .catch(function () {
        informationParagraph.innerText = 'loading error';
      });
  });
});

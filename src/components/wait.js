export function wait(time) {
  return new Promise(function (resolve, reject) {
    if (typeof time !== 'number' || isNaN(time)) {
      return reject('The time should be a number');
    }

    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

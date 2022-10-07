/* eslint-disable max-len */
/* eslint-disable import/no-unresolved */

const requiredElements = document.getElementById('form').querySelectorAll('[required]');

/*
 *        Checking inputs and enable form button
 * ========================================================
 */
// identify all required fields in form
const required = {};
for (let i = 0; i < requiredElements.length; i += 1) {
  required[`${requiredElements[i].id}`] = false;
}

const submitBtn = document.getElementById('submitBtn');

// for each required field, add an eventlistener to monitor if inputs are valid
// once all inputs are valid, enable Save button
Object.keys(required).forEach((field) => {
  document.getElementById(field).addEventListener('input', () => {
    if (document.getElementById(field).checkValidity()) {
      required[`${field}`] = true;
      if (Object.values(required).every((value) => value === true)) {
        submitBtn.disabled = false;
      }
    } else {
      required[`${field}`] = false;
      submitBtn.disabled = true;
    }
  });
});

// enable spinning loader on button upon click
submitBtn.addEventListener('click', () => {
  const loader = document.getElementById('loader');
  loader.classList.add('spinner-border', 'spinner-border-sm');
});

/*
 *        Render image after user has selected
 * =====================================================
 */
const imageSpace = document.getElementById('imageSpace');
const images = document.getElementById('image');

// add eventlistener to image input
images.addEventListener('change', (event) => {
  // remove all existing rendered images
  while (imageSpace.firstChild) {
    imageSpace.removeChild(imageSpace.firstChild);
  }

  // define new file list of uploads
  const fileList = event.target.files;

  // loop through file list
  if (fileList.length > 0) {
    for (let i = 0; i < fileList.length; i += 1) {
      // create div to house images
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('col-md-3', 'col-3');
      imageContainer.setAttribute('id', `img${i}`);

      const img = document.createElement('img');
      img.classList.add('img-fluid');

      // append img div to existing image container
      imageContainer.appendChild(img);
      imageSpace.appendChild(imageContainer);

      // read file to define img src
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (file) => {
        img.src = file.target.result;
      });
      fileReader.readAsDataURL(fileList[i]);
    }
  }
});

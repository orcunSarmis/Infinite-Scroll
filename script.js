const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'NvIVWv8KKnQjShrLbdyLdljS2brb5F-GpPbE_LLb4tk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded() {
	imagesLoaded++;
	console.log(imagesLoaded)
	if (imagesLoaded === totalImages) {
		ready = true;
		loader.hidden = true;
		console.log('ready =', ready);
	}
}

// helper func to set attributtes on dom
function setAttributes(element, attributtes) {
	for (const key in attributtes) {
		element.setAttribute(key, attributtes[key]);
	}
}

// create elements for links &photos
function displayPhotos() {
	imagesLoaded = 0;
	totalImages = photosArray.length;
	console.log('total images', totalImages);
	photosArray.forEach((photo) => {
		// create <a> to link
		const item = document.createElement('a');
		// item.setAttribute('href', photo.links.html);
		// item.setAttribute('target', '_blank');
		setAttributes(item, {
			href: photo.links.html,
			target: '_blank',
		});
		// create <img> for photo
		const img = document.createElement('img');
		// img.setAttribute('src', photo.urls.regular);
		// item.setAttribute('alt', photo.alt_description);
		// item.setAttribute('title', photo.alt_description);
		setAttributes(img, {
			src: photo.urls.regular,
			alt: photo.alt_description,
			title: photo.alt_description,
		});
		// eventlsitner ceheck when is finshed
		img.addEventListener('load', imageLoaded);

		// put <img> inside<a>, & put both in imageContainer element
		item.appendChild(img);
		imageContainer.appendChild(item);
	});
}

// get photos from unsplash api
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		photosArray = await response.json();
		displayPhotos();

	} catch (error) {
		// catch err
	}
}

// check
window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000&& ready) {
		ready = false;
		getPhotos();
	}
});

getPhotos();

// clean code
// let isInitialLoad = true // NEW LINE ****

// // Unsplash API
// let initialCount = 5;
// const apiKey = 'jFgS8tteGD425f4oZfygQVaVnD6gt6GucN2yyz3xFek';
// let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

// // NEW Block****
// function updateAPIURLWithNewCount (picCount) {
//   apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
// }
// // NEW Block*****


// // Check if all images were loaded
// function imageLoaded() {
//   imagesLoaded++;
//   if (imagesLoaded === totalImages) {
//     ready = true;
//     loader.hidden = true;
//   }
// }



// .......

// // Get photos from Unsplash API
// async function getPhotos() {
//   try {
//     const response = await fetch(apiUrl);
//     photosArray = await response.json();
//     displayPhotos();
//     if (isInitialLoad) { // NEW LINE ****
//       updateAPIURLWithNewCount(30) // NEW LINE ****
//       isInitialLoad = false // NEW LINE ****
//     } // NEW LINE ****
//   } catch (error) {
//     // Catch Error Here
//   }
// }
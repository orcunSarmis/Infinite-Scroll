const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// unsplash API
const count = 10;
const apiKey = 'NvIVWv8KKnQjShrLbdyLdljS2brb5F-GpPbE_LLb4tk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// helper func to set attributtes on dom
function setAttributes(element, attributtes) {
	for (const key in attributtes) {
		element.setAttribute(key, attributtes[key]);
	}
}

// create elements for links &photos
function displayPhotos() {
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
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
		getPhotos();
		console.log('load more')
	}
});

getPhotos();
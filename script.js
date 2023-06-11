// unsplash API
const count = 10;
const apiKey = 'NvIVWv8KKnQjShrLbdyLdljS2brb5F-GpPbE_LLb4tk';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// get photos from unsplash api
async function getPhotos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		// catch err
	}
}

getPhotos();
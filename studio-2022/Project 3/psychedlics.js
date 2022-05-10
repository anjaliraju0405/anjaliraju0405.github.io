console.log("The Nature of Psychedlics");

var Airtable = require("airtable");
console.log(Airtable);

var base = new Airtable({apiKey: 'keydz80usbgrNgxxm'}).base('appx7lwta75vCXy7E');

base("images").select({
	view: "Grid view"
  }).eachPage(gotPageOfImages, gotAllImages);
  
  // an empty array to hold our book data
  const images = [];

// an empty array to hold our book data
const images = [];

// callback function that receives our data
function gotPageOfImages(records, fetchNextPage) {
	console.log("gotPageOfImages()");
	// add the records from this page to our books array
	images.push(...records);
	// request more pages
	fetchNextPage();
  }

// callback function that is used when all pages are loaded
function gotAllImages(err) {
	console.log("gotAllImages()");

	// report an error> this is what shows up if there's a problem
	if (err) {
		console.log("error loading images");
		console.error(err);
		return;
	}

  // call functions to log and show the books
  consoleLogImages();
  showImages();
}

// just loop through the books and console.log them
function consoleLogImages() {
	console.log("consoleLogImages()");
	images.forEach((image) => {
	  console.log("Image:", image);
	});
  }

// find the book detail element
const imageDetail = document.getElementById("image-detail");

// populate the template with the data in the provided book
imageDetail.getElementsByClassName("cover_image")[0].src =
    image.fields.cover_image[0].url;


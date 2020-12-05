// Variables
const BS_API_KEY = '?api_key=58ddcf95-8713-4df8-b366-d7d3793d36be';
const BS_URL = 'https://project-1-api.herokuapp.com/';
const BS_SHOWS = 'showdates';
let show = '';
let shows = [];

axios.get(`${BS_URL}${BS_SHOWS}${BS_API_KEY}`)
    .then(result => {
        for (let i = 0; i < result.data.length; i++) {
            show = {"id":result.data[i].id,"date":result.data[i].date,"place":result.data[i].place,"location":result.data[i].location};
            shows.push(show);
        }
        shows.forEach(function(show, i) {
            displayShow(show, i);
        });        
    })
    .catch(err => console.log('Error=>', err.response));

// Display show detail
const displayShow = (showObj, i) => {
    // Declare local variables
    let ref;
    // Determine if we already have shows listed
    if (i == 0) {
        ref = document.querySelector('.shows__header');
    } else {
        ref = document.getElementById('show-' + (i - 1));
    };
    // Create the new show detail HTML
    let newDiv = document.createElement('div');
    let newDivID = 'show-' + i;
    newDiv.classList.add('show');
    newDiv.id = newDivID; 
    insertAfter(newDiv, ref);
    // Create "show__date-header" div and "DATE" column label
    let showDateHeader = document.createElement('div');
    showDateHeader.classList.add('show__date-header');
    showDateHeader.innerText = 'DATE';
    document.getElementById(newDivID).appendChild(showDateHeader);
    // Create "show__date" div and display show date
    let showDate = document.createElement('div');
    showDate.classList.add('show__date');
    let rawDate = new Date(showObj.date);
    let strDate = rawDate.toDateString();
    showDate.innerText = strDate;
    document.getElementById(newDivID).appendChild(showDate);
    // Create "show__venue-header" div and "VENUE" column label
    let showVenueHeader = document.createElement('div');
    showVenueHeader.classList.add('show__venue-header');
    showVenueHeader.innerText = 'VENUE';
    document.getElementById(newDivID).appendChild(showVenueHeader);
    // Create "show__venue" div and display venue
    let showVenue = document.createElement('div');
    showVenue.classList.add('show__venue');
    showVenue.innerText = showObj.place;
    document.getElementById(newDivID).appendChild(showVenue);
    // Create "show__location-header" div and "LOCATION" column label
    let showLocationHeader = document.createElement('div');
    showLocationHeader.classList.add('show__location-header');
    showLocationHeader.innerText = 'LOCATION';
    document.getElementById(newDivID).appendChild(showLocationHeader);
    // Create "show__location" div and display location
    let showLocation = document.createElement('div');
    showLocation.classList.add('show__location');
    showLocation.innerText = showObj.location;
    document.getElementById(newDivID).appendChild(showLocation);
    // Create "show__cta" div and CTA button
    let showCTA = document.createElement('div');
    showCTA.classList.add('show__cta');
    let ctaButton = document.createElement('button');
    ctaButton.classList.add('show__cta-button');
    ctaButton.setAttribute('type', 'button');
    ctaButton.innerText = 'BUY TICKETS';
    showCTA.appendChild(ctaButton);
    document.getElementById(newDivID).appendChild(showCTA);
    // Create the divider
    let showDivider = document.createElement('hr');
    showDivider.classList.add('show__divider');
    document.getElementById(newDivID).appendChild(showDivider);
};

// Insert HTML after parent node function
const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};
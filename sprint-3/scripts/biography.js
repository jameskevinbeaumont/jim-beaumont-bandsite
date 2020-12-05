// Variables
const BS_API_KEY = '?api_key=58ddcf95-8713-4df8-b366-d7d3793d36be';
const BS_URL = 'https://project-1-api.herokuapp.com/';
const BS_COMMENTS = 'comments/';
let maxCommentIndex = 0;
let lastCommentId = '';
let comment = '';
let commentsAPI = [];
let comments = [];

axios.get(`${BS_URL}${BS_COMMENTS}${BS_API_KEY}`)
    .then(result => {
        for (let i = 0; i < result.data.length; i++) {
            comment = {"name":result.data[i].name,"comment":result.data[i].comment,"id":result.data[i].id,"likes":result.data[i].likes,"timestamp":result.data[i].timestamp,"index":0}
            commentsAPI.push(comment)
        }
        // Examining the raw JSON data returned from the API
        // and if there are only the 3 default comments, do
        // nothing other than moving the contents to the working
        // array otherwise, reverse the order of the non-default
        // comments and store them in the working array, 
        // take them out of the API array and then move the 
        // default 3 to the end of the working array, in their
        // original order, per our TA
        if (commentsAPI.length > 3) {
            comments = commentsAPI.slice(3).reverse()
            commentsAPI.splice(3, commentsAPI.length - 3)
            comments = comments.concat(commentsAPI);
        } else {
            comments = commentsAPI;
        }
        // Loop through the working comments array
        // and display the comments
        comments.forEach(function(comment, i) {
            comment.index = i
            displayComment(comment, i)
            maxCommentIndex = i
        })
        insertCommentDivider()
    })
    .catch(err => console.log('Error=>', err.response));

// Function - Create comment detail HTML
const displayComment = (commentObj, i) => {
    // Declare local variables
    let ref;
    // Determine if we are iterating the array for the first
    // time (0) or are calling it after adding a new comment (-1)
    // else iterating the initial array after the first comment
    // has already been displayed
    if (i === 0 || i === -1) {
        ref = document.getElementById('comments-container');
    } else {
        ref = document.getElementById('comment-' + (i - 1));
    };
    // Create the comment HTML
    createCommentHTML(commentObj, i, ref);
};

// Function - Create comment HTML
const createCommentHTML = (commentObj, i, ref) => {
    // Create the new comment detail HTML
    // Create the divider
    let commentDivider = document.createElement('hr');
    commentDivider.classList.add('comment__divider');
    if (i === -1) {
        commentDivider.id = 'comment__divider-' + maxCommentIndex;
    } else {
        commentDivider.id = 'comment__divider-' + i;
    }
    // If this is the first pass, make sure the divider is placed
    // INSIDE <div class="comments__history">
    // -1 means we are adding a comment and the comment HTML
    // needs to be placed at the TOP of the comments history
    if (i === 0) {
        ref.appendChild(commentDivider);
    } else if (i === -1) {
        ref.insertBefore(commentDivider, ref.childNodes[0]);
        i = maxCommentIndex;
    } else {
        insertAfter(commentDivider, ref);
    }
    // Create the new comment div
    let commentDiv = document.createElement('div');
    let commentDivID = 'comment-' + i;
    commentDiv.classList.add('comment');
    commentDiv.id = commentDivID;
    insertAfter(commentDiv, commentDivider);
    // Create comment image div
    let commentImageDiv = document.createElement('div');
    commentImageDiv.classList.add('comment__image');
    document.getElementById(commentDivID).appendChild(commentImageDiv);
    // Create image comment-image
    let commentImage = document.createElement('img');
    commentImage.classList.add('comment-image');
    commentImageDiv.appendChild(commentImage);
    // Create comment detail
    let commentDetail = document.createElement('div');
    commentDetail.classList.add('comment__detail');
    insertAfter(commentDetail, commentImageDiv);
    // Create comment header
    let commentHeader = document.createElement('div');
    commentHeader.classList.add('comment__header');
    commentDetail.appendChild(commentHeader);
    // Create comment header - name
    let commentName = document.createElement('p');
    commentName.classList.add('comment__header-name');
    commentName.innerText = commentObj.name;
    commentHeader.appendChild(commentName);
    // Update the timestamp on the comment detail
    // based on the current date and time
    commentObj.timestamp = generateTimeStamp(commentObj.timestamp);
    // Create comment header - timestamp (ts)
    let commentTS = document.createElement('p');
    commentTS.classList.add('comment__header-ts');
    commentTS.innerText = commentObj.timestamp;
    commentHeader.appendChild(commentTS);
    // Create comment comments
    let commentComments = document.createElement('div');
    commentComments.classList.add('comment__comments');
    commentComments.id = commentObj.id;
    let onClickDiv = "deleteClicked(this)";
    commentComments.setAttribute('onclick', onClickDiv);
    insertAfter(commentComments, commentHeader);
    // Create comment comments - text
    let commentText = document.createElement('p');
    commentText.classList.add('comment__comments-text');
    commentText.innerText = commentObj.comment;
    commentText.setAttribute('del-tooltip', 'Click to delete!');
    commentComments.appendChild(commentText);
};

// Function - Insert final comment divider
const insertCommentDivider = () => {
    let ref = document.getElementById('comment-' + (maxCommentIndex));
    let commentDivider = document.createElement('hr');
    commentDivider.classList.add('comment__divider');
    insertAfter(commentDivider, ref);
};

// Function - Insert HTML after parent node
const insertAfter = (element, referenceNode) => {
    referenceNode.parentNode.insertBefore(element, referenceNode.nextSibling);
};

// Function - Delete comment
const deleteComment = (id, index) => {
    axios.delete(`${BS_URL}${BS_COMMENTS}${id}${BS_API_KEY}`)
    .then(result => { 
        let commentsContainer = document.getElementById('comments-container');
        let commentDetail = document.getElementById(`comment-${index}`);
        commentsContainer.removeChild(commentDetail);
        document.getElementById(`comment__divider-${index}`).remove();
        comments.splice(index, 1);
    })
    .catch(err => console.log('Error=>', err.response));
};

// Function - User click on existing comment text...delete?
const deleteClicked = (element) => {
    let commentToDel = comments.find(({id}) => id === element.id);
    let confirmDel = confirm('Are you sure you want to delete this comment?');
    if (confirmDel) {deleteComment(element.id, commentToDel.index)}
};

// Function - Format current date (mm/dd/yyyy)
const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let time = Math.round(today.getTime() / 1000);
    let timeFormat = convertSecondsToTime(time);

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${mm}/${dd}/${yyyy} ${timeFormat}`;
};

// Function - Convert seconds to HH:MM:SS
const convertSecondsToTime = (time) => {
    let dateObj = new Date(); 
    let hours = dateObj.getHours(); 
    let minutes = dateObj.getMinutes(); 
    let seconds = dateObj.getSeconds(); 

    return hours.toString().padStart(2, '0') 
        + ':' + minutes.toString().padStart(2, '0') 
        + ':' + seconds.toString().padStart(2, '0'); 
};

// Function - Generate timestamp
const generateTimeStamp = (commentObjDate) => {
    let currentDate = new Date();
    let commentDate = new Date(commentObjDate);
    let currentTime = Math.round(currentDate.getTime() / 1000);
    let commentTime = Math.round(commentDate.getTime() / 1000);
    let diffMins = (currentTime - commentTime) / 60;
    let diffHours = parseInt(Math.round(diffMins / 60));
    let diffDays = parseInt(Math.round(diffHours / 24));
    let diffWeeks = parseInt(Math.round(diffDays / 7));
    let diffMonths = parseInt(Math.round(diffWeeks / 4));
    let diffYears = parseInt(Math.round(diffMonths / 12));
    let tsText = '';

    switch(true) {
        case (diffMins < 1):
            tsText = '< 1 minute ago';
            break;
        case (diffMins < 2):
            tsText = `${parseInt(diffMins)} minute ago`;
            break;
        case (diffMins < 60):
            tsText = `${parseInt(diffMins)} minutes ago`;
            break;
        case (diffHours == 1):
            tsText = `1 hour ago`;
            break;
        case (diffHours < 24):
            tsText = `${parseInt(diffHours)} hours ago`;
            break;
        case (diffHours < 48):
            tsText = `1 day ago`;
            break;
        case (diffDays < 8):
            tsText = `${diffDays} days ago`;
            break;
        case (diffWeeks < 2):
            tsText = `1 week ago`;
            break;
        case (diffWeeks < 5):
            tsText = `${diffWeeks} weeks ago`;
            break;
        case (diffMonths < 2):
            tsText = `1 month ago`;
            break;
        case (diffMonths < 12):
            tsText = `${diffMonths} months ago`;
            break;
        case (diffYears < 2):
            tsText = `1 year ago`;
            break;
        case (diffYears >= 2):
            tsText = `${diffYears} years ago`;
            break;
        default:
    };

    return tsText;
};

// Variable to store form elements
const commentsForm = document.getElementById('comments__form');

// Event Listener - Event ('submit') - commentsForm
commentsForm.addEventListener('submit', function(e) {
    // Prevent page from re-loading
    e.preventDefault();
    // Get the comment data from the form and save it to the newComment object
    let newComment = {
        name: e.target.fullName.value,
        comment: e.target.commentText.value
    };
    // Add the newComment to the API
    axios.post(`${BS_URL}${BS_COMMENTS}${BS_API_KEY}`, {
        name: newComment.name,
        comment: newComment.comment
    })
    .then(result => { 
        maxCommentIndex += 1
        newComment = {
            name: result.data.name,
            comment: result.data.comment,
            id: result.data.id,
            likes: result.data.likes,
            timestamp: result.data.timestamp,
            index: maxCommentIndex
        }
        comments.splice(0, 0, newComment)
        displayComment(newComment, -1)
    })
    .catch(err => console.log('Error=>', err.response));
    // Clear the input fields
    commentsForm.reset();
    // Reset the focus fullName input
    document.getElementById('fullName').focus();
});
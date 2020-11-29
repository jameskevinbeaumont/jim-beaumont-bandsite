// Create Array of Comment Objects
let comments = [
    {
    'commentImage': '',
    'commentName': 'Michael Lyons',
    'commentDate': '11/17/2020 08:14:27',
    'commentTS': '',
    'commentText': 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.'
    },
    {
    'commentImage': '',
    'commentName': 'Gary Wong',
    'commentDate': '05/12/2020 23:24:00',
    'commentTS': '',
    'commentText': 'Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!'
    },
    {
    'commentImage': '',
    'commentName': 'Theodore Duncan',
    'commentDate': '08/15/2018 15:48:57',
    'commentTS': '',
    'commentText': 'How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!'
    }
]

// Function - Create comment detail HTML
const displayComment = (commentObj, i) => {
    // Declare local variables
    let ref;
    // Determine if we already have comments listed
    if (i == 0) {
        ref = document.querySelector('.comments__history');
    } else {
        ref = document.getElementById('comment-' + (i - 1));
    };
    // Create the new comment detail HTML
    // Create the divider
    let commentDivider = document.createElement('hr');
    commentDivider.classList.add('comment__divider');
    // If this is the first pass, make sure the divider is placed
    // INSIDE <div class="comments__history">
    if (i == 0) {
        ref.appendChild(commentDivider)
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
    commentName.innerText = commentObj.commentName;
    commentHeader.appendChild(commentName);
    // Update the timestamp on the comment detail
    // based on the current date and time
    commentObj.commentTS = generateTimeStamp(commentObj.commentDate);
    // Create comment header - timestamp (ts)
    let commentTS = document.createElement('p');
    commentTS.classList.add('comment__header-ts');
    commentTS.innerText = commentObj.commentTS;
    commentHeader.appendChild(commentTS);
    // Create comment comments
    let commentComments = document.createElement('div');
    commentComments.classList.add('comment__comments');
    insertAfter(commentComments, commentHeader);
    // Create comment comments - text
    let commentText = document.createElement('p');
    commentText.classList.add('comment__comments-text');
    commentText.innerText = commentObj.commentText;
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
const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

// Function - Iterate comment object array and build HTML for comment display
let maxCommentIndex = 0;
const displayComments = () => {
    comments.forEach(function(comment, i) {
        displayComment(comment, i);
        maxCommentIndex = i;
    });
    insertCommentDivider();
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
            tsText = `${parseInt((diffMins / 60))} hours ago`;
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

// Function - Remove all child nodes of a node
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

// Variable to store the form element
const commentsForm = document.getElementById('comments__form');

// Event Listener - Event ('submit') - commentsForm
commentsForm.addEventListener('submit', function(e) {
    // Prevent page from re-loading
    e.preventDefault();

    // Get the comment data from the form and save it to the newComment object
    let newComment = {
        commentImage: '',
        commentName: e.target.fullName.value,
        commentDate: getCurrentDate(),
        commentTS: '',
        commentText: e.target.commentText.value
    };
    // Add the newComment object to the first position in the object array
    comments.splice(0, 0, newComment);
    // console.log(comments);
    // Clear the comments from the page
    let container = document.getElementById('comments-container');
    removeAllChildNodes(container);
    // Rebuild the comments section of the page
    displayComments();
    // Clear the input fields
    commentsForm.reset();
    // Reset the focus fullName input
    document.getElementById('fullName').focus();
});

// If page is initialized or refreshed, get the comments from the object array
// and display them to the page
displayComments();

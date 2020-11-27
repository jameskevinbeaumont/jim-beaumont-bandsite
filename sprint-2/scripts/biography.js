// Create Array of Comment Objects
let comments = [
    {
    // "commentImage": "./assets/images/Michael-Lyons.jpg",
    "commentImage": "",
    "commentName": "Michael Lyons",
    "commentDate": "12/18/2018",
    "commentText": "They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed."
    },
    {
    // "commentImage": "./assets/images/Gary-Wong.jpg",
    "commentImage": "",
    "commentName": "Gary Wong",
    "commentDate": "12/12/2018",
    "commentText": "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!"
    },
    {
    // "commentImage": "./assets/images/ted-duncan.jpg",
    "commentImage": "",
    "commentName": "Theodore Duncan",
    "commentDate": "11/15/2018",
    "commentText": "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!"
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
    // Create comment header - date
    let commentDate = document.createElement('p');
    commentDate.classList.add('comment__header-date');
    commentDate.innerText = commentObj.commentDate;
    commentHeader.appendChild(commentDate);
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

// Function - Insert HTML after parent node
const insertAfter = (el, referenceNode) => {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

// Function - Iterate comment object and build HTML for comment display
const displayComments = () => {
    comments.forEach(function(comment, i) {
        displayComment(comment, i);
    });    
};

// Function - Format current date (mm/dd/yyyy)
const getCurrentDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return mm + '/' + dd + '/' + yyyy;
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
    e.preventDefault();
    // Get the comment data from the form and save it to the newComment object
    let newComment = {
        commentImage: '',
        commentName: e.target.fullName.value,
        commentDate: getCurrentDate(),
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
});

// If page is initialized or refreshed, get the comments from the object array
// and display them to the page
displayComments();

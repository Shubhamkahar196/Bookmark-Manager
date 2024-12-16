const API_URL = 'http://localhost:3000/bookmarks';

//fetch bookmarks when the page loads

document.addEventListener('DOMContentLoaded',()=>{
    fetchBookmarks();
})


//fetch bookmarks from the backend

function fetchBookmarks(){
    fetch(API_URL)
        .then(response => response.json())
        .then(bookmarks =>{
            bookmarks.forEach(bookmark => addBookmarkToDOM(bookmark));
        })
        .catch(error => console.log("error fetching bookmarks :",error));
}



// Add a bookmark to the DOM
function addBookmarkToDOM(bookmark){
    const bookmarkList = document.getElementById('bookmark-list');

    const bookmarkItem = document.createElement('li');
    bookmarkItem.classList.add('bookmark-item');
    bookmarkItem.setAttribute('data-id',bookmark.id);

    const url = document.createElement('span');
    console.log(bookmark.bookmark?.url)
    url.textContent = `${bookmark.url} )${bookmark.category})`;

    const deleteBtn = document.createElement('button');
    deleteBookmark.textContent = 'Delete';
    deleteBtn.addEventListener('click',()=> deleteBookmark(bookmark.id));

    bookmarkItem.appendChild(url);
    bookmarkItem.appendChild(deleteBtn);

    bookmarkList.appendChild(bookmarkItem);
}


// Add a new bookmark
document.getElementById('submit').addEventListener('click',()=>{
    const urlInput = document.getElementById('bookmark-url');
    const categoryInput = document.getElementById('bookmark-category');

    if(!urlInput || !categoryInput|| urlInput.value.trim() === ' ' || categoryInput.value.trim() === ' ' ){
        console.log('Please provide both url and category');
        return;
    }

    const newBookmarks = { url: urlInput.value, category: categoryInput.value };

    fetch(API_URL, {
        method: 'Post',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(newBookmarks),
    })
    .then(response => response.json())
    .then(bookmark =>{
        addBookmarkToDOM(bookmark);
        urlInput.value = ' ';
    })
    .catch(error => console.error('Error adding a bookmark',error));
})


//delete a bookmark
function deleteBookmark(id){
    fetch(`${API_URL}/${id}`,{
        method: 'DELETE',
    })
       .then(()=>{
        const bookmarkItem = document.querySelector(`[data-id ='${id}']`);
        bookmarkItem.remove();
       })
       .catch(error => console.error('Error deleting bookmark : ', error));
}
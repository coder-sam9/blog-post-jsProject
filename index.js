const url='https://crudcrud.com/api/9c0a5a5da9284fe9b45277a9bfacdf8e/blogsdata';
let blogCount = 0;

// Function to Update the Display Count
function updateBlogCount() {
    document.getElementById('blog-count').innerText = blogCount;
}
async function handleFormSubmit(event) {
    event.preventDefault();
    try {
        const details={
            imgUrl:event.target.imgSource.value,
            title:event.target.title.value,
            description:event.target.description.value,
        }
     const response=  await axios.post(url,details);

     console.log(response.data._id);
     const identifier=`${response.data._id}`
     localStorage.setItem(identifier,JSON.stringify(details))
     const cardDiv=document.createElement('div');
     cardDiv.className='blog';
     cardDiv.style='margin:5px 5px 5px 0px; border:solid 2px black padding:10px'
     cardDiv.setAttribute('blogId',identifier);
     const title=document.createElement('h2');
     const newTitleText=document.createTextNode(details.title);
     title.appendChild(newTitleText);
     cardDiv.appendChild(title);
     const img=document.createElement('img');
     img.src=details.imgUrl;
     img.style = 'width:200px; height:200px;';
     cardDiv.appendChild(img);
     const description=document.createElement('p');
     description.appendChild(document.createTextNode(details.description));
     cardDiv.appendChild(description);
     document.querySelector('form').appendChild(cardDiv);
     const deleteBtn=document.createElement('button');
     deleteBtn.appendChild(document.createTextNode('Delete'));
     deleteBtn.addEventListener('click',handleDelete)
     deleteBtn.setAttribute('data-id',identifier);
     deleteBtn.type='button'

     cardDiv.appendChild(deleteBtn);
     const editBtn=document.createElement('button');
     editBtn.appendChild(document.createTextNode('Edit'));
     editBtn.addEventListener('click',handleEdit)
     editBtn.setAttribute('data-id',identifier);
     editBtn.type='button'
     cardDiv.appendChild(editBtn);
     blogCount++;
     updateBlogCount()
       
    } catch (error) {
        console.error(error)
    }
}
async function handleEdit(event) {
    try {
        const id=event.target.dataset.id;
    const details=JSON.parse(localStorage.getItem(id));
    await axios.delete(url+'/'+id);
    document.getElementById('imgSource').value=details.imgUrl;
    document.getElementById('title').value=details.title;
    document.getElementById('description').value=details.description;
    event.target.parentElement.remove();
    localStorage.removeItem(id);
    blogCount--;
    updateBlogCount()
    } catch (error) {
        console.log(error)
    }
    
    
    
}
async function handleDelete(event) {
    try {
        const id=event.target.dataset.id;
    await axios.delete(url+'/'+id);
    const details=JSON.parse(localStorage.getItem(id));
    event.target.parentElement.remove();
    localStorage.removeItem(id);
    blogCount--;
    updateBlogCount()
    } catch (error) {
        console.log(error);
        
    }
    
}


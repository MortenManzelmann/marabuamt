export default function(){
  const deleteButton = document.getElementsByClassName('.delete-post')[0];
  deleteButton.addEventListener('click',
    (event) => {
      const id = event.target.attr('data-id');
      axios.delete(`/posts/${id}`)
      .then((response) =>{
        alert('Deleting Article');
        window.location.href='/';
      })
      .catch((error) => {
        console.log(error);
      });
    }
);
}

const xhr = new XMLHttpRequest();

xhr.addEventListener("load", () =>{
  console.log(xhr.response);
});//wait until loaded to get the response to avoid it being undefined

xhr.open("GET", 'https://supersimplebackend.dev');
xhr.send();
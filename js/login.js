// function load(){
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://my-json-server.typicode.com/sekerbek/MockJson/users");
// xhr.send();
// console.log(JSON.parse(xhr.responseText));
// }
// function getf() {
//
//
// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myObj = JSON.parse(this.responseText);
//     document.getElementById("password").innerHTML = myObj.password;
//   }
// };
// xmlhttp.open("GET", "http://my-json-server.typicode.com/sekerbek/MockJson/users", true);
// xmlhttp.send();}
//  getf();
 //
 // async function Check() {
 //   let responce = await fetch('http://my-json-server.typicode.com/sekerbek/MockJson/users')
 //   let content = await responce.text()
 //   return Promise.resolve(content)}
 //   console.log(content);
 //   var email = document.getElementById("email").value;
 //   var password = document.getElementById("password").value;
 //   var userAndPasswordPresent = false;
 //   for (var i in content) {
 //       if (content[i].email === email && content[i].password === password) {
 //           userAndPasswordPresent = true;
 //       }
 //   }
 //   console.log(userAndPasswordPresent);
 //   console.log(email);
 // }
 // Check()
 function fakeFetch ()
 {
   return Promise.resolve([
     {"email": "sekerbekdariya@gmail.com", "password": "Dariya0301"}

   ]);
 }

 const form = document.querySelector('form');

 form.addEventListener( 'submit', function(e){
   e.preventDefault();

   const emailInput = document.querySelector('#email').value;
   const passwordInput = document.querySelector('#password').value;

   const object = {
     email: emailInput,
    password: passwordInput
   };

   fakeFetch()
 .then( users => {

  // Check each user in users and try to find a match
  for ( let user of users )
  {
    // Destructuring email and password from the current user
    let { email, password } = user;

    // Comparing email and password from active user with the ones in object
    if ( email === object.email && password === object.password )
    {
      // Found, do something
      console.log( 'found!' );
      return;
    }
  }

  // Not found, do something else
  console.log( 'Not found...' );

})
.catch(error => console.log( error ) );

});

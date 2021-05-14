function onSignIn(googleUser) {
  const { id_token } = googleUser.getAuthResponse();

  const profile = googleUser.getBasicProfile();
  console.log(`ID: ${profile.getId()}`); // Do not send to your backend! Use an ID token instead.
  console.log(`Name: ${profile.getName()}`);
  console.log(`Image URL: ${profile.getImageUrl()}`);
  console.log(`Email: ${profile.getEmail()}`); // This is null if the 'email' scope is not present.

  console.log(id_token);
  const googleButton = document.querySelector('.g-signin2');
  googleButton.addEventListener('click', async (event) => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ token: id_token }),
    });
    console.log(response);
    if (response.status === 200) {
      window.location.assign('/profile');
    }
  });
}

function signOut() {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log('User signed out.');
  });
}

// const xhr = new XMLHttpRequest();
// xhr.open('POST', '/login');
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.onload = function () {
//   console.log(`Signed in as: ${xhr.responseText}`);
// };
// xhr.send(JSON.stringify({ token: id_token }));

// const googleButton = document.querySelector('.g-signin2');
// console.log('gB', googleButton);

// googleButton.addEventListener('click', async (event) => {
//   event.preventDefault();
//   // const eventGoogleBut = event.target.dataset.onsuccess;
//   // console.log('eventGoogleBut: -----', event.target);
//   // if (eventGoogleBut) {
//   console.log('ЗАХОЖУ ЧЕРЕЗ ГУГЛ');
//   console.log(id_token);
//   const response = await fetch('/login', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: { token: id_token },
//   });
//   if (response.status === 200) {
//     window.location.assign('/profile');
//   }
//   // }
// });

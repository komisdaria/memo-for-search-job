const post = document.getElementById('myPosts');
const postBody = document.querySelector('.post-body');
const oneMemo = document.querySelector('.oneMemo');
const conteinerForUpdated = document.createElement('div');
conteinerForUpdated.className = 'forUpdatedParty';
const divChange = document.getElementById('divChange');
divChange.appendChild(conteinerForUpdated);

post.addEventListener('click', async (event) => {
  event.preventDefault();
  if (event.target.dataset.delete) {
    console.log('УДАЛЯЮ');
    const response = await fetch(`/profile/${event.target.dataset.delete}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id: event.target.dataset.delete }),
    });
    if (response.status === 200) {
      window.location.assign('/profile');
    }
  }
  if (event.target.dataset.edit) {
    const inputForUpdate = document.createElement('input');
    inputForUpdate.type = 'text';
    inputForUpdate.name = 'textForUpdate';
    conteinerForUpdated.appendChild(inputForUpdate);

    const butSubm = document.createElement('button');
    butSubm.type = 'button';
    butSubm.innerText = 'Подвтердить изменения';
    conteinerForUpdated.appendChild(butSubm);

    butSubm.addEventListener('click', async (e) => {
      // console.log(event.target.dataset.edit);
      const response = await fetch(`/profile/${event.target.dataset.edit}/edit`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ findTextForUpdate: inputForUpdate.value }),
      });
      if (response.status === 200) {
        const replay = await response.json();
        console.log(replay);
        postBody.innerText = replay.text;
      }
    });
  }
});

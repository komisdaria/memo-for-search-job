const post = document.getElementById('myPosts');
const postBody = document.querySelector('.post-body');
// const oneMemo = document.querySelector('.oneMemo');
const conteinerForUpdated = document.createElement('div');
conteinerForUpdated.className = 'forUpdatedMemo';
const divChange = document.getElementById('divChange');
divChange.appendChild(conteinerForUpdated);

post.addEventListener('click', async (event) => {
  event.preventDefault();
  const buttonEditMemoProfile = event.target.dataset.edit;
  const buttonDeleteMemoProfile = event.target.dataset.delete;
  if (buttonDeleteMemoProfile) {
    console.log('УДАЛЯЮ');
    const response = await fetch(`/profile/${buttonDeleteMemoProfile}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ id: buttonDeleteMemoProfile }),
    });
    if (response.status === 200) {
      window.location.assign('/profile');
    }
  }
  if (buttonEditMemoProfile) {
    const mainContainer = document.querySelector('.mainContainer');
    const divSecondForChangeMemo = document.createElement('div');
    divSecondForChangeMemo.className = 'cell';
    const headerUpdate = document.createElement('h2');
    headerUpdate.innerText = 'Внесите изменения';
    divSecondForChangeMemo.appendChild(headerUpdate);
    mainContainer.appendChild(divSecondForChangeMemo);

    const p1 = document.createElement('p');
    p1.className = 'p-style';
    p1.innerText = 'Название компании';
    divSecondForChangeMemo.appendChild(p1);
    const inputForUpdateCompany = document.createElement('input');
    inputForUpdateCompany.type = 'text';
    inputForUpdateCompany.name = 'company';
    inputForUpdateCompany.placeholder = 'Название компании';
    divSecondForChangeMemo.appendChild(inputForUpdateCompany);

    const p2 = document.createElement('p');
    p2.className = 'p-style';
    p2.innerText = 'Адрес компании';
    divSecondForChangeMemo.appendChild(p2);
    const inputForUpdateAdress = document.createElement('input');
    inputForUpdateAdress.type = 'text';
    inputForUpdateAdress.name = 'adress';
    inputForUpdateAdress.placeholder = 'Адрес компании';
    divSecondForChangeMemo.appendChild(inputForUpdateAdress);

    const p3 = document.createElement('p');
    p3.className = 'p-style';
    p3.innerText = 'Дата и время интервью';
    divSecondForChangeMemo.appendChild(p3);
    const inputForUpdateDate = document.createElement('input');
    inputForUpdateDate.type = 'datetime-local';
    inputForUpdateDate.name = 'datetime';
    inputForUpdateDate.placeholder = 'Дата и время интервью';
    divSecondForChangeMemo.appendChild(inputForUpdateDate);

    const updateText = document.createElement('textarea');
    updateText.rows = '7';
    updateText.cols = '50';
    updateText.name = 'text';
    updateText.placeholder = 'Краткие требования, указанные в вакансии';
    divSecondForChangeMemo.appendChild(updateText);

    const updateInfoCompany = document.createElement('textarea');
    updateInfoCompany.rows = '7';
    updateInfoCompany.cols = '50';
    updateInfoCompany.name = 'infoAboutCompany';
    updateInfoCompany.placeholder = 'Что я узнал о компании до интервью';
    divSecondForChangeMemo.appendChild(updateInfoCompany);

    const updateMyQuestions = document.createElement('textarea');
    updateMyQuestions.rows = '7';
    updateMyQuestions.cols = '50';
    updateMyQuestions.name = 'myQuestions';
    updateMyQuestions.placeholder = 'Мои вопросы для интервью';
    divSecondForChangeMemo.appendChild(updateMyQuestions);

    const headerSecondUpdate = document.createElement('h2');
    headerSecondUpdate.innerText = 'Заполните ниже все поля после интервью';
    divSecondForChangeMemo.appendChild(headerSecondUpdate);

    const updateCompanyQuestions = document.createElement('textarea');
    updateCompanyQuestions.rows = '7';
    updateCompanyQuestions.cols = '50';
    updateCompanyQuestions.name = 'companyQuestions';
    updateCompanyQuestions.placeholder = 'Какие важные вопросы мне задавали, над которыми я могу поработать, что улучшить, какие задачи были';
    divSecondForChangeMemo.appendChild(updateCompanyQuestions);

    const p4 = document.createElement('p');
    p4.className = 'p-style';
    p4.innerText = 'Зарплата по итогам';
    divSecondForChangeMemo.appendChild(p4);
    const updateSalary = document.createElement('input');
    updateSalary.type = 'number';
    updateSalary.name = 'salary';
    updateSalary.placeholder = 'Сумма в рублях';
    divSecondForChangeMemo.appendChild(updateSalary);

    const p5 = document.createElement('p');
    p5.className = 'p-style';
    p5.innerText = 'Кто проводил интервью (имя, должность)';
    divSecondForChangeMemo.appendChild(p5);
    const updateWithWhoWasInterview = document.createElement('input');
    updateWithWhoWasInterview.type = 'text';
    updateWithWhoWasInterview.name = 'withWhoWasInterview';
    updateWithWhoWasInterview.placeholder = 'ФИО, должность';
    divSecondForChangeMemo.appendChild(updateWithWhoWasInterview);

    const p6 = document.createElement('p');
    p6.className = 'p-style';
    p6.innerText = 'Контакты, тел, почта';
    divSecondForChangeMemo.appendChild(p6);
    const updateContactInfo = document.createElement('input');
    updateContactInfo.type = 'text';
    updateContactInfo.name = 'contactInfo';
    updateContactInfo.placeholder = 'телефон, почта';
    divSecondForChangeMemo.appendChild(updateContactInfo);

    const p7 = document.createElement('p');
    p7.className = 'p-style';
    p7.innerText = 'Результат встречи';
    divSecondForChangeMemo.appendChild(p7);
    const updateAfterInterview = document.createElement('textarea');
    updateAfterInterview.rows = '7';
    updateAfterInterview.cols = '50';
    updateAfterInterview.name = 'memoAfterInterview';
    updateAfterInterview.placeholder = 'Резултаты интервью, о чем договорились, может созвониться; карьерный рост, бонусная система, ваши впечатления и оценка';
    divSecondForChangeMemo.appendChild(updateAfterInterview);

    const butSubmEdit = document.createElement('button');
    butSubmEdit.type = 'button';
    butSubmEdit.innerText = 'Подвтердить изменения';
    divSecondForChangeMemo.appendChild(butSubmEdit);


    butSubmEdit.addEventListener('click', async (e) => {
      const response = await fetch(`/edit/${buttonEditMemoProfile}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          updCompany: inputForUpdateCompany.value,
          updAdress: inputForUpdateAdress.value,
          updDate: inputForUpdateDate.value,
          findTextForUpdate: updateText.value,
          infoCompany: updateInfoCompany.value,
          myQues: updateMyQuestions.value,
          compQues: updateCompanyQuestions.value,
          updSalary: updateSalary.value,
          updWhoWasInt: updateWithWhoWasInterview.value,
          contactInfo: updateContactInfo.value,
          afterInterview: updateAfterInterview.value,
        }),
      });
      if (response.status === 200) {
        window.location.assign(`/edit/${buttonEditMemoProfile}`);
        const replay = await response.json();
        console.log('replay', replay);
        postBody.innerText = replay.text;
        // post.appendChild(postBody);
      }
    });
  }
});

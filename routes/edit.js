const { Router } = require('express');
const User = require('../models/user.model');
const Memo = require('../models/memo.model');

const router = Router();

router
  .route('/:id')
  .put(async (req, res) => {
    try {
      if (req.session.username) {
        const idMemo = req.params.id;
        console.log('idMemo EDIT ', idMemo);
        const {
          updCompany,
          updAdress,
          updDate,
          findTextForUpdate,
          updSalary,
          infoCompany, myQues, compQues, updWhoWasInt, contactInfo, afterInterview,
        } = req.body;

        const editedMemo = await Memo.findByIdAndUpdate(
          req.params.id,
          {
            company: updCompany,
            adress: updAdress,
            date: updDate,
            text: findTextForUpdate,
            salary: updSalary,
          },
          { new: true },
        );
        const fullEditedMemo = await Memo.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              infoAboutCompany: infoCompany,
              myQuestions: myQues,
              companyQuestions: compQues,
              withWhoWasInterview: updWhoWasInt,
              contactInfo,
              memoAfterInterview: afterInterview,
            },
          },
        );
        console.log(fullEditedMemo);
        return res.json(editedMemo, fullEditedMemo);
      }
    } catch (error) {
      return res.render('error', { errorMessage: 'Что-то пошло не так в profile.js rote /edit:id.' });
    }
  });

// router
//   .route('/:id')
//   .put(async (req, res) => {
//     if (req.session.username) {
//       const idMemo = req.params.id;
//       console.log('idMemo EDIT ', idMemo);
//       const {
//         updCompany,
//         updAdress,
//         updDate,
//         findTextForUpdate,
//         updSalary,
//         infoCompany, myQues, compQues, updWhoWasInt, contactInfo, afterInterview,
//       } = req.body;

//       const editedMemo = await Memo.findByIdAndUpdate(
//         req.params.id,
//         {
//           company: updCompany,
//           adress: updAdress,
//           date: updDate,
//           text: findTextForUpdate,
//           salary: updSalary,
//         },
//         { new: true },
//       );
//       const fullEditedMemo = await Memo.findByIdAndUpdate(
//         req.params.id,
//         {
//           $push: {
//             infoAboutCompany: infoCompany,
//             myQuestions: myQues,
//             companyQuestions: compQues,
//             withWhoWasInterview: updWhoWasInt,
//             contactInfo,
//             memoAfterInterview: afterInterview,
//           },
//         },
//       );
//       console.log(fullEditedMemo);
//       return res.json(editedMemo, fullEditedMemo);
//     }
//     return res.render('error', { errorMessage: 'Что-то пошло не так в profile rote /edit:id' });
//   });

module.exports = router;

/* eslint-disable max-len */
import sendEmail from './email.mjs';

/*
 * ========================================================
 *                  Controller Functions
 * ========================================================
 */
export default function initSubmissionsController(db) {
  /**
 * @desc to return the form page
 */
  const getFormPage = async (request, response) => {
    const data = {
      status: 'none',
    };
    if (response.locals.status) {
      data.status = response.locals.status;
    }
    response.render('form', data);
  };

  /**
 * @desc function to update DB with new data and send email
 */
  const submitForm = async (request, response, next) => {
    try {
      // retrieve info from request
      const data = request.body;
      data.image = [];
      data.attachments = [];
      if (request.files.length !== 0) {
        request.files.forEach((image) => {
          data.image.push(image.filename);
          data.attachments.push({ path: `${image.path}` });
        });
      }
      // create new entry in DB
      const newSub = await db.Submission.create({
        firstName: data.firstname,
        lastName: data.lastname,
        description: data.description,
        email: data.email,
        image: data.image,
      });

      // define email content
      const mailOptions = {
        from: 'Automated Message',
        to: newSub.email,
        subject: 'Form has been submitted',
        text: 'Thank you for submitting the form',
        html: `
        <h1>Thank you for submitting the form</h1>
        <p>First Name: ${newSub.firstName}</p>
        <p>Last Name: ${newSub.lastName}</p>
        <p>Description: ${newSub.description}</p>
        <p>Images: ${newSub.image.length}</p>`,
        attachments: data.attachments,
      };

      // send email to recipient. params in email.mjs
      await sendEmail(mailOptions);

      // pass success status to next middleware function
      response.locals.status = 'success';
      next();
    } catch (error) {
      console.log(error);
      // pass failed status to next middleware function
      response.locals.status = 'failed';
      next();
    }
  };
  return {
    getFormPage,
    submitForm,
  };
}

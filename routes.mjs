/* eslint-disable no-unused-vars */
import multer from 'multer';
import db from './models/index.mjs';
import initSubmissionsController from './controllers/submission.mjs';

// define location for where uploads will be stored
const multerUpload = multer({ dest: 'uploads/' });

export default function bindRoutes(app) {
  const SubmissionController = initSubmissionsController(db);

  // .... GET ROUTES .... //
  // to get / render form page
  app.get('/', SubmissionController.getFormPage);

  // .... POST ROUTES .... //
  // to upload imaages, post entry into DB, send email and reload form page
  app.post('/submitForm', multerUpload.array('image'), SubmissionController.submitForm, SubmissionController.getFormPage);
}

import Questionaire from './Questionaire';
import axios from 'axios';
import host from './host';

const QuestionaireServiceMGO = {

  newQuestionaire: typeName => {
    return new Questionaire(typeName);
  },

  /**
   * Save a single survey to the database.
   */
  persist: async survey => {
    try {
      await axios.post(host + 'survey', survey);

      return "survey saved";
    } catch (err) {
      console.log(err);
      return err;
    }
  },

  /**
   * Delete all surveys by name.
   */
  delete: async surveyName => {
    try {
      return axios.delete(host + 'surveys', { data: { name: surveyName } });
    } catch (err) {
      return err;
    }
  },

  /**
   * Update an existing survey.
   */
  update: survey => {
      axios.post(host + 'update', survey)
        .catch(err => err);
  },

  /**
   * retrieve a particular type of questinaire
   * given the id of the appropriate user.
   */
  getBlankSurveyByOwnerId: async ownerId => {
    try {
      const blankSurvey = await axios.post(host + 'blankSurveyFor', { participantId: ownerId });

      return blankSurvey.data;
    } catch (err) {
      return err;
    }
  },

  /**
   * Retrieve all surveys.
   */
  getSurveys: async () => {
    try {
      const queryResult = await axios.get(host + 'allSurveys');

      return queryResult.data;
    } catch (err) {
      return err;
    }
  },

  /**
   * Get a created, but unused survey
   * by it's name.
   */
  getBlankSurveyByName: async surveyName => {
    try {
      const queryResult = await axios.post(host + 'blankSurveyByType', { typeName: surveyName });

      return queryResult.data;
    } catch (err) {
      return err;
    }
  },

  /**
   * Get all completed surveys by survey name.
   */
  getCompletedByName: async surveyName => {
    try {
      const queryResult = await axios.post(host + 'surveyByType', { typeName: surveyName });

      return queryResult.data;
    } catch (err) {
      return err;
    }
  },

  /**
   * Retrieve a completed survey for a given owner.  
   * Both the owner, and the survey type are required
   * as parameters to avoid retrieving multiple surveys.
   */
  getCompletedByOwner: async (owner, surveyName) => {
    try {
      const survey = await axios.post(host + 'surveyByOwner', { owner: owner, survey: surveyName });

      return survey.data;
    } catch (err) {
      return err;
    }
  },


  /**
   * Add participants for a survey named surveyName given the
   * survey name and a comma separated list of names/participants.
   */
  addMultSurveyTakers: async (surveyName, participants) => {
    try {
      await axios.post(host + 'participant',
        {
          surveyName: surveyName,
          names: participants
        });

      return "OK";
    } catch (err) {
      return err;
    }
  },

  /**
   * Return all the participants signed up to 
   * take the survey 'surveyName'.
   */
  getUsersBySurvey: async surveyName => {
    try {
      const result = await axios.post(host + 'surveyTakers', { surveyName: surveyName });
      
      return result.data;
    } catch (err) {
      return err;
    }
  }

}
export default QuestionaireServiceMGO;
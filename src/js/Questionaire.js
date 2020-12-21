// The foundation for a survey quesitonaire 
///////////////////////////////////////////

export default class Questionaire {
  constructor(questionaireName) {
    this.owner  = "";
    this.questionaireTypeName = questionaireName;
    this.questions = [];
  }

  addQuestion = newQuestion => {
    this.questions.push(newQuestion);
  }
}
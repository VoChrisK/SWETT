import * as QuestionsApiUtil from './../util/questions_util';

export const recordQuestion = idx => {
    return ({
        type: RECORD_QUESTION,
        idx
    });
}

const receiveQuestions = questions => {
    return ({
        type: RECEIVE_QUESTIONS,
        questions
    });
};

const receiveQuestion = question => {
    return ({
        type: RECEIVE_QUESTION,
        question
    });
};

const removeQuestion = questionId => {
    return ({
        type: REMOVE_QUESTION,
        questionId
    });
}

export const requestQuestions = categoryId => dispatch => {
    return QuestionsApiUtil.fetchQuestions(categoryId)
        .then(questions => {
            dispatch(receiveQuestions(questions.data))
        })
};

export const requestQuestion = questionId => dispatch => {
    return QuestionsApiUtil.fetchQuestion(questionId)
        .then(question => dispatch(receiveQuestion(question.data)))
};

export const createQuestion = question => dispatch => {
    return QuestionsApiUtil.createQuestion(question)
        .then(newQuestion => dispatch(receiveQuestion(newQuestion.data)))
};

export const updateQuestion = question => dispatch => {
    return QuestionsApiUtil.updateQuestion(question)
        .then(updatedQuestion => dispatch(receiveQuestion(updatedQuestion.data)))
};

export const deleteQuestion = questionId => dispatch => {
    return QuestionsApiUtil.deleteQuestion(questionId)
        .then(() => dispatch(removeQuestion(questionId)))
};

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const REMOVE_QUESTION = "REMOVE_QUESTION";
export const RECORD_QUESTION = "RECORD_QUESTION";
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import { QuestionActionTypes } from './Types'
import { QuestionSet, DashboardAPI, InstantFeedBackAPI, QuizzesReportAPI } from '../../services/Config';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchQuestionSet {
    type: QuestionActionTypes.FETCH_QUESTION;
}

interface FetchQuestionSetSuccess {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS;
    payload: any;
}

interface FetchQuestionSetFail {
    type: QuestionActionTypes.FETCH_QUESTION_FAIL;
}

export const fetchQuestionSetPost = (loadMoreType: any): ThunkResult<void> => async dispatch => {
    handleFetchQuestionSet(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuestionSet.Question, {
            params: loadMoreType,
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
        handleFetchQuestionSetSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionSetFail(dispatch);
    }
};

export const handleFetchQuestionSet = (dispatch: Dispatch<FetchQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.FETCH_QUESTION });
};

export const handleFetchQuestionSetSuccess = (
    dispatch: Dispatch<FetchQuestionSetSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });

};

export const handleFetchQuestionSetFail = (dispatch: Dispatch<FetchQuestionSetFail>) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_FAIL
    });
};

//Add Question set

interface AddQuestionSet {
    type: QuestionActionTypes.ADD_QUESTION;
}

interface AddQuestionSetSuccess {
    type: QuestionActionTypes.ADD_QUESTION_SUCCESS;
    payload: any;
}

interface AddQuestionSetFail {
    type: QuestionActionTypes.ADD_QUESTION_FAIL;
    payload: any;
}

export const addQuestion = (question: any): ThunkResult<void> => async dispatch => {
    handleAddSchool(dispatch);

    try {
        const response: AxiosResponse<any> = await baseAPI.post(QuestionSet.Question, question,
            { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddSchoolSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddSchoolFail(dispatch, response.data);
        }
    } catch (e) {
        handleAddSchoolFail(dispatch, e);
    }
};

const handleAddSchool = (dispatch: Dispatch<AddQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION });
};

const handleAddSchoolSuccess = (
    dispatch: Dispatch<AddQuestionSetSuccess>,
    response: any
) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION_SUCCESS, payload: response });
    history.push('/question');
};

const handleAddSchoolFail = (dispatch: Dispatch<AddQuestionSetFail>, response: any) => {
        dispatch({ type: QuestionActionTypes.ADD_QUESTION_FAIL, 
            payload: response,
            errors: response.data
        });
};


//Add Question set

interface AddMoreQuestionSet {
    type: QuestionActionTypes.ADD_QUESTION;
}

interface AddMoreQuestionSetSuccess {
    type: QuestionActionTypes.ADD_QUESTION_SUCCESS;
    payload: any;
}

interface AddMoreQuestionSetFail {
    type: QuestionActionTypes.ADD_QUESTION_FAIL;
    payload: any;
}

export const AddMoreQuestionPost = (question: any): ThunkResult<void> => async dispatch => {
    handleAddMoreQuestionSet(dispatch);

    try {
        const response: AxiosResponse<any> = await baseAPI.put(`${QuestionSet.Question}${question.id}/`, question,
            { headers: { "Authorization": localStorage.getItem('token') } });
        if (response.data.status === true) {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleAddMoreQuestionSetSuccess(dispatch, response.data);
        } else {
            toaster.notify(response.data.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
            handleddMoreQuestionSetFail(dispatch, response.data);
        }
    } catch (e) {
        handleddMoreQuestionSetFail(dispatch, e);
    }
};

const handleAddMoreQuestionSet = (dispatch: Dispatch<AddMoreQuestionSet>) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION });
};

const handleAddMoreQuestionSetSuccess = (
    dispatch: Dispatch<AddMoreQuestionSetSuccess>,
    response: any
) => {
    dispatch({ type: QuestionActionTypes.ADD_QUESTION_SUCCESS, payload: response });
    history.push('/question');
};

const handleddMoreQuestionSetFail = (dispatch: Dispatch<AddMoreQuestionSetFail>, response: any) => {
    setTimeout(() => {
        dispatch({ type: QuestionActionTypes.ADD_QUESTION_FAIL, payload: response });
    }, notificationMsg.duration);
};

// FETCH Student edit details

interface FetchQuestionSetId {
    type: QuestionActionTypes.FETCH_QUESTION_ID;
}

interface FetchQuestionSetSuccessId {
    type: QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID;
    payload: any;
}

interface FetchQuestionSetFailId {
    type: QuestionActionTypes.FETCH_QUESTION_FAIL_ID;
}

export const fetchQuestionSet = (id: number): ThunkResult<void> => async dispatch => {    
    handleFetchQuestionSetId(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${QuestionSet.Question}${id}/?academic_year=2021`,
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchQuestionSetSuccessId(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionSetFailId(dispatch);
    }
};

export const handleFetchQuestionSetId = (dispatch: Dispatch<FetchQuestionSetId>) => {
    dispatch({ type: QuestionActionTypes.FETCH_QUESTION_ID });
};

const handleFetchQuestionSetSuccessId = (
    dispatch: Dispatch<FetchQuestionSetSuccessId>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID,
        payload: response,
        getData: response.data
    });
};

const handleFetchQuestionSetFailId = (dispatch: Dispatch<FetchQuestionSetFailId>) => {
    dispatch({
        type: QuestionActionTypes.FETCH_QUESTION_FAIL_ID
    });
};

// FETCH Quizzes Barchart Report

interface FetchBarchartReport {
    type: QuestionActionTypes.Bar_chart_Report;
}

interface FetchBarchartReportSuccess {
    type: QuestionActionTypes.Bar_chart_Report_Success;
    payload: any;
}

interface FetchBarchartReportFail {
    type: QuestionActionTypes.Bar_chart_Report_Fail;
}

export const fetchBarchartReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchBarchartReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.quizBarChart,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchBarchartReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchBarchartReportFail(dispatch);
    }
};

export const handleFetchBarchartReport = (dispatch: Dispatch<FetchBarchartReport>) => {
    dispatch({ type: QuestionActionTypes.Bar_chart_Report });
};

const handleFetchBarchartReportSuccess = (
    dispatch: Dispatch<FetchBarchartReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Bar_chart_Report_Success,
        payload: response,
        BarchartReport: response.count
    });
};

const handleFetchBarchartReportFail = (dispatch: Dispatch<FetchBarchartReportFail>) => {
    dispatch({
        type: QuestionActionTypes.Bar_chart_Report_Fail
    });
};

// FETCH question Report View

interface FetchQuestionReportView {
    type: QuestionActionTypes.Question_Report_View;
}

interface FetchQuestionReportViewSuccess {
    type: QuestionActionTypes.Question_Report_View_Success;
    payload: any;
}

interface FetchQuestionReportViewFail {
    type: QuestionActionTypes.Question_Report_View_Fail;
}

export const fetchQuestionReportView = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchQuestionReportView(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.questionReportView,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchQuestionReportViewSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionReportViewFail(dispatch);
    }
};

export const handleFetchQuestionReportView = (dispatch: Dispatch<FetchQuestionReportView>) => {
    dispatch({ type: QuestionActionTypes.Question_Report_View });
};

const handleFetchQuestionReportViewSuccess = (
    dispatch: Dispatch<FetchQuestionReportViewSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Question_Report_View_Success,
        payload: response,
        questionReportView: response.data
    });
};

const handleFetchQuestionReportViewFail = (dispatch: Dispatch<FetchQuestionReportViewFail>) => {
    dispatch({
        type: QuestionActionTypes.Question_Report_View_Fail
    });
};

// FETCH Quizzes Calculations Report

interface FetchCalculationsReport {
    type: QuestionActionTypes.Calculations_Report;
}

interface FetchCalculationsReportSuccess {
    type: QuestionActionTypes.Calculations_Report_Success;
    payload: any;
}

interface FetchCalculationsReportFail {
    type: QuestionActionTypes.Calculations_Report_Fail;
}

export const fetchCalculationsReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchCalculationsReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.quizCalculation,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchCalculationsReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchCalculationsReportFail(dispatch);
    }
};

export const handleFetchCalculationsReport = (dispatch: Dispatch<FetchCalculationsReport>) => {
    dispatch({ type: QuestionActionTypes.Calculations_Report });
};

const handleFetchCalculationsReportSuccess = (
    dispatch: Dispatch<FetchCalculationsReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Calculations_Report_Success,
        payload: response,
        CalculationsReport: response.count
    });
};

const handleFetchCalculationsReportFail = (dispatch: Dispatch<FetchCalculationsReportFail>) => {
    dispatch({
        type: QuestionActionTypes.Calculations_Report_Fail
    });
};

// FETCH Quizzes Question Answers Report

interface FetchQuestionAnswersReport {
    type: QuestionActionTypes.Question_answers_Report;
}

interface FetchQuestionAnswersReportSuccess {
    type: QuestionActionTypes.Question_answers_Report_Success;
    payload: any;
}

interface FetchQuestionAnswersReportFail {
    type: QuestionActionTypes.Question_answers_Report_Fail;
}

export const fetchQuestionAnswersReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchQuestionAnswersReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.quizQuestionList,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchQuestionAnswersReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuestionAnswersReportFail(dispatch);
    }
};

export const handleFetchQuestionAnswersReport = (dispatch: Dispatch<FetchQuestionAnswersReport>) => {
    dispatch({ type: QuestionActionTypes.Question_answers_Report });
};

const handleFetchQuestionAnswersReportSuccess = (
    dispatch: Dispatch<FetchQuestionAnswersReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Question_answers_Report_Success,
        payload: response,
        QuestionAnswersReport: response.data
    });
};

const handleFetchQuestionAnswersReportFail = (dispatch: Dispatch<FetchQuestionAnswersReportFail>) => {
    dispatch({
        type: QuestionActionTypes.Question_answers_Report_Fail
    });
};

// FETCH Quizzes Student Report

interface FetchQuizzesStudentReport {
    type: QuestionActionTypes.Quizzes_Student_Report;
}

interface FetchQuizzesStudentReportSuccess {
    type: QuestionActionTypes.Quizzes_Student_Report_Success;
    payload: any;
}

interface FetchQuizzesStudentReportFail {
    type: QuestionActionTypes.Quizzes_Student_Report_Fail;
}

export const fetchQuizzesStudentReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchQuizzesStudentReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.quizStudentDetails,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchQuizzesStudentReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuizzesStudentReportFail(dispatch);
    }
};

export const handleFetchQuizzesStudentReport = (dispatch: Dispatch<FetchQuizzesStudentReport>) => {
    dispatch({ type: QuestionActionTypes.Quizzes_Student_Report });
};

const handleFetchQuizzesStudentReportSuccess = (
    dispatch: Dispatch<FetchQuizzesStudentReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Quizzes_Student_Report_Success,
        payload: response,
        QuizzesStudentReport: response.count
    });
};

const handleFetchQuizzesStudentReportFail = (dispatch: Dispatch<FetchQuizzesStudentReportFail>) => {
    dispatch({
        type: QuestionActionTypes.Quizzes_Student_Report_Fail
    });
};

// FETCH Single Quiz Question List

interface FetchSingleQuizQuestionList {
    type: QuestionActionTypes.Single_Quiz_Question_List_List;
}

interface FetchSingleQuizQuestionListSuccess {
    type: QuestionActionTypes.Single_Quiz_Question_List_Success;
    payload: any;
}

interface FetchSingleQuizQuestionListFail {
    type: QuestionActionTypes.Single_Quiz_Question_List_Fail;
}

export const getSingleQuizQuestionList = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchSingleQuizQuestionList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.singleQuizQuestionList,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchSingleQuizQuestionListSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSingleQuizQuestionListFail(dispatch);
    }
};

export const handleFetchSingleQuizQuestionList = (dispatch: Dispatch<FetchSingleQuizQuestionList>) => {
    dispatch({ type: QuestionActionTypes.Single_Quiz_Question_List_List });
};

const handleFetchSingleQuizQuestionListSuccess = (
    dispatch: Dispatch<FetchSingleQuizQuestionListSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Single_Quiz_Question_List_Success,
        payload: response,
        singleQuizQuestionList: response.data
    });
};

const handleFetchSingleQuizQuestionListFail = (dispatch: Dispatch<FetchSingleQuizQuestionListFail>) => {
    dispatch({
        type: QuestionActionTypes.Single_Quiz_Question_List_Fail
    });
};

// FETCH Single Quiz Question List

interface FetchSingleQuizStudent {
    type: QuestionActionTypes.Single_Quiz_Student;
}

interface FetchSingleQuizStudentSuccess {
    type: QuestionActionTypes.Single_Quiz_Student_Success;
    payload: any;
}

interface FetchSingleQuizStudentFail {
    type: QuestionActionTypes.Single_Quiz_Student_Fail;
}

export const getSingleQuizStudent = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchSingleQuizStudent(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuizzesReportAPI.singleQuizStudent,
        { 
            params: postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchSingleQuizStudentSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSingleQuizStudentFail(dispatch);
    }
};

export const handleFetchSingleQuizStudent = (dispatch: Dispatch<FetchSingleQuizStudent>) => {
    dispatch({ type: QuestionActionTypes.Single_Quiz_Student });
};

const handleFetchSingleQuizStudentSuccess = (
    dispatch: Dispatch<FetchSingleQuizStudentSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Single_Quiz_Student_Success,
        payload: response,
        singleQuizStudent: response.data
    });
};

const handleFetchSingleQuizStudentFail = (dispatch: Dispatch<FetchSingleQuizStudentFail>) => {
    dispatch({
        type: QuestionActionTypes.Single_Quiz_Student_Fail
    });
};

// This is the function used to teacher overall performance details

interface FetchOverallPerformance {
    type: QuestionActionTypes.Teacher_Overall_Performance;
}

interface FetchOverallPerformanceSuccess {
    type: QuestionActionTypes.Teacher_Overall_Performance_SUCCESS;
    payload: any;
}

interface FetchOverallPerformanceFail {
    type: QuestionActionTypes.Teacher_Overall_Performance_FAIL;
}

export const getOverallPerformance = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchOverallPerformance(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.teacherOverallPerformance,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchOverallPerformanceSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchOverallPerformanceFail(dispatch);
    }
};

export const handleFetchOverallPerformance = (dispatch: Dispatch<FetchOverallPerformance>) => {
    dispatch({ type: QuestionActionTypes.Teacher_Overall_Performance });
};

const handleFetchOverallPerformanceSuccess = (
    dispatch: Dispatch<FetchOverallPerformanceSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Teacher_Overall_Performance_SUCCESS,
        payload: response,
        teacherOverallPerformance: response.data
    });
};

const handleFetchOverallPerformanceFail = (dispatch: Dispatch<FetchOverallPerformanceFail>) => {
    dispatch({
        type: QuestionActionTypes.Teacher_Overall_Performance_FAIL
    });
};


// This is the function used to Feedback chart details

interface FetchFeedbackBarChart {
    type: QuestionActionTypes.Feedback_Bar_Chart;
}

interface FetchFeedbackBarChartSuccess {
    type: QuestionActionTypes.Feedback_Bar_Chart_Success;
    payload: any;
}

interface FetchFeedbackBarChartFail {
    type: QuestionActionTypes.Feedback_Bar_Chart_Fail;
}

export const getFeedbackBarChart = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchFeedbackBarChart(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(InstantFeedBackAPI.feedbackBarChart,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchFeedbackBarChartSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchFeedbackBarChartFail(dispatch);
    }
};

export const handleFetchFeedbackBarChart = (dispatch: Dispatch<FetchFeedbackBarChart>) => {
    dispatch({ type: QuestionActionTypes.Feedback_Bar_Chart });
};

const handleFetchFeedbackBarChartSuccess = (
    dispatch: Dispatch<FetchFeedbackBarChartSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Bar_Chart_Success,
        payload: response,
        feedbackBarChart: response.data
    });
};

const handleFetchFeedbackBarChartFail = (dispatch: Dispatch<FetchFeedbackBarChartFail>) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Bar_Chart_Fail
    });
};


// This is the function used to Feedback chart details

interface FetchTopicAnalysisReport {
    type: QuestionActionTypes.Topic_Analysis_Report;
}

interface FetchTopicAnalysisReportSuccess {
    type: QuestionActionTypes.Topic_Analysis_Report_Success;
    payload: any;
}

interface FetchTopicAnalysisReporttFail {
    type: QuestionActionTypes.Topic_Analysis_Report_Fail;
}

export const getTopicAnalysisReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchTopicAnalysisReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.topicAnalysisReport,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchTopicAnalysisReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTopicAnalysisReportFail(dispatch);
    }
};

export const handleFetchTopicAnalysisReport = (dispatch: Dispatch<FetchTopicAnalysisReport>) => {
    dispatch({ type: QuestionActionTypes.Topic_Analysis_Report });
};

const handleFetchTopicAnalysisReportSuccess = (
    dispatch: Dispatch<FetchTopicAnalysisReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Topic_Analysis_Report_Success,
        payload: response,
        topicAnalysisReport: response.data
    });
};

const handleFetchTopicAnalysisReportFail = (dispatch: Dispatch<FetchTopicAnalysisReporttFail>) => {
    dispatch({
        type: QuestionActionTypes.Topic_Analysis_Report_Fail
    });
};


// This is the function used to Feedback chart details

interface FetchFedbackSubject {
    type: QuestionActionTypes.Feedback_Subject;
}

interface FetchFedbackSubjectSuccess {
    type: QuestionActionTypes.Feedback_Subject_Success;
    payload: any;
}

interface FetchFedbackSubjectFail {
    type: QuestionActionTypes.Feedback_Subject_Fail;
}

export const getFedbackSubject = (postValue: any): ThunkResult<void> => async dispatch => {   
  
    handleFetchFedbackSubject(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(InstantFeedBackAPI.feedbackSubject,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchFedbackSubjectSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchFedbackSubjectFail(dispatch);
    }
};

export const handleFetchFedbackSubject = (dispatch: Dispatch<FetchFedbackSubject>) => {
    dispatch({ type: QuestionActionTypes.Feedback_Subject });
};

const handleFetchFedbackSubjectSuccess = (
    dispatch: Dispatch<FetchFedbackSubjectSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Subject_Success,
        payload: response,
        feedbackSubject: response.data
    });
};

const handleFetchFedbackSubjectFail = (dispatch: Dispatch<FetchFedbackSubjectFail>) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Subject_Fail
    });
};


// This is the function used to Feedback Student details

interface FetchFeedbackStudent {
    type: QuestionActionTypes.Feedback_Student;
}

interface FetchFeedbackStudentSuccess {
    type: QuestionActionTypes.Feedback_Student_Success;
    payload: any;
}

interface FetchFeedbackStudentFail {
    type: QuestionActionTypes.Feedback_Student_Fail;
}

export const getFeedbackStudent = (postValue: any): ThunkResult<void> => async dispatch => {    
    let filterStudent:any;
    if(postValue){
        if(postValue.optin){
            const result =  postValue.optin.filter((e:any) =>  e);
            let getResult:any = result.toString()
            if(result){
                filterStudent = {
                    feedback_id: postValue.feedback_id,
                    option: getResult.replace(/,(?=\s*$)/, '')
                }
            }
            
        }else {
            filterStudent = {
                feedback_id: postValue.feedback_id
            }
    }
    }
    handleFetchFeedbackStudent(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(InstantFeedBackAPI.feedbackStudent,
        {   params:filterStudent,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchFeedbackStudentSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchFeedbackStudentFail(dispatch);
    }
};

export const handleFetchFeedbackStudent = (dispatch: Dispatch<FetchFeedbackStudent>) => {
    dispatch({ type: QuestionActionTypes.Feedback_Student });
};

const handleFetchFeedbackStudentSuccess = (
    dispatch: Dispatch<FetchFeedbackStudentSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Student_Success,
        payload: response,
        feedbackStudent: response.data
    });
};

const handleFetchFeedbackStudentFail = (dispatch: Dispatch<FetchFeedbackStudentFail>) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Student_Fail
    });
};

// This is the function used to Feedback Pie Chart details

interface FetchFeedbackPieChart {
    type: QuestionActionTypes.Feedback_Pie_Chart;
}

interface FetchFeedbackPieChartSuccess {
    type: QuestionActionTypes.Feedback_Pie_Chart_Success;
    payload: any;
}

interface FetchFeedbackPieChartFail {
    type: QuestionActionTypes.Feedback_Pie_Chart_Fail;
}

export const getFeedbackPieChart = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchFeedbackPieChart(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(InstantFeedBackAPI.feedbackPieChart,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchFeedbackPieChartSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchFeedbackPieChartFail(dispatch);
    }
};

export const handleFetchFeedbackPieChart = (dispatch: Dispatch<FetchFeedbackPieChart>) => {
    dispatch({ type: QuestionActionTypes.Feedback_Pie_Chart });
};

const handleFetchFeedbackPieChartSuccess = (
    dispatch: Dispatch<FetchFeedbackPieChartSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Pie_Chart_Success,
        payload: response,
        FeedbackPieChart: response.data
    });
};

const handleFetchFeedbackPieChartFail = (dispatch: Dispatch<FetchFeedbackPieChartFail>) => {
    dispatch({
        type: QuestionActionTypes.Feedback_Pie_Chart_Fail
    });
};

// This is the function used to Recent Feedback details

interface FetchRecentFeedbackList {
    type: QuestionActionTypes.Recent_Feedback_List;
}

interface FetchRecentFeedbackListSuccess {
    type: QuestionActionTypes.Recent_Feedback_List_Success;
    payload: any;
}

interface FetchRecentFeedbackListFail {
    type: QuestionActionTypes.Recent_Feedback_List_Fail
}

export const getRecentFeedbackList = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchRecentFeedbackList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.recentFeedbackList,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchRecentFeedbackListSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchRecentFeedbackListFail(dispatch);
    }
};

export const handleFetchRecentFeedbackList = (dispatch: Dispatch<FetchRecentFeedbackList>) => {
    dispatch({ type: QuestionActionTypes.Recent_Feedback_List });
};

const handleFetchRecentFeedbackListSuccess = (
    dispatch: Dispatch<FetchRecentFeedbackListSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Recent_Feedback_List_Success,
        payload: response,
        recentFeedbackList: response.data
    });
};

const handleFetchRecentFeedbackListFail = (dispatch: Dispatch<FetchRecentFeedbackListFail>) => {
    dispatch({
        type: QuestionActionTypes.Recent_Feedback_List_Fail
    });
};


// This is the function used to Quiz Report details

interface FetchRecentQuizReport {
    type: QuestionActionTypes.Recent_Quiz_Report;
}

interface FetchRecentQuizReportSuccess {
    type: QuestionActionTypes.Recent_Quiz_Report_Success;
    payload: any;
}

interface FetchRecentQuizReportFail {
    type: QuestionActionTypes.Recent_Quiz_Report_Fail
}

export const getRecentQuizReport = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleFetchRecentQuizReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.recentQuizReport,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchRecentQuizReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchRecentQuizReportFail(dispatch);
    }
};

export const handleFetchRecentQuizReport = (dispatch: Dispatch<FetchRecentQuizReport>) => {
    dispatch({ type: QuestionActionTypes.Recent_Quiz_Report });
};

const handleFetchRecentQuizReportSuccess = (
    dispatch: Dispatch<FetchRecentQuizReportSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Recent_Quiz_Report_Success,
        payload: response,
        recentQuizReport: response.data
    });
};

const handleFetchRecentQuizReportFail = (dispatch: Dispatch<FetchRecentQuizReportFail>) => {
    dispatch({
        type: QuestionActionTypes.Recent_Quiz_Report_Fail
    });
};


// This is the function used to Quiz Report details

interface TeacherSubjectList {
    type: QuestionActionTypes.Teacher_Subject_List;
}

interface TeacherSubjectListSuccess {
    type: QuestionActionTypes.Teacher_Subject_List_Success;
    payload: any;
}

interface TeacherSubjectListFail {
    type: QuestionActionTypes.Teacher_Subject_List_Fail
}

export const getTeacherSubjectList = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleTeacherSubjectList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(QuestionSet.teacherQuestion,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleTeacherSubjectListSuccess(dispatch, response.data);
    } catch (e) {
        handleTeacherSubjectListFail(dispatch);
    }
};

export const handleTeacherSubjectList = (dispatch: Dispatch<TeacherSubjectList>) => {
    dispatch({ type: QuestionActionTypes.Teacher_Subject_List });
};

const handleTeacherSubjectListSuccess = (
    dispatch: Dispatch<TeacherSubjectListSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Teacher_Subject_List_Success,
        payload: response,
        getTeacherSubjectList: response.data
    });
};

const handleTeacherSubjectListFail = (dispatch: Dispatch<TeacherSubjectListFail>) => {
    dispatch({
        type: QuestionActionTypes.Teacher_Subject_List_Fail
    });
};



// This is the function used to Quiz Report details

interface studentRecentQuiz {
    type: QuestionActionTypes.Student_Recent_Quiz;
}

interface studentRecentQuizSuccess {
    type: QuestionActionTypes.Student_Recent_Quiz_Success;
    payload: any;
}

interface studentRecentQuizFail {
    type: QuestionActionTypes.Student_Recent_Quiz_Fail
}

export const getstudentRecentQuiz = (postValue: any): ThunkResult<void> => async dispatch => {    
    handleStudentRecentQuiz(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.studentRecentQuiz,
        {   params:postValue,
            headers: { "Authorization": localStorage.getItem('token') } });
        handleStudentRecentQuizSuccess(dispatch, response.data);
    } catch (e) {
        handleStudentRecentQuizFail(dispatch);
    }
};

export const handleStudentRecentQuiz = (dispatch: Dispatch<studentRecentQuiz>) => {
    dispatch({ type: QuestionActionTypes.Student_Recent_Quiz });
};

const handleStudentRecentQuizSuccess = (
    dispatch: Dispatch<studentRecentQuizSuccess>,
    response: any
) => {
    dispatch({
        type: QuestionActionTypes.Student_Recent_Quiz_Success,
        payload: response,
        studentRecentQuiz: response.data
    });
};

const handleStudentRecentQuizFail = (dispatch: Dispatch<studentRecentQuizFail>) => {
    dispatch({
        type: QuestionActionTypes.Student_Recent_Quiz_Fail
    });
};

export type QuestionAction =
    | FetchQuestionSetSuccess
    | FetchQuestionSetFail
    | FetchQuestionSetSuccessId
    | FetchQuestionSetFailId
    | AddMoreQuestionSetSuccess;
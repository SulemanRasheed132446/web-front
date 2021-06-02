import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import { baseAPI } from '../../Service';
import { LoadMoreType } from '../../components/type';
import { DashboardType } from './Types';
import { DashboardAPI } from '../../services/Config';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

// Fetch Classes
interface FetchDashboard {
    type: DashboardType.FETCH_DASHBOARD;
}

interface FetchDashboardSuccess {
    type: DashboardType.FETCH_DASHBOARD_SUCCESS;
    payload: any;
}

interface FetchDashboardFail {
    type: DashboardType.FETCH_DASHBOARD_FAIL;
}

export const fetchDashboard = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchDashboard(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.dashboard, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchDashboardSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchDashboardFail(dispatch);
    }
};

export const handleFetchDashboard = (dispatch: Dispatch<FetchDashboard>) => {
    dispatch({ type: DashboardType.FETCH_DASHBOARD});
};

export const handleFetchDashboardSuccess = (
    dispatch: Dispatch<FetchDashboardSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_DASHBOARD_SUCCESS,
        payload: response,
        dashboardCount:response.data
    });
    
};

export const handleFetchDashboardFail = (dispatch: Dispatch<FetchDashboardFail>) => {
    dispatch({
        type: DashboardType.FETCH_DASHBOARD_FAIL
    });
};

// Fetch Classes
interface FetchInstantFeedBack {
    type: DashboardType.FETCH_INSTANTFEEDBACK;
}

interface FetchInstantFeedBackSuccess {
    type: DashboardType.FETCH_INSTANTFEEDBACK_SUCCESS;
    payload: any;
}

interface FetchInstantFeedBackFail {
    type: DashboardType.FETCH_INSTANTFEEDBACK_FAIL;
}

export const getInstantFeedBack = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {    
    handleFetchInstantFeedBack(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.InstantFeedBack, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchInstantFeedBackSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchInstantFeedBackFail(dispatch);
    }
};

export const handleFetchInstantFeedBack = (dispatch: Dispatch<FetchInstantFeedBack>) => {
    dispatch({ type: DashboardType.FETCH_INSTANTFEEDBACK});
};

export const handleFetchInstantFeedBackSuccess = (
    dispatch: Dispatch<FetchInstantFeedBackSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_INSTANTFEEDBACK_SUCCESS,
        payload: response,
        records_InstantFeedBack: response.data.records,
        per_page_InstantFeedBack: response.data.per_page,
        page_InstantFeedBack: response.data.page,
        total_InstantFeedBack: response.data.total
    });    
};

export const handleFetchInstantFeedBackFail = (dispatch: Dispatch<FetchInstantFeedBackFail>) => {
    dispatch({
        type: DashboardType.FETCH_INSTANTFEEDBACK_FAIL
    });
};

// Fetch Classes Report
interface FetchClassesReport {
    type: DashboardType.Classes_Report;
}

interface FetchClassesReportSuccess {
    type: DashboardType.Classes_Report_Success;
    payload: any;
}

interface FetchClassesReportFail {
    type: DashboardType.Classes_Report_Fail;
}

export const getClassesReport = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {    
    handleFetchClassesReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.classReports, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassesReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassesReportFail(dispatch);
    }
};

export const handleFetchClassesReport = (dispatch: Dispatch<FetchClassesReport>) => {
    dispatch({ type: DashboardType.Classes_Report});
};

export const handleFetchClassesReportSuccess = (
    dispatch: Dispatch<FetchClassesReportSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Classes_Report_Success,
        payload: response,
        recordsClassesReport: response.data.records,
        perPageClassesReport: response.data.per_page,
        pageClassesReport: response.data.page,
        totalClassesReport: response.data.total
    });    
};

export const handleFetchClassesReportFail = (dispatch: Dispatch<FetchClassesReportFail>) => {
    dispatch({
        type: DashboardType.Classes_Report_Fail
    });
};


// Fetch Classes
interface FetchAttendanceReport {
    type: DashboardType.Attendance_Report;
}

interface FetchAttendanceReportSuccess {
    type: DashboardType.Attendance_Report_Success;
    payload: any;
}

interface FetchAttendanceReportFail {
    type: DashboardType.Attendance_Report_Fail;
}

export const getAttendanceReport = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {    
    handleFetchAttendanceReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.attendeanceReport, {               
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchAttendanceReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchAttendanceReportFail(dispatch);
    }
};

export const handleFetchAttendanceReport = (dispatch: Dispatch<FetchAttendanceReport>) => {
    dispatch({ type: DashboardType.Attendance_Report});
};

export const handleFetchAttendanceReportSuccess = (
    dispatch: Dispatch<FetchAttendanceReportSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Attendance_Report_Success,
        payload: response,
        recordsAttendanceReport: response.data.records,
        perPageAttendanceReport: response.data.per_page,
        pageAttendanceReport: response.data.page,
        totalAttendanceReport: response.data.total
    });    
};

export const handleFetchAttendanceReportFail = (dispatch: Dispatch<FetchAttendanceReportFail>) => {
    dispatch({
        type: DashboardType.Attendance_Report_Fail
    });
};

// Fetch Classes
interface FetchQuizReport {
    type: DashboardType.Quiz_Report;
}

interface FetchQuizReportSuccess {
    type: DashboardType.Quiz_Report_Success;
    payload: any;
}

interface FetchQuizReportFail {
    type: DashboardType.Quiz_Report_Fail;
}

export const getQuizReport = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {    
    handleFetchQuizReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.quizReport, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchQuizReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuizReportFail(dispatch);
    }
};

export const handleFetchQuizReport = (dispatch: Dispatch<FetchQuizReport>) => {
    dispatch({ type: DashboardType.Quiz_Report});
};

export const handleFetchQuizReportSuccess = (
    dispatch: Dispatch<FetchQuizReportSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Quiz_Report_Success,
        payload: response,
        recordsQuizReport: response.data.records,
        perPageQuizReport: response.data.per_page,
        pageQuizReport: response.data.page,
        totalQuizReport: response.data.total
    });    
};

export const handleFetchQuizReportFail = (dispatch: Dispatch<FetchQuizReportFail>) => {
    dispatch({
        type: DashboardType.Quiz_Report_Fail
    });
};

// Fetch Classes
interface FetchStandardAnalysis {
    type: DashboardType.FETCH_STANDARD_ANALYSIS;
}

interface FetchStandardAnalysisSuccess {
    type: DashboardType.FETCH_STANDARD_ANALYSIS_SUCCESS;
    payload: any;
}

interface FetchStandardAnalysisFail {
    type: DashboardType.FETCH_STANDARD_ANALYSIS_FAIL;
}

export const fetchStandardAnalysis = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchStandardAnalysis(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.StandardAnalysis, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchStandardAnalysisSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchStandardAnalysisFail(dispatch);
    }
};

export const handleFetchStandardAnalysis = (dispatch: Dispatch<FetchStandardAnalysis>) => {
    dispatch({ type: DashboardType.FETCH_STANDARD_ANALYSIS});
};

export const handleFetchStandardAnalysisSuccess = (
    dispatch: Dispatch<FetchStandardAnalysisSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_STANDARD_ANALYSIS_SUCCESS,
        payload: response,
        StandardAnalysis:response.data
    });
    
};

export const handleFetchStandardAnalysisFail = (dispatch: Dispatch<FetchStandardAnalysisFail>) => {
    dispatch({
        type: DashboardType.FETCH_STANDARD_ANALYSIS_FAIL
    });
};

// Fetch Subject Performance
interface FetchSubjectPerformance {
    type: DashboardType.Chart_Subject_Performance;
}

interface FetchSubjectPerformanceSuccess {
    type: DashboardType.Chart_Subject_Performance_Success;
    payload: any;
}

interface FetchSubjectPerformanceFail {
    type: DashboardType.Chart_Subject_Performance_Fail;
}

export const fetchSubjectPerformance = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchSubjectPerformance(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.subjectPerformance, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchSubjectPerformanceSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSubjectPerformanceFail(dispatch);
    }
};

export const handleFetchSubjectPerformance = (dispatch: Dispatch<FetchSubjectPerformance>) => {
    dispatch({ type: DashboardType.Chart_Subject_Performance});
};

export const handleFetchSubjectPerformanceSuccess = (
    dispatch: Dispatch<FetchSubjectPerformanceSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Subject_Performance_Success,
        payload: response,
        getSubjectPerformance:response.data
    });
    
};

export const handleFetchSubjectPerformanceFail = (dispatch: Dispatch<FetchSubjectPerformanceFail>) => {
    dispatch({
        type: DashboardType.Chart_Subject_Performance_Fail
    });
};

// Fetch Subject Performance
interface FetchConcernPoint {
    type: DashboardType.Chart_Concern_Point;
}

interface FetchConcernPointSuccess {
    type: DashboardType.Chart_Concern_Point_Success;
    payload: any;
}

interface FetchConcernPointFail {
    type: DashboardType.Chart_Concern_Point_Fail;
}

export const fetchConcernPoint = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchConcernPoint(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.concernPoint, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
            handleFetchConcernPointSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchConcernPointFail(dispatch);
    }
};

export const handleFetchConcernPoint = (dispatch: Dispatch<FetchConcernPoint>) => {
    dispatch({ type: DashboardType.Chart_Concern_Point});
};

export const handleFetchConcernPointSuccess = (
    dispatch: Dispatch<FetchConcernPointSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Concern_Point_Success,
        payload: response,
        getConcernPoint:response.data
    });
};

export const handleFetchConcernPointFail = (dispatch: Dispatch<FetchConcernPointFail>) => {
    dispatch({
        type: DashboardType.Chart_Concern_Point_Fail
    });
};

// Fetch Subject Performance
interface FetchTopicAnalysis {
    type: DashboardType.Chart_Topic_Analysis;
}

interface FetchTopicAnalysisSuccess {
    type: DashboardType.Chart_Topic_Analysis_Success;
    payload: any;
}

interface FetchTopicAnalysisFail {
    type: DashboardType.Chart_Topic_Analysis_Fail;
}

export const fetchTopicAnalysis = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTopicAnalysis(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.topicAnalysis, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTopicAnalysisSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTopicAnalysisFail(dispatch);
    }
};

export const handleFetchTopicAnalysis = (dispatch: Dispatch<FetchTopicAnalysis>) => {
    dispatch({ type: DashboardType.Chart_Topic_Analysis});
};

export const handleFetchTopicAnalysisSuccess = (
    dispatch: Dispatch<FetchTopicAnalysisSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Topic_Analysis_Success,
        payload: response,
        getTopicAnalysis:response.data
    });
    
};

export const handleFetchTopicAnalysisFail = (dispatch: Dispatch<FetchTopicAnalysisFail>) => {
    dispatch({
        type: DashboardType.Chart_Topic_Analysis_Fail
    });
};

// Fetch Classes
interface FetchSubjectAnalysis {
    type: DashboardType.FETCH_SUBJECT_ANALYSIS;
}

interface FetchSubjectAnalysisSuccess {
    type: DashboardType.FETCH_SUBJECT_ANALYSIS_SUCCESS;
    payload: any;
}

interface FetchSubjectAnalysisFail {
    type: DashboardType.FETCH_SUBJECT_ANALYSIS_FAIL;
}

export const fetchSubjectAnalysis = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchSubjectAnalysis(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.SubjectAnalysis, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchSubjectAnalysisSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchSubjectAnalysisFail(dispatch);
    }
};

export const handleFetchSubjectAnalysis = (dispatch: Dispatch<FetchSubjectAnalysis>) => {
    dispatch({ type: DashboardType.FETCH_SUBJECT_ANALYSIS});
};

export const handleFetchSubjectAnalysisSuccess = (
    dispatch: Dispatch<FetchSubjectAnalysisSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_SUBJECT_ANALYSIS_SUCCESS,
        payload: response,
        SubjectAnalysis:response.data
    });
    
};

export const handleFetchSubjectAnalysisFail = (dispatch: Dispatch<FetchSubjectAnalysisFail>) => {
    dispatch({
        type: DashboardType.FETCH_SUBJECT_ANALYSIS_FAIL
    });
};

// Fetch feedbackQuestionResponses
interface FetchFeedbackQuestionResponses {
    type: DashboardType.Chart_Feedback_Question_Responses
}

interface FetchFeedbackQuestionResponsesSuccess {
    type: DashboardType.Chart_Feedback_Question_Responses_Success;
    payload: any;
}

interface FetchFeedbackQuestionResponsesFail {
    type: DashboardType.Chart_Feedback_Question_Responses_Fail;
}

export const fetchFeedbackQuestionResponses = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchFeedbackQuestionResponses(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.feedbacksUse, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchFeedbackQuestionResponsesSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchFeedbackQuestionResponsesFail(dispatch);
    }
};

export const handleFetchFeedbackQuestionResponses = (dispatch: Dispatch<FetchFeedbackQuestionResponses>) => {
    dispatch({ type: DashboardType.Chart_Feedback_Question_Responses});
};

export const handleFetchFeedbackQuestionResponsesSuccess = (
    dispatch: Dispatch<FetchFeedbackQuestionResponsesSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Feedback_Question_Responses_Success,
        payload: response,
        feedbackQuestionResponses:response.data
    });
    
};

export const handleFetchFeedbackQuestionResponsesFail = (dispatch: Dispatch<FetchFeedbackQuestionResponsesFail>) => {
    dispatch({
        type: DashboardType.Chart_Feedback_Question_Responses_Fail
    });
};

// Fetch grade subject list
interface FetchGradeSubjectList {
    type: DashboardType.Grade_Subject_List;
}

interface FetchGradeSubjectListSuccess {
    type: DashboardType.Grade_Subject_List_Success;
    payload: any;
}

interface FetchGradeSubjectListFail {
    type: DashboardType.Grade_Subject_List_Fail;
}

export const fetchGradeSubjectList = (): ThunkResult<void> => async dispatch => {
    handleGradeSubjectList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.gradeSubjectList, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleGradeSubjectListSuccess(dispatch, response.data);
    } catch (e) {
        handleGradeSubjectListFail(dispatch);
    }
};

export const handleGradeSubjectList = (dispatch: Dispatch<FetchGradeSubjectList>) => {
    dispatch({ type: DashboardType.Grade_Subject_List });
};

export const handleGradeSubjectListSuccess = (
    dispatch: Dispatch<FetchGradeSubjectListSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Grade_Subject_List_Success,
        payload: response,
        gradeSujectList:response.data
    });
    
};

export const handleGradeSubjectListFail = (dispatch: Dispatch<FetchGradeSubjectListFail>) => {
    dispatch({
        type: DashboardType.Grade_Subject_List_Fail
    });
};

// Fetch quizQuestionResponses
interface FetchQuizQuestionResponses {
    type: DashboardType.Chart_Quiz_Question_Responses
}

interface FetchQuizQuestionResponsesSuccess {
    type: DashboardType.Chart_Quiz_Question_Responses_SUCCESS;
    payload: any;
}

interface FetchQuizQuestionResponsesFail {
    type: DashboardType.Chart_Quiz_Question_Responses_FAIL;
}

export const fetchQuizQuestionResponses = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchQuizQuestionResponses(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.quizesUse, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchQuizQuestionResponsesSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchQuizQuestionResponsesFail(dispatch);
    }
};

export const handleFetchQuizQuestionResponses = (dispatch: Dispatch<FetchQuizQuestionResponses>) => {
    dispatch({ type: DashboardType.Chart_Quiz_Question_Responses});
};

export const handleFetchQuizQuestionResponsesSuccess = (
    dispatch: Dispatch<FetchQuizQuestionResponsesSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Quiz_Question_Responses_SUCCESS,
        payload: response,
        quizQuestionResponses:response.data
    });
    
};

export const handleFetchQuizQuestionResponsesFail = (dispatch: Dispatch<FetchQuizQuestionResponsesFail>) => {
    dispatch({
        type: DashboardType.Chart_Quiz_Question_Responses_FAIL
    });
};

// Fetch quizQuestionResponses
interface FetchAttendanceUsage {
    type: DashboardType.Chart_Attendance_Usage
}

interface FetchAttendanceUsageSuccess {
    type: DashboardType.Chart_Attendance_Usage_Success;
    payload: any;
}

interface FetchAttendanceUsageFail {
    type: DashboardType.Chart_Attendance_Usage_Fail;
}

export const fetchAttendanceUsage = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchAttendanceUsage(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.attendanceUse, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchAttendanceUsageSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchAttendanceUsageFail(dispatch);
    }
};

export const handleFetchAttendanceUsage = (dispatch: Dispatch<FetchAttendanceUsage>) => {
    dispatch({ type: DashboardType.Chart_Attendance_Usage});
};

export const handleFetchAttendanceUsageSuccess = (
    dispatch: Dispatch<FetchAttendanceUsageSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Chart_Attendance_Usage_Success,
        payload: response,
        attendanceUsage:response.data
    });
    
};

export const handleFetchAttendanceUsageFail = (dispatch: Dispatch<FetchAttendanceUsageFail>) => {
    dispatch({
        type: DashboardType.Chart_Attendance_Usage_Fail
    });
};

// Fetch getTodayAttendanceReport
interface FetchTodayAttendanceReport {
    type: DashboardType.Today_Attendance_Report
}

interface FetchTodayAttendanceReportSuccess {
    type: DashboardType.Today_Attendance_Report_Success;
    payload: any;
}

interface FetchTodayAttendanceReportFail {
    type: DashboardType.Today_Attendance_Report_Fail;
}

export const fetchTodayAttendanceReport= (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTodayAttendanceReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.todaysAttendance, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTodayAttendanceReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTodayAttendanceReportFail(dispatch);
    }
};

export const handleFetchTodayAttendanceReport = (dispatch: Dispatch<FetchTodayAttendanceReport>) => {
    dispatch({ type: DashboardType.Today_Attendance_Report});
};

export const handleFetchTodayAttendanceReportSuccess = (
    dispatch: Dispatch<FetchTodayAttendanceReportSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Today_Attendance_Report_Success,
        payload: response,
        recordsTodayAttendanceReport: response.data.records,
        perPageTodayAttendance: response.data.per_page,
        pageTodayAttendance: response.data.page,
        totalTodayAttendance: response.data.total
    });
    
};

export const handleFetchTodayAttendanceReportFail = (dispatch: Dispatch<FetchTodayAttendanceReportFail>) => {
    dispatch({
        type: DashboardType.Today_Attendance_Report_Fail
    });
};

// Fetch getGradeComparisonReport
interface FetchGradeComparisonReport {
    type: DashboardType.Grade_Comparison_Report
}

interface FetchGradeComparisonReportSuccess {
    type: DashboardType.Grade_Comparison_Report_Success;
    payload: any;
}

interface FetchGradeComparisonReportFail {
    type: DashboardType.Grade_Comparison_Report_Fail;
}

export const fetchGradeComparisonReport = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchGradeComparisonReport(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.gradeComparisonReport, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchGradeComparisonReportSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchGradeComparisonReportFail(dispatch);
    }
};

export const handleFetchGradeComparisonReport = (dispatch: Dispatch<FetchGradeComparisonReport>) => {
    dispatch({ type: DashboardType.Grade_Comparison_Report});
};

export const handleFetchGradeComparisonReportSuccess = (
    dispatch: Dispatch<FetchGradeComparisonReportSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.Grade_Comparison_Report_Success,
        payload: response,
        getGradeComparisonReport:response.data
    });
    
};

export const handleFetchGradeComparisonReportFail = (dispatch: Dispatch<FetchGradeComparisonReportFail>) => {
    dispatch({
        type: DashboardType.Grade_Comparison_Report_Fail
    });
};

// Teacher Engagement
interface FetchTeacherEngagement {
    type: DashboardType.FETCH_TEACHER_ENGAGEMENT;
}

interface FetchTeacherEngagementSuccess {
    type: DashboardType.FETCH_TEACHER_ENGAGEMENT_SUCCESS;
    payload: any;
}

interface FetchTeacherEngagementFail {
    type: DashboardType.FETCH_TEACHER_ENGAGEMENT_FAIL;
}

export const fetchTeacherEngagement = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTeacherEngagement(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.TeacherEngagement, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTeacherEngagementSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeacherEngagementFail(dispatch);
    }
};


export const handleFetchTeacherEngagement = (dispatch: Dispatch<FetchTeacherEngagement>) => {
    dispatch({ type: DashboardType.FETCH_TEACHER_ENGAGEMENT});
};

export const handleFetchTeacherEngagementSuccess = (
    dispatch: Dispatch<FetchTeacherEngagementSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_TEACHER_ENGAGEMENT_SUCCESS,
        payload: response,
        records_Teacher_Engagement: response.data.records,
        per_page_Teacher_Engagement: response.data.per_page,
        page_Teacher_Engagement: response.data.page,
        total_Teacher_Engagement: response.data.total
    });
    
};

export const handleFetchTeacherEngagementFail = (dispatch: Dispatch<FetchTeacherEngagementFail>) => {
    dispatch({
        type: DashboardType.FETCH_TEACHER_ENGAGEMENT_FAIL
    });
};

// Teacher Engagement
interface FetchTeacherEngagementPost {
    type: DashboardType.POST_TEACHER_ENGAGEMENT;
}

interface FetchTeacherEngagementPostSuccess {
    type: DashboardType.POST_TEACHER_ENGAGEMENT_SUCCESS;
    payload: any;
}

interface FetchTeacherEngagementPostFail {
    type: DashboardType.POST_TEACHER_ENGAGEMENT_FAIL;
}

export const postTeacherEngagement = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTeacherEngagementPost(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(DashboardAPI.TeacherEngagement, loadMoreType, {
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTeacherEngagementPostSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeacherEngagementPostFail(dispatch);
    }
};


export const handleFetchTeacherEngagementPost = (dispatch: Dispatch<FetchTeacherEngagementPost>) => {
    dispatch({ type: DashboardType.POST_TEACHER_ENGAGEMENT});
};

export const handleFetchTeacherEngagementPostSuccess = (
    dispatch: Dispatch<FetchTeacherEngagementPostSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.POST_TEACHER_ENGAGEMENT_SUCCESS,
        payload: response,
        recordsPostTeacherEngagement: response.data.records,
        perPagePostTeacherEngagement: response.data.per_page,
        pagePostTeacherEngagement: response.data.page,
        totalPostTeacherEngagement: response.data.total
    });
    
};

export const handleFetchTeacherEngagementPostFail = (dispatch: Dispatch<FetchTeacherEngagementPostFail>) => {
    dispatch({
        type: DashboardType.POST_TEACHER_ENGAGEMENT_FAIL
    });
};
//Teacher Performance
interface FetchTeacherPerformance {
    type: DashboardType.FETCH_TEACHER_PERFORMANCE;
}

interface FetchTeacherPerformanceSuccess {
    type: DashboardType.FETCH_TEACHER_PERFORMANCE_SUCCESS;
    payload: any;
}

interface FetchTeacherPerformanceFail {
    type: DashboardType.FETCH_TEACHER_PERFORMANCE_FAIL;
}

export const fetchTeacherPerformance = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    const getPerformanace:any = {
        academic_year: loadMoreType.academic_year,
        class_id:  loadMoreType.class_id,
        page_no: loadMoreType.page_no
      }
    handleFetchTeacherPerformance(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(DashboardAPI.TeacherEngagement, getPerformanace, { 
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTeacherPerformanceSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeacherPerformanceFail(dispatch);
    }
};


export const handleFetchTeacherPerformance = (dispatch: Dispatch<FetchTeacherPerformance>) => {
    dispatch({ type: DashboardType.FETCH_TEACHER_PERFORMANCE});
};

export const handleFetchTeacherPerformanceSuccess = (
    dispatch: Dispatch<FetchTeacherPerformanceSuccess>,
    response: any
) => {
    dispatch({
        type: DashboardType.FETCH_TEACHER_PERFORMANCE_SUCCESS,
        payload: response,
        records_Teacher_Performance: response.data.records,
        per_page_Teacher_Performance: response.data.per_page,
        page_Teacher_Performance: response.data.page,
        total_Teacher_Performance: response.data.total
    });
    
};

export const handleFetchTeacherPerformanceFail = (dispatch: Dispatch<FetchTeacherPerformanceFail>) => {
    dispatch({
        type: DashboardType.FETCH_TEACHER_PERFORMANCE_FAIL
    });
};

export type DashboardAction =
    | FetchDashboardSuccess
    | FetchDashboardFail;
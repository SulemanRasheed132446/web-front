import { Reducer } from 'redux';
import { DashboardState, DashboardType } from './Types';

export const initialState: DashboardState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    DashboardCount:[],
    page_Teacher_Engagement: 1,
    per_page_Teacher_Engagement: 10,
    records_Teacher_Engagement: [],
    total_Teacher_Engagement: 0,
    page_Teacher_Performance: 1,
    per_page_Teacher_Performance: 10,
    records_Teacher_Performance: [],
    total_Teacher_Performance: 0,
    SubjectAnalysis:[],
    StandardAnalysis:[],    
    records_InstantFeedBack:[],
    per_page_InstantFeedBack:10,
    page_InstantFeedBack:1,
    total_InstantFeedBack:0,
    feedbackQuestionResponses:[],
    quizQuestionResponses:[],
    attendanceUsage:[],
    getTopicAnalysis:[],
    getSubjectPerformance:[],
    getConcernPoint:[],
    getAttendanceReport:[],
    getQuizReport:[],
    recordsAttendanceReport:[],
    pageAttendanceReport:1,
    perPageAttendanceReport:10,
    totalAttendanceReport:0,
    totalPageAttendanceReport:0,
    recordsQuizReport:[],
    pageQuizReport:1,
    perPageQuizReport:10,
    totalQuizReport:0,
    totalPageQuizReport:0,
    recordsClassesReport:[],
    pageClassesReport:1,
    perPageClassesReport:10,
    totalClassesReport:0,
    totalPageClassesReport:0,
    pagePostTeacherEngagement: 1,
    perPagePostTeacherEngagement: 10,
    recordsPostTeacherEngagement: [],
    totalPostTeacherEngagement: 0,
    getGradeComparisonReport:[],
    recordsTodayAttendanceReport:[],
    pageTodayAttendance: 1,
    perPageTodayAttendance: 10,
    totalTodayAttendance: 0,
    totalPageTodayAttendance:0,
    gradeSujectList:[]
}

const reducer: Reducer<DashboardState> = (state = initialState, action) => {
    switch (action.type) {
        case DashboardType.FETCH_DASHBOARD:
        case DashboardType.FETCH_TEACHER_ENGAGEMENT:
        case DashboardType.FETCH_TEACHER_PERFORMANCE:
        case DashboardType.FETCH_STANDARD_ANALYSIS: 
        case DashboardType.FETCH_SUBJECT_ANALYSIS: 
        case DashboardType.FETCH_INSTANTFEEDBACK:
        case DashboardType.Chart_Attendance_Usage:
        case DashboardType.Chart_Feedback_Question_Responses:
        case DashboardType.Chart_Quiz_Question_Responses: 
        case DashboardType.Chart_Subject_Performance: 
        case DashboardType.Chart_Topic_Analysis: 
        case DashboardType.Chart_Concern_Point:
        case DashboardType.Attendance_Report:
        case DashboardType.Quiz_Report: 
        case DashboardType.Classes_Report:
        case DashboardType.POST_TEACHER_ENGAGEMENT: 
        case DashboardType.Today_Attendance_Report: 
        case DashboardType.Grade_Comparison_Report:  
            return {
                ...state,
                loading: true,
                recordsAttendanceReport:[],
                totalAttendanceReport:0
            };
        case DashboardType.Grade_Subject_List:  
            return {
                ...state,
                loading: true
            };
            case DashboardType.Grade_Subject_List_Success:
                const { gradeSujectList } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    gradeSujectList:gradeSujectList
                };
        case DashboardType.FETCH_DASHBOARD_SUCCESS:
            const { dashboardCount } = action;            
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                DashboardCount:dashboardCount
            };
            case DashboardType.FETCH_STANDARD_ANALYSIS_SUCCESS:
                const { StandardAnalysis } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    StandardAnalysis:StandardAnalysis
                };
            case DashboardType.FETCH_SUBJECT_ANALYSIS_SUCCESS:
                const { SubjectAnalysis } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    SubjectAnalysis:SubjectAnalysis
                };
            case DashboardType.Chart_Quiz_Question_Responses_SUCCESS:
                const { quizQuestionResponses } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    quizQuestionResponses:quizQuestionResponses
                };
            case DashboardType.Chart_Attendance_Usage_Success:
                const { attendanceUsage } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    attendanceUsage:attendanceUsage
                };
            case DashboardType.Chart_Feedback_Question_Responses_Success:
                const { feedbackQuestionResponses } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    feedbackQuestionResponses:feedbackQuestionResponses
                };
            case DashboardType.Chart_Subject_Performance_Success:
                const { getSubjectPerformance } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    getSubjectPerformance:getSubjectPerformance
                };
            case DashboardType.Chart_Topic_Analysis_Success:
                const { getTopicAnalysis } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    getTopicAnalysis:getTopicAnalysis
                };
            case DashboardType.Chart_Concern_Point_Success:
                const { getConcernPoint } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    getConcernPoint:getConcernPoint
                };
            case DashboardType.Today_Attendance_Report_Success:
                const { recordsTodayAttendanceReport, pageTodayAttendance, perPageTodayAttendance, totalTodayAttendance } = action;            
                if(pageTodayAttendance === 1) {
                    state.recordsTodayAttendanceReport = []
                }             
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    pageTodayAttendance: pageTodayAttendance,
                    perPageTodayAttendance: perPageTodayAttendance,
                    recordsTodayAttendanceReport: [...state.recordsTodayAttendanceReport, ...recordsTodayAttendanceReport],
                    totalTodayAttendance: totalTodayAttendance,
                    totalPageTodayAttendance: Math.ceil(totalTodayAttendance / perPageTodayAttendance)
                };
            case DashboardType.Grade_Comparison_Report_Success:
                const { getGradeComparisonReport } = action;            
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    getGradeComparisonReport:getGradeComparisonReport
                };
        case DashboardType.FETCH_TEACHER_ENGAGEMENT_SUCCESS:
            const { records_Teacher_Engagement, 
                per_page_Teacher_Engagement, 
                page_Teacher_Engagement, total_Teacher_Engagement } = action; 
            if(page_Teacher_Engagement === 1) {
                state.records_Teacher_Engagement = []
            }             
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                page_Teacher_Engagement: page_Teacher_Engagement,
                per_page_Teacher_Engagement: per_page_Teacher_Engagement,
                records_Teacher_Engagement: [...state.records_Teacher_Engagement, ...records_Teacher_Engagement],
                total_Teacher_Engagement: total_Teacher_Engagement,
                totalPageTeacherEngagement: Math.ceil(total_Teacher_Engagement / per_page_Teacher_Engagement)
            };
            case DashboardType.POST_TEACHER_ENGAGEMENT_SUCCESS:
                const { recordsPostTeacherEngagement, 
                    perPagePostTeacherEngagement, 
                    pagePostTeacherEngagement, totalPostTeacherEngagement } = action; 
                if(pagePostTeacherEngagement === 1) {
                    state.recordsPostTeacherEngagement = []
                }             
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    pagePostTeacherEngagement: pagePostTeacherEngagement,
                    perPagePostTeacherEngagement: perPagePostTeacherEngagement,
                    recordsPostTeacherEngagement: [...state.recordsPostTeacherEngagement, ...recordsPostTeacherEngagement],
                    totalPostTeacherEngagement: totalPostTeacherEngagement,
                    totalPageTeacherEngagement: Math.ceil(totalPostTeacherEngagement / perPagePostTeacherEngagement)
                };
        case DashboardType.FETCH_TEACHER_PERFORMANCE_SUCCESS:
            const { records_Teacher_Performance, 
                per_page_Teacher_Performance, 
                page_Teacher_Performance, 
                total_Teacher_Performance } = action;          
            if(page_Teacher_Performance === 1) {
                state.records_Teacher_Performance = []
            } 
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                page_Teacher_Performance: page_Teacher_Performance,
                per_page_Teacher_Performance: per_page_Teacher_Performance,
                records_Teacher_Performance: [...state.records_Teacher_Performance, ...records_Teacher_Performance],
                total_Teacher_Performance: total_Teacher_Performance,
                totalPageTeacherPerformance: Math.ceil(total_Teacher_Performance / per_page_Teacher_Performance)
            };
        case DashboardType.FETCH_INSTANTFEEDBACK_SUCCESS:
            const { records_InstantFeedBack, 
                per_page_InstantFeedBack, 
                page_InstantFeedBack, total_InstantFeedBack } = action; 
            if(page_InstantFeedBack === 1) {
                state.records_InstantFeedBack = []
            }             
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                page_InstantFeedBack: page_InstantFeedBack,
                per_page_InstantFeedBack: per_page_InstantFeedBack,
                records_InstantFeedBack: [...state.records_InstantFeedBack, ...records_InstantFeedBack],
                total_InstantFeedBack: total_InstantFeedBack,
                totalPageInstantFeedBack: Math.ceil(total_InstantFeedBack / per_page_InstantFeedBack)
            };
        case DashboardType.Attendance_Report_Success:
            const { recordsAttendanceReport, 
                perPageAttendanceReport, 
                pageAttendanceReport, totalAttendanceReport } = action; 
            if(pageAttendanceReport === 1) {
                state.recordsAttendanceReport = []
            }             
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                pageAttendanceReport: pageAttendanceReport,
                perPageAttendanceReport: perPageAttendanceReport,
                recordsAttendanceReport: recordsAttendanceReport,
                totalAttendanceReport: totalAttendanceReport,
                totalPageAttendanceReport: Math.ceil(totalAttendanceReport / perPageAttendanceReport)
            };
        case DashboardType.Quiz_Report_Success:
            const { recordsQuizReport, 
                perPageQuizReport, 
                pageQuizReport, totalQuizReport } = action; 
            if(pageQuizReport === 1) {
                state.recordsQuizReport = []
            }             
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                pageQuizReport: pageQuizReport,
                perPageQuizReport: perPageQuizReport,
                recordsQuizReport: [...state.recordsQuizReport, ...recordsQuizReport],
                totalQuizReport: totalQuizReport,
                totalPageQuizReport: Math.ceil(totalQuizReport / perPageQuizReport)
            };
            case DashboardType.Classes_Report_Success:
                const { recordsClassesReport, 
                    perPageClassesReport, 
                    pageClassesReport, totalClassesReport } = action; 
                if(pageClassesReport === 1) {
                    state.recordsClassesReport = []
                }             
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: false,
                    pageClassesReport: pageClassesReport,
                    perPageClassesReport: perPageClassesReport,
                    recordsClassesReport: [...state.recordsClassesReport, ...recordsClassesReport],
                    totalClassesReport: totalClassesReport,
                    totalPageClassesReport: Math.ceil(totalClassesReport / perPageClassesReport)
                };
        case DashboardType.FETCH_DASHBOARD_FAIL:
        case DashboardType.FETCH_TEACHER_ENGAGEMENT_FAIL:
        case DashboardType.FETCH_TEACHER_PERFORMANCE_FAIL:
        case DashboardType.FETCH_SUBJECT_ANALYSIS_FAIL:
        case DashboardType.FETCH_STANDARD_ANALYSIS_FAIL:
        case DashboardType.FETCH_INSTANTFEEDBACK_FAIL:
        case DashboardType.Chart_Attendance_Usage_Fail:
        case DashboardType.Chart_Feedback_Question_Responses_Fail:
        case DashboardType.Chart_Quiz_Question_Responses_FAIL:
        case DashboardType.Chart_Topic_Analysis_Fail:
        case DashboardType.Chart_Subject_Performance_Fail:
        case DashboardType.Chart_Concern_Point_Fail:
        case DashboardType.Quiz_Report_Fail:
        case DashboardType.Attendance_Report_Fail:
        case DashboardType.Classes_Report_Fail:
        case DashboardType.POST_TEACHER_ENGAGEMENT_FAIL:
        case DashboardType.Grade_Comparison_Report_Fail:
        case DashboardType.Today_Attendance_Report_Fail:
        case DashboardType.Grade_Subject_List_Fail:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: true
            };

        default:
            return state;
    }
}

export { reducer as dashboardReducer }
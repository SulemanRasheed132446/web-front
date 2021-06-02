import { Reducer } from 'redux'
import { QuestionState, QuestionActionTypes } from './Types'

export const initialState: QuestionState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    QuestionId:'',
    getQuestionList:[],
    teacherOverallPerformance:[],
    recentFeedbackList:[],
    recentQuizReport:[],
    FeedbackPieChart:[],
    feedbackStudent:[],
    feedbackSubject:[],
    feedbackBarChart:[],
    topicAnalysisReport:[],
    BarchartReport:[],
    QuizzesStudentReport:[],
    QuestionAnswersReport:[],
    CalculationsReport:[],
    questionReportView:[],
    singleQuizStudent:[],
    singleQuizQuestionList:[],
    getTeacherSubjectList:[],
    studentRecentQuiz:[]
}

const reducer: Reducer<QuestionState> = (state = initialState, action) => {
    switch (action.type) {
        case QuestionActionTypes.ADD_QUESTION:
        case QuestionActionTypes.DELETE_QUESTION:
        case QuestionActionTypes.EDIT_QUESTION:
        case QuestionActionTypes.FETCH_QUESTION:
        case QuestionActionTypes.FETCH_QUESTION_ID:
        case QuestionActionTypes.Recent_Feedback_List:
        case QuestionActionTypes.Recent_Quiz_Report:
        case QuestionActionTypes.Teacher_Overall_Performance:
        case QuestionActionTypes.Feedback_Pie_Chart: 
        case QuestionActionTypes.Feedback_Student: 
        case QuestionActionTypes.Feedback_Subject:   
        case QuestionActionTypes.Topic_Analysis_Report:
        case QuestionActionTypes.Bar_chart_Report: 
        case QuestionActionTypes.Calculations_Report: 
        case QuestionActionTypes.Question_answers_Report: 
        case QuestionActionTypes.Quizzes_Student_Report:
        case QuestionActionTypes.Question_Report_View:
        case QuestionActionTypes.Single_Quiz_Question_List_List:
        case QuestionActionTypes.Single_Quiz_Student:  
        case QuestionActionTypes.Teacher_Subject_List: 
        case QuestionActionTypes.Student_Recent_Quiz:
            return { 
                ...state, 
                loading: true 
            };

        case QuestionActionTypes.ADD_QUESTION_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 
        case QuestionActionTypes.FETCH_QUESTION_SUCCESS:
            const { payload, records, per_page, page, total } = action;
            if(page === 1) {
                state.records = []
            }            
            return {
                ...state, 
                loading: false, 
                items: payload,
                page: page,
                per_page: per_page,
                records: [...state.records, ...records],
                total: total,
                totalPage: Math.ceil(total / per_page),
                isAuthenticated: false,
            }
        case QuestionActionTypes.FETCH_QUESTION_SUCCESS_ID:      
        const { getData } = action
        return {
            ...state, 
            loading: false, 
            items: action.payload,
            isAuthenticated: false,
            getQuestionList:getData
        };
        case QuestionActionTypes.Recent_Feedback_List_Success:      
        const { recentFeedbackList } = action
        return {
            ...state, 
            loading: false, 
            items: action.payload,
            isAuthenticated: false,
            recentFeedbackList:recentFeedbackList
        };
        case QuestionActionTypes.Recent_Quiz_Report_Success:      
        const { recentQuizReport } = action
        return {
            ...state, 
            loading: false, 
            items: action.payload,
            isAuthenticated: false,
            recentQuizReport:recentQuizReport
        };
        case QuestionActionTypes.Teacher_Overall_Performance_SUCCESS:      
            const { teacherOverallPerformance } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                teacherOverallPerformance:teacherOverallPerformance
            };
            case QuestionActionTypes.Feedback_Pie_Chart_Success:      
            const { FeedbackPieChart } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                FeedbackPieChart:FeedbackPieChart
            };
            case QuestionActionTypes.Feedback_Student_Success:      
            const { feedbackStudent } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                feedbackStudent:feedbackStudent
            };
            case QuestionActionTypes.Feedback_Subject_Success:      
            const { feedbackSubject } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                feedbackSubject:feedbackSubject
            };
            case QuestionActionTypes.Feedback_Bar_Chart_Success:      
            const { feedbackBarChart } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                feedbackBarChart:feedbackBarChart
            };
            case QuestionActionTypes.Topic_Analysis_Report_Success:      
            const { topicAnalysisReport } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                topicAnalysisReport:topicAnalysisReport
            };
            case QuestionActionTypes.Bar_chart_Report_Success:      
            const { BarchartReport } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                BarchartReport:BarchartReport
            };
            case QuestionActionTypes.Calculations_Report_Success:      
            const { CalculationsReport } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                CalculationsReport:CalculationsReport
            };
            case QuestionActionTypes.Question_answers_Report_Success:      
            const { QuestionAnswersReport } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                QuestionAnswersReport:QuestionAnswersReport
            };
        case QuestionActionTypes.Quizzes_Student_Report_Success:      
            const { QuizzesStudentReport } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                QuizzesStudentReport:QuizzesStudentReport
            };
        case QuestionActionTypes.Question_Report_View_Success:      
            const { questionReportView } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                questionReportView:questionReportView
            };
            case QuestionActionTypes.Single_Quiz_Question_List_Success:      
            const { singleQuizQuestionList } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                singleQuizQuestionList:singleQuizQuestionList
            };
            case QuestionActionTypes.Single_Quiz_Student_Success:      
            const { singleQuizStudent } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                singleQuizStudent:singleQuizStudent
            };
            case QuestionActionTypes.Teacher_Subject_List_Success:      
            const { getTeacherSubjectList } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                getTeacherSubjectList:getTeacherSubjectList
            };
            case QuestionActionTypes.Student_Recent_Quiz_Success:      
            const { studentRecentQuiz } = action
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                studentRecentQuiz:studentRecentQuiz
            };
        case QuestionActionTypes.ADD_QUESTION_FAIL:
        case QuestionActionTypes.DELETE_QUESTION_FAIL:
        case QuestionActionTypes.EDIT_QUESTION_FAIL:
        case QuestionActionTypes.FETCH_QUESTION_FAIL:            
        case QuestionActionTypes.FETCH_QUESTION_FAIL_ID:
        case QuestionActionTypes.Recent_Feedback_List_Fail:
        case QuestionActionTypes.Recent_Quiz_Report_Fail:
        case QuestionActionTypes.Teacher_Overall_Performance_FAIL:
        case QuestionActionTypes.Feedback_Pie_Chart_Fail:
        case QuestionActionTypes.Feedback_Student_Fail:
        case QuestionActionTypes.Feedback_Subject_Fail:
        case QuestionActionTypes.Topic_Analysis_Report_Fail:
        case QuestionActionTypes.Question_Report_View_Fail:
        case QuestionActionTypes.Single_Quiz_Question_List_Fail:
        case QuestionActionTypes.Single_Quiz_Student_Fail:
        case QuestionActionTypes.Teacher_Subject_List_Fail:
        case QuestionActionTypes.Student_Recent_Quiz_Fail:
            const { errors } =  action;
            return {
                ...state,
                errors: errors,
                loading: false,
                isAuthenticated: true
            };
        default:
            return state;
    }
}

export { reducer as questionReducer }
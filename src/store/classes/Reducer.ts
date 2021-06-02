import { Reducer } from 'redux'
import { ClassesActionTypes, ClassesState, ClassesActionGradeType } from './Type';

export const initialState: ClassesState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    gradelist: [],
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    standardList: [],
    my_section:[],
    my_class:[],
    imageUploadstatus:true,
    getClassrePort:[],
    getStudentClassrePort:[],
    getClassRecentQuiz:[],
    getClassRecentFeedback:[],
    recordDelete:'',
    sectionErrorMsg:[]
}

const reducer: Reducer<ClassesState> = (state = initialState, action) => {
    switch (action.type) {
        case ClassesActionTypes.ADD_CLASSES:
        case ClassesActionTypes.DELETE_CLASSES:
        case ClassesActionTypes.EDIT_CLASSES:
        case ClassesActionTypes.FETCH_CLASSES:
        case ClassesActionGradeType.FETCH_GRADE:
        case ClassesActionGradeType.FETCH_GRADE_STANDARD:
        case ClassesActionTypes.FETCH_MY_CLASS_LIST:
        case ClassesActionTypes.FETCH_MY_SECTION_LIST:
        case ClassesActionTypes.Fetch_Classre_Port:
        case ClassesActionTypes.Student_Classre_Port:
        case ClassesActionTypes.Class_Recent_Quiz:
        case ClassesActionTypes.Class_Recent_Feedback:
            return {
                ...state,
                loading: true,
                imageUploadstatus:false,
                recordDelete:''
            };

        case ClassesActionTypes.ADD_CLASSES_FAIL:
        case ClassesActionTypes.EDIT_CLASSES_FAIL:
        case ClassesActionTypes.FETCH_CLASSES_FAIL:
        case ClassesActionGradeType.FETCH_GRADE_FAIL:
        case ClassesActionGradeType.FETCH_GRADE_FAIL_STANDARD:
        case ClassesActionTypes.FETCH_MY_CLASS_LIST_FAIL:
        case ClassesActionTypes.FETCH_MY_SECTION_LIST_FAIL:
        case ClassesActionTypes.Fetch_Classre_Port_Fail:
        case ClassesActionTypes.Student_Classre_Port_Fail:
        case ClassesActionTypes.Class_Recent_Quiz_Fail:
        case ClassesActionTypes.Class_Recent_Feedback_Fail:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: true
            };
    case ClassesActionTypes.DELETE_CLASSES_FAIL:
        return {
            ...state,
            errors: action.payload,
            loading: false,
            isAuthenticated: true
        };
        case ClassesActionTypes.ADD_CLASSES_SUCCESS:
        case ClassesActionTypes.EDIT_CLASSES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                isAuthenticated: false,
                modelPop: false,
                errors: [],
            };

        case ClassesActionTypes.FETCH_CLASSES_SUCCESS:
            const allItems: any = []
            const preState: any = state
            return {
                ...state,
                loading: false,
                items: action.payload,
                isAuthenticated: false,
                allItems: allItems,
                preState: preState
            };

        case ClassesActionTypes.FETCH_CLASSES_PAGE_ONLOAD:
            const { payload, records, per_page, page, total } = action;
            if (page === 1) {
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

        case ClassesActionTypes.DELETE_CLASSES_SUCCESS:
            return {
                ...state,
                items: action.payload,
                loading: false,
                isAuthenticated: true,
                recordDelete:action.payload.message
            };

        case ClassesActionGradeType.FETCH_GRADE_SUCCESS:
            return {
                ...state,
                loading: false,
                gradelist: action.payload.data
            };
        case ClassesActionGradeType.FETCH_GRADE_SUCCESS_STANDARD:
            return {
                ...state,
                loading: false,
                standardList: action.payload.data
            };
        case ClassesActionTypes.FETCH_MY_CLASS_LIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    my_class: action.payload.data
                };
        case ClassesActionTypes.FETCH_MY_SECTION_LIST_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    my_section: action.payload.data
                };
        case ClassesActionTypes.Fetch_Classre_Port_Success:
            const { getClassrePort } = action;
        return {
            ...state,
            loading: false,
            getClassrePort: getClassrePort
        };
        case ClassesActionTypes.Student_Classre_Port_Success:
            const { getStudentClassrePort } = action;
        return {
            ...state,
            loading: false,
            getStudentClassrePort: getStudentClassrePort
        };
        case ClassesActionTypes.Class_Recent_Feedback_Success:
            const { getClassRecentFeedback } = action;
        return {
            ...state,
            loading: false,
            getClassRecentFeedback: getClassRecentFeedback
        };
        case ClassesActionTypes.Class_Recent_Quiz_Success:
            const { getClassRecentQuiz } = action;
        return {
            ...state,
            loading: false,
            getClassRecentQuiz: getClassRecentQuiz
        };
        default:
            return state;
    }
}

export { reducer as classesReducer }
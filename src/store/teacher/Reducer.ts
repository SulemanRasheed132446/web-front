import { Reducer } from 'redux'
import { TeacherState, TeacherActionTypes } from './Type'

export const initialState: TeacherState = {
    items: [],
    loading: false,
    isAuthenticated: null,
    modelPop:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    TeacherId:'',
    GetTeacherProfile:[],
    getSubjectClass:[],
    classPage:1,
    classPer_page:10,
    classRecords:[],
    classTotal:0,
    getSubjectMapping:[],
    SubjectTotal:0,
    classCount:0,
    getTeacherPerformanceCount:[],
    getSubjectPerformance:[],
    getLeastAttendees:[],
    imageUpload:[],
    GetTeacherName:[]
}

const reducer: Reducer<TeacherState> = (state = initialState, action) => {
    switch (action.type) {
           
            case TeacherActionTypes.FETCH_TEACHER:
            case TeacherActionTypes.ADD_TEACHER:
            case TeacherActionTypes.EDIT_TEACHER:
            case TeacherActionTypes.FETCH_TEACHER_MAPPING:
            case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING:
            case TeacherActionTypes.TEACHER_CLASS_COUNT:
            case TeacherActionTypes.TEACHER_IMAGE_UPLOAD:
            case TeacherActionTypes.Teacher_Performance_Count:
            case TeacherActionTypes.Subject_Performance:
            case TeacherActionTypes.Least_Attendees_Report:    
                return { 
                    ...state, 
                    loading: true,
                    imageUpload:[],
                    errors:[]
                };
            
            case TeacherActionTypes.FETCH_TEACHER_ID:
                return { 
                    ...state, 
                    loading: true,
                    GetTeacherProfile:[],
                    imageUpload:[],
                    errors:[]
                };   
            case TeacherActionTypes.FETCH_TEACHER_FAIL_ID:
            case TeacherActionTypes.ADD_TEACHER_FAIL:
            case TeacherActionTypes.EDIT_TEACHER_FAIL:
            case TeacherActionTypes.FETCH_TEACHER_FAIL:
            case TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL:
            case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL:
            case TeacherActionTypes.TEACHER_CLASS_COUNT_FAIL:
            case TeacherActionTypes.TEACHER_IMAGE_UPLOAD_FAIL:
            case TeacherActionTypes.Teacher_Performance_Count_FAIL:
            case TeacherActionTypes.Subject_Performance_Fail:
            case TeacherActionTypes.Least_Attendees_Report_Fail:
                const { getResponseError } = action;
                return {
                    ...state,
                    errors: getResponseError,
                    loading: false,
                    isAuthenticated: true
                };
            case TeacherActionTypes.TEACHER_IMAGE_UPLOADT_SUCCESS:
                const { ImageURL } = action;
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    items: action.payload,
                    imageUpload: ImageURL
                }; 
            case TeacherActionTypes.ADD_TEACHER_SUCCESS:
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    errors:[] 
                };
            case TeacherActionTypes.TEACHER_CLASS_COUNT_SUCCESS:
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    classCount:action.payload.data
                };
            case TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID:
                const { TeacherId, TeacherProfile } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false, 
                    TeacherId: TeacherId,
                    GetTeacherProfile:TeacherProfile,
                    errors:[]
                };
                case TeacherActionTypes.Subject_Performance_Success:
                    const { getSubjectPerformance } = action;
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    getSubjectPerformance:getSubjectPerformance
                };
            case TeacherActionTypes.FETCH_TEACHER_SUCCESS:
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
                    errors:[],
                }

                case TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS:
                    const { getSubjectList, Subject_per_page, Subject_page, Subject_total } = action;
                    if(Subject_page === 1) {
                        state.getSubjectClass = []
                    }            
                    return {
                        ...state, 
                        loading: false, 
                        items: action.payload,
                        page: Subject_page,
                        per_page: Subject_per_page,
                        getSubjectClass: [...state.getSubjectClass, ...getSubjectList],
                        total: Subject_total,
                        totalPage: Math.ceil(Subject_total / Subject_per_page),
                        isAuthenticated: false,
                        errors:[],
                        SubjectTotal:Subject_total
                    }

                case TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS:
                    const { classRecords, classPer_page, classPage, classTotal } = action;
                    if(classPage === 1) {
                        state.classRecords = []
                    }            
                    return {
                        ...state, 
                        loading: false, 
                        items: action.payload,
                        classPage: classPage,
                        classPer_page: classPer_page,
                        classRecords: classRecords,
                        isAuthenticated: false,
                        errors:[],
                        classTotal:classTotal
                    }
                case TeacherActionTypes.Get_Teacher_Name_List:    
                return { 
                    ...state, 
                    loading: true,
                    errors:[]
                };
                case TeacherActionTypes.Get_Teacher_Name_List_Success:
                    const { GetTeacherName } = action;
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    GetTeacherName: GetTeacherName,
                    isAuthenticated: true,
                    errors:[]
                };
                case TeacherActionTypes.Get_Teacher_Name_List_Fail:
                    const { getTeacherError } = action;
                    return {
                        ...state,
                        errors: getTeacherError,
                        loading: false,
                        isAuthenticated: true
                    };
            case TeacherActionTypes.DELETE_TEACHER_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    errors:[]
                };   
            case TeacherActionTypes.Teacher_Performance_Count_SUCCESS:
                const { TeacherPerformanceCount } = action
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    getTeacherPerformanceCount: TeacherPerformanceCount,
                    errors:[]
                };
            case TeacherActionTypes.Least_Attendees_Report_Success:
                const { getLeastAttendees } = action
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    getLeastAttendees: getLeastAttendees,
                    errors:[]
                };
        default:
            return state;
    }
}
export { reducer as TeacherReducer }
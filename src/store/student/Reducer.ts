import { Reducer } from 'redux';
import { StudentState, StudentActionTypes } from './Types';

export const initialState: StudentState = {
    items: [],
    loading: false,
    isAuthenticated: false,
    getParentStatus:false,
    errors: [],
    page: 1,
    per_page: 10,
    records: [],
    total: 0,
    parentDetails:[],
    parentList:false,
    ImageURL:[],
    getStudentEditResponse:[],
    imageUploadstatus:false,
    studentProfile:[],
    studentProfileTopic:[],
    studentProfileSubject:[],
    studentProfileLine:[],
    getStudentNameList:[]
}

const reducer: Reducer<StudentState> = (state = initialState, action) => {
    switch (action.type) {
        
        case StudentActionTypes.DELETE_STUDENT:
        case StudentActionTypes.FETCH_STUDENT:
        case StudentActionTypes.FETCH_STUDENT_ID:
        case StudentActionTypes.FETCH_STUDENT_PROFILE:
        case StudentActionTypes.Student_Profile_Line:
        case StudentActionTypes.Student_Profile_Subject:
        case StudentActionTypes.Student_Profile_Topic:
            return { 
                ...state, 
                loading: true,
                isAuthenticated: false,
                imageUploadstatus: true,
                getStudentEditResponse:[],
                parentDetails:[],
                total: 0,
                getParentStatus:true,
                ImageURL:[]
            };
            case StudentActionTypes.Removed_Image_Upload:
                return { 
                    ...state, 
                    loading: true,
                    isAuthenticated: false,
                    ImageURL:[]
                };
            case StudentActionTypes.Removed_Image_Upload_Success:
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    ImageURL: []
                };
                case StudentActionTypes.Student_Name_List:
                    return { 
                        ...state, 
                        loading: true,
                        isAuthenticated: false,
                        ImageURL:[]
                    };
            case StudentActionTypes.Student_Name_List_Success:
                const {getStudentNameList } = action
                return { 
                    ...state, 
                    loading: false,
                    isAuthenticated: true,
                    getStudentNameList:getStudentNameList,
                    ImageURL: []
                };
            case StudentActionTypes.FETCH_PARENT:
                return { 
                    ...state, 
                    loading: true,
                    isAuthenticated: false,
                    parentDetails:[],
                    getParentStatus:true
                };
        case StudentActionTypes.ADD_STUDENT:
        case StudentActionTypes.EDIT_STUDENT:
                return { 
                    ...state, 
                    loading: true,
                    isAuthenticated: false
                };
            case StudentActionTypes.FETCH_STUDENT_IMAPGE:
                return { 
                    ...state, 
                    loading: true,
                    isAuthenticated: false,
                    imageUploadstatus: true,
                    getParentStatus:true
                };
        case StudentActionTypes.ADD_STUDENT_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true 
            }; 
        case StudentActionTypes.FETCH_STUDENT_IMAPGE_SUCCESS:
            const { ImageURL } = action;
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true,
                items: action.payload,
                ImageURL: ImageURL,
                imageUploadstatus: true
            }; 
        case StudentActionTypes.FETCH_STUDENT_SUCCESS:
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

            case StudentActionTypes.FETCH_STUDENT_SUCCESS_ID: 
            const { getStudentEditResponse } = action;
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                getStudentEditResponse: getStudentEditResponse.data
            };
            case StudentActionTypes.FETCH_PARENT_SUCCESS:     
            const { parentDetails } = action;  
            return {
                ...state, 
                loading: false, 
                items: action.payload,
                isAuthenticated: false,
                parentDetails: parentDetails,
                getParentStatus:true
            };
            case StudentActionTypes.DELETE_STUDENT_SUCCESS:
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true
                };
            case StudentActionTypes.FETCH_STUDENT_PROFILE_SUCCESS:
                const { studentProfile } = action;  
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    studentProfile:studentProfile
                };
            case StudentActionTypes.Student_Profile_Line_Success:
                const { studentProfileLine } = action;  
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    studentProfileLine:studentProfileLine
                };
            case StudentActionTypes.Student_Profile_Subject_Success:
                const { studentProfileSubject } = action;  
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    studentProfileSubject:studentProfileSubject
                };
            case StudentActionTypes.Student_Profile_Topic_Success:
                const { studentProfileTopic } = action;  
                return {
                    ...state,
                    items: action.payload,
                    loading: false,
                    isAuthenticated: true,
                    studentProfileTopic:studentProfileTopic
                };

            case StudentActionTypes.ADD_STUDENT_FAIL:
            case StudentActionTypes.DELETE_STUDENT_FAIL:
            case StudentActionTypes.EDIT_STUDENT_FAIL:                            
            case StudentActionTypes.FETCH_STUDENT_FAIL_ID:
            case StudentActionTypes.FETCH_STUDENT_IMAPGE_FAIL:
            case StudentActionTypes.FETCH_STUDENT_PROFILE_FAIL:
            case StudentActionTypes.Student_Profile_Line_Fail:
            case StudentActionTypes.Student_Profile_Subject_Fail:
            case StudentActionTypes.Student_Profile_Topic_Fail:
            case StudentActionTypes.Student_Name_List_Fail:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: false,
                parentDetails:[],
                ImageURL:[]
            };

            case StudentActionTypes.FETCH_PARENT_FAIL:
                return {
                    ...state,
                    errors: action.payload,
                    loading: false,
                    isAuthenticated: false,
                    getParentStatus:false,
                    parentDetails:[]
                };
            case StudentActionTypes.FETCH_STUDENT_FAIL:  
            
            return {
                ...state,
                errors: action.payload,
                loading: false,
                isAuthenticated: false,
                records:[]
            };

        default:
            return state;        
    }
}

export { reducer as studentReducer }
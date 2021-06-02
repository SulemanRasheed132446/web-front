import { Reducer } from 'redux'
import { ProfileActionTypes, ProfileState } from './Types'

export const initialState: ProfileState = {
    items: {},
    loading: false,
    isAuthenticated: null,
    schoolId:'',
    profileData:[],
    YearList:[],
    getDuration:[],
    getCurrectYear:'',
    getStudentClasses:null,
    getYear:null,
    getYearFail:null,
    diaryNotificationMessage:[],
    noticeBoardNotificationMessage:[],
    failStudentClasses:[],
    AttendanceStudentView:[]
}

const reducer: Reducer<ProfileState> = (state = initialState, action) => {
    switch (action.type) {
        case ProfileActionTypes.FETCH_PROFILE:
        case ProfileActionTypes.TOKEN_VALIDATION_REQUEST:
        case ProfileActionTypes.YEAR_LIST_REQUEST:
        case ProfileActionTypes.DURATION_LIST_REQUEST:
            return { ...state, loading: true,  getDuration:[] };

        case ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE:
            return { ...state, loading: true,  diaryNotificationMessage:[] };

        case ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_FAIL:
                return { ...state, loading: false }; 

        case ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_SUCCESS:
            const { diaryNotificationMessage } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    diaryNotificationMessage: diaryNotificationMessage
                };

        case ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE:
            return { ...state, loading: true,  noticeBoardNotificationMessage:[] };

        case ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_SUCCESS:
            const { noticeBoardNotificationMessage } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    noticeBoardNotificationMessage: noticeBoardNotificationMessage
                };

        case ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_FAIL:
                return { ...state, loading: false }; 


        case ProfileActionTypes.Storage_Class_Request:
            return { ...state, loading: true };
        
        case ProfileActionTypes.Storage_Class_Request_Success:
            const { getStudentClasses } = action;
                return {
                    ...state, 
                    loading: false, 
                    getStudentClasses: getStudentClasses
                };

        case ProfileActionTypes.Storage_Class_Request_Fail:
            const { failStudentClasses } = action;
                return { 
                    ...state, 
                    loading: false,
                    getStudentClasses: failStudentClasses
                  }; 
    
            case ProfileActionTypes.View_Student_Details:
            return { ...state, loading: true, AttendanceStudentView: [] };
        
        case ProfileActionTypes.View_Student_Details_Success:
            const { AttendanceStudentView } = action;
                return {
                    ...state, 
                    loading: false, 
                    AttendanceStudentView: AttendanceStudentView
                };
            
        case ProfileActionTypes.YEAR_STORAGE: 
        return { ...state, loading: true };

        case ProfileActionTypes.YEAR_STORAGE_FAIL:
            const { getYearFail } = action;
            return { ...state, loading: false, 
                getYear:getYearFail };
            
        case ProfileActionTypes.YEAR_STORAGE_SUCCESS:
            const { getYear } = action;
            return { ...state, 
                loading: false, 
                getYear:getYear };

        case ProfileActionTypes.FETCH_PROFILE_FAIL:
        case ProfileActionTypes.TOKEN_VALIDATION_ERROR:
        case ProfileActionTypes.YEAR_LIST_ERROR:
        case ProfileActionTypes.DURATION_LIST_ERROR:
                return { ...state, loading: false,
                    isAuthenticated: true }; 
        
        case ProfileActionTypes.FETCH_PROFILE_SUCCESS:
            const { schoolId, profileData } = action
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    schoolId:schoolId,
                    profileData: profileData
                };
            case ProfileActionTypes.YEAR_LIST_SUCCESS:
            const { YearList } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    YearList: YearList
                };
            case ProfileActionTypes.DURATION_LIST_SUCCESS:
            const { getDuration } = action;
                return {
                    ...state, 
                    loading: false, 
                    items: action.payload,
                    isAuthenticated: false,
                    getDuration: getDuration
                };
            default:
                return state;
    }
}

export { reducer as ProfileReducer }
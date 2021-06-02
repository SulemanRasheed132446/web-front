import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import { baseAPIAuth, baseAPI } from '../../Service';
import { AUTHAPI, CATEGORYMANAGE } from '../../services/Config'
import { ProfileActionTypes, ProfilelDetailsType } from './Types'
import history from '../../History';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

interface FetchProfile {
    type: ProfileActionTypes.FETCH_PROFILE;
}

interface FetchProfileSuccess {
    type: ProfileActionTypes.FETCH_PROFILE_SUCCESS;
    payload: ProfilelDetailsType;
}

interface FetchProfileFail {
    type: ProfileActionTypes.FETCH_PROFILE_FAIL;
}

export const fetchProfilePost = (): ThunkResult<void> => async dispatch => {
    handleFetchProfile(dispatch);
    try {
        const response: AxiosResponse<ProfilelDetailsType> = await baseAPIAuth.get(AUTHAPI.PROFILE, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getProfileDetails:any = response.data;
        if(getProfileDetails.status === true) {
            handleFetchProfileSuccess(dispatch, response.data);
        } else if(getProfileDetails.status === false && getProfileDetails.message === 'Invalid token') {
            localStorage.clear();
            history.push('/');
            handleFetchProfileFail(dispatch);
        } else {
            handleFetchProfileFail(dispatch);
        }        
    } catch (e) {
        handleFetchProfileFail(dispatch);
    }
};


export const handleFetchProfile = (dispatch: Dispatch<FetchProfile>) => {
    dispatch({ type: ProfileActionTypes.FETCH_PROFILE });
};

export const handleFetchProfileSuccess = (
    dispatch: Dispatch<FetchProfileSuccess>,
    response: ProfilelDetailsType
) => {
    dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_SUCCESS,
        payload: response,
        schoolId:response.data.school_id,
        profileData:response.data
    });
    
};

export const handleFetchProfileFail = (dispatch: Dispatch<FetchProfileFail>) => {
    dispatch({
        type: ProfileActionTypes.FETCH_PROFILE_FAIL
    });
};

interface FetchYearStorage {
    type: ProfileActionTypes.YEAR_STORAGE;
}

interface FetchYearStorageSuccess {
    type: ProfileActionTypes.YEAR_STORAGE_SUCCESS;
    payload: any;
}

interface FetchYearStorageFail {
    type: ProfileActionTypes.YEAR_STORAGE_FAIL;
    payload:any
}

export const getYearData = (getYear?:any): ThunkResult<void> => async dispatch => {
    handleYearStorage(dispatch);
    try {
       if(getYear){
        let currectYear:any = getYear
        handleYearStorageSuccess(dispatch, currectYear);
       }else{
        const dateCurrent: any = new Date();
        let currectYear:any = dateCurrent.getFullYear();
        handleYearStorageFail(dispatch, currectYear);
       }
      
    } catch (e) {
        handleYearStorageFail(dispatch, e);
    }
};


export const handleYearStorage = (dispatch: Dispatch<FetchYearStorage>) => {
    dispatch({ type: ProfileActionTypes.YEAR_STORAGE });
};

export const handleYearStorageSuccess = (
    dispatch: Dispatch<FetchYearStorageSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.YEAR_STORAGE_SUCCESS,
        payload: response,
        getYear:response
    });
    
};
export const handleYearStorageFail = (dispatch: Dispatch<FetchYearStorageFail>, response: any) => {
    dispatch({
        type: ProfileActionTypes.YEAR_STORAGE_FAIL,
        payload: response,
        getYearFail:response
    });
};
//get Studetn class info
interface FetchAttendanceStudentView {
    type: ProfileActionTypes.View_Student_Details;
}

interface FetchAttendanceStudentViewSuccess {
    type: ProfileActionTypes.View_Student_Details_Success;
    payload: any;
}

export const getAttendanceStudentView = (getData?:any): ThunkResult<void> => async dispatch => {
    handleAttendanceStudentView(dispatch);
    try {
       if(getData){
        let getStudentDetail:any = getData
        handleAttendanceStudentViewSuccess(dispatch, getStudentDetail);
       }
      
    } catch (e) {
        handleStudentClassesFail(dispatch, e);
    }
};


export const handleAttendanceStudentView = (dispatch: Dispatch<FetchAttendanceStudentView>) => {
    dispatch({ type: ProfileActionTypes.View_Student_Details });
};

export const handleAttendanceStudentViewSuccess = (
    dispatch: Dispatch<FetchAttendanceStudentViewSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.View_Student_Details_Success,
        payload: response,
        AttendanceStudentView:response
    });
    
};

//get Studetn class info
interface FetchStudentClasses {
    type: ProfileActionTypes.Storage_Class_Request;
}

interface FetchStudentClassesSuccess {
    type: ProfileActionTypes.Storage_Class_Request_Success;
    payload: any;
}

interface FetchStudentClassesFail {
    type: ProfileActionTypes.Storage_Class_Request_Fail
    payload:any
}

export const getStudentClassesData = (getData?:any): ThunkResult<void> => async dispatch => {
    handleStudentClasses(dispatch);
    try {
       if(getData){
        let getClassDetail:any = getData
        handleStudentClassesSuccess(dispatch, getClassDetail);
       }else{
        let getClassDetail:any = [];
        handleStudentClassesFail(dispatch, getClassDetail);
       }
      
    } catch (e) {
        handleStudentClassesFail(dispatch, e);
    }
};


export const handleStudentClasses = (dispatch: Dispatch<FetchStudentClasses>) => {
    dispatch({ type: ProfileActionTypes.Storage_Class_Request });
};

export const handleStudentClassesSuccess = (
    dispatch: Dispatch<FetchStudentClassesSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.Storage_Class_Request_Success,
        payload: response,
        getStudentClasses:response
    });
    
};
export const handleStudentClassesFail = (dispatch: Dispatch<FetchStudentClassesFail>, response: any) => {
    dispatch({
        type: ProfileActionTypes.Storage_Class_Request_Fail,
        payload: response,
        failStudentClasses:response
    });
};

interface YearList {
    type: ProfileActionTypes.YEAR_LIST_REQUEST;
}

interface YearListSuccess {
    type: ProfileActionTypes.YEAR_LIST_SUCCESS;
    payload: ProfilelDetailsType;
}

interface YearListFail {
    type: ProfileActionTypes.YEAR_LIST_ERROR;
}

export const YearListGet = (): ThunkResult<void> => async dispatch => {
    handleYearList(dispatch);
    try {
        const response: AxiosResponse<ProfilelDetailsType> = await baseAPI.get(CATEGORYMANAGE.YearList, 
            { headers: {"Authorization" : localStorage.getItem('token')} });   
            handleYearListSuccess(dispatch, response.data);        
    } catch (e) {
        handleYearListFail(dispatch);
    }
};


export const handleYearList = (dispatch: Dispatch<YearList>) => {
    dispatch({ type: ProfileActionTypes.YEAR_LIST_REQUEST });
};

export const handleYearListSuccess = (
    dispatch: Dispatch<YearListSuccess>,
    response: ProfilelDetailsType
) => {
    dispatch({
        type: ProfileActionTypes.YEAR_LIST_SUCCESS,
        payload: response,
        YearList: response.data
    });
};

export const handleYearListFail = (dispatch: Dispatch<YearListFail>) => {
    dispatch({
        type: ProfileActionTypes.YEAR_LIST_ERROR
    });
};

interface DurationList {
    type: ProfileActionTypes.DURATION_LIST_REQUEST;
}

interface DurationListSuccess {
    type: ProfileActionTypes.DURATION_LIST_SUCCESS;
    payload: any;
}

interface DurationListFail {
    type: ProfileActionTypes.DURATION_LIST_ERROR;
}

export const DurationListGet = (): ThunkResult<void> => async dispatch => {
    handleDurationList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(CATEGORYMANAGE.durationChart, 
            { headers: {"Authorization" : localStorage.getItem('token')} });   
            handleDurationListSuccess(dispatch, response.data);        
    } catch (e) {
        handleDurationListFail(dispatch);
    }
};


export const handleDurationList = (dispatch: Dispatch<DurationList>) => {
    dispatch({ type: ProfileActionTypes.DURATION_LIST_REQUEST });
};

export const handleDurationListSuccess = (
    dispatch: Dispatch<DurationListSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.DURATION_LIST_SUCCESS,
        payload: response,
        getDuration: response.data
    });
};

export const handleDurationListFail = (dispatch: Dispatch<DurationListFail>) => {
    dispatch({
        type: ProfileActionTypes.DURATION_LIST_ERROR
    });
};
// Diary Notification message 
interface FetachDiaryNotificationMessage {
    type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE;
}

interface FetachDiaryNotificationMessageSuccess {
    type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_SUCCESS;
    payload: any;
}

interface FetachDiaryNotificationMessageFail {
    type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_FAIL;
}

export const DiaryNotificationMessage = (getValue?:any): ThunkResult<void> => async dispatch => {
    handleDiaryNotificationMessage(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(CATEGORYMANAGE.durationChart, 
            { headers: {"Authorization" : localStorage.getItem('token')} });   
            handleDiaryNotificationMessageSuccess(dispatch, response.data);        
    } catch (e) {
        handleDiaryNotificationMessageFail(dispatch);
    }
};


export const handleDiaryNotificationMessage = (dispatch: Dispatch<FetachDiaryNotificationMessage>) => {
    dispatch({ type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE });
};

export const handleDiaryNotificationMessageSuccess = (
    dispatch: Dispatch<FetachDiaryNotificationMessageSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_SUCCESS,
        payload: response,
        diaryNotificationMessage: response.data
    });
};

export const handleDiaryNotificationMessageFail = (dispatch: Dispatch<FetachDiaryNotificationMessageFail>) => {
    dispatch({
        type: ProfileActionTypes.DIARY_NOTIFICATION_MESSAGE_FAIL
    });
};

// Notice Board Notification Message 
interface FetachNoticeBoardMessage {
    type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE;
}

interface FetachNoticeBoardMessageSuccess {
    type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_SUCCESS;
    payload: any;
}

interface FetachNoticeBoardMessageFail {
    type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_FAIL;
}

export const NoticeBoardMessage = (getValue?:any): ThunkResult<void> => async dispatch => {
    handleNoticeBoardMessage(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(CATEGORYMANAGE.durationChart, 
            { headers: {"Authorization" : localStorage.getItem('token')} });   
            handleNoticeBoardMessageSuccess(dispatch, response.data);        
    } catch (e) {
        handleNoticeBoardMessageFail(dispatch);
    }
};


export const handleNoticeBoardMessage = (dispatch: Dispatch<FetachNoticeBoardMessage>) => {
    dispatch({ type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE });
};

export const handleNoticeBoardMessageSuccess = (
    dispatch: Dispatch<FetachNoticeBoardMessageSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_SUCCESS,
        payload: response,
        noticeBoardNotificationMessage: response.data
    });
};

export const handleNoticeBoardMessageFail = (dispatch: Dispatch<FetachNoticeBoardMessageFail>) => {
    dispatch({
        type: ProfileActionTypes.NOTICEBOARD_NOTIFICATION_MESSAGE_FAIL
    });
};

// This is the function used to validation for token
interface TokenValidation {
    type: ProfileActionTypes.TOKEN_VALIDATION_REQUEST;
}

interface TokenValidationSuccess {
    type: ProfileActionTypes.TOKEN_VALIDATION_SUCCESS;
    payload: any;
}

interface TokenValidationFail {
    type: ProfileActionTypes.TOKEN_VALIDATION_ERROR;
}

export const TokenValidationPost = (): ThunkResult<void> => async dispatch => {
    handleTokenValidation(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPIAuth.get(AUTHAPI.CHECKTOKENVALIDATION, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        handleTokenValidationSuccess(dispatch, response.data);
    } catch (e) {
        handleTokenValidationFail(dispatch);
    }
};


export const handleTokenValidation = (dispatch: Dispatch<TokenValidation>) => {
    dispatch({ type: ProfileActionTypes.TOKEN_VALIDATION_REQUEST });
};

export const handleTokenValidationSuccess = (
    dispatch: Dispatch<TokenValidationSuccess>,
    response: any
) => {
    dispatch({
        type: ProfileActionTypes.TOKEN_VALIDATION_SUCCESS,
        payload: response
    });
    
};

export const handleTokenValidationFail = (dispatch: Dispatch<TokenValidationFail>) => {
    dispatch({
        type: ProfileActionTypes.TOKEN_VALIDATION_ERROR
    });
};

export type ProfileAction =
    | FetchProfileSuccess
    | YearListSuccess
    | DurationListSuccess
    | FetchStudentClassesSuccess
    | FetchAttendanceStudentViewSuccess;
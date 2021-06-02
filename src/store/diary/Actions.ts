import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import { baseAPI } from '../../Service';
import { DIARYAPI, DashboardAPI } from '../../services/Config';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import { LoadMoreType } from '../../components/type';
import { DiaryActionTypes } from './Types';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

export const fetchSearchAllStudent = (params: any) => {
    return async (dispatch: Dispatch): Promise<any> => {
        try {
            dispatch({ type: DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST });
            const response = await baseAPI.get(DIARYAPI.GETALLSTUDENTSEARCHLIST, 
                {  params, headers: {"Authorization" : localStorage.getItem('token')} });
            return dispatch({
                type: DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST_SUCCESS,
                payload: response.data.data
            });
        }catch(e){
            dispatch({
                type: DiaryActionTypes.FETCH_SEARCH_STUDENT_LIST_FAIL
            });
        }
    }
}

// This is the action used to get diary details
interface FetchDiary {
    type: DiaryActionTypes.FETCH_DIARY;
}

interface FetchDiarySuccess {
    type: DiaryActionTypes.FETCH_DIARY_SUCCESS;
    payload: any;
}

interface FetchDiaryFail {
    type: DiaryActionTypes.FETCH_DIARY_FAIL;
}

export const fetchDiaryPost = (loadMoreType: LoadMoreType, url:any): ThunkResult<void> => async dispatch => {
    handleFetchDiary(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(url, {
            params: loadMoreType,
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        });
        const getResponse:any = response.data;
        if(getResponse.status === true) {
            handleFetchDiarySuccess(dispatch, response.data);
        } else { 
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });           
            handleFetchDiaryFail(dispatch);
        }        
    } catch (e) {
        handleFetchDiaryFail(dispatch);
    }
};

export const handleFetchDiary = (dispatch: Dispatch<FetchDiary>) => {
    dispatch({ type: DiaryActionTypes.FETCH_DIARY });
};

export const handleFetchDiarySuccess = (
    dispatch: Dispatch<FetchDiarySuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.FETCH_DIARY_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });

};

export const handleFetchDiaryFail = (dispatch: Dispatch<FetchDiaryFail>) => {
    dispatch({
        type: DiaryActionTypes.FETCH_DIARY_FAIL
    });
};

//This is the function used to get all Student details
interface FetchGetAllStudent {
    type: DiaryActionTypes.FETCH_ALLCLASS_LIST_ID;
}

interface FetchGetAllStudentSuccess {
    type: DiaryActionTypes.FETCH_ALLCLASS_LIST_SUCCESS_ID;
    payload: any;
}

interface FetchGetAllStudentFail {
    type: DiaryActionTypes.FETCH_ALLCLASS_LIST_FAIL_ID;
}

export const fetchGetAllClassList = (loadMoreType: LoadMoreType) => {
    return async (dispatch: Dispatch): Promise<any> => {
        try {
            dispatch({ type: DiaryActionTypes.FETCH_ALLCLASS_LIST_ID });
            const response = await baseAPI.get(DIARYAPI.GETALLSTUDENTLIST, 
                {  params: loadMoreType,
                    headers: {"Authorization" : localStorage.getItem('token')} });
            return dispatch({
                type: DiaryActionTypes.FETCH_ALLCLASS_LIST_SUCCESS_ID,
                payload: response.data.data
              });
        }catch(e){
            dispatch({
                type: DiaryActionTypes.FETCH_ALLCLASS_LIST_FAIL_ID
            });
        }
    }
}


export const handleFetchGetAllStudent = (dispatch: Dispatch<FetchGetAllStudent>) => {
    dispatch({ type: DiaryActionTypes.FETCH_ALLCLASS_LIST_ID });
};

export const handleFetchGetAllStudentSuccess = (
    dispatch: Dispatch<FetchGetAllStudentSuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.FETCH_ALLCLASS_LIST_SUCCESS_ID,
        payload: response
    });
    
};

export const handleFetchGetAllStudentFail = (dispatch: Dispatch<FetchGetAllStudentFail>) => {
    dispatch({
        type: DiaryActionTypes.FETCH_ALLCLASS_LIST_FAIL_ID
    });
};

//This is the function used to get all Student details
interface FetchGetStudent {
    type: DiaryActionTypes.FETCH_STUDENT_LIST_ID;
}

interface FetchGetStudentSuccess {
    type: DiaryActionTypes.FETCH_STUDENT_LISTSUCCESS_ID;
    payload: any;
}

interface FetchGetStudentFail {
    type: DiaryActionTypes.FETCH_STUDENT_LIST_FAIL_ID;
}


export const fetchGetStudent = (getStudant: any) => {
    return async (dispatch: Dispatch): Promise<any> => {
        try {
            dispatch({ type: DiaryActionTypes.FETCH_ALLCLASS_LIST_ID });
            const response = await baseAPI.get(DIARYAPI.GETSTUDENTLIST, 
                {  params: getStudant, headers: {"Authorization" : localStorage.getItem('token')} });
            return dispatch({
                type:  DiaryActionTypes.FETCH_STUDENT_LISTSUCCESS_ID, 
                payload: response.data.data
              });
        }catch(e){
            dispatch({
                type: DiaryActionTypes.FETCH_ALLCLASS_LIST_FAIL_ID
            });
        }
    }
}



export const handleFetchGetStudent = (dispatch: Dispatch<FetchGetStudent>) => {
    dispatch({ type: DiaryActionTypes.FETCH_STUDENT_LIST_ID });
};

export const handleFetchGetStudentSuccess = (
    dispatch: Dispatch<FetchGetStudentSuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.FETCH_STUDENT_LISTSUCCESS_ID,
        payload: response
    });
    
};

export const handleFetchGetStudentFail = (dispatch: Dispatch<FetchGetStudentFail>) => {
    dispatch({
        type: DiaryActionTypes.FETCH_STUDENT_LIST_FAIL_ID
    });
};

//This is the function used to get drop down
interface FetchGetDropDown {
    type: DiaryActionTypes.DIARY_DROP_DOWN;
}

interface FetchGetDropDownSuccess {
    type: DiaryActionTypes.DIARY_DROP_DOWN_SUCCESS;
    payload: any;
}

interface FetchGetDropDownFail {
    type: DiaryActionTypes.DIARY_DROP_DOWN_FAIL;
}


export const DiaryDropDown = (): ThunkResult<void> => async dispatch => {
    handleDiaryDropDown(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DIARYAPI.DiaryDropDown,
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchDiaryDropDownSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchDiaryDropDownFail(dispatch);
    }
};

export const handleDiaryDropDown = (dispatch: Dispatch<FetchGetDropDown>) => {
    dispatch({ type: DiaryActionTypes.DIARY_DROP_DOWN });
};

export const handleFetchDiaryDropDownSuccess = (
    dispatch: Dispatch<FetchGetDropDownSuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.DIARY_DROP_DOWN_SUCCESS,
        payload: response,
        getDiaryDropDown: response.data
    });
    
};
export const handleFetchDiaryDropDownFail = (dispatch: Dispatch<FetchGetDropDownFail>) => {
    dispatch({
        type: DiaryActionTypes.DIARY_DROP_DOWN_FAIL
    });
};

//This is the function diary replay
interface FetchDiaryReplay {
    type: DiaryActionTypes.DIARY_REPLAY;
}

interface FetchDiaryReplaySuccess {
    type: DiaryActionTypes.DIARY_REPLAY_SUCCESS;
    payload: any;
}

interface FetchDiaryReplayFail {
    type: DiaryActionTypes.DIARY_REPLAY_FAIL;
}


export const PutDiaryReplay = (putReplay?:any): ThunkResult<void> => async dispatch => {
    handleDiaryReplay(dispatch);
    let getPostValue:any = {
        reply: putReplay.reply
    }
    try {
        const response: AxiosResponse<any> = await baseAPI.put(`${DashboardAPI.diaryReply}${putReplay.id}/`, getPostValue,
        { headers: { "Authorization": localStorage.getItem('token') } });
        handleFetchDiaryReplaySuccess(dispatch, response.data);
    } catch (e) {
        handleFetchDiaryReplayFail(dispatch);
    }
};

export const handleDiaryReplay = (dispatch: Dispatch<FetchDiaryReplay>) => {
    dispatch({ type: DiaryActionTypes.DIARY_REPLAY });
};

export const handleFetchDiaryReplaySuccess = (
    dispatch: Dispatch<FetchDiaryReplaySuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.DIARY_REPLAY_SUCCESS,
        payload: response
    });
    window.location.reload(false);
};
export const handleFetchDiaryReplayFail = (dispatch: Dispatch<FetchDiaryReplayFail>) => {
    dispatch({
        type: DiaryActionTypes.DIARY_REPLAY_FAIL
    });
};
// FETCH Image Upload Student details

interface FetchDiaryImageUpdate {
    type: DiaryActionTypes.ADD_DIARY_IMAGE;
}

interface FetchDiaryImageUpdateSuccess {
    type: DiaryActionTypes.ADD_DIARY_IMAGE_SUCCESS;
    payload: any;
}

interface FetchDiaryImageUpdateFail {
    type: DiaryActionTypes.ADD_DIARY_IMAGE_FAIL;
}

export const DiaryImageUpdate = (getImage:any): ThunkResult<void> => async dispatch => {
    handleDiaryImageUpdate(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(DIARYAPI.DIARYAPIIMAGEUPDATE, getImage,
        { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse:any = response.data;
        if(getResponse.status === false) {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleFetchDiaryImageUpdateFail(dispatch);
        } else {
            handleFetchDiaryImageUpdateSuccess(dispatch, getResponse);
        }            
                 
    } catch (e) {
        handleFetchDiaryImageUpdateFail(dispatch);
    }
};

export const handleDiaryImageUpdate = (dispatch: Dispatch<FetchDiaryImageUpdate>) => {
    dispatch({ type: DiaryActionTypes.ADD_DIARY_IMAGE });
};

const handleFetchDiaryImageUpdateSuccess = (
    dispatch: Dispatch<FetchDiaryImageUpdateSuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.ADD_DIARY_IMAGE_SUCCESS,
        payload: response,
        ImageURL:response.data
    });
};

const handleFetchDiaryImageUpdateFail = (dispatch: Dispatch<FetchDiaryImageUpdateFail>) => {
    dispatch({
        type:  DiaryActionTypes.ADD_DIARY_IMAGE_FAIL
    });
};


//Add Classes
interface AddDiary {
    type:DiaryActionTypes.ADD_DIARY;
}

interface AddDiarySuccess {
    type: DiaryActionTypes.ADD_DIARY_SUCCESS;
    payload: any;
}

interface AddDiaryFail {
    type: DiaryActionTypes.ADD_DIARY_FAIL;
    payload: any;
}

export const addDiaryPost = (diary:any, getURL:any): ThunkResult<void> => async dispatch => {
    handleAddDiary(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(getURL, diary, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true) {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleAddDiarySuccess(dispatch, response.data);
            
        }else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleAddDiaryFail(dispatch, response.data);
            
        }        
    } catch (e) {
        handleAddDiaryFail(dispatch, e);
    }
};

export const handleAddDiary = (dispatch: Dispatch<AddDiary>) => {
    dispatch({ type: DiaryActionTypes.ADD_DIARY });
};

export const handleAddDiarySuccess = (
    dispatch: Dispatch<AddDiarySuccess>,
    response: any
) => {
    dispatch({
        type: DiaryActionTypes.ADD_DIARY_SUCCESS,
        payload: response
    });
    setTimeout(() => {
    window.location.reload(false);
}, notificationMsg.duration);
};

export const handleAddDiaryFail = (dispatch: Dispatch<AddDiaryFail>, response: any) => {
    dispatch({
        type: DiaryActionTypes.ADD_DIARY_FAIL, payload: response
    });
};

export type DiaryAction =
    | FetchDiary
    | FetchDiarySuccess
    | FetchDiaryFail
    | FetchGetAllStudent
    | FetchGetAllStudentSuccess
    | FetchGetAllStudentFail
    | FetchGetStudent
    | FetchGetStudentSuccess
    | FetchGetStudentFail
    | AddDiary
    | AddDiarySuccess
    | AddDiaryFail
    | FetchDiaryImageUpdate
    | FetchDiaryImageUpdateFail
    | FetchDiaryImageUpdateSuccess;
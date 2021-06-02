import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { RootState, RootActions } from '../Index';
import { AxiosResponse } from 'axios';
import history from '../../History';
import { baseAPI } from '../../Service';
import { SCHOOLMANAGE, ListItem, DashboardAPI } from '../../services/Config';
import toaster from "toasted-notes";
import { notificationMsg } from '../../services/Constants';
import { ClassesActionTypes, ClassesType, GradeFieldsType, ClassesActionGradeType } from '../../store/classes/Type';
import { LoadMoreType } from '../../components/type';

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;

// Fetch Classes
interface FetchClasses {
    type: ClassesActionTypes.FETCH_CLASSES;
}

interface FetchClassesSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface FetchClassesPaginationSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_PAGE_ONLOAD;
    payload: ClassesType;
}

interface FetchClassesFail {
    type: ClassesActionTypes.FETCH_CLASSES_FAIL;
}

export const fetchClassesPagination = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(SCHOOLMANAGE.CLASSES, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassesPaginationSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const fetchClassesPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(SCHOOLMANAGE.CLASSES, {   
            params: loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassesSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const handleFetchClasses = (dispatch: Dispatch<FetchClasses>) => {
    dispatch({ type: ClassesActionTypes.FETCH_CLASSES });
};

export const handleFetchClassesSuccess = (
    dispatch: Dispatch<FetchClassesSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_SUCCESS,
        payload: response
        
    });
    
};

export const handleFetchClassesPaginationSuccess = (
    dispatch: Dispatch<FetchClassesPaginationSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_PAGE_ONLOAD,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total,
        
    });
    
};

export const handleFetchClassesFail = (dispatch: Dispatch<FetchClassesFail>) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_FAIL
    });
};


// Fetch Classes Id detail
interface FetchClassesId {
    type: ClassesActionTypes.FETCH_CLASSES_ID;
}

interface FetchClassesIdSuccess {
    type: ClassesActionTypes.FETCH_CLASSES_SUCCESS_ID;
    payload: ClassesType;
}

interface FetchClassesIdFail {
    type: ClassesActionTypes.FETCH_CLASSES_FAIL_ID;
}

export const fetchClassesIdPost = (id: number): ThunkResult<void> => async dispatch => {
    handleFetchClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.get(`/api/classes/${id}/`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        handleFetchClassesSuccess(dispatch, getResponse.data);
    } catch (e) {
        handleFetchClassesFail(dispatch);
    }
};

export const handleFetchClassesId = (dispatch: Dispatch<FetchClassesId>) => {
    dispatch({ type: ClassesActionTypes.FETCH_CLASSES_ID });
};

export const handleFetchClassesIdSuccess = (
    dispatch: Dispatch<FetchClassesIdSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_SUCCESS_ID,
        payload: response
    });
    
};

export const handleFetchClassesIdFail = (dispatch: Dispatch<FetchClassesIdFail>) => {
    dispatch({
        type: ClassesActionTypes.FETCH_CLASSES_FAIL_ID
    });
};

// Fetch Classes grade
interface FetchGrade {
    type: ClassesActionGradeType.FETCH_GRADE;
}

interface FetchGradeSuccess {
    type: ClassesActionGradeType.FETCH_GRADE_SUCCESS;
    payload: GradeFieldsType;
}

interface FetchGradeFail {
    type: ClassesActionGradeType.FETCH_GRADE_FAIL;
}

export const fetchGradePost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchGrade(dispatch);
    try {
        const response: AxiosResponse<GradeFieldsType> = await baseAPI.get(SCHOOLMANAGE.GRADELIST, 
            { 
                params: loadMoreType,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchGradeSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchGradeFail(dispatch);
    }
};

export const handleFetchGrade = (dispatch: Dispatch<FetchGrade>) => {
    dispatch({ type: ClassesActionGradeType.FETCH_GRADE });
};

export const handleFetchGradeSuccess = (
    dispatch: Dispatch<FetchGradeSuccess>,
    response: GradeFieldsType
) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_SUCCESS,
        payload: response
    });
    
};

export const handleFetchGradeFail = (dispatch: Dispatch<FetchGradeFail>) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_FAIL
    });
};

// Fetch Classes grade
interface FetchGradeStandard {
    type: ClassesActionGradeType.FETCH_GRADE_STANDARD;
}

interface FetchGradeSuccessStandard {
    type: ClassesActionGradeType.FETCH_GRADE_SUCCESS_STANDARD;
    payload: GradeFieldsType;
}

interface FetchGradeFailStandard {
    type: ClassesActionGradeType.FETCH_GRADE_FAIL_STANDARD;
}

export const fetchGradeStandardPost = (): ThunkResult<void> => async dispatch => {
    handleFetchGrade(dispatch);
    try {
        const response: AxiosResponse<GradeFieldsType> = await baseAPI.get(SCHOOLMANAGE.GRADESTANDARD, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchGradeStandardSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchGradeStandardFail(dispatch);
    }
};

export const handleFetchGradeStandard = (dispatch: Dispatch<FetchGradeStandard>) => {
    dispatch({ type: ClassesActionGradeType.FETCH_GRADE_STANDARD });
};

export const handleFetchGradeStandardSuccess = (
    dispatch: Dispatch<FetchGradeSuccessStandard>,
    response: GradeFieldsType
) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_SUCCESS_STANDARD,
        payload: response
    });
    
};

export const handleFetchGradeStandardFail = (dispatch: Dispatch<FetchGradeFailStandard>) => {
    dispatch({
        type: ClassesActionGradeType.FETCH_GRADE_FAIL_STANDARD
    });
};

// Fetch Classes Report
interface FetchClassrePort {
    type: ClassesActionTypes.Fetch_Classre_Port;
}

interface FetchClassrePortSuccess {
    type: ClassesActionTypes.Fetch_Classre_Port_Success;
    payload: any;
}

interface FetchClassrePortFail {
    type: ClassesActionTypes.Fetch_Classre_Port_Fail;
}

export const fetchClassrePort = (postData:any): ThunkResult<void> => async dispatch => {
    handleFetchClassrePort(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.ClassrePort, 
            { 
                params: postData,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleFetchClassrePortSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchClassrePortFail(dispatch);
    }
};

export const handleFetchClassrePort = (dispatch: Dispatch<FetchClassrePort>) => {
    dispatch({ type: ClassesActionTypes.Fetch_Classre_Port });
};

export const handleFetchClassrePortSuccess = (
    dispatch: Dispatch<FetchClassrePortSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.Fetch_Classre_Port_Success,
        payload: response,
        getClassrePort:response.data
    });
    
};

export const handleFetchClassrePortFail = (dispatch: Dispatch<FetchClassrePortFail>) => {
    dispatch({
        type: ClassesActionTypes.Fetch_Classre_Port_Fail
    });
};

// get student details
interface postClassrePort {
    type: ClassesActionTypes.Student_Classre_Port;
}

interface postClassrePortSuccess {
    type: ClassesActionTypes.Student_Classre_Port_Success;
    payload: any;
}

interface postClassrePortFail {
    type: ClassesActionTypes.Student_Classre_Port_Fail;
}

export const getStudentClassrePort = (postData:any): ThunkResult<void> => async dispatch => {
    handlePostClassrePort(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(DashboardAPI.ClassrePort, postData,
            { 
                params: postData,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handlePostClassrePortSuccess(dispatch, response.data);
    } catch (e) {
        handlePostClassrePortFail(dispatch);
    }
};

export const handlePostClassrePort = (dispatch: Dispatch<postClassrePort>) => {
    dispatch({ type: ClassesActionTypes.Student_Classre_Port });
};

export const handlePostClassrePortSuccess = (
    dispatch: Dispatch<postClassrePortSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.Student_Classre_Port_Success,
        payload: response,
        getStudentClassrePort:response.data.student_data
    });
    
};

export const handlePostClassrePortFail = (dispatch: Dispatch<postClassrePortFail>) => {
    dispatch({
        type: ClassesActionTypes.Student_Classre_Port_Fail
    });
};

// Fetch Classes grade
interface FetchMyClassList {
    type: ClassesActionTypes.FETCH_MY_CLASS_LIST;
}

interface FetchFetchMyClassListSuccess {
    type: ClassesActionTypes.FETCH_MY_CLASS_LIST_SUCCESS;
    payload: any;
}

interface FetchMyClassListFail {
    type: ClassesActionTypes.FETCH_MY_CLASS_LIST_FAIL;
}

export const fetchMyClassListGet = (): ThunkResult<void> => async dispatch => {
    handleFetchMyClassList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(ListItem.myClassList, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
            return handleFetchMyClassListSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchMyClassListFail(dispatch);
    }
};

export const handleFetchMyClassList = (dispatch: Dispatch<FetchMyClassList>) => {
    dispatch({ type: ClassesActionTypes.FETCH_MY_CLASS_LIST });
};

export const handleFetchMyClassListSuccess = (
    dispatch: Dispatch<FetchFetchMyClassListSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_MY_CLASS_LIST_SUCCESS,
        payload: response
    });
    
};

export const handleFetchMyClassListFail = (dispatch: Dispatch<FetchMyClassListFail>) => {
    dispatch({
        type: ClassesActionTypes.FETCH_MY_CLASS_LIST_FAIL
    });
};

// Fetch Classes grade
interface FetchMySectionList {
    type: ClassesActionTypes.FETCH_MY_SECTION_LIST;
}

interface FetchFetchMySectionListSuccess {
    type: ClassesActionTypes.FETCH_MY_SECTION_LIST_SUCCESS;
    payload: any;
}

interface FetchMySectionListFail {
    type: ClassesActionTypes.FETCH_MY_SECTION_LIST_FAIL;
    payload: any;
}

export const fetchMySectionListGet = (grade:any): ThunkResult<void> => async dispatch => {
    handleFetchMySectionList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(ListItem.mySectionList, 
            {    params: grade, 
                headers: {"Authorization" : localStorage.getItem('token')} });
                if(response.data.status === true){
                    handleFetchMySectionListSuccess(dispatch, response.data);
                } else {
                    handleFetchMySectionListFail(dispatch, response.data);
                }
                
    } catch (e) {
        handleFetchMySectionListFail(dispatch, e);
    }
};

export const handleFetchMySectionList = (dispatch: Dispatch<FetchMySectionList>) => {
    dispatch({ type: ClassesActionTypes.FETCH_MY_SECTION_LIST });
};

export const handleFetchMySectionListSuccess = (
    dispatch: Dispatch<FetchFetchMySectionListSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.FETCH_MY_SECTION_LIST_SUCCESS,
        payload: response
    });
    
};

export const handleFetchMySectionListFail = (dispatch: Dispatch<FetchMySectionListFail>,
    response: any) => {
    dispatch({
        type: ClassesActionTypes.FETCH_MY_SECTION_LIST_FAIL,
        payload: response,
        errors: response
    });
};


// Fetch class Recent Quiz
interface FetchClassRecentQuiz {
    type: ClassesActionTypes.Class_Recent_Quiz;
}

interface FetchClassRecentQuizSuccess {
    type: ClassesActionTypes.Class_Recent_Quiz_Success;
    payload: any;
}

interface FetchClassRecentQuizFail {
    type: ClassesActionTypes.Class_Recent_Quiz_Fail;
}

export const fetchClassRecentQuiz = (postValue:any): ThunkResult<void> => async dispatch => {
    handleClassRecentQuiz(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.classRecentQuiz, 
            {    params: postValue, 
                headers: {"Authorization" : localStorage.getItem('token')} });
                handleClassRecentQuizSuccess(dispatch, response.data);
    } catch (e) {
        handleClassRecentQuizFail(dispatch);
    }
};

export const handleClassRecentQuiz = (dispatch: Dispatch<FetchClassRecentQuiz>) => {
    dispatch({ type: ClassesActionTypes.Class_Recent_Quiz });
};

export const handleClassRecentQuizSuccess = (
    dispatch: Dispatch<FetchClassRecentQuizSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.Class_Recent_Quiz_Success,
        payload: response,
        getClassRecentQuiz:response.data
    });
};

export const handleClassRecentQuizFail = (dispatch: Dispatch<FetchClassRecentQuizFail>) => {
    dispatch({
        type: ClassesActionTypes.Class_Recent_Quiz_Fail
    });
};


// Fetch ClassRecentFeedback
interface FetchClassRecentFeedback {
    type: ClassesActionTypes.Class_Recent_Feedback;
}

interface FetchClassRecentFeedbackSuccess {
    type: ClassesActionTypes.Class_Recent_Feedback_Success;
    payload: any;
}

interface FetchClassRecentFeedbackFail {
    type: ClassesActionTypes.Class_Recent_Feedback_Fail;
}

export const getClassRecentFeedback = (postValue:any): ThunkResult<void> => async dispatch => {
    handleClassRecentFeedback(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.classRecentFeedback, 
            {    params: postValue, 
                headers: {"Authorization" : localStorage.getItem('token')} });
                handleClassRecentFeedbackSuccess(dispatch, response.data);
    } catch (e) {
        handleClassRecentFeedbackFail(dispatch);
    }
};

export const handleClassRecentFeedback = (dispatch: Dispatch<FetchClassRecentFeedback>) => {
    dispatch({ type: ClassesActionTypes.Class_Recent_Feedback });
};

export const handleClassRecentFeedbackSuccess = (
    dispatch: Dispatch<FetchClassRecentFeedbackSuccess>,
    response: any
) => {
    dispatch({
        type: ClassesActionTypes.Class_Recent_Feedback_Success,
        payload: response,
        getClassRecentFeedback:response.data
    });
};

export const handleClassRecentFeedbackFail = (dispatch: Dispatch<FetchClassRecentFeedbackFail>) => {
    dispatch({
        type: ClassesActionTypes.Class_Recent_Feedback_Fail
    });
};



//Add Classes
interface AddClasses {
    type:ClassesActionTypes.ADD_CLASSES;
}

interface AddClassesSuccess {
    type: ClassesActionTypes.ADD_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface AddClassesFail {
    type: ClassesActionTypes.ADD_CLASSES_FAIL;
    payload: any;
}

export const addClassesPost = (classes:ClassesType): ThunkResult<void> => async dispatch => {
    handleAddClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.post(SCHOOLMANAGE.CLASSES, classes, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true) {
            handleAddClassesSuccess(dispatch, response.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        }else {
            handleAddClassesFail(dispatch, response.data);
            toaster.notify(getResponse.data.non_field_errors, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        }        
    } catch (e) {
        handleAddClassesFail(dispatch, e);
    }
};

export const handleAddClasses = (dispatch: Dispatch<AddClasses>) => {
    dispatch({ type: ClassesActionTypes.ADD_CLASSES });
};

export const handleAddClassesSuccess = (
    dispatch: Dispatch<AddClassesSuccess>,
    response: ClassesType
) => {
    dispatch({
        type: ClassesActionTypes.ADD_CLASSES_SUCCESS,
        payload: response
    });
    history.push('/class');
};

export const handleAddClassesFail = (dispatch: Dispatch<AddClassesFail>, response: any) => {
    dispatch({
        type: ClassesActionTypes.ADD_CLASSES_FAIL, payload: response
    });
};

// EDIT Classes

interface EditClasses {
    type: ClassesActionTypes.EDIT_CLASSES;
}

interface EditClassesSuccess {
    type: ClassesActionTypes.EDIT_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface EditClassesFail {
    type: ClassesActionTypes.EDIT_CLASSES_FAIL;
    payload: any;
}

export const EditClassesPost = (editedClasses:ClassesType): ThunkResult<void> => async dispatch => {
    handleAddClasses(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.put( `/api/classes/${editedClasses.id}/`,editedClasses, 
        { headers: {"Authorization" : localStorage.getItem('token')}}); 
        const getResponse =  JSON.parse(JSON.stringify(response.data))
        if(getResponse.status === true) {
            handleAddClassesSuccess(dispatch, response.data);
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
        } else {
              handleEditClassesFail(dispatch, response.data);
        }
    } catch (e) {
        handleEditClassesFail(dispatch, e);
    }
};

export const handleEditClasses = (dispatch: Dispatch<EditClasses>) => {
    dispatch({ type: ClassesActionTypes.EDIT_CLASSES });
};

export const handleEditClassesSuccess = (
    dispatch: Dispatch<EditClassesSuccess>,
    response: ClassesType
) => {   
    dispatch({
        type: ClassesActionTypes.EDIT_CLASSES_SUCCESS,
        payload: response
    });
    history.push('/class'); 
};

export const handleEditClassesFail = (dispatch: Dispatch<EditClassesFail>, response: any) => {
    setTimeout(() => {
    dispatch({
        type: ClassesActionTypes.EDIT_CLASSES_FAIL, payload: response
    });
    
}, notificationMsg.duration); 
};

// DELETE Classes

interface DeleteClasses {
    type: ClassesActionTypes.DELETE_CLASSES
}

interface DeleteClassesSuccess {
    type: ClassesActionTypes.DELETE_CLASSES_SUCCESS;
    payload: ClassesType;
}

interface DeleteClassesFail {
    type: ClassesActionTypes.DELETE_CLASSES_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getvalue = {
        id : deletedId.id,
        is_active:deletedId.isActive
    }
    handleDeleteSubject(dispatch);
    try {
        const response: AxiosResponse<ClassesType> = await baseAPI.post(`/api/classes/${deletedId.id}/`, getvalue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse =  JSON.parse(JSON.stringify(response.data))
        handleDeleteSubjectSuccess(dispatch, response.data);
        toaster.notify(getResponse.message, {
            position: 'top', 
            duration: notificationMsg.duration
          });
    } catch (e) {
        handleDeleteSubjectFail(dispatch);
    }
};

const handleDeleteSubject = (dispatch: Dispatch<DeleteClasses>) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES });
};

const handleDeleteSubjectSuccess = (
    dispatch: Dispatch<DeleteClassesSuccess>,
    response: ClassesType
) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES_SUCCESS, payload: response });
    history.push('/class');
};
const handleDeleteSubjectFail = (dispatch: Dispatch<DeleteClassesFail>) => {
    dispatch({ type: ClassesActionTypes.DELETE_CLASSES_FAIL });
    history.push('/class');
};

export type ClassesAction =
    | FetchClasses
    | FetchClassesSuccess
    | FetchClassesFail
    |FetchGrade
    |FetchGradeSuccess
    |FetchGradeFail
    | AddClasses
    | AddClassesSuccess
    | AddClassesFail
    | EditClasses
    | EditClassesSuccess
    | EditClassesFail
    | DeleteClasses
    | DeleteClassesSuccess
    | DeleteClassesFail
    | FetchMyClassList
    | FetchFetchMyClassListSuccess
    | FetchMyClassListFail
    | FetchMySectionList
    | FetchFetchMySectionListSuccess
    | FetchMySectionListFail;
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { baseAPIAuth, baseAPI } from '../../Service';
import { RootState, RootActions } from '../Index';
import { TeacherActionTypes, TeacherType } from './Type';
import { LoadMoreType } from '../../components/type';
import history from '../../History';
import {  USERNAMENAGE, Teacher, DashboardAPI, leastAttendees, AUTHAPI } from '../../services/Config'
import { notificationMsg } from '../../services/Constants'
import toaster from "toasted-notes";

//Implement Thunk middle ware
export type ThunkResult<R> = ThunkAction<R, RootState, undefined, RootActions>;
//Farch Teacher Details
interface FetchTeachers {
    type: TeacherActionTypes.FETCH_TEACHER;
}

interface FetchTeachersSuccess {
    type: TeacherActionTypes.FETCH_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface FetchTeachersFail {
    type: TeacherActionTypes.FETCH_TEACHER_FAIL;
}

export const fetchTeachersPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleFetchTeachers(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.get(USERNAMENAGE.GETUSER,{   
            params:loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchTeachersSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeachersFail(dispatch);
    }
};

export const handleFetchTeachers = (dispatch: Dispatch<FetchTeachers>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER });
};

export const handleFetchTeachersSuccess = (
    dispatch: Dispatch<FetchTeachersSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_SUCCESS,
        payload: response,
        records: response.data.records,
        per_page: response.data.per_page,
        page: response.data.page,
        total: response.data.total
    });
    
};

export const handleFetchTeachersFail = (dispatch: Dispatch<FetchTeachersFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_FAIL
    });
};

// FETCH Image Upload Student details

interface FetchTeacherImageUpdate {
    type: TeacherActionTypes.TEACHER_IMAGE_UPLOAD;
}

interface FetchTeacherImageUpdateSuccess {
    type: TeacherActionTypes.TEACHER_IMAGE_UPLOADT_SUCCESS;
    payload: any;
}

interface FetchTeacherImageUpdateFail {
    type: TeacherActionTypes.TEACHER_IMAGE_UPLOAD_FAIL;
}

export const TeacherImageUpdate = (getImage:any, url:any): ThunkResult<void> => async dispatch => {
    handleTeacherImageUpdate(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(url, getImage,
        { headers: { "Authorization": localStorage.getItem('token') } });
        const getResponse:any = response.data;
        if(getResponse.status === false){
            toaster.notify(getResponse.message, {
                position: 'top',
                duration: notificationMsg.duration
            });
        }
        if(getResponse.data.length === undefined){
            handleFetchTeacherImageUpdateSuccess(dispatch, getResponse);
        } else {            
            handleFetchTeacherImageUpdateFail(dispatch);
        }
                 
    } catch (e) {
        handleFetchTeacherImageUpdateFail(dispatch);
    }
};

export const handleTeacherImageUpdate = (dispatch: Dispatch<FetchTeacherImageUpdate>) => {
    dispatch({ type: TeacherActionTypes.TEACHER_IMAGE_UPLOAD });
};

const handleFetchTeacherImageUpdateSuccess = (
    dispatch: Dispatch<FetchTeacherImageUpdateSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.TEACHER_IMAGE_UPLOADT_SUCCESS,
        payload: response,
        ImageURL:response.data
    });
};

const handleFetchTeacherImageUpdateFail = (dispatch: Dispatch<FetchTeacherImageUpdateFail>) => {
    dispatch({
        type: TeacherActionTypes.TEACHER_IMAGE_UPLOAD_FAIL
    });
};

//Farch Teacher mapping Details
interface FetchSubjectMapping {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING;
}

interface FetchSubjectMappingSuccess {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS;
    payload: any;
}

interface FetchSubjectMappingFail {
    type: TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL;
}

export const FetchSubjectMappingPost = (loadMoreType:LoadMoreType): ThunkResult<void> => async dispatch => {
    handleSubjectMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${Teacher.TeacherPost}${loadMoreType.teacher_id}/`,{   
            params:loadMoreType,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
            handleSubjectMappingSuccess(dispatch, response.data);
    } catch (e) {
        handleSubjectMappingFail(dispatch);
    }
};

export const handleSubjectMapping = (dispatch: Dispatch<FetchSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER_MAPPING });
};

export const handleSubjectMappingSuccess = (
    dispatch: Dispatch<FetchSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_MAPPING_SUCCESS,
        payload: response,
        getSubjectList: response.data.records,
        Subject_per_page: response.data.per_page,
        Subject_page: response.data.page,
        Subject_total: response.data.total
    });
};

export const handleSubjectMappingFail = (dispatch: Dispatch<FetchSubjectMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_MAPPING_FAIL
    });
};

//Farch Teacher mapping Details
interface ClassInchargeMapping {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING;
}

interface ClassInchargeMappingSuccess {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS;
    payload: any;
}

interface ClassInchargeMappingFail {
    type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL;
}

export const fetchClassInchargeMappingPost = (TeacherSubject:any): ThunkResult<void> => async dispatch => {
    handleFetchClassInchargeMapping(dispatch);
    const postValue = {
        page_no:TeacherSubject.page_no,
        academic_year:TeacherSubject.academic_year
    }
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${Teacher.TeacherClass}${TeacherSubject.teacher_id}/`,{   
            params:postValue,
            headers: {
                "Authorization" : localStorage.getItem('token')} 
            });
        handleFetchClassInchargeSuccess(dispatch, response.data);
    } catch (e) {
        handleFetchTeachersFail(dispatch);
    }
};

export const handleFetchClassInchargeMapping = (dispatch: Dispatch<ClassInchargeMapping>) => {
    dispatch({ type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING });
};

export const handleFetchClassInchargeSuccess = (
    dispatch: Dispatch<ClassInchargeMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_SUCCESS,
        payload: response,
        classRecords: response.data.actual_records,
        classPer_page: response.data.per_page,
        classPage: response.data.page,
        classTotal: response.data.total
    });
};

export const handleFetchClassInchargeMappingFail = (dispatch: Dispatch<ClassInchargeMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_CLASS_INCHARGE_MAPPING_FAIL
    });
};

// Fetch teacher details Id
interface FetchTeacherId {
    type: TeacherActionTypes.FETCH_TEACHER_ID;
}

interface FetchTeacherSuccessId {
    type: TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID;
    payload: TeacherType;
}

interface FetchTeacherFailId {
    type: TeacherActionTypes.FETCH_TEACHER_FAIL_ID;
}

export const fetchTeacherPostId = (id:string): ThunkResult<void> => async dispatch => {
    handleFetchTeacherId(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.get(`/auth/user/?id=${id}`, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            handleFetchTeacherSuccessId(dispatch, response.data);
        } else {
            handleFetchTeacherFailId(dispatch);
        }
        
    } catch (e) {
        handleFetchTeacherFailId(dispatch);
    }
};

export const handleFetchTeacherId = (dispatch: Dispatch<FetchTeacherId>) => {
    dispatch({ type: TeacherActionTypes.FETCH_TEACHER_ID });
};

export const handleFetchTeacherSuccessId = (
    dispatch: Dispatch<FetchTeacherSuccessId>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_SUCCESS_ID,
        payload: response,
        TeacherId:response.data.ldap_id,
        TeacherProfile:response.data        
    });
};

export const handleFetchTeacherFailId = (dispatch: Dispatch<FetchTeacherFailId>) => {
    dispatch({
        type: TeacherActionTypes.FETCH_TEACHER_FAIL_ID
    });
};


// Add Classes
interface AddTeacher {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface AddTeacherSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface AddTeacherFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
    payload: any;
}

export const AddTeacherPost = (userManage:TeacherType): ThunkResult<void> => async dispatch => {
    handleAddTeacher(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPIAuth.post(USERNAMENAGE.USERMANAGE, userManage, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleAddTeacherSuccess(dispatch, response.data);
        } else {
              handleAddTeacherFail(dispatch, response.data);
        }
       
    } catch (e) {
        handleAddTeacherFail(dispatch, e);
    }
};

export const handleAddTeacher = (dispatch: Dispatch<AddTeacher>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleAddTeacherSuccess = (
    dispatch: Dispatch<AddTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response
    });
    history.push('/teacher');
};

export const handleAddTeacherFail = (dispatch: Dispatch<AddTeacherFail>,
    response: any) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });
};

// Add Class incharge mapping
interface TeacherClassMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherClassMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherClassMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
}

export const TeacherClassMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        class_incharge:teacherMap.class_incharge
    }
    handleTeacherClassMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(`${Teacher.TeacherClass}${teacherMap.teacher_id}/`, teacherMapPost, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherClassMappingSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherClassMappingFail(dispatch);
        }
       
    } catch (e) {
        handleTeacherClassMappingFail(dispatch);
    }
};

export const handleTeacherClassMapping = (dispatch: Dispatch<TeacherClassMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherClassMappingSuccess = (
    dispatch: Dispatch<TeacherClassMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};

export const handleTeacherClassMappingFail = (dispatch: Dispatch<TeacherClassMappingFail>) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL
    });
};

// Get Class Count List
interface TeacherClassCount {
    type: TeacherActionTypes.TEACHER_CLASS_COUNT;
}

interface TeacherClassCountSuccess {
    type: TeacherActionTypes.TEACHER_CLASS_COUNT_SUCCESS;
    payload: any;
}

interface TeacherClassCountFail {
    type: TeacherActionTypes.TEACHER_CLASS_COUNT_FAIL;
}

export const TeacherClassCountGet = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year
    }
    handleTeacherClassCount(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(`${Teacher.ClassCount}${teacherMap.teacher_id}/`, 
            { params:teacherMapPost,
                headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
              handleTeacherClassCountSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherClassCountFail(dispatch);
        }
       
    } catch (e) {
        handleTeacherClassCountFail(dispatch);
    }
};

export const handleTeacherClassCount = (dispatch: Dispatch<TeacherClassCount>) => {
    dispatch({ type: TeacherActionTypes.TEACHER_CLASS_COUNT });
};

export const handleTeacherClassCountSuccess = (
    dispatch: Dispatch<TeacherClassCountSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.TEACHER_CLASS_COUNT_SUCCESS,
        payload: response
    });
};

export const handleTeacherClassCountFail = (dispatch: Dispatch<TeacherClassCountFail>) => {
    dispatch({
        type: TeacherActionTypes.TEACHER_CLASS_COUNT_FAIL
    });
};

// Get Class Count List
interface TeacherPerformance {
    type: TeacherActionTypes.Teacher_Performance_Count;
}

interface TeacherPerformanceSuccess {
    type: TeacherActionTypes.Teacher_Performance_Count_SUCCESS;
    payload: any;
}

interface TeacherPerformanceFail {
    type: TeacherActionTypes.Teacher_Performance_Count_FAIL;
}

export const TeacherPerformanceCount = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        teacher_id:teacherMap.teacher_id
    }
    handleTeacherPerformanceCount(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.teacherPerformance, 
            { params:teacherMapPost,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleTeacherPerformanceCountSuccess(dispatch, response.data);
    } catch (e) {
        handleTeacherPerformanceCountFail(dispatch);
    }
};

export const handleTeacherPerformanceCount = (dispatch: Dispatch<TeacherPerformance>) => {
    dispatch({ type: TeacherActionTypes.Teacher_Performance_Count });
};

export const handleTeacherPerformanceCountSuccess = (
    dispatch: Dispatch<TeacherPerformanceSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.Teacher_Performance_Count_SUCCESS,
        payload: response,
        TeacherPerformanceCount: response.data
    });
   
};

export const handleTeacherPerformanceCountFail = (dispatch: Dispatch<TeacherPerformanceFail>) => {
    dispatch({
        type: TeacherActionTypes.Teacher_Performance_Count_FAIL
    });
};

// Get Class Count List
interface SubjectPerformance {
    type: TeacherActionTypes.Subject_Performance;
}

interface SubjectPerformanceSuccess {
    type: TeacherActionTypes.Subject_Performance_Success;
    payload: any;
}

interface SubjectPerformanceFail {
    type: TeacherActionTypes.Subject_Performance_Fail;
}

export const getSubjectPerformance = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        teacher_id:teacherMap.teacher_id
    }
    handleSubjectPerformance(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(DashboardAPI.teacherSubjectPerformance, 
            { params:teacherMapPost,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleSubjectPerformanceSuccess(dispatch, response.data);
    } catch (e) {
        handleSubjectPerformanceFail(dispatch);
    }
};

export const handleSubjectPerformance = (dispatch: Dispatch<SubjectPerformance>) => {
    dispatch({ type: TeacherActionTypes.Subject_Performance });
};

export const handleSubjectPerformanceSuccess = (
    dispatch: Dispatch<SubjectPerformanceSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.Subject_Performance_Success,
        payload: response,
        getSubjectPerformance: response.data
    });
  
};

export const handleSubjectPerformanceFail = (dispatch: Dispatch<SubjectPerformanceFail>) => {
    dispatch({
        type: TeacherActionTypes.Subject_Performance_Fail
    });
};

// Get Least Attendees Report
interface LeastAttendees {
    type: TeacherActionTypes.Least_Attendees_Report;
}

interface LeastAttendeesSuccess {
    type: TeacherActionTypes.Least_Attendees_Report_Success;
    payload: any;
}

interface LeastAttendeesFail {
    type: TeacherActionTypes.Least_Attendees_Report_Fail;
}

export const getLeastAttendees = (getYear:any): ThunkResult<void> => async dispatch => {
    handleLeastAttendees(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.get(leastAttendees.getLeastAttendees, 
            { params:getYear,
                headers: {"Authorization" : localStorage.getItem('token')} });
        handleLeastAttendeesSuccess(dispatch, response.data);
    } catch (e) {
        handleLeastAttendeesFail(dispatch);
    }
};

export const handleLeastAttendees = (dispatch: Dispatch<LeastAttendees>) => {
    dispatch({ type: TeacherActionTypes.Least_Attendees_Report });
};

export const handleLeastAttendeesSuccess = (
    dispatch: Dispatch<LeastAttendeesSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.Least_Attendees_Report_Success,
        payload: response,
        getLeastAttendees: response.data
    });
  
};

export const handleLeastAttendeesFail = (dispatch: Dispatch<LeastAttendeesFail>) => {
    dispatch({
        type: TeacherActionTypes.Least_Attendees_Report_Fail
    });
};


// Get Teacher name list
interface TeacherNameList {
    type: TeacherActionTypes.Get_Teacher_Name_List;
}

interface TeacherNameListSuccess {
    type: TeacherActionTypes.Get_Teacher_Name_List_Success;
    payload: any;
}

interface TeacherNameListFail {
    type: TeacherActionTypes.Get_Teacher_Name_List_Fail;
}

export const getTeacherNameList = (): ThunkResult<void> => async dispatch => {
    handleTeacherNameList(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPIAuth.get(AUTHAPI.GetTeacher, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        handleTeacherNameListSuccess(dispatch, response.data);
    } catch (e) {
        handleTeacherNameListFail(dispatch);
    }
};

export const handleTeacherNameList = (dispatch: Dispatch<TeacherNameList>) => {
    dispatch({ type: TeacherActionTypes.Get_Teacher_Name_List });
};

export const handleTeacherNameListSuccess = (
    dispatch: Dispatch<TeacherNameListSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.Get_Teacher_Name_List_Success,
        payload: response,
        GetTeacherName: response.data
    });
  
};

export const handleTeacherNameListFail = (dispatch: Dispatch<TeacherNameListFail>) => {
    dispatch({
        type: TeacherActionTypes.Get_Teacher_Name_List_Fail
    });
};

// Add Mapping Subject
interface TeacherSubjectMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherSubjectMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherSubjectMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
    payload: any;
}

export const TeacherSubjectMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        subject_id: teacherMap.subject_id,
        class_ids:teacherMap.class_ids
    }
    handleTeacherSubjectMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.post(`${Teacher.TeacherPost}${teacherMap.teacher_id}/`, teacherMapPost, 
            { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherSubjectMappingSuccess(dispatch, response.data);
        } else if(getResponse.status=== false && getResponse.data){
            toaster.notify(getResponse.data.teacher_id, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherSubjectMappingFail(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleTeacherSubjectMappingFail(dispatch, response.data);
        }
       
    } catch (e) {
        handleTeacherSubjectMappingFail(dispatch, e);
    }
};

export const handleTeacherSubjectMapping = (dispatch: Dispatch<TeacherSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherSubjectMappingSuccess = (
    dispatch: Dispatch<TeacherSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};
export const handleTeacherSubjectMappingFail = (dispatch: Dispatch<TeacherSubjectMappingFail>, response: any) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });
};

// Add Mapping Subject
interface TeacherEditSubjectMapping {
    type: TeacherActionTypes.ADD_TEACHER;
}

interface TeacherEditSubjectMappingSuccess {
    type: TeacherActionTypes.ADD_TEACHER_SUCCESS;
    payload: any;
}

interface TeacherEditSubjectMappingFail {
    type: TeacherActionTypes.ADD_TEACHER_FAIL;
    payload: any;
}

export const TeacherEditSubjectMappingPost = (teacherMap:any): ThunkResult<void> => async dispatch => {
    const teacherMapPost:any = {
        academic_year: teacherMap.academic_year,
        subject_id: teacherMap.subject_id,
        class_id:teacherMap.class_id,
        new_subject_id:teacherMap.new_subject_id
    }
    const postAcademicYear:any = {
        academic_year: teacherMap.academic_year
    }
    handleTeacherEditSubjectMapping(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPI.put(`${Teacher.TeacherPost}${teacherMap.teacher_id}/`, teacherMapPost, 
            {
                params:postAcademicYear,
                 headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherEditSubjectMappingSuccess(dispatch, response.data);
        } else if(getResponse.status=== false && getResponse.data){
            toaster.notify(getResponse.data.teacher_id, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleTeacherEditSubjectMappingFail(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
            handleTeacherEditSubjectMappingFail(dispatch, response.data);
        }
       
    } catch (e) {
        handleTeacherEditSubjectMappingFail(dispatch, e);
    }
};

export const handleTeacherEditSubjectMapping = (dispatch: Dispatch<TeacherEditSubjectMapping>) => {
    dispatch({ type: TeacherActionTypes.ADD_TEACHER });
};

export const handleTeacherEditSubjectMappingSuccess = (
    dispatch: Dispatch<TeacherEditSubjectMappingSuccess>,
    response: any
) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_SUCCESS,
        payload: response,
        teacher_id:response.data.teacher_id
    });
    history.push(`/teacher/${response.data.teacher_id}`);
};

export const handleTeacherEditSubjectMappingFail = (dispatch: Dispatch<TeacherEditSubjectMappingFail>, response: any) => {
    dispatch({
        type: TeacherActionTypes.ADD_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });    
};

// Edit User management
interface EditTeacher {
    type: TeacherActionTypes.EDIT_TEACHER;
}

interface EditTeacherSuccess {
    type: TeacherActionTypes.EDIT_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface EditTeacherFail {
    type: TeacherActionTypes.EDIT_TEACHER_FAIL;
    payload: any;
}

export const EditTeacherPost = (userManage:TeacherType): ThunkResult<void> => async dispatch => {
    handleEditTeacher(dispatch);
    try {
        const response: AxiosResponse<any> = await baseAPIAuth.put(`/auth/user/?id=${userManage.ldap_id}`, userManage, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === "true"){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleEditTeacherSuccess(dispatch, response.data);
        } else {
              handleEditTeacherFail(dispatch, response.data);
        }
    } catch (e) {
        handleEditTeacherFail(dispatch, e);
    }
};

export const handleEditTeacher = (dispatch: Dispatch<EditTeacher>) => {
    dispatch({ type: TeacherActionTypes.EDIT_TEACHER });
};

export const handleEditTeacherSuccess = (
    dispatch: Dispatch<EditTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({
        type: TeacherActionTypes.EDIT_TEACHER_SUCCESS,
        payload: response
    });  
    history.push('/teacher');  
};

export const handleEditTeacherFail = (dispatch: Dispatch<EditTeacherFail>, response: any) => {
    dispatch({
        type: TeacherActionTypes.EDIT_TEACHER_FAIL,
        payload: response,
        getResponseError: response.data
    });
};

// DELETE Teacher MANAGE

interface DeleteTeacher {
    type: TeacherActionTypes.DELETE_TEACHER;
}

interface DeleteTeacherSuccess {
    type: TeacherActionTypes.DELETE_TEACHER_SUCCESS;
    payload: TeacherType;
}

interface DeleteTeacherFail {
    type: TeacherActionTypes.DELETE_TEACHER_FAIL;
}

export const deletePost = ( deletedId: any ): ThunkResult<void> => async dispatch => {
    const getDeleteValue = { "is_active" : deletedId.isActive } 
    handleDeleteTeacher(dispatch);
    try {
        const response: AxiosResponse<TeacherType> = await baseAPIAuth.patch(`/auth/user/?id=${deletedId.ldapId}`, getDeleteValue, 
        { headers: {"Authorization" : localStorage.getItem('token')} });
        const getResponse = JSON.parse(JSON.stringify(response.data));
        if(getResponse.status === true || getResponse.status === "true"){
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteTeacherSuccess(dispatch, response.data);
        } else {
            toaster.notify(getResponse.message, {
                position: 'top', 
                duration: notificationMsg.duration
              });
              handleDeleteTeacherFail(dispatch);
        }
       
    } catch (e) {
        handleDeleteTeacherFail(dispatch);
    }
};

const handleDeleteTeacher = (dispatch: Dispatch<DeleteTeacher>) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER });
};

const handleDeleteTeacherSuccess = (
    dispatch: Dispatch<DeleteTeacherSuccess>,
    response: TeacherType
) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER_SUCCESS, payload: response });
};
const handleDeleteTeacherFail = (dispatch: Dispatch<DeleteTeacherFail>) => {
    dispatch({ type: TeacherActionTypes.DELETE_TEACHER_FAIL });
};

export type TeacherAction =
    | FetchTeachers
    | FetchTeachersSuccess
    | FetchTeachersFail
    | FetchTeacherId
    | FetchTeacherSuccessId
    | FetchTeacherFailId
    | FetchSubjectMapping
    | FetchSubjectMappingSuccess
    | FetchSubjectMappingFail
    | AddTeacher
    | AddTeacherSuccess
    | AddTeacherFail
    | DeleteTeacher
    | DeleteTeacherSuccess
    | DeleteTeacherFail
    | EditTeacher
    | EditTeacherSuccess
    | EditTeacherFail
    | ClassInchargeMapping
    | ClassInchargeMappingSuccess
    | ClassInchargeMappingFail
    | TeacherClassCount
    | TeacherClassCountSuccess
    | TeacherClassCountFail
    | FetchTeacherImageUpdateSuccess
    | FetchTeacherImageUpdateFail;
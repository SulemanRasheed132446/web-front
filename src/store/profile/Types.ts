export interface ProfilelDetailsType extends ApiResponse {
    id?:number,
    email: string,
    firstname: string,
    usertype: number,
    lastname: string,
    school_id: string,
    role: string,
    timezone: string,
    school_name: string
}
export type ApiResponse = Record<string, any>

export interface ProfileState {
    loading: boolean;
    items: any;
    isAuthenticated: boolean | null;
    schoolId:string;
    profileData:any;
    YearList:any,
    getDuration:any,
    getCurrectYear?:any,
    getStudentClasses?:any,
    getYear?:any,
    getYearFail?:any,
    diaryNotificationMessage?:any,
    noticeBoardNotificationMessage?:any,
    failStudentClasses?:any,
    AttendanceStudentView?:any
}

//Schools fetch details
export enum ProfileActionTypes {
    FETCH_PROFILE = 'FETCH_PROFILE',
    FETCH_PROFILE_SUCCESS = 'FETCH_PROFILE_SUCCESS',
    FETCH_PROFILE_FAIL = 'FETCH_PROFILE_FAIL',
    TOKEN_VALIDATION_REQUEST = "TOKEN_VALIDATION_REQUEST",
    TOKEN_VALIDATION_ERROR = "TOKEN_VALIDATION_ERROR",
    TOKEN_VALIDATION_SUCCESS = "TOKEN_VALIDATION_SUCCESS",
    YEAR_LIST_REQUEST = "YEAR_LIST_REQUEST",
    YEAR_LIST_ERROR = "YEAR_LIST_ERROR",
    YEAR_LIST_SUCCESS = "YEAR_LIST_SUCCESS",
    DURATION_LIST_REQUEST = "DURATION_LIST_REQUEST",
    DURATION_LIST_ERROR = "DURATION_LIST_ERROR",
    DURATION_LIST_SUCCESS = "DURATION_LIST_SUCCESS",
    Storage_Class_Request = "Storage_Class_Request",
    Storage_Class_Request_Fail = "Storage_Class_Request_Fail",
    Storage_Class_Request_Success = "Storage_Class_Request_Success",
    YEAR_STORAGE = "YEAR_STORAGE",
    YEAR_STORAGE_SUCCESS = "YEAR_STORAGE_SUCCESS",
    YEAR_STORAGE_FAIL = "YEAR_STORAGE_FAIL",
    DIARY_NOTIFICATION_MESSAGE = "DIARY_NOTIFICATION_MESSAGE",
    DIARY_NOTIFICATION_MESSAGE_SUCCESS = "DIARY_NOTIFICATION_MESSAGE_SUCCESS",
    DIARY_NOTIFICATION_MESSAGE_FAIL = "DIARY_NOTIFICATION_MESSAGE_FAIL",
    NOTICEBOARD_NOTIFICATION_MESSAGE = "NOTICEBOARD_NOTIFICATION_MESSAGE",
    NOTICEBOARD_NOTIFICATION_MESSAGE_SUCCESS = "NOTICEBOARD_NOTIFICATION_MESSAGE_SUCCESS",
    NOTICEBOARD_NOTIFICATION_MESSAGE_FAIL = "NOTICEBOARD_NOTIFICATION_MESSAGE_FAIL",
    View_Student_Details = "View_Student_Details",
    View_Student_Details_Success = "View_Student_Details_Success",
    View_Student_Details_Fail = "View_Student_Details_Fail"
}
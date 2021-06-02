export interface TeacherType {
        id?:number;
        ldap_id?:string;
        firstname: string;
        lastname: string;
        email_id: string;
        phone_number: string;
        role: string;
        school_id?: string,
        timezone?: string,
        school_name?:string,
        image?:any,
        is_active?:any
}
export interface TeacherTypes {
    [id: number]: TeacherType;
}
export interface TeacherState {
    items: TeacherTypes,
    loading: boolean,
    isAuthenticated: boolean | null,
    modelPop?:boolean,
    errors?:any;
    page: number,
    per_page: number,
    records: any,
    total: number,
    TeacherId:string,
    GetTeacherProfile?:any,
    getSubjectClass?:any,
    classPage: number,
    classPer_page: number,
    classRecords: any,
    classTotal: number,
    getSubjectMapping?:any,
    SubjectTotal?:any,
    classCount?:any,
    imageUpload?:any,
    getTeacherPerformanceCount?:any,
    getSubjectPerformance?:any,
    getLeastAttendees?:any,
    GetTeacherName?:any
}

export interface teacherDetails {
    teacherfirstname: string,
    teacherlastname: string,
    teacheremailid: string,
    teacherphonenumber: string,
    teacherrole: string,
    school_id?: string,
    timezone?:string,
    image?:any,
    id?:number,
    ldap_id?:string
}

//TEACHER ACTION TYPES
export enum TeacherActionTypes {
    FETCH_TEACHER = 'FETCH_TEACHER',
    FETCH_TEACHER_SUCCESS = 'FETCH_TEACHER_SUCCESS',
    FETCH_TEACHER_FAIL = 'FETCH_TEACHER_FAIL',
    FETCH_TEACHER_MAPPING = 'FETCH_TEACHER_MAPPING',
    FETCH_TEACHER_MAPPING_SUCCESS = 'FETCH_TEACHER_MAPPING_SUCCESS',
    FETCH_TEACHER_MAPPING_FAIL = 'FETCH_TEACHER_MAPPING_FAIL',    
    FETCH_CLASS_INCHARGE_MAPPING = 'FETCH_CLASS_INCHARGE_MAPPING',
    FETCH_CLASS_INCHARGE_MAPPING_SUCCESS = 'FETCH_CLASS_INCHARGE_MAPPING_SUCCESS',
    FETCH_CLASS_INCHARGE_MAPPING_FAIL = 'FETCH_CLASS_INCHARGE_MAPPING_FAIL',
    FETCH_TEACHER_ID = 'FETCH_TEACHER_ID',
    FETCH_TEACHER_SUCCESS_ID = 'FETCH_TEACHER_SUCCESS_ID',
    FETCH_TEACHER_FAIL_ID = 'FETCH_TEACHER_FAIL_ID',
    ADD_TEACHER = 'ADD_TEACHER',
    ADD_TEACHER_SUCCESS = 'ADD_TEACHER_SUCCESS',
    ADD_TEACHER_FAIL = 'ADD_TEACHERT_FAIL',
    EDIT_TEACHER = 'EDIT_TEACHER',
    EDIT_TEACHER_SUCCESS = 'EDIT_TEACHER_SUCCESS',
    EDIT_TEACHER_FAIL = 'EDIT_TEACHER_FAIL',
    DELETE_TEACHER = 'DELETE_TEACHER',
    DELETE_TEACHER_SUCCESS = 'DELETE_TEACHER_SUCCESS',
    DELETE_TEACHER_FAIL = 'DELETE_TEACHER_FAIL',
    TEACHER_CLASS_COUNT = 'TEACHER_CLASS_COUNT',
    TEACHER_CLASS_COUNT_SUCCESS = 'TEACHER_CLASS_COUNT_SUCCESS',
    TEACHER_CLASS_COUNT_FAIL = 'TEACHER_CLASS_COUNT_FAIL',
    TEACHER_IMAGE_UPLOAD = 'TEACHER_IMAGE_UPLOAD',
    TEACHER_IMAGE_UPLOADT_SUCCESS = 'TEACHER_IMAGE_UPLOAD_SUCCESS',
    TEACHER_IMAGE_UPLOAD_FAIL = 'TEACHER_IMAGE_UPLOAD_FAIL',
    Teacher_Performance_Count = 'Teacher_Performance_Count',
    Teacher_Performance_Count_SUCCESS = 'Teacher_Performance_Count_SUCCESS',
    Teacher_Performance_Count_FAIL = 'Teacher_Performance_Count_FAIL',
    Least_Attendees_Report = 'Least_Attendees_Report',
    Least_Attendees_Report_Success = 'Least_Attendees_Report_Success',
    Least_Attendees_Report_Fail = 'Least_Attendees_Report_Fail',
    Subject_Performance = 'Subject_Performance',
    Subject_Performance_Success = 'Subject_Performance_Success',
    Subject_Performance_Fail = 'Subject_Performance_Fail',
    Get_Teacher_Name_List = 'Get_Teacher_Name_List',
    Get_Teacher_Name_List_Success = 'Get_Teacher_Name_List_Success',
    Get_Teacher_Name_List_Fail = 'Get_Teacher_Name_List_Fail'
    
   }

   export interface EditClasslist {
    ClassList:any
}

export interface teacherMappingView {
    acsOrder:boolean,
    page:any,
    search:string,
    SortOrderData:string,
    OrderNameData:string,
    hasMore:boolean,
    classInchanger?:boolean
}
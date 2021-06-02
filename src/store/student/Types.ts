//Schools fetch details
export enum StudentActionTypes {
    FETCH_STUDENT = 'FETCH_STUDENT',
    FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS',
    FETCH_STUDENT_FAIL = 'FETCH_STUDENT_FAIL',
    FETCH_STUDENT_ID = 'FETCH_STUDENT_ID',
    FETCH_STUDENT_SUCCESS_ID = 'FETCH_STUDENT_SUCCESS_ID',
    FETCH_STUDENT_FAIL_ID = 'FETCH_STUDENT_FAIL_ID',
    FETCH_PARENT = 'FETCH_PARENT',
    FETCH_PARENT_SUCCESS = 'FETCH_PARENT_SUCCESS',
    FETCH_PARENT_FAIL = 'FETCH_PARENT_FAIL',
    ADD_STUDENT = 'ADD_STUDENT',
    ADD_STUDENT_SUCCESS = 'ADD_STUDENT_SUCCESS',
    ADD_STUDENT_FAIL = 'ADD_STUDENT_FAIL',
    EDIT_STUDENT = 'EDIT_STUDENT',
    EDIT_STUDENT_SUCCESS = 'EDIT_STUDENT_SUCCESS',
    EDIT_STUDENT_FAIL = 'EDIT_STUDENT_FAIL',
    DELETE_STUDENT = 'DELETE_STUDENT',
    DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS',
    DELETE_STUDENT_FAIL = 'DELETE_STUDENT_FAIL',
    FETCH_STUDENT_IMAPGE = 'FETCH_STUDENT_IMAPGE',
    FETCH_STUDENT_IMAPGE_SUCCESS = 'FETCH_STUDENT_IMAPGE_SUCCESS',
    FETCH_STUDENT_IMAPGE_FAIL = 'FETCH_STUDENT_IMAPGE_FAIL',
    FETCH_STUDENT_PROFILE = 'FETCH_STUDENT_PROFILE',
    FETCH_STUDENT_PROFILE_SUCCESS = 'FETCH_STUDENT_PROFILE_SUCCESS',
    FETCH_STUDENT_PROFILE_FAIL = 'FETCH_STUDENT_PROFILE_FAIL',
    Student_Profile_Topic = 'Student_Profile_Topic',
    Student_Profile_Topic_Success = 'Student_Profile_Topic_Success',
    Student_Profile_Topic_Fail = 'Student_Profile_Topic_Fail',
    Student_Profile_Subject = 'Student_Profile_Subject',
    Student_Profile_Subject_Success = 'Student_Profile_Subject_Success',
    Student_Profile_Subject_Fail = 'Student_Profile_Subject_Fail',
    Student_Profile_Line = 'Student_Profile_Line',
    Student_Profile_Line_Success = 'Student_Profile_Line_Success',
    Student_Profile_Line_Fail = 'Student_Profile_Line_Fail',
    Removed_Image_Upload = 'Removed_Image_Upload',
    Removed_Image_Upload_Success = 'Removed_Image_Upload_Success',
    Removed_Image_Upload_Fail = 'Removed_Image_Upload_Fail',
    Student_Name_List = 'Student_Name_List',
    Student_Name_List_Success = 'Student_Name_List_Success',
    Student_Name_List_Fail = 'Student_Name_List_Fail'
}

export interface StudentType {
    id?:number,
    school_id?:string,
    phone_number:string,
    email_id:string,
    student_id?:string,
    student_name:string,
    grade:string,
    standard:string,
    parent_firstname?:string,
    parent_lastname?:string,
    academic_year?:string,
    profile_picture?:string,
    user_id?:string
}
export interface StudentTypes {
    [id: number]: StudentType;
}

export interface StudentState {
    loading: boolean;
    items: StudentTypes;
    isAuthenticated: boolean | null;
    errors?:any
    page: number,
    per_page: number,
    records: any,
    total: number,
    parentDetails?: any,
    getParentStatus?:boolean | null,
    parentList?:boolean,
    ImageURL?:any,
    getStudentEditResponse?:any,
    imageUploadstatus?:any,
    studentProfile?:any,
    studentProfileTopic?:any,
    studentProfileSubject?:any,
    studentProfileLine?:any,
    getStudentNameList?:any
}

export interface CategoryStudentType  {
    id?:number,
    name: string;
}



export interface studentInputTypes {
    id?:number,
    school_id?:string,
    phone_number:string,
    email_id:string,
    student_id?:string,
    student_name:string,
    grade:string,
    standard:string,
    parent_firstname?:string,
    parent_lastname?:string,
    academic_year?:string,
    profile_picture?:string,
    user_id?:string,
    checkParentList?:boolean,
    formik?:any,
    getSelectClass?:boolean,
    getClass?:any,
    getSection?:any
}
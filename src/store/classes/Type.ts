export interface ClassesType  {
    id?:number,
    grade : string;
    standard : string;
    is_active ?: any;
}
export interface GradeFieldsType {
    id?:number,
    name: string;
    value:string;
}
export interface ClassesTypes {
    [id: number]: ClassesType;
}
export interface ClassesState {
    loading: boolean;
    items: any;
    isAuthenticated: boolean | null;
    gradelist: GradeFieldsType[];
    errors?:any;
    page: number,
    per_page: number,
    records: any,
    total: number,
    standardList: GradeFieldsType[],
    my_section?:any,
    my_class?:any,
    imageUploadstatus?:any,
    getClassrePort?:any,
    getStudentClassrePort?:any,
    getClassRecentQuiz?:any,
    getClassRecentFeedback?:any,
    recordDelete?:any,
    sectionErrorMsg?:any
}
export interface ISearchBarState {
    show: boolean,
    showDelete: boolean,
    addShow: boolean,
    acadamicAdmin: boolean,
    schoolAdmin: boolean,
    bothData: boolean,
    teacher: boolean,
    parent: boolean,
    deleteClassesId: any,
    query: string,
    hasMore: boolean,
    classData: any,
    prev: number,
    next: number,
    acsOrder: boolean,
    descOrder: boolean,
    subjectsTotal: number,
    page: number,
    per_page: number,
    records: any,
    total: number,
    totalPage: number,
    search: string,
    SortOrderData?:string,
    OrderNameData?:string
  }
export enum ClassesActionTypes {
    FETCH_CLASSES = 'FETCH_CLASSES',
    FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS',
    FETCH_CLASSES_PAGE_ONLOAD = 'FETCH_CLASSES_PAGE_ONLOAD',
    FETCH_CLASSES_FAIL = 'FETCH_CLASSES_FAIL',
    FETCH_CLASSES_ID = 'FETCH_CLASSES_ID',
    FETCH_CLASSES_SUCCESS_ID = 'FETCH_CLASSES_SUCCESS_ID',
    FETCH_CLASSES_FAIL_ID = 'FETCH_CLASSES_FAIL_ID',
    ADD_CLASSES = 'ADD_CLASSES',
    ADD_CLASSES_SUCCESS = 'ADD_CLASSES_SUCCESS',
    ADD_CLASSES_FAIL = 'ADD_CLASSES_FAIL',
    EDIT_CLASSES = 'EDIT_CLASSES',
    EDIT_CLASSES_SUCCESS = 'EDIT_CLASSES_SUCCESS',
    EDIT_CLASSES_FAIL = 'EDIT_CLASSES_FAIL',
    DELETE_CLASSES = 'DELETE_CLASSES',
    DELETE_CLASSES_SUCCESS = 'DELETE_CLASSES_SUCCESS',
    DELETE_CLASSES_FAIL = 'DELETE_CLASSES_FAIL',
    FETCH_MY_CLASS_LIST = 'FETCH_MY_CLASS_LIST',
    FETCH_MY_CLASS_LIST_SUCCESS = 'FETCH_MY_CLASS_LIST_SUCCESS',
    FETCH_MY_CLASS_LIST_FAIL = 'FETCH_MY_CLASS_LIST_FAIL',
    FETCH_MY_SECTION_LIST = 'FETCH_MY_SECTION_LIST',
    FETCH_MY_SECTION_LIST_SUCCESS = 'FETCH_MY_SECTION_LIST_SUCCESS',
    FETCH_MY_SECTION_LIST_FAIL = 'FETCH_MY_SECTION_LIST_FAIL',
    Fetch_Classre_Port = 'Fetch_Classre_Port',
    Fetch_Classre_Port_Success = 'Fetch_Classre_Port_Success',
    Fetch_Classre_Port_Fail = 'Fetch_Classre_Port_Fail',
    Student_Classre_Port = 'Student_Classre_Port',
    Student_Classre_Port_Success = 'Student_Classre_Port_Success',
    Student_Classre_Port_Fail = 'Student_Classre_Port_Fail',
    Class_Recent_Feedback = 'Class_Recent_Feedback',
    Class_Recent_Feedback_Success = 'Class_Recent_Feedback_Success',
    Class_Recent_Feedback_Fail = 'Class_Recent_Feedback_Fail',
    Class_Recent_Quiz = 'Class_Recent_Quiz',
    Class_Recent_Quiz_Success = 'Class_Recent_Quiz_Success',
    Class_Recent_Quiz_Fail = 'Class_Recent_Quiz_Fail'
}

export enum ClassesActionGradeType {
    FETCH_GRADE = 'FATCH_GRADE',
    FETCH_GRADE_SUCCESS = 'FATCH_GRADE_SUCCESS',
    FETCH_GRADE_FAIL = 'FATCH_GRADE_FAIL',
    FETCH_GRADE_STANDARD = 'FATCH_GRADE_STANDARD',
    FETCH_GRADE_SUCCESS_STANDARD = 'FATCH_GRADE_SUCCESS_STANDARD',
    FETCH_GRADE_FAIL_STANDARD = 'FATCH_GRADE_FAIL_STANDARD'
}
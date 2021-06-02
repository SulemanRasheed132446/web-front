import React, { Component } from 'react'
import { connect } from 'react-redux'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { Link } from 'react-router-dom';
import { TeacherImageUpdate } from '../../store/teacher/Actions';
import { IMAGEUPLOAD } from '../../services/Config';

interface ImageUploadState {
    images?:any,
    setImages?:any,
    maxNumber?:number,
    getImage?:boolean
}
export type OwnTeacherImageFormProps = {
TeacherImageUpdate:(student:any, url:any)=>void;
  postImage?:any,
  ImageUploadStatus?:any
}

export class TeacherImageUpload extends Component<OwnTeacherImageFormProps, ImageUploadState> {
    constructor(props: any) {
        super(props);
        this.state = {
            images:[],
            setImages:[],
            maxNumber:65,
            getImage:false
        }
    }
    onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
      ) => {
        this.setState({setImages: imageList, getImage:true})
        if(imageList[0].file){
         const file = imageList[0].file
          const formData = new FormData();
          formData.append('file', file);
          this.props.TeacherImageUpdate(formData, IMAGEUPLOAD.TeacherImageUpload);
        }
      };
    render() {
        const { images, setImages, maxNumber, getImage } = this.state;        
        return (
            <div>
                 <ImageUploading
                              value={images}
                              onChange={this.onChange}
                              maxNumber={maxNumber}
                              dataURLKey="data_url"
                            >
                              {({
                                imageList,
                                onImageUpload,
                                onImageRemoveAll,
                                onImageUpdate,
                                onImageRemove,
                                isDragging,
                                dragProps,
                              }) => (
                                // write your building UI
                                <div className="upload__image-wrapper text-center w-100">
                                  <div className="ml-3 mt-3">
                                    {getImage ?
                                    <span>
                                    {setImages.map((image:any, index:any) =>( 
                                      <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" className="studentImage" />
                                      </div>
                                    
                                    ))}
                                    </span>                  
                                    :
                                    <span>
                                      {this.props.postImage ? 
                                      <img src={`${process.env.REACT_APP_API_URL}${this.props.postImage}`} alt="" className="studentImage" />
                                      : <img src='../assets/img/user/teacher-profile.jpg' alt="" className="studentImage" />}
                                    </span>
                                    }
                                    </div>
                                  <Link  to={'#'} title="Upload Image"
                                  className="btn btn-circle btn-info ml-5 mb-3"
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                  >Upload Image <i className="fa fa-file-image-o" aria-hidden="true"></i>
                                  </Link>                              
                                  </div>
                              )}
                            </ImageUploading>
            </div>
        )
    }
}

const mapStateToProps = (state:any) => {
    return {     
        loading:state.teacher.loading,
        ImageUploadStatus:state.teacher.imageUpload
    };
  };

export default connect(mapStateToProps, {TeacherImageUpdate})(TeacherImageUpload)

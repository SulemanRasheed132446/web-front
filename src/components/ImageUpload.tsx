import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux'
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { RootState } from '../store/Index';
import { StudentImageUpdate, RemovedImageUpdate } from '../store/student/Actions';

interface ImageUploadState {
  images?: any,
  setImages?: any,
  maxNumber?: number,
  getImage?: boolean
}
export type OwnUpdateImageFormProps = {
  StudentImageUpdate: (student: any, url: any) => void;
  RemovedImageUpdate: () => any;
  postImage?: any;
  URLLink?: any;
}
export class ImageUpload extends Component<OwnUpdateImageFormProps, ImageUploadState> {
  constructor(props: any) {
    super(props);
    this.state = {
      images: [],
      setImages: [],
      maxNumber: 65,
      getImage: false
    }
  }
  onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    const { URLLink } = this.props
    this.setState({ setImages: imageList, getImage: true })
    if (imageList.length > 0) {
      if (imageList[0].file) {
        const file = imageList[0].file
        const formData = new FormData();
        formData.append('file', file);
        this.props.StudentImageUpdate(formData, URLLink);
      }
    } else {
      this.props.RemovedImageUpdate();
    }

  };

  render() {
    const { images, setImages, maxNumber, getImage } = this.state;
    return (
      <div className="pull-left">
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
            <div className="upload__image-wrapper ml-2">
              <div>
                <div className="ml-3">
                  {getImage ?
                    <span>
                      {setImages.map((image: any, index: any) => (
                        <div key={index} className="image-item">
                          <div className="d-flex ml-3">
                            <div>
                              <img src={image['data_url']} alt="" className="multiImage" />
                            </div>
                            <div className="image-item__btn-wrapper">
                              <Link to={'#'} onClick={() => onImageRemove(index)} className='imageUploadRemove'>
                                <i className="fa fa-trash-o" aria-hidden="true"></i></Link>
                            </div>
                          </div>
                        </div>

                      ))}
                    </span>
                    :
                    null
                  }
                </div>
              </div>
              <Link to={'#'} title="Upload"
                className="btn btn-circle btn-info mb-3"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <i className="fa fa-upload" aria-hidden="true"></i> Upload Image
              </Link>
            </div>
          )}
        </ImageUploading>
      </div>
    )
  }
}

const mapStateToProps = ({ student, classes }: RootState) => {
  return {
    loading: student.loading,
    errorMessage: student.errors
  };
};

export default connect(mapStateToProps, { StudentImageUpdate, RemovedImageUpdate })(ImageUpload)
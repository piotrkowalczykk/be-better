import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import classes from "./ImageUploader.module.css";

const ImageUploader = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);


  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  return (
    <div className={classes.imageUploaderContainer}>
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={classes.imageUploaderInput}
        />
        {imagePreviewUrl ? 
            (<img src={imagePreviewUrl} alt="preview" className={classes.imageUploaderImgPreview} />)
            : 
            (<FontAwesomeIcon icon={faImage} className={classes.imageUploaderIcon}/>)
        }
    </div>
  );
};

export default ImageUploader;
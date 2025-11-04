import axios from 'axios';

const FACE_PLUS_PLUS_API_KEY = process.env.REACT_APP_FACEPP_API_KEY;
const FACE_PLUS_PLUS_API_SECRET = process.env.REACT_APP_FACEPP_API_SECRET;
const FACE_PLUS_PLUS_API_URL = 'https://api-us.faceplusplus.com/facepp/v3/compare';

/**
 * Compare two face images using Face++ API
 * @param {string} image1Base64 - Base64 encoded first image
 * @param {string} image2Base64 - Base64 encoded second image
 * @returns {Promise<Object>} - Comparison result with confidence score
 */
export const compareFaces = async (image1Base64, image2Base64) => {
  try {
    const formData = new FormData();
    formData.append('api_key', FACE_PLUS_PLUS_API_KEY);
    formData.append('api_secret', FACE_PLUS_PLUS_API_SECRET);
    formData.append('image_base64_1', image1Base64);
    formData.append('image_base64_2', image2Base64);

    const response = await axios.post(FACE_PLUS_PLUS_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    const { confidence, thresholds } = response.data;
    
    // Check if confidence meets the 80% threshold
    const isMatch = confidence >= 80;
    
    return {
      success: true,
      isMatch,
      confidence,
      thresholds,
      message: isMatch 
        ? 'Face verification successful!' 
        : 'Faces do not match. Please try again.'
    };
  } catch (error) {
    console.error('Face++ API error:', error);
    return {
      success: false,
      error: error.message,
      message: 'Face verification failed. Please try again.'
    };
  }
};

/**
 * Detect face in an image
 * @param {string} imageBase64 - Base64 encoded image
 * @returns {Promise<Object>} - Detection result
 */
export const detectFace = async (imageBase64) => {
  try {
    const formData = new FormData();
    formData.append('api_key', FACE_PLUS_PLUS_API_KEY);
    formData.append('api_secret', FACE_PLUS_PLUS_API_SECRET);
    formData.append('image_base64', imageBase64);
    formData.append('return_attributes', 'gender,age,smiling');

    const response = await axios.post(
      'https://api-us.faceplusplus.com/facepp/v3/detect',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return {
      success: true,
      faces: response.data.faces,
      faceCount: response.data.faces.length
    };
  } catch (error) {
    console.error('Face detection error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Convert canvas to base64 string
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @returns {string} - Base64 encoded image
 */
export const canvasToBase64 = (canvas) => {
  const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
  return dataUrl.split(',')[1]; // Remove data:image/jpeg;base64, prefix
};
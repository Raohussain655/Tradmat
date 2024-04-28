
import Course from '../../../models/Course';
import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import connectDb from "../../../middlewhare/mongoos";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const upload = multer();

const apiRoute = nextConnect({
    onError(error, req, res) {
      res.status(501).json({ error: `Sorry something happened! ${error.message}` });
    },
    onNoMatch(req, res) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  
  apiRoute.use(upload.single('file')); // Use upload.single for a single file upload
  
  apiRoute.post(async (req, res) => {
    try {
      const { title, description } = req.body;
      console.log("Received request:", title, description, req.file,req.files); // Use req.file for a single file upload
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuidv4()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ACL: 'public-read',
      };
  
      const uploadedFile = await s3.upload(params).promise();
  
      const newCourse = new Course({
        title,
        description,
        feature_img: uploadedFile.Location,
      });
  
      const savedCourse = await newCourse.save();
  
      res.status(200).json(savedCourse);
    } catch (error) {
      res.status(500).json({ error: `Sorry something happened! ${error.message}` });
    }
  });
  
  export default connectDb(apiRoute);
  
  export const config = {
    api: {
      bodyParser: false,
    },
  };
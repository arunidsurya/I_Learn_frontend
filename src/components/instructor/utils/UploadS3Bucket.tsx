import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const UploadS3Bucket = async (file: any) => {
  const accessKeyId = import.meta.env.VITE_S3_ACCESS_KEY;
  const secretAccessKey = import.meta.env.VITE_S3_SECRET_KEY;
  const region = import.meta.env.VITE_S3_REGION;

  const generateRandomCode = () => {
    const randomCode = Math.floor(10000000 + Math.random() * 90000000); // Generates a random 8-digit number
    return randomCode.toString(); // Convert the number to a string
  };

  // Create an S3 client
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  const bucketName = import.meta.env.VITE_S3_BUCKET_NAME;

  const key = `${Date.now()}-${generateRandomCode()}-${file.name}`;

  // console.log("key :", key);
  // console.log("code:",generateRandomCode);

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: file,
  });

  try {
    const response = await s3Client.send(command);
    console.log("File uploaded successfully:", response);
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
    console.log("URL of the uploaded file:", url);

    return { response, url };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

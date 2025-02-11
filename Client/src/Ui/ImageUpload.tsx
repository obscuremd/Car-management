import { MediaImage } from "iconoir-react";
import TextUi from "./Text";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Props {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  stretch?: boolean;
}

const ImageUploadUi = ({
  imageUrl,
  setImageUrl,
  stretch = false,
  placeholder = "Select An Image",
}: Props) => {
  const storage = getStorage();

  // states
  const [image, setImage] = useState<File | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Upload image to Firebase Storage
  const uploadPic = async () => {
    if (!image) return;

    setLoading(true);
    const imageRef = ref(storage, `files/${Date.now()}-image`);

    try {
      const upload = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(upload.ref);
      setImageUrl(url);
      setImage(undefined); // Reset local image state after upload
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        stretch ? "w-full" : "w-[150px]"
      } h-[150px] flex justify-center items-center border-[1px] border-dashed p-2 border-grayscale-800 rounded-lg relative overflow-hidden`}
    >
      {/* If imageUrl exists, only show the image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          className={`${stretch ? "w-full" : "w-[140px]"} h-[140px] object-contain`}
          alt="Uploaded"
        />
      ) : (
        <div className="flex flex-col gap-2">
          {/* Show file input and upload button when no image is selected */}
          <label htmlFor="fileInput">
            <div className="p-2 border-[1px] border-primary-500 text-primary-500 text-2xl rounded-md cursor-pointer flex justify-center items-center">
              <MediaImage />
              <TextUi text={placeholder} />
            </div>
          </label>
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            hidden
            onChange={handleImageChange}
          />

          {/* Upload button (Only shown if image is selected but not uploaded yet) */}
          {image && (
            <div
              onClick={uploadPic}
              className={`p-2 border-[1px] border-primary-500 bg-primary-200 backdrop-blur-sm text-primary-500 text-lg rounded-md cursor-pointer w-full flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? <TextUi text="Uploading..." /> : <>
                <MediaImage />
                <TextUi text="Upload" />
              </>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploadUi;

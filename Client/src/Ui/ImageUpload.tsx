import { MediaImage } from 'iconoir-react'
import TextUi from './Text';

interface Props{
  imageUrl:string;
  setImageUrl:React.Dispatch<React.SetStateAction<string>>
  placeholder?:string
  stretch?:boolean
}

const ImageUploadUi = ({imageUrl, setImageUrl,stretch=false,placeholder='Select An Image'}:Props) => {

  // functions
  // -----------------------------------------------------------------------------------
    //get image
    const getImage =(e:React.ChangeEvent<HTMLInputElement>)=>{
       const file = e.target.files?.[0]; // Safely access the first file

        if (file) {
          const maxSize = 10 * 1024 * 1024; // 10 MB in bytes
          if (file.size > maxSize) {
            alert("File size must be below 10 MB!");
            return;
          }}

       const reader = new FileReader()
        if (file) {
          reader.onload = () => {
            const base64 = reader.result as string
            setImageUrl(base64)
            console.log(reader.result); // Do something with the result
          };

          reader.onerror = (err) => {
            console.error("Error reading file:", err);
          };
          reader.readAsDataURL(file)
        }
    } 

  return (
    <div className={`${stretch?'w-full':'w-[150px]'} h-[150px] flex flex-col justify-center items-center border-[1px] border-dashed p-2 border-grayscale-800 rounded-lg gap-2 relative`}>
      {
        imageUrl === '' 
        ?<>
          <label htmlFor='fileInput'>
            <div className='p-2 border-[1px] border-primary-500 text-primary-500 text-2xl rounded-md cursor-pointer'>
              <MediaImage/>
            </div>
          </label>
          <input 
            type='file' 
            accept='image/*'
            id='fileInput' 
            hidden 
            onChange={(e)=>getImage(e)}/>
          <TextUi text={placeholder}/>
        </>
        :<>
            <div className={`absolute ${stretch?'w-full':'w-[150px]'} h-[150px] flex items-center justify-center`}>
              <label htmlFor='fileInput' >
                <div className='p-2 border-[1px] border-primary-500 bg-primary-200 backdrop-blur-sm text-primary-500 text-lg rounded-md cursor-pointer w-fit flex items-center justify-center'>
                  <MediaImage/>
                  <TextUi  text='select another image'/>
                </div>
            </label>
            </div>
          <input 
            type='file' 
            accept='image/*'
            id='fileInput' 
            hidden 
            onChange={(e)=>getImage(e)}/>
          <img src={imageUrl} className={`${stretch?'w-full':'w-[140px]'} h-[140px] object-contain`}/>
        </>
      }
    </div>
  )
}

export default ImageUploadUi
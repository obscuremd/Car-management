import ButtonUI from './Button'
import { CloudUpload, MediaImage } from 'iconoir-react'
import { useState } from 'react';
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import TextUi from './Text';

interface Props{
  imageUrl:string | null;
  setImageUrl:React.Dispatch<React.SetStateAction<string |null>>
  placeholder?:string
  stretch?:boolean
}

const ImageUploadUi = ({imageUrl, setImageUrl,stretch=false,placeholder='Select An Image'}:Props) => {

  // constants
  // ----------------------------------------------------------------------------------
//   const storage = getStorage()

  // states
  // ----------------------------------------------------------------------------------
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // functions
  // -----------------------------------------------------------------------------------

    //get image
    const getImage =()=>{
        setImage('pp')
    } 

  // image upload
  const uploadPic = async() =>{
    setLoading(true)
    if (!image) {
        return;
    }

    // const response = await fetch(image); // Fetch the file from the local URI
    // const blob = await response.blob(); // Convert it into a Blob
    
    // const ImageRef = ref(storage,  `files/${Date.now()}-image`)

    try {
        // const upload = await uploadBytes(ImageRef, blob)
        // const url = await getDownloadURL(upload.ref)
        setImageUrl('url')
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

  return (
    <div className={`${stretch?'w-full':'w-[150px]'} h-[150px] flex flex-col justify-center items-center border-[1px] border-dashed p-2 border-grayscale-800 rounded-lg gap-2 relative`}>
      {
        image === null 
        ?<>
          <ButtonUI onclick={getImage} color='primary' size='lg' rounded='medium' outline icon_left={<MediaImage/>}/>
          <TextUi text={placeholder}/>
        </>
        :(imageUrl === null ?
        <div className='relative w-full'>
          <img src={image} className={`${stretch?'w-full':'w-[140px]'} h-[140px]`}/>
          <div className={`absolute ${stretch?'w-full':'w-[140px]'} h-[140px] justify-center items-center gap-2`}>
            {loading
              ?<TextUi text='Loading ...'/> 
              :<>
              <ButtonUI onclick={getImage} text='Change Picture' color='primary' size='xs' rounded='medium' outline icon_left={<MediaImage/>}/>
              <ButtonUI onclick={uploadPic} text='Upload' color='primary' size='xs' rounded='medium' outline icon_left={<CloudUpload/>}/>
            </>}
          </div>
        </div>
        :<img src={imageUrl} className={`${stretch?'w-full':'w-[140px]'} h-[140px]`}/>
      )
      }
    </div>
  )
}

export default ImageUploadUi
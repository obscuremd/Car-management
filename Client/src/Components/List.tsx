import { AnimatePresence, motion } from 'framer-motion';
import ButtonUI from '../Ui/Button';
import { BinFull, Check, MoreVert } from 'iconoir-react';
import AvatarUi from '../Ui/Avatar';
import TextUi from '../Ui/Text';




interface Props {
  column1: string;
  column2: string;
  column3: string;
  column4: string
  column5: string
  column6: string
  status:boolean
  data:number[]
}


export function List({column1, column2,column3,column4,column5,column6,status, data}:Props){
  return (
      <AnimatePresence>
            <motion.div initial={{y:-20}} animate={{y:0}} exit={{y:-20}} style={{fontSize:"0.8rem"}} className={` py-2 px-4 rounded-xl flex justify-between w-fit md:w-full items-center border-[1px] border-blue-gray-900`}>
                <div className='flex items-center gap-4 w-[300px] md:w-[207px]'>
                    <ButtonUI color='text' outline size='sm_icon' rounded='full' icon_left={<Check/>}/>
                    <TextUi text={column1}/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column2}/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column3}/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column4}/>
                </div>
                <div className='w-[100px]'>
                    <TextUi text={column5}/>
                </div>
                <div className='w-[50px]'>
                    <TextUi text={column6}/>
                </div>
                <div className='w-[30px]'/>
                <div className='w-[30px]'/>
          </motion.div>
          {data.map(()=>(
                <motion.div  style={{fontSize:"0.8rem"}} className={` py-2 px-4 rounded-xl flex justify-between w-fit md:w-full items-center border-[1px] border-blue-gray-900`}>
                <div className='flex items-center gap-4 w-[300px] md:w-[207px]'>
                    <ButtonUI color='text' outline size='sm_icon' rounded='full' icon_left={<Check/>}/>
                    <AvatarUi image='https://images.unsplash.com/photo-1633466159913-73db9d0f0483?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJ8ZW58MHx8MHx8fDA%3D' vertical size='sm' primary_text='Erhenede Daniel' secondary_text='!2-07-2024'/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text='(+234) 090 - xxx - xxxx'/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text='$50,000,00.00'/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text='Ferrari x-15'/>
                </div>
                <div className='w-[100px]'>
                    <ButtonUI color='primary' stretch text='John Doe' size='sm_icon' rounded='full'/>
                </div>
                <div className='w-[50px]'>
                    <ButtonUI color={status?'primary':'danger'} stretch text={status?'Paid':'Unpaid'} size='sm_icon' rounded='full'/>
                </div>
                <ButtonUI color='danger' size='sm_icon' rounded='full' icon_left={<BinFull/>}/>
                <ButtonUI color='text' size='sm_icon' rounded='full' icon_left={<MoreVert/>}/>
            </motion.div>
          ))
          }
      </AnimatePresence>
  )
}


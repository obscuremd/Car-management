import {motion } from 'framer-motion';
import ButtonUI from '../Ui/Button';
import { Check, MoreVert } from 'iconoir-react';
import TextUi from '../Ui/Text';




interface Props {
    color?:string;
    column1: string;
    column2: string;
    column3: string;
    column4: string
    column5: string
    column6: string
    status:string
}


export function List({color,column1, column2,column3,column4,column5,column6,status}:Props){
  return (
 
            <motion.div  style={{fontSize:"0.8rem"}} className={` py-2 px-4 rounded-xl flex gap-16 w-fit md:w-full items-center border-[1px] border-blue-gray-900`}>
                <div className='flex items-center gap-4 w-[300px] md:w-[207px]'>
                    <ButtonUI color='text' outline size='sm_icon' rounded='full' icon_left={<Check/>}/>
                    <div className={`w-[30px] h-[30px]`} style={{backgroundColor:`#${color}`}}/>
                    <div>
                        <TextUi text={column1}/>
                        <TextUi text={column2}/>
                    </div>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column3}/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column4}/>
                </div>
                <div className='w-[170px]'>
                    <TextUi text={column5}/>
                </div>
                <div className='w-[100px]'>
                    <ButtonUI color='primary' stretch text={column6} size='sm_icon' rounded='full'/>
                </div>
                <div className='w-[150px]'>
                    <ButtonUI color={status?'primary':'danger'} stretch text={status} size='sm_icon' rounded='full'/>
                </div>
                <ButtonUI color='text' size='sm_icon' rounded='full' icon_left={<MoreVert/>}/>
            </motion.div>
  )
}
export function ListHeader({column1, column2,column3,column4,column5,column6}:Props){
  return (
            <motion.div initial={{y:-20}} animate={{y:0}} exit={{y:-20}} style={{fontSize:"0.8rem"}} className={` py-2 px-4 rounded-xl flex gap-16 w-fit md:w-full items-center border-[1px] border-blue-gray-900`}>
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

  )
}


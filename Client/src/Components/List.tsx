import { motion } from "framer-motion";
import ButtonUI from "../Ui/Button";
import { Check, MoreVert } from "iconoir-react";
import TextUi from "../Ui/Text";
import { useState } from "react";
import { useApi } from "../Providers/ApiProvider";

interface Props {
  color?: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  status: string;
}
interface ListProps {
    id:string,
  color?: string;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  status: string;
}

export function List({
    id,
  color,
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
  status,
}: ListProps) {

    const [dropdown, setDropdown] = useState(false)
    const {updateTransaction} = useApi()
  return (
    <motion.div
      style={{ fontSize: "0.8rem" }}
      className={` py-2 px-4 rounded-xl flex gap-10 w-fit md:w-full items-center border-[1px] border-blue-gray-900`}
    >
      <div className="flex items-center gap-4 w-[250px]">
        <ButtonUI
          color="text"
          outline
          size="sm_icon"
          rounded="full"
          icon_left={<Check />}
        />
        <div
          className={`w-[30px] h-[30px] rounded-full`}
          style={{ backgroundColor: `#${color}` }}
        />
        <div>
          <TextUi text={column1} fontWeight="bold" fontSize="body" />
          <TextUi text={column2} no_wrap />
        </div>
      </div>
      <div className="w-[170px]">
        <TextUi text={column3} />
      </div>
      <div className="w-[170px]">
        <TextUi text={column4} />
      </div>
      <div className="w-[170px]">
        <TextUi text={column5} />
      </div>
      <div className="w-[100px]">
        <TextUi text={column6} />
      </div>
      <div className="w-[150px] relative">
        <ButtonUI
          color={
            status === "sold"
              ? "primary"
              : status === "unsold"
              ? "warning"
              : status === "withdrawn"
              ? "danger"
              : "default"
          }
          stretch
          text={status}
          onclick={()=>setDropdown(!dropdown)}
          size="sm_icon"
          rounded="full"
        />
        {dropdown && (
          <div className="absolute top-[100%] z-50 flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg w-[150px]">
            {['sold', 'unsold', 'withdrawn'].filter((item)=>item !== status).map((item, index) => (
              <ButtonUI
                key={index}
                gap="justify-between"
                color={
                    item === "sold"
                    ? "primary"
                    : item === "unsold"
                    ? "warning"
                    : item === "withdrawn"
                    ? "danger"
                    : "default"
                }
                onclick={() => [updateTransaction({stat:item, id}),setDropdown(false)]}
                stretch
                size="sm"
                text={item}
                rounded="medium"
              />
            ))}
          </div>
        )}
      </div>
      <ButtonUI
        color="text"
        size="sm_icon"
        rounded="full"
        icon_left={<MoreVert />}
      />
    </motion.div>
  );
}
export function ListHeader({
  column1,
  column2,
  column3,
  column4,
  column5,
  column6,
}: Props) {
  return (
    <motion.div
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      exit={{ y: -20 }}
      style={{ fontSize: "0.8rem" }}
      className={` py-2 px-4 rounded-xl flex gap-10 w-fit md:w-full items-center border-[1px] border-blue-gray-900`}
    >
      <div className="flex items-center gap-4 w-[250px]">
        <ButtonUI
          color="text"
          outline
          size="sm_icon"
          rounded="full"
          icon_left={<Check />}
        />
        <TextUi text={column1} />
      </div>
      <div className="w-[170px]">
        <TextUi text={column2} />
      </div>
      <div className="w-[170px]">
        <TextUi text={column3} />
      </div>
      <div className="w-[170px]">
        <TextUi text={column4} />
      </div>
      <div className="w-[100px]">
        <TextUi text={column5} />
      </div>
      <div className="w-[50px]">
        <TextUi text={column6} />
      </div>
      <div className="w-[30px]" />
      <div className="w-[30px]" />
    </motion.div>
  );
}

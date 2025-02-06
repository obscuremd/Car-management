import { Button, Card, Input, Text } from "../Exports/Exports";
import { NavArrowDown, NavArrowUp } from "iconoir-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApi } from "../Providers/ApiProvider";
import Table from "../ScreenComponents/Table/Table";
import { useNavigate } from "react-router-dom";

export default function DealersScreen() {
    
  const navigate = useNavigate();
  
  const {
    getDealer,
    getBoy,
    getTransaction,
    filterByTransactions,
    selectedDealer,
    setSelectedDealer,
    ResetFilter,
    setSelectedBoy,
    branch,
    dealers
  } = useApi();

  const [state, setState] = useState("Cars");
  const [open, setOpen] = useState(false);

  const [boy, setBoy] = useState<Boy[]>([]);
  const [loading, setLoading] = useState(false);
  const [boyloading, setBoyLoading] = useState(false);

  useEffect(() => {
    getDealer({ setLoading });
    getBoy({ setBoy, setLoading: setBoyLoading });

    getTransaction({ setLoading });
  }, [branch]);
  useEffect(() => {
      setBoyArray(boy)
  }, [boy]);


  const onclickFunction = async (item: User) => {
    try {
      ResetFilter();
      await getBoy({ setBoy, setLoading: setBoyLoading });
      setSelectedDealer(item);
      setBoy((prev) => prev.filter((boys) => boys.dealer === item.name));
      await filterByTransactions({ filterBy: "dealer", value: item.name });
    } catch (error) {
      console.log(error);
    }
  };

  const [searchParams, setSearchParams] = useState("");
  const [boyArray, setBoyArray] = useState(boy);

  const InputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const value = e.target.value
      setSearchParams(value)
      const filteredBoy = boy.filter((boy)=>boy.name.toLowerCase().includes(value.toLowerCase()))
      setBoyArray(filteredBoy)
    };

  const onclickFunctionBoy = async (item: Boy) => {
    navigate("/boy");
    setSelectedBoy(item);
  };

  return (
    <div className="flex flex-col gap-8 w-full z-50">

      <div className="max-w-[80vw] flex gap-4 overflow-x-scroll py-1 px-1">
        {loading
          ? "Loading . . . "
          : dealers.map((item) => (
              <Card
                outline="primary"
                avatar
                onclick={() => onclickFunction(item)}
                avatar_image={item.profile_picture}
                avatar_primary_text={item.name}
                avatar_secondary_text={item.email}
              />
            ))}
      </div>

      {selectedDealer && (
        <Card
          outline="primary"
          vertical
          hover={false}
          image={selectedDealer.profile_picture}
          avatar
          avatar_image={selectedDealer.profile_picture}
          avatar_primary_text={selectedDealer.name}
          avatar_secondary_text={selectedDealer.email}
          primary_text={selectedDealer.branch}
          secondary_text={selectedDealer.phone_number}
          button
          button_text={`${boy
            .filter((prev) => prev.dealer === selectedDealer.name)
            .length.toString()} Boys`}
        />
      )}

      <div className="flex flex-col gap-4">
        <div className="relative">
          <Button
            color="primary"
            hover="false"
            onclick={() => setOpen(!open)}
            text={state}
            icon_right={open ? <NavArrowDown /> : <NavArrowUp />}
            size="lg"
            rounded="medium"
            position="center"
            stretch
          />
          {open && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute w-full z-50 bg-primary-900 backdrop-blur-lg pt-2 flex flex-col gap-2"
              >
                <Button
                  color="primary"
                  outline
                  hover="false"
                  text="Cars"
                  onclick={() => [setState("Cars"), setOpen(false)]}
                  size="lg"
                  rounded="medium"
                  position="center"
                  stretch
                />
                <Button
                  color="primary"
                  outline
                  hover="false"
                  text="Boys"
                  onclick={() => [setState("Boys"), setOpen(false)]}
                  size="lg"
                  rounded="medium"
                  position="center"
                  stretch
                />
              </motion.div>
            </AnimatePresence>
          )}
        </div>
        {state === "Cars" ? (
          <>
            <Table/>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <Text text="Search for Boy" fontSize="body" fontWeight="bold" />
              <Input
                color="primary"
                outside_icon={false}
                stretch
                value={searchParams}
                InputFunction={(e) => InputFunction(e)}
              />
            </div>
            <div className="w-full flex flex-wrap gap-4 py-1 px-1">
              {boyloading
                ? "loading"
                : boyArray.map((item) => (
                    <Card
                      outline="primary"
                      avatar
                      avatar_image={item.profile_picture}
                      avatar_primary_text={item.name}
                      avatar_secondary_text={item.email}
                      onclick={()=>onclickFunctionBoy(item)}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

import { Button, Card, Input, Text } from "../Exports/Exports";
import { NavArrowDown, NavArrowUp } from "iconoir-react";
import { List, ListHeader } from "../Components/List";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useApi } from "../Providers/ApiProvider";
import Filter from "../ScreenComponents/Filters/Filter";

export default function DealersScreen() {
  const {
    getDealer,
    getBoy,
    getTransaction,
    transactions,
    filterByTransactions,
    selectedDealer,
    setSelectedDealer,
    ResetFilter,
  } = useApi();

  const [state, setState] = useState("Cars");
  const [open, setOpen] = useState(false);

  const [dealer, setDealer] = useState<User[]>([]);
  const [boy, setBoy] = useState<Boy[]>([]);
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [boyloading, setBoyLoading] = useState(false);

  useEffect(() => {
    getDealer({ setDealer, setLoading });
    getBoy({ setBoy, setLoading: setBoyLoading });
    getTransaction({ setLoading });
  }, []);

  const onclickFunction = async (item: User) => {
    setPrimaryLoading(true);
    try {
      ResetFilter();
      await getBoy({ setBoy, setLoading: setBoyLoading });
      setSelectedDealer(item);
      setBoy((prev) => prev.filter((boys) => boys.dealer === item.name));
      await filterByTransactions({ filterBy: "dealer", value: item.name });
      setPrimaryLoading(false);
    } catch (error) {
      console.log(error);
      setPrimaryLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full z-50">

      <div className="w-full flex gap-4 overflow-x-scroll py-1 px-1">
        {loading
          ? "Loading . . . "
          : dealer.map((item) => (
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
            <Filter />
            <div className="flex flex-col gap-2 h-[50vh] w-full overflow-y-scroll">
              <ListHeader
                column1="Model"
                column2="Chases No"
                column3="Color"
                column4="Date Out"
                column5="Dealer"
                column6="Status"
                status={"WithDrawn"}
              />
              {primaryLoading || loading
                ? "loading..."
                : transactions.map((item, index) => (
                    <List
                      id={item._id}
                      key={index}
                      color={item.vehicle_color_hex_code}
                      column1={item.vehicle_type}
                      column2={item.date_in}
                      column3={item.chases_no}
                      column4={item.vehicle_color}
                      column5={item.date_out}
                      column6={item.dealer}
                      status={item.status}
                    />
                  ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1">
              <Text text="Search for Driver" fontSize="caption" />
              <Input
                color="primary"
                outside_icon={false}
                stretch
                InputFunction={(e) => console.log(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-wrap gap-4 py-1 px-1">
              {boyloading
                ? "loading"
                : boy.map((item) => (
                    <Card
                      outline="primary"
                      avatar
                      avatar_image={item.profile_picture}
                      avatar_primary_text={item.name}
                      avatar_secondary_text={item.email}
                    />
                  ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

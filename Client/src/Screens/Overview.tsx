import { Button, Card, Input, Text } from "../Exports/Exports";
import { NavArrowDown } from "iconoir-react";
import { List, ListHeader } from "../Components/List";
import { useApi } from "../Providers/ApiProvider";
import { useEffect, useState } from "react";
import Filter from "../ScreenComponents/Filters/Filter";
import { useNavigate } from "react-router-dom";

export default function OverviewScreen() {
  const navigate = useNavigate();

  const { getTransaction, transactions, getDealer, setSelectedDealer, getBoy, setSelectedBoy, branch , setBranch, branchOptions } =
    useApi();
    

  const [loading, setLoading] = useState(false);
  const [dealer, setDealer] = useState<User[]>([]);
  const [boy, setBoy] = useState<Boy[]>([]);

  const [dropdown, setDropdown] = useState(false)
  const [branchDropdown, setBranchDropdown] = useState(false)

  const [searchParams, setSearchParams] = useState("");
  const [searchFilterOptions, setSearchFilterOptions] = useState("Dealer");

  const [dealerArray, setDealerArray] = useState(dealer)
  const [boyArray, setBoyArray] = useState(boy);


  const InputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setSearchParams(value)
    setDropdown(true)
    if(searchFilterOptions=== 'Dealer'){
      const filteredDealer = dealer.filter((dealer)=>dealer.name.toLowerCase().includes(value.toLowerCase()))
      setDealerArray(filteredDealer)
    }
    else if(searchFilterOptions=== 'Boy'){
      const filteredBoy = boy.filter((boy)=>boy.name.toLowerCase().includes(value.toLowerCase()))
      setBoyArray(filteredBoy)
    }
  };

  useEffect(() => {
    getTransaction({ setLoading });
    getDealer({ setDealer, setLoading })
    getBoy({setBoy, setLoading})
  }, [branch]);

  useEffect(() => {
    setDealerArray(dealer);
  }, [dealer]);

  const onclickFunction = async (item: User) => {
    navigate("/dealers");
    setSelectedDealer(item);
  };
  const onclickFunctionBoy = async (item: Boy) => {
    navigate("/boy");
    setSelectedBoy(item);
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-center">
          <Text text="Search for" fontSize="caption" />
          <Button
            rounded="full"
            color="primary"
            outline={searchFilterOptions !== "Dealer"}
            onclick={() => setSearchFilterOptions("Dealer")}
            size="xs"
            text="Dealer"
          />
          <Button
            rounded="full"
            color="primary"
            outline={searchFilterOptions !== "Boy"}
            onclick={() => setSearchFilterOptions("Boy")}
            size="xs"
            text="Boy"
          />
        </div>
        <div className="relative">
          <Input
            color="primary"
            outside_icon={false}
            stretch
            value={searchParams}
            InputFunction={(e) => InputFunction(e)}
          />
          {dropdown  && (
            <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg h-48 overflow-y-scroll z-10">
              {searchFilterOptions === 'Dealer' && dealerArray.map((item, index) => (
                <Button
                  key={index}
                  gap="justify-between"
                  color="primary"
                  onclick={() =>onclickFunction(item)}
                  outline
                  size="sm"
                  stretch
                  text={item.name}
                  rounded="medium"
                />
              ))}
              {searchFilterOptions === 'Boy' && boyArray.map((item, index) => (
                <Button
                  key={index}
                  gap="justify-between"
                  color="primary"
                  onclick={() =>onclickFunctionBoy(item)}
                  outline
                  size="sm"
                  stretch
                  text={item.name}
                  rounded="medium"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Text text="Select Park" fontSize="caption" />
        <div className="relative">
          <Button
            rounded="full"
            color="primary"
            size="xs"
            text={branch}
            onclick={()=>setBranchDropdown(!branchDropdown)}
            icon_right={<NavArrowDown />}
          />
          {branchDropdown  && (
              <div className="absolute flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg z-10">
                {branchOptions.map((item, index) => (
                  <Button
                    key={index}
                    gap="justify-between"
                    color="primary"
                    onclick={() =>[setBranch(item), setBranchDropdown(false)]}
                    outline
                    size="sm"
                    text={item}
                    rounded="medium"
                  />
                ))}
              </div>
            )}
        </div>
      </div>

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

      <div className="flex flex-col gap-4">
        <Button
          color="primary"
          hover="false"
          text="Transaction History"
          size="lg"
          rounded="medium"
          position="center"
          stretch
        />
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
          {loading
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
      </div>
    </div>
  );
}

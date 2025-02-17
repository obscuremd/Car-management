import { Button, Card, Input, Text } from "../Exports/Exports";
import { NavArrowDown, Xmark } from "iconoir-react";
import { useApi } from "../Providers/ApiProvider";
import { useEffect, useState } from "react";
import Filter from "../ScreenComponents/Filters/Filter";
import { useNavigate } from "react-router-dom";
import Table from "../ScreenComponents/Table/Table";

export default function OverviewScreen() {
  const navigate = useNavigate();

  const { getTransaction, getDealer, setSelectedDealer, getBoy, setSelectedBoy, branch ,dealers ,setBranch, branchOptions } =
    useApi();
    

  const [loading, setLoading] = useState(false);
  const [boy, setBoy] = useState<Boy[]>([]);

  const [dropdown, setDropdown] = useState(false)
  const [branchDropdown, setBranchDropdown] = useState(false)

  const [searchParams, setSearchParams] = useState("");
  const [searchFilterOptions, setSearchFilterOptions] = useState("Dealer");

  const [dealerArray, setDealerArray] = useState(dealers)
  const [boyArray, setBoyArray] = useState(boy);


  const InputFunction = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value
    setSearchParams(value)
    setDropdown(true)
    if(searchFilterOptions=== 'Dealer'){
      const filteredDealer = dealers.filter((dealer)=>dealer.name.toLowerCase().includes(value.toLowerCase()))
      setDealerArray(filteredDealer)
    }
    else if(searchFilterOptions=== 'Boy'){
      const filteredBoy = boy.filter((boy)=>boy.name.toLowerCase().includes(value.toLowerCase()))
      setBoyArray(filteredBoy)
    }
  };

  useEffect(() => {
    getTransaction({ setLoading });
    getDealer({ setLoading })
    getBoy({setBoy, setLoading})
  }, [branch]);

  useEffect(() => {
    setDealerArray(dealers);
  }, [dealers]);

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
            stretch
            value={searchParams}
            InputFunction={(e) => InputFunction(e)}
            outside_icon={dropdown && <Xmark onClick={()=>setDropdown(false)}/>}
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
        <Table/>
      </div>
    </div>
  );
}

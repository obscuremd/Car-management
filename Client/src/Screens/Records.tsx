import { Button, Text } from "../Exports/Exports";
import { NavArrowRight } from "iconoir-react";
import { List, ListHeader } from "../Components/List";
import { useEffect, useState } from "react";
import { useApi } from "../Providers/ApiProvider";
import { Transactions } from "../ScreenComponents/RecordsScreenComponents/Transactions";
import { Boys } from "../ScreenComponents/RecordsScreenComponents/Boy";
import { Dealer } from "../ScreenComponents/RecordsScreenComponents/Dealer";

export default function RecordsScreen() {
  const [state, setState] = useState(4);

  const [loading, setLoading] = useState(false);

  const { getTransaction, transactions } = useApi();

  useEffect(() => {
    getTransaction({ setLoading });
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <Text
          text="What would you like to add to the records"
          fontSize="caption"
        />
        <div className="flex gap-1">
          <Button
            rounded="full"
            outline={state !== 0}
            onclick={() => setState(0)}
            color={"primary"}
            size="xs"
            text="Add Transaction"
          />
          <Button
            rounded="full"
            outline={state !== 1}
            onclick={() => setState(1)}
            color="primary"
            size="xs"
            text="Add Dealer"
          />
          <Button
            rounded="full"
            outline={state !== 2}
            onclick={() => setState(2)}
            color="primary"
            size="xs"
            text="Add Boy"
          />
        </div>
      </div>

      {state === 0 && <Transactions />}
      {state === 1 && <Dealer />}
      {state === 2 && <Boys />}

      <div className="flex flex-col gap-4">
        <Button
          color="primary"
          outline
          hover="false"
          text="Transaction History"
          size="lg"
          rounded="medium"
          position="center"
          stretch
        />
        <div className="flex items-center gap-2">
          <Button
            color="primary"
            text="Filter Options"
            size="sm"
            rounded="medium"
            position="center"
          />
          <Button
            color="primary"
            icon_right={<NavArrowRight />}
            outline
            text="Date"
            size="xs"
            rounded="medium"
            position="center"
          />
          <Button
            color="primary"
            icon_right={<NavArrowRight />}
            outline
            text="Car Model"
            size="xs"
            rounded="medium"
            position="center"
          />
          <Button
            color="primary"
            icon_right={<NavArrowRight />}
            outline
            text="Dealer"
            size="xs"
            rounded="medium"
            position="center"
          />
          <Button
            color="primary"
            icon_right={<NavArrowRight />}
            outline
            text="Status"
            size="xs"
            rounded="medium"
            position="center"
          />
        </div>
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

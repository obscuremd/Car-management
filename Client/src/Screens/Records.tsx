import { Button, Text } from "../Exports/Exports";
import { Transactions } from "../ScreenComponents/RecordsScreenComponents/Transactions";
import { Boys } from "../ScreenComponents/RecordsScreenComponents/Boy";
import { Dealer } from "../ScreenComponents/RecordsScreenComponents/Dealer";
import Table from "../ScreenComponents/Table/Table";
import { useState } from "react";

export default function RecordsScreen() {
  const [state, setState] = useState(4);

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
        <Table/>
      </div>
    </div>
  );
}

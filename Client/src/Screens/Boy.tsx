import { NavArrowDown } from "iconoir-react";
import { Button, Card, Text } from "../Exports/Exports";
import { useApi } from "../Providers/ApiProvider";

export default function Boy (){

    const {selectedBoy} = useApi()

    return(
        <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <Text text="Select Park" fontSize="caption" />
        <Button
          rounded="full"
          color="primary"
          size="xs"
          text="Hero Park"
          icon_right={<NavArrowDown />}
        />
      </div>

      {selectedBoy !== null && (
        <Card
          outline="primary"
          image={selectedBoy.profile_picture}
          avatar
          avatar_image={selectedBoy.profile_picture}
          avatar_primary_text={`Name: ${selectedBoy.name}`}
          avatar_secondary_text={`Email: ${selectedBoy.email}`}
          primary_text={`Dealer:${selectedBoy.dealer}`}
          secondary_text={`Phone Number: ${selectedBoy.phone_number}`}
        />
      )}


    </div>
    )
}
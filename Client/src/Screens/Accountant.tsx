import { NavArrowDown, NavArrowRight, User } from "iconoir-react";
import { List, ListHeader } from "../Components/List";
import { Button, Card, ImageUpload, Input, Text } from "../Exports/Exports";
import { cardData } from "../Exports/Constatants";
import { useEffect, useState } from "react";
import { useApi } from "../Providers/ApiProvider";

export default function Accountant() {
  const [add, setAdd] = useState(false);
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
            onclick={() => setAdd(!add)}
            color="primary"
            size="xs"
            text="Add Accountant"
          />
        </div>
      </div>

      {add && <Secretary />}

      <div>
        <Text text="Secretary" fontSize="t2" fontWeight="semibold" />
        <div className="w-full flex gap-4 overflow-x-scroll py-1 px-1">
          {cardData.map((item) => (
            <Card
              outline="primary"
              avatar
              avatar_image={item.avatar_image}
              avatar_primary_text={item.avatar_primary_text}
              avatar_secondary_text={item.avatar_secondary_text}
              button
              button_text={`Hero Park`}
            />
          ))}
        </div>
      </div>

      <Card
        outline="primary"
        image="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        avatar
        avatar_image={
          "https://images.unsplash.com/photo-1640951613773-54706e06851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
        }
        avatar_primary_text={"Bai Hamar"}
        avatar_secondary_text={"Bai.hamar@gmail.com"}
        primary_text="Warri City Stadium"
        secondary_text="(+234) 090-xxx-xxxx"
        button
        button_text="Hero Park"
      />

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

const Secretary = () => {
  const [profile_picture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const role = "secretary";
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [sex, setSex] = useState<"Male" | "Female" | "Other">("Female");
  const [NIN, setNIN] = useState("");
  const [branch, setBranch] = useState("");

  const [dropdown, setDropdown] = useState(false);
  const [dropdown1, setDropdown1] = useState(false);

  const { createUser } = useApi();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-8 md:flex-row flex-col">
        <ImageUpload
          imageUrl={profile_picture}
          setImageUrl={setProfilePicture}
          stretch
        />
        <div className="w-full flex flex-col gap-2">
          <Input
            stretch
            placeholder="Full Name"
            inside_icon={<User />}
            outside_icon={false}
            value={name}
            InputFunction={(e) => setName(e.target.value)}
          />
          <Input
            stretch
            placeholder="Email"
            inside_icon={<User />}
            outside_icon={false}
            value={email}
            InputFunction={(e) => setEmail(e.target.value)}
          />
          <Input
            stretch
            placeholder="Phone Number"
            inside_icon={<User />}
            outside_icon={false}
            value={phone_number}
            InputFunction={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Input
            stretch
            placeholder="Password"
            inside_icon={<User />}
            outside_icon={false}
            value={password}
            InputFunction={(e) => setPassword(e.target.value)}
          />
          <Input
            stretch
            placeholder="Address"
            inside_icon={<User />}
            outside_icon={false}
            value={address}
            InputFunction={(e) => setAddress(e.target.value)}
          />
          <Input
            stretch
            placeholder="N.I.N."
            inside_icon={<User />}
            outside_icon={false}
            value={NIN}
            InputFunction={(e) => setNIN(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="relative">
            <Button
              color="primary"
              rounded="medium"
              stretch
              outline
              gap="justify-between"
              icon_left={<User />}
              icon_right={<NavArrowDown />}
              size="sm"
              text={`Gender:${sex}`}
              onclick={() => setDropdown(true)}
            />
            {dropdown && (
              <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg z-50">
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Male"
                  onclick={() => [setDropdown(false), setSex("Male")]}
                />
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Female"
                  onclick={() => [setDropdown(false), setSex("Female")]}
                />
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Other"
                  onclick={() => [setDropdown(false), setSex("Other")]}
                />
              </div>
            )}
          </div>
          <div className="relative">
            <Button
              color="primary"
              rounded="medium"
              stretch
              outline
              gap="justify-between"
              icon_left={<User />}
              icon_right={<NavArrowDown />}
              size="sm"
              text={`Branch:${branch}`}
              onclick={() => setDropdown1(true)}
            />
            {dropdown1 && (
              <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg ">
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Hero Park"
                  onclick={() => [setDropdown1(false), setBranch("Hero Park")]}
                />
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Corolla 1"
                  onclick={() => [setDropdown1(false), setBranch("Corolla 1")]}
                />
                <Button
                  color="primary"
                  rounded="medium"
                  stretch
                  outline
                  gap="justify-between"
                  size="sm"
                  text="Corolla 2"
                  onclick={() => [setDropdown1(false), setBranch("Corolla 2")]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Button
        color="primary"
        size="lg"
        text="Register"
        stretch
        rounded="medium"
        onclick={() =>
          createUser({
            profile_picture,
            password,
            role,
            name,
            address,
            email,
            phone_number,
            sex,
            NIN,
            branch,
          })
        }
      />
    </div>
  );
};

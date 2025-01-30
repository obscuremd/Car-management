import { NavArrowDown, NavArrowRight, User } from "iconoir-react";
import { List, ListHeader } from "../Components/List";
import { Button, Card, ImageUpload, Input, Text } from "../Exports/Exports";
import { useEffect, useState } from "react";
import { useApi } from "../Providers/ApiProvider";

export default function Accountant() {
  const [add, setAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<User | null>(null)

  const { getTransaction, getSecretary, transactions, secretary } = useApi();

  useEffect(() => {
    getTransaction({ setLoading });
    getSecretary({setLoading})
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
          {secretary.map((item) => (
            <Card
              outline="primary"
              avatar
              avatar_image={item.profile_picture}
              avatar_primary_text={item.name}
              avatar_secondary_text={item.email}
              onclick={()=>setSelected(item)}
              button
              button_text={item.branch}
            />
          ))}
        </div>
      </div>

      {selected !== null && <Card
        outline="primary"
        image={selected.profile_picture}
        avatar
        avatar_image={selected.profile_picture}
        avatar_primary_text={`Full Name : ${selected.name}`}
        avatar_secondary_text={`Log-In Id : ${selected._id}`}
        primary_text={`Email :${selected.email}`}
        secondary_text={`Password: ${selected.password}`}
        button
        button_text={selected.branch}
      />}

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

  const { createUser, branchOptions } = useApi();

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
              onclick={() => setDropdown(!dropdown)}
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
              onclick={() => setDropdown1(!dropdown1)}
            />
            {dropdown1 &&
                <div className='absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg '>
                {branchOptions.map((item, index) => (
                  <Button
                    key={index}
                    gap="justify-between"
                    color="primary"
                    onclick={() =>[setBranch(item), setDropdown1(false)]}
                    stretch
                    outline
                    size="sm"
                    text={item}
                    rounded="medium"
                  />
                ))}
              </div>}
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

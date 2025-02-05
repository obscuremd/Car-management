import { NavArrowDown, User } from "iconoir-react";
import { Button, Card, ImageUpload, Input, Text } from "../Exports/Exports";
import { useEffect, useState } from "react";
import { useApi } from "../Providers/ApiProvider";
import Table from "../ScreenComponents/Table/Table";
import axios from "axios";
import toast from "react-hot-toast";

export default function Accountant() {
  const [add, setAdd] = useState("");
  const [loading, setLoading] = useState(false);

  const [view, setView] = useState("");

  const [selected, setSelected] = useState<User | null>(null);
  const [admin, setAdmin] = useState<User[]>([]);

  const { getSecretary, secretary, url } = useApi();

  useEffect(() => {
    getSecretary({ setLoading });
  }, []);

  useEffect(() => {
    const getAdmins = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${url}/user/`);
        const filteredSecretary = res.data.filter(
          (data: User) => data.role === "admin"
        );
        setAdmin(filteredSecretary);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(true);
        alert("error fetching dealers");
      }
    };
    getAdmins();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <Text
          text="Which role would you like to include?"
          fontSize="body"
          fontWeight="bold"
        />
        <div className="flex gap-1">
          <Button
            rounded="full"
            onclick={() => setAdd("accountant")}
            color="primary"
            outline={add !== "accountant"}
            size="xs"
            text="Add Accountant"
          />
          <Button
            rounded="full"
            onclick={() => setAdd("admin")}
            outline={add !== "admin"}
            color="primary"
            size="xs"
            text="Add Admin"
          />
        </div>
      </div>

      {add === "accountant" && <Secretary />}
      {add === "admin" && <Admin />}

      {view === "secretary" ? (
        <div>
          <Text text="Secretary" fontSize="t2" fontWeight="semibold" />
          <div className="w-full flex gap-4 overflow-x-scroll py-1 px-1">
            {loading
              ? "Loading .."
              : secretary.map((item) => (
                  <Card
                    outline="primary"
                    avatar
                    avatar_image={item.profile_picture}
                    avatar_primary_text={item.name}
                    avatar_secondary_text={item.email}
                    onclick={() => setSelected(item)}
                    button
                    button_text={item.branch}
                  />
                ))}
          </div>
          {selected !== null && (
            <Card
              outline="primary"
              image={selected.profile_picture}
              vertical
              hover={false}
              avatar
              avatar_image={selected.profile_picture}
              avatar_primary_text={`Full Name : ${selected.name}`}
              avatar_secondary_text={`Log-In Id : ${selected._id}`}
              primary_text={`Email :${selected.email}`}
              secondary_text={`Password: ${selected.password}`}
              button
              button_text={selected.branch}
            />
          )}
        </div>
      ) : (
        <Button
          rounded="full"
          onclick={() => setView("secretary")}
          color="primary"
          size="xs"
          text="View Secretaries"
        />
      )}
      {view === "admin" ? (
        <div>
          <Text text="Admins" fontSize="t2" fontWeight="semibold" />
          <div className="w-full flex gap-4 overflow-x-scroll py-1 px-1">
            {loading
              ? "Loading .."
              : admin.map((item) => (
                  <Card
                    outline="primary"
                    avatar
                    avatar_image={item.profile_picture}
                    avatar_primary_text={item.name}
                    avatar_secondary_text={item.email}
                    primary_text={`Login_id:---${item._id}`}
                    secondary_text={`Password:---${item.password}`}
                  />
                ))}
          </div>
        </div>
      ) : (
        <Button
          rounded="full"
          onclick={() => setView("admin")}
          color="primary"
          size="xs"
          text="View Admins"
        />
      )}

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
        <Table />
      </div>
    </div>
  );
}

const Admin = () => {
  const [profile_picture, setProfilePicture] = useState("");
  const role = "admin";
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [sex, setSex] = useState<"Male" | "Female" | "Other">("Female");
  const [NIN, setNIN] = useState("");
  const branch = "0";

  const [dropdown, setDropdown] = useState(false);

  const { createUser,createClerkUser } = useApi();
  const [loading, setLoading] = useState(false)

  const createAdmin =async()=>{
    setLoading(true)
    
    try {
      const login_id = crypto.randomUUID()
      const password = crypto.randomUUID()
  
      await createClerkUser({login_id, password,})
      await createUser({login_id, profile_picture, password, role, name, address, email, phone_number, sex, NIN, branch, })
      setLoading(false)
      await window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('error !!!')
      setLoading(false)
    }
  }

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
        </div>
      </div>
      <Button color="primary" rounded="medium" icon_left={loading && <l-bouncy size="45" speed="1.75" color="white" />} size="md" text={loading?"":"Register"} stretch onclick={createAdmin}/>
    </div>
  );
};
const Secretary = () => {
  const [profile_picture, setProfilePicture] = useState("");
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
  const [loading, setLoading] = useState(false)


  const { createUser, branchOptions,createClerkUser } = useApi();
  
  const createSecretary =async()=>{
    setLoading(true)
    
    try {
      const login_id = crypto.randomUUID()
      const password = crypto.randomUUID()
  
      await createClerkUser({login_id, password,})
      await createUser({login_id, profile_picture, password, role, name, address, email, phone_number, sex, NIN, branch, })
      setLoading(false)
      await window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('error !!!')
      setLoading(false)
    }
  }

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
            {dropdown1 && (
              <div className="absolute w-full flex flex-col gap-2 p-2 backdrop-blur-xl rounded-lg ">
                {branchOptions.map((item, index) => (
                  <Button
                    key={index}
                    gap="justify-between"
                    color="primary"
                    onclick={() => [setBranch(item), setDropdown1(false)]}
                    stretch
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
      </div>
      <Button color="primary" rounded="medium" icon_left={loading && <l-bouncy size="45" speed="1.75" color="white" />} size="md" text={loading?"":"Register"} stretch onclick={createSecretary}/>

    </div>
  );
};

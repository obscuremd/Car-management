interface User {
  _id?: string;
  login_id: string;
  profile_picture: string;
  password: string;
  role: "admin" | "secretary" | "dealer";
  name: string;
  address?: string;
  email: string;
  phone_number?: string;
  sex?: "Male" | "Female" | "Other";
  NIN?: string;
  branch?: string;
}

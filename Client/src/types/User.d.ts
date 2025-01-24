interface User {
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

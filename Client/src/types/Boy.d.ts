interface Boy {
  _id?: string;
  profile_picture: string;
  dealer: string;
  name: string;
  address?: string;
  email: string;
  phone_number?: string;
  sex?: "Male" | "Female" | "Other";
  NIN?: string;
  branch?: string;
}

import { lazy } from "react";
import AvatarUi from "../Ui/Avatar";
import ButtonUI from "../Ui/Button";
import TextUi from "../Ui/Text";
import ImageUploadUi from "../Ui/ImageUpload";
import CardComponent from "../Components/Card";
import HeroComponent from "../Components/Hero";
import MenuComponent from "../Components/Menu";

import Logo from '../assets/Logo.svg'
import InputUi from "../Ui/Input";

//Logo
export { Logo}

// Ui
export const Avatar = AvatarUi;
export const Button = ButtonUI
export const Text = TextUi
export const Input = InputUi
export const ImageUpload = ImageUploadUi

// Components
export const Card = CardComponent
export const Hero = HeroComponent
export const Menu = MenuComponent

// screens
export const Overview = lazy(()=> import('../Screens/Overview'))
export const Dealers = lazy(()=> import('../Screens/Dealers'))
export const Records = lazy(()=> import('../Screens/Records'))
export const Reviews = lazy(()=> import('../Screens/Reviews'))


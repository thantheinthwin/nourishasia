import React from "react";
import {
  Button,
  Typography,
  Option,
  Select,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  ArrowDownTrayIcon
} from "@heroicons/react/24/solid";

import { Logo } from "../assets/img";

import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
 
const SideBar = () => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const navigate = useNavigate();

  const cuisine = ['Chinese', 'Japanese', 'Thai', 'Indian', 'Korean', 'Vietnamese', 'Malaysian', 'Indonesian', 'Burmese']

  const logOut = () => {
    const firebaseAuth = getAuth(app);
    firebaseAuth.signOut().then(() => {
      window.localStorage.setItem("auth", "false");
    }).catch((e) => console.log(e));

    navigate('/login', {replace: true});
  }
 
  return (
    <React.Fragment>
      {/* <Button onClick={openDrawer} className="px-3 py-2 bg-accent shadow-brown-300">	&gt;</Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="flex items-center gap-4 p-4 mb-2">
          <img src={Logo} alt="brand" className="" />
        </div>
        <List>
          <div className="grid gap-4">
              <Select label="Food Choice">
                  <Option>Vegen</Option>
                  <Option>Carnism</Option>
              </Select>
              <Select label="Cuisine">
                  {cuisine.map((item, i) => (<Option key={i}>{item}</Option>))}
              </Select>
              <div className="p-2 text-center transition-all duration-100 ease-in-out border rounded-md hover:bg-blue-gray-50 border-blue-gray-50">Filter</div>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="w-5 h-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={logOut}>
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Drawer> */}
      <div className="max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 h-screen">
        <div className="flex items-center gap-4 p-4 mb-2">
          <img src={Logo} alt="brand" className="" />
        </div>
        <List>
          <div className="grid gap-4">
              <Select label="Food Choice">
                  <Option>Vegen</Option>
                  <Option>Carnism</Option>
              </Select>
              <Select label="Cuisine">
                  {cuisine.map((item, i) => (<Option key={i}>{item}</Option>))}
              </Select>
              <div className="p-2 text-center transition-all duration-100 ease-in-out border rounded-md hover:bg-blue-gray-50 border-blue-gray-50">Filter</div>
          </div>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <ArrowDownTrayIcon className="w-5 h-5" />
            </ListItemPrefix>
            Add recipe
          </ListItem>
          <hr className="my-2 border-blue-gray-50" />
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="w-5 h-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="w-5 h-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={logOut}>
            <ListItemPrefix>
              <PowerIcon className="w-5 h-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  );
}

export default SideBar;
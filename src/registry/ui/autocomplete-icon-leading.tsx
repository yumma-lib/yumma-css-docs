import {
  BellNotification,
  Globe,
  HelpCircle,
  Key,
  Search,
  UserXmark,
  Wrench,
} from "iconoir-react";
import Autocomplete, { type AutocompleteItem } from "./autocomplete";

export default function AutocompleteIconLeading() {
  return (
    <Autocomplete
      items={settings}
      label="Search settings"
      placeholder="Account, Privacy, & more"
      icon={<Search className="w-4 h-4" />}
      iconPosition="leading"
      emptyMessage="No settings found."
    />
  );
}

const settings: AutocompleteItem[] = [
  { label: "Account Settings", icon: <Wrench className="w-4 h-4" /> },
  { label: "Privacy & Security", icon: <Key className="w-4 h-4" /> },
  {
    label: "Notifications",
    icon: <BellNotification className="w-4 h-4" />,
  },
  { label: "Language & Region", icon: <Globe className="w-4 h-4" /> },
  { label: "Blocked Accounts", icon: <UserXmark className="w-4 h-4" /> },
  { label: "Help Center", icon: <HelpCircle className="w-4 h-4" /> },
];

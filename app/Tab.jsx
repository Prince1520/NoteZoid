import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Home as HomeIcon,
  Calendar,
  CheckSquare,
  BookOpen,
  MapPin,
} from "lucide-react-native";
import { useRouter } from "expo-router";

import Homes from "~/components/Home";
import { renderHeaderRight } from "./_layout";
import PYQScreen from "~/components/PYQsScreen";

const Tab = createBottomTabNavigator();

const menuItems = [
  {
    name: "Home",
    label: "Home",
    icon: HomeIcon,
    component: Homes,
  },
  {
    name: "Attendance",
    label: "Attendance",
    icon: CheckSquare,
    component: Homes,
  },
  {
    name: "Timetable",
    label: "Timetable",
    icon: Calendar,
    component: Homes,
  },
  {
    name: "PYQs",
    label: "PYQs",
    icon: BookOpen,
    component: PYQScreen,
  },
  {
    name: "Maps",
    label: "Maps",
    icon: MapPin,
    component: PYQScreen,
  },
];

export default function BottomTabNavigator() {
  const router = useRouter();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const menuItem = menuItems.find((item) => item.name === route.name);

        return {
          headerRight: () => renderHeaderRight(router),
          tabBarIcon: ({ color, size }) => {
            const Icon = menuItem?.icon;
            return Icon ? <Icon size={size} color={color} /> : null;
          },
          tabBarLabel: menuItem?.label || route.name,
        };
      }}
    >
      {menuItems.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

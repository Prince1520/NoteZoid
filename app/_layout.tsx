import "~/global.css";

import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View, Text, Pressable } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { User } from "~/lib/icons/Cart";
import { Button } from "~/components/ui/button";
import { H4 } from "~/components/ui/typography";
import { useRouter } from "expo-router";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};

const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// ✅ Updated HeaderUser component with working onPress
function HeaderUser({ children, username, onPress }) {
  return (
    <Pressable className="shadow shadow-foreground/5 mr-2" onPress={onPress}>
      <View className="flex-row items-center">
        <View className="justify-center items-center">{children}</View>
        <Text className="text-foreground ml-1 text-center font-medium">
          <H4>{username ? username : "Login"}</H4>
        </Text>
      </View>
    </Pressable>
  );
}

// ✅ renderHeaderRight now accepts working profile button
export const renderHeaderRight = ({ router, username }) => {
  const localRouter = router || useRouter();

  const handleProfilePress = () => {
    if (!username) {
      localRouter.push("/Login");
    } else {
      localRouter.push("/Profile");
    }
  };

  return (
    <View className="flex flex-row items-center">
      <HeaderUser username={username} onPress={handleProfilePress}>
        <User className="text-foreground" size={24} strokeWidth={1.25} />
      </HeaderUser>
      <ThemeToggle />
    </View>
  );
};

export default function RootLayout() {
  const router = useRouter();
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const [username, setUsername] = React.useState();

  const useIsomorphicLayoutEffect =
    Platform.OS === "web" && typeof window === "undefined"
      ? React.useEffect
      : React.useLayoutEffect;

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) return;

    if (Platform.OS === "web") {
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            title: "NoteZoid 2.0",
            headerRight: () => renderHeaderRight({ router, username }),
          }}
        />
        <Stack.Screen
          name="Login"
          options={{
            title: "Login",
            headerRight: () => renderHeaderRight({ router, username }),
          }}
        />
        <Stack.Screen
          name="Signup"
          options={{
            title: "Signup",
            headerRight: () => renderHeaderRight({ router, username }),
          }}
        />
        <Stack.Screen
          name="Profile"
          options={{
            title: "Profile",
            headerRight: () => renderHeaderRight({ router, username }),
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{
            title: "Forgot Password",
            headerRight: () => renderHeaderRight({ router, username }),
          }}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ScrollView, TouchableOpacity, View } from "react-native";
import axios from "axios";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Text } from "~/components/ui/text";
import { H1, H2, P } from "~/components/ui/typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [gender, setGender] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const handleSubmit = async () => {
    if (!acceptTerms) {
      Alert.alert("Error", "Please accept the terms and conditions.");
      return;
    }

    if (!name || !email || !password || !role || !gender) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://192.168.129.182:8000/api/register",
        {
          name,
          email,
          password,
          role,
          gender,
        }
      );

      if (response.data.success) {
        Alert.alert("Registration Successful", "Redirecting to Home...");
        console.log(response.data);
        router.push("/");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Registration Error",
        error.response?.data?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-background">
      <View className="container mx-auto px-4 py-8 flex justify-center items-center min-h-screen">
        <View className="w-full max-w-md space-y-6">
          <View className="items-center">
            {/* <Image
              source={require("~/assets/images/logo.png")} // Replace with your actual logo path
              className="w-24 h-24 mb-4"
              resizeMode="contain"
            /> */}
            <H1 className="text-3xl font-bold text-center text-primary">
              Create an Account {""}
            </H1>
            <P className="text-center text-muted-foreground mt-2">
              Join NoteZoid 2.0 to get started {""}
            </P>
          </View>

          <Card className="w-full">
            <CardContent className="p-6 space-y-4">
              <View className="space-y-4">
                <View className="space-y-2">
                  <Label nativeID="name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    className="text-foreground"
                  />
                </View>

                <View className="space-y-2">
                  <Label nativeID="email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="email"
                    keyboardType="email-address"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    className="text-foreground"
                    autoCapitalize="none"
                  />
                </View>

                <View className="space-y-2">
                  <Label nativeID="password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="password"
                    secureTextEntry
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    className="text-foreground"
                  />
                </View>

                <View className="space-y-2">
                  <Label nativeID="gender" className="text-foreground">
                    Gender
                  </Label>
                  <Select value={gender} onValueChange={setGender} required>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-foreground"
                        placeholder="Select your gender "
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-full">
                      <SelectGroup>
                        <SelectItem value="male" label="Male ">
                          Male
                        </SelectItem>
                        <SelectItem value="female" label="Female ">
                          Female
                        </SelectItem>
                        <SelectItem value="other" label="Other ">
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </View>

                <View className="space-y-2">
                  <Label nativeID="role" className="text-foreground">
                    Role
                  </Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        className="text-foreground"
                        placeholder="Select your role "
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-full">
                      <SelectGroup>
                        <SelectItem value="student" label="Student ">
                          Student
                        </SelectItem>
                        <SelectItem value="teacher" label="Teacher ">
                          Teacher
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </View>

                <View className="flex flex-row items-start space-x-3 pt-2">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={setAcceptTerms}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="flex-1">
                    <P className="text-sm text-muted-foreground">
                      I agree to the{" "}
                      <Text className="text-primary">Terms of Service</Text> and{" "}
                      <Text className="text-primary">Privacy Policy</Text>
                    </P>
                  </Label>
                </View>

                <Button
                  onPress={handleSubmit}
                  className="w-full mt-2"
                  disabled={!acceptTerms || loading}
                >
                  <Text className="font-medium">
                    {loading ? "Creating account..." : "Create account"}
                  </Text>
                </Button>
              </View>

              <View className="flex-row justify-center pt-4">
                <P className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                </P>
                <TouchableOpacity onPress={() => router.push("/Login")}>
                  <P className="text-sm text-primary font-medium">Sign in</P>
                </TouchableOpacity>
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

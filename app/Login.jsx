import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity, Alert } from "react-native";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1, P } from "~/components/ui/typography";
import { useRouter } from "expo-router";
import axios from "axios";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate inputs
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      // Replace with your actual API endpoint
      const response = await axios.post(
        "http://192.168.129.182:8000/api/login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response.data);

      if (response.data.success) {
        // You might want to store the token or user data here
        // Example with AsyncStorage (you'd need to import it):
        // await AsyncStorage.setItem('userToken', response.data.token);

        Alert.alert("Success", "Login successful");
        router.replace("/"); // Navigate to home screen or dashboard
      } else {
        Alert.alert(
          "Login Failed",
          response.data.message || "Invalid credentials"
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        "Login Error",
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="bg-background">
      <View className="flex-1 justify-center items-center min-h-screen px-4 py-12">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle>
              <H1 className="text-2xl font-bold text-center">Welcome Back</H1>
            </CardTitle>
            <P className="text-center text-muted-foreground mt-1">
              Sign in to your account to continue
            </P>
          </CardHeader>
          <CardContent className="pt-4">
            <View className="space-y-5">
              <View className="space-y-2">
                <Label htmlFor="email" className="pl-1">
                  <Text className="text-sm font-medium">Email</Text>
                </Label>
                <View className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="pl-10 h-12 rounded-lg"
                  />
                </View>
              </View>
              <View className="space-y-2">
                <View className="flex-row justify-between items-center pl-1">
                  <Label htmlFor="password">
                    <Text className="text-sm font-medium">Password</Text>
                  </Label>
                  <TouchableOpacity
                    onPress={() => router.push("/ForgotPassword")}
                    className="mb-1"
                  >
                    <Text className="text-xs text-primary font-medium">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    size={18}
                  />
                  <Input
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    className="pl-10 pr-10 h-12 rounded-lg"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-muted-foreground" />
                    ) : (
                      <Eye size={18} className="text-muted-foreground" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Button
                onPress={handleSubmit}
                className="w-full h-12 mt-2 rounded-lg"
                disabled={loading}
              >
                <Text className="font-semibold text-base">
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </Button>
            </View>
            <View className="mt-6 flex-row justify-center space-x-1">
              <P className="text-sm text-muted-foreground">
                Don't have an account? {""}
              </P>
              <TouchableOpacity onPress={() => router.push("/Signup")}>
                <P className="text-sm text-primary font-semibold">Sign Up</P>
              </TouchableOpacity>
            </View>
          </CardContent>
        </Card>
      </View>
    </ScrollView>
  );
}

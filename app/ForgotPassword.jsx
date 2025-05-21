import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Text } from "~/components/ui/text";
import { H1, P } from "~/components/ui/typography";
import { useRouter } from "expo-router";
import { Send, Mail, ArrowLeft } from "~/lib/icons/Cart";
export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    // Implement login logic here
  };

  return (
    <ScrollView className="bg-background">
      <View className="flex-1 justify-center items-center min-h-screen px-4 py-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>
              <H1 className="text-2xl font-bold text-center">
                Forgot Password
              </H1>
            </CardTitle>
            <CardDescription>
              <Text>
                {" "}
                Enter your email address and we'll send you a link to reset your
                password.
              </Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <View className="space-y-4">
              <View className="space-y-2">
                <Label htmlFor="email">
                  <Text className="text-sm font-medium">Email</Text>
                </Label>
                <View className="relative">
                  <Mail
                    size={24}
                    strokeWidth={1.25}
                    className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="pl-10"
                  />
                </View>
              </View>
              <View></View>
              <Button onPress={handleSubmit} className="w-full space-y-2">
                <Text className=" font-semibold">
                  <Send
                    className="text-green-500"
                    size={24}
                    strokeWidth={1.25}
                  />
                  Send Reset Link
                </Text>
              </Button>
            </View>
          </CardContent>
          <View>
            <Text onPress={() => router.push("/Login")} className="-space-y-2">
              <ArrowLeft
                className="text-foreground"
                size={24}
                strokeWidth={1.25}
              />{" "}
              Back to Login
            </Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

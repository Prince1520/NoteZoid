import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { SafeAreaView, View } from "react-native";
import { H1 } from "~/components/ui/typography";
import { Text } from "~/components/ui/text";
export default function ProfilePage() {
  return (
    <SafeAreaView className="container mx-auto py-10">
      <View className="container mx-auto py-10">
        <View className="grid gap-6">
          <Card>
            <CardHeader>
              <View className="flex flex-row gap-3 items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    source={{
                      uri: "https://i.pinimg.com/736x/33/ba/df/33badf7bd7e2bd56b21e3d972fe3ed5a.jpg",
                    }}
                  />
                  <AvatarFallback>
                    <Text>JD</Text>
                  </AvatarFallback>
                </Avatar>
                <View>
                  <CardTitle>John Doe</CardTitle>
                  <CardDescription>
                    <Text>Member since June 2023</Text>
                  </CardDescription>
                </View>
              </View>
            </CardHeader>
            <CardContent className="space-y-4">
              <View className="space-y-2">
                <Label htmlFor="fullName">
                  <Text>Full Name</Text>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  defaultValue="John Doe"
                />
              </View>
              <View className="space-y-2">
                <Label htmlFor="email">
                  <Text>Email</Text>
                </Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </View>
              <View className="space-y-2">
                <Label htmlFor="phone">
                  <Text>Phone Number</Text>
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                />
              </View>
            </CardContent>
            <CardFooter>
              <Button>
                <Text>Update Profile</Text>
              </Button>
            </CardFooter>
          </Card>
        </View>
      </View>
    </SafeAreaView>
  );
}

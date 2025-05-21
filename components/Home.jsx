import React from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Card, CardHeader, CardContent, CardTitle } from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { H1, H2, H3, P } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  ClipboardList,
  Calendar,
} from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const AttendanceHome = () => {
  // Dummy data for attendance
  const attendanceData = [
    {
      subject: "Mathematics",
      attended: 18,
      total: 20,
      percentage: 90,
      status: "safe",
      lastUpdated: "2 days ago",
    },
    {
      subject: "Physics",
      attended: 12,
      total: 15,
      percentage: 80,
      status: "warning",
      lastUpdated: "1 day ago",
    },
    {
      subject: "Chemistry",
      attended: 8,
      total: 10,
      percentage: 80,
      status: "warning",
      lastUpdated: "Today",
    },
    {
      subject: "Computer Science",
      attended: 22,
      total: 22,
      percentage: 100,
      status: "safe",
      lastUpdated: "1 week ago",
    },
    {
      subject: "English",
      attended: 9,
      total: 12,
      percentage: 75,
      status: "danger",
      lastUpdated: "3 days ago",
    },
  ];

  // Calculate overall attendance
  const overallAttendance = attendanceData.reduce(
    (acc, curr) => {
      return {
        attended: acc.attended + curr.attended,
        total: acc.total + curr.total,
      };
    },
    { attended: 0, total: 0 }
  );

  const overallPercentage = Math.round(
    (overallAttendance.attended / overallAttendance.total) * 100
  );

  // Determine overall status color
  const getStatusColor = (percentage) => {
    if (percentage >= 85) return "#10B981"; // Emerald-500 (Safe)
    if (percentage >= 75) return "#F59E0B"; // Amber-500 (Warning)
    return "#EF4444"; // Red-500 (Danger)
  };

  const overallStatusColor = getStatusColor(overallPercentage);

  const handleViewDetails = (subject) => {
    console.log(`Viewing details for ${subject}`);
    // Navigation logic would go here
  };

  return (
    <View className="flex-1 bg-background">
      <StatusBar style="auto" />
      <ScrollView className="px-4 pt-12 pb-6">
        {/* Header */}
        <View className="mb-6">
          <H1 className="text-3xl font-bold">Attendance Tracker</H1>
          <P className="text-muted-foreground mt-1">
            Your attendance summary across all subjects
          </P>
        </View>

        {/* Overall Stats Card */}
        <Card className="mb-6 overflow-hidden border border-border rounded-xl shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle>Overall Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <View className="flex-row items-center justify-between mb-4">
              <H2
                className="text-2xl font-bold"
                style={{ color: overallStatusColor }}
              >
                {overallPercentage}%
              </H2>
              <P>
                {overallAttendance.attended} of {overallAttendance.total}{" "}
                classes
              </P>
            </View>
            <Progress
              value={overallPercentage}
              className="h-3"
              style={{ backgroundColor: overallStatusColor }}
            />
            <View className="flex-row justify-between mt-2">
              <P className="text-muted-foreground text-xs">0%</P>
              <P className="text-muted-foreground text-xs">100%</P>
            </View>
          </CardContent>
        </Card>

        {/* Status Legend */}
        <View className="flex-row justify-between mb-5 px-1">
          <View className="flex-row items-center">
            <CheckCircle2 size={14} color="#10B981" />
            <P className="text-xs ml-1">Safe (&gt;85%)</P>
          </View>
          <View className="flex-row items-center">
            <AlertCircle size={14} color="#F59E0B" />
            <P className="text-xs ml-1">Warning (75-85%)</P>
          </View>
          <View className="flex-row items-center">
            <AlertCircle size={14} color="#EF4444" />
            <P className="text-xs ml-1">Danger (&lt;75%)</P>
          </View>
        </View>

        {/* Subject Cards */}
        <View className="space-y-4">
          {attendanceData.map((subject, index) => (
            <Card
              key={index}
              className="overflow-hidden border border-border rounded-xl shadow-sm"
            >
              <CardHeader className="pb-2">
                <View className="flex-row justify-between items-center">
                  <H3 className="text-lg font-semibold">{subject.subject}</H3>
                  {subject.status === "safe" ? (
                    <CheckCircle2 size={18} color="#10B981" />
                  ) : (
                    <AlertCircle
                      size={18}
                      color={
                        subject.status === "warning" ? "#F59E0B" : "#EF4444"
                      }
                    />
                  )}
                </View>
              </CardHeader>
              <CardContent>
                <View className="flex-row items-center justify-between mb-3">
                  <P className="text-muted-foreground">
                    {subject.attended}/{subject.total} classes (
                    {subject.percentage}%)
                  </P>
                  <P className="text-muted-foreground text-xs">
                    Updated {subject.lastUpdated}
                  </P>
                </View>
                <Progress
                  value={subject.percentage}
                  className="h-2"
                  style={{
                    backgroundColor:
                      subject.status === "safe"
                        ? "#10B981"
                        : subject.status === "warning"
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleViewDetails(subject.subject)}
                  className="mt-3 self-end flex-row items-center"
                >
                  <P className="text-primary text-sm font-medium">
                    View details
                  </P>
                  <ChevronRight size={16} color="#0284c7" className="ml-1" />
                </TouchableOpacity>
              </CardContent>
            </Card>
          ))}
        </View>

        {/* Quick Actions */}
        <View className="mt-8 mb-10">
          <H3 className="text-lg font-semibold mb-4">Quick Actions</H3>
          <View className="flex-row space-x-4">
            <TouchableOpacity className="flex-1 bg-gray-100 py-4 px-3 rounded-xl items-center justify-center flex-row">
              <Calendar size={20} color="#0284c7" className="mr-2" />
              <P className="font-medium">Request Leave</P>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-gray-100 py-4 px-3 rounded-xl items-center justify-center flex-row">
              <ClipboardList size={20} color="#0284c7" className="mr-2" />
              <P className="font-medium">Report Issue</P>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AttendanceHome;

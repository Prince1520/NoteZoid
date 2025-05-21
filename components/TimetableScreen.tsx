// // import React, { useState, useEffect } from "react";
// // import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from "react-native";
// // import * as ImagePicker from "expo-image-picker";
// // import * as Notifications from "expo-notifications";
// // import * as Permissions from "expo-permissions";

// // const TimetableScreen = () => {
// //   const [timetableImage, setTimetableImage] = useState(null);
// //   const [classTimes, setClassTimes] = useState([{ subject: "", time: "" }]);

// //   useEffect(() => {
// //     requestPermissions();
// //   }, []);

// //   const requestPermissions = async () => {
// //     const { status } = await Notifications.requestPermissionsAsync();
// //     if (status !== "granted") {
// //       Alert.alert("Permission required", "Notification permission is needed for reminders.");
// //     }
// //   };

// //   const pickImage = async () => {
// //     let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
// //     if (!result.canceled) {
// //       setTimetableImage(result.assets[0].uri);
// //     }
// //   };

// //   const scheduleNotifications = () => {
// //     classTimes.forEach(async (cls) => {
// //       const triggerTime = getNextTriggerDate(cls.time);
// //       await Notifications.scheduleNotificationAsync({
// //         content: {
// //           title: `Class Reminder: ${cls.subject}`,
// //           body: `Your class for ${cls.subject} is about to start!`,
// //         },
// //         trigger: triggerTime,
// //       });
// //     });
// //     Alert.alert("Success", "Notifications scheduled!");
// //   };

// //   const getNextTriggerDate = (timeStr) => {
// //     const [hours, minutes] = timeStr.split(":").map(Number);
// //     const now = new Date();
// //     const nextClass = new Date();
// //     nextClass.setHours(hours, minutes, 0, 0);
// //     if (nextClass <= now) nextClass.setDate(nextClass.getDate() + 1);
// //     return nextClass;
// //   };

// //   const updateClassTime = (index, key, value) => {
// //     const updated = [...classTimes];
// //     updated[index][key] = value;
// //     setClassTimes(updated);
// //   };

// //   return (
// //     <ScrollView contentContainerStyle={styles.container}>
// //       <Text style={styles.title}>Upload Timetable & Schedule Reminders</Text>

// //       {timetableImage && <Image source={{ uri: timetableImage }} style={styles.image} />}
// //       <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
// //         <Text style={styles.uploadButtonText}>Upload Timetable Image</Text>
// //       </TouchableOpacity>

// //       <Text style={styles.subtitle}>Enter Class Subjects & Times</Text>
// //       {classTimes.map((cls, index) => (
// //         <View key={index} style={styles.inputRow}>
// //           <TextInput
// //             style={styles.input}
// //             placeholder="Subject"
// //             value={cls.subject}
// //             onChangeText={(text) => updateClassTime(index, "subject", text)}
// //           />
// //           <TextInput
// //             style={styles.input}
// //             placeholder="HH:MM"
// //             value={cls.time}
// //             onChangeText={(text) => updateClassTime(index, "time", text)}
// //             keyboardType="numeric"
// //           />
// //         </View>
// //       ))}

// //       <TouchableOpacity onPress={() => setClassTimes([...classTimes, { subject: "", time: "" }])}>
// //         <Text style={styles.addMore}>+ Add More</Text>
// //       </TouchableOpacity>

// //       <TouchableOpacity style={styles.scheduleButton} onPress={scheduleNotifications}>
// //         <Text style={styles.scheduleButtonText}>Schedule Notifications</Text>
// //       </TouchableOpacity>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: { flexGrow: 1, alignItems: "center", padding: 20 },
// //   title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
// //   image: { width: "90%", height: 200, resizeMode: "contain", marginBottom: 10 },
// //   uploadButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginBottom: 15 },
// //   uploadButtonText: { color: "#fff", fontWeight: "bold" },
// //   subtitle: { fontSize: 18, marginBottom: 10 },
// //   inputRow: { flexDirection: "row", marginBottom: 10 },
// //   input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 8, marginHorizontal: 5 },
// //   addMore: { color: "#007bff", marginBottom: 20 },
// //   scheduleButton: { backgroundColor: "green", padding: 12, borderRadius: 5 },
// //   scheduleButtonText: { color: "#fff", fontWeight: "bold" },
// // });

// // export default TimetableScreen;


// import React, { useEffect, useState } from "react";
// import { View, Text, Image, ActivityIndicator, StyleSheet, Platform } from "react-native";
// import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
// import { auth, db } from "../firebaseConfig";
// import { doc, getDoc } from "firebase/firestore";

// // Mock Timetable for testing (replace with dynamic later)
// const sampleTimetable = [
//   { subject: "Math", day: 1, hour: 9, minute: 0 },
//   { subject: "Physics", day: 2, hour: 11, minute: 30 },
//   { subject: "CS", day: 3, hour: 14, minute: 0 },
// ]; // day: 0-Sun, 1-Mon...6-Sat

// const TimetableScreen = () => {
//   const [imageUrl, setImageUrl] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const uid = auth.currentUser?.uid;

//   useEffect(() => {
//     fetchTimetable();
//     registerForPushNotificationsAsync();
//   }, []);

//   const fetchTimetable = async () => {
//     try {
//       const docRef = doc(db, "timetables", uid);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const url = docSnap.data().imageUrl;
//         setImageUrl(url);
//         scheduleClassNotifications(); // Only if image exists
//       } else {
//         setImageUrl(null);
//       }
//     } catch (error) {
//       console.error("Failed to fetch timetable:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const registerForPushNotificationsAsync = async () => {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       alert("Failed to get push token for notifications!");
//       return;
//     }
//   };

//   const scheduleClassNotifications = async () => {
//     // Clear existing notifications first
//     await Notifications.cancelAllScheduledNotificationsAsync();

//     for (let cls of sampleTimetable) {
//       const now = new Date();
//       const classTime = new Date();
//       classTime.setDate(now.getDate() + ((7 + cls.day - now.getDay()) % 7)); // Next cls.day
//       classTime.setHours(cls.hour);
//       classTime.setMinutes(cls.minute);
//       classTime.setSeconds(0);

//       // Skip if already passed
//       if (classTime < now) classTime.setDate(classTime.getDate() + 7);

//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: `📚 ${cls.subject} Class`,
//           body: `Your ${cls.subject} class is starting soon!`,
//           sound: true,
//         },
//         trigger: {
//           date: classTime,
//           repeats: true,
//           weekday: cls.day + 1,
//           hour: cls.hour,
//           minute: cls.minute,
//         },
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {imageUrl ? (
//         <>
//           <Text style={styles.heading}>Your Timetable</Text>
//           <Image source={{ uri: imageUrl }} style={styles.image} />
//           <Text style={styles.subText}>Notifications scheduled 📅</Text>
//         </>
//       ) : (
//         <Text style={styles.noDataText}>No timetable uploaded yet.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, alignItems: "center" },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   heading: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   subText: { fontSize: 16, color: "#28a745", marginTop: 10 },
//   image: { width: 300, height: 400, resizeMode: "contain" },
//   noDataText: { fontSize: 16, color: "#888" },
// });

// export default TimetableScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Notifications from "expo-notifications";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

const TimetableScreen = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [manualClasses, setManualClasses] = useState([{ subject: "", time: "", day: "" }]);
  const uid = auth.currentUser?.uid;

  useEffect(() => {
    fetchTimetable();
    registerForPushNotificationsAsync();
  }, []);

  const fetchTimetable = async () => {
    try {
      const docRef = doc(db, "timetables", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setImageUrl(data.imageUrl || null);
        setManualClasses(data.manualClasses || [{ subject: "", time: "", day: "" }]);
        scheduleClassNotifications(data.manualClasses || []);
      }
    } catch (error) {
      console.error("Failed to fetch timetable:", error);
    } finally {
      setLoading(false);
    }
  };

  const registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert("Failed to get push token for notifications!");
    }
  };

  const scheduleClassNotifications = async (classes) => {
    await Notifications.cancelAllScheduledNotificationsAsync();

    for (let cls of classes) {
      const [hour, minute] = cls.time.split(":").map(Number);
      const day = parseInt(cls.day); // 0 (Sun) to 6 (Sat)

      if (isNaN(day) || isNaN(hour) || isNaN(minute)) continue;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: `📚 ${cls.subject} Class`,
          body: `Your ${cls.subject} class is starting soon!`,
          sound: true,
        },
        trigger: {
          weekday: day + 1,
          hour: hour,
          minute: minute,
          repeats: true,
        },
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUrl(uri);
      await saveToFirestore(uri, manualClasses);
    }
  };

  const updateClass = (index, key, value) => {
    const updated = [...manualClasses];
    updated[index][key] = value;
    setManualClasses(updated);
  };

  const saveToFirestore = async (imgUrl, classes) => {
    const docRef = doc(db, "timetables", uid);
    await setDoc(docRef, {
      imageUrl: imgUrl,
      manualClasses: classes,
    });
    Alert.alert("Success", "Timetable and classes saved.");
  };

  const handleSaveAndNotify = async () => {
    await saveToFirestore(imageUrl, manualClasses);
    await scheduleClassNotifications(manualClasses);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Timetable</Text>

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <Text style={styles.noImage}>No timetable image uploaded.</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Timetable Image</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Add Your Classes</Text>
      {manualClasses.map((cls, index) => (
        <View key={index} style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Subject"
            value={cls.subject}
            onChangeText={(text) => updateClass(index, "subject", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Time (HH:MM)"
            value={cls.time}
            onChangeText={(text) => updateClass(index, "time", text)}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Day (0-6)"
            value={cls.day}
            onChangeText={(text) => updateClass(index, "day", text)}
            keyboardType="numeric"
          />
        </View>
      ))}

      <TouchableOpacity onPress={() => setManualClasses([...manualClasses, { subject: "", time: "", day: "" }])}>
        <Text style={styles.addMore}>+ Add More Classes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndNotify}>
        <Text style={styles.saveButtonText}>Save and Schedule Notifications</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: "center" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  image: { width: 300, height: 400, resizeMode: "contain", marginBottom: 10 },
  noImage: { color: "#666", fontSize: 16, marginBottom: 10 },
  uploadButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 5, marginBottom: 15 },
  uploadButtonText: { color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  inputRow: { flexDirection: "row", width: "100%", marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginHorizontal: 5,
  },
  addMore: { color: "#007bff", marginBottom: 20 },
  saveButton: { backgroundColor: "green", padding: 12, borderRadius: 5 },
  saveButtonText: { color: "#fff", fontWeight: "bold" },
});

export default TimetableScreen;



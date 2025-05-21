import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Linking,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeft,
  ChevronRight,
  LogIn,
  Building2,
  School,
  Home,
  BookOpen,
  Utensils,
  Dumbbell,
  Map,
  X,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const campusLocations = {
  "Main Gate": "The main entrance of NIT Delhi, guarded and monitored 24/7.",
  "Admin Block": "Houses administrative offices including Director's office.",
  "Mini Campus": "Main area for lectures, labs, and faculty rooms.",
  "Yamuna Hostel": "Boys' hostel with dining and recreational facilities.",
  "Dhauladhar hostel": "Girls' hostel with 24/7 security and common areas.",
  Library: "Central library with access to academic resources and study rooms.",
  Canteen: "Popular student hangout with snacks and meals available.",
  "Sports Complex":
    "Includes football ground, basketball court, and gymnasium.",
};

const locationLinks = {
  "Main Gate": "https://maps.app.goo.gl/eD9kgBvsrp5Wsjsk7",
  "Admin Block": "https://maps.app.goo.gl/5vzmUVMQ6etkuT5s6",
  "Mini Campus": "https://maps.app.goo.gl/oBgiLRrZtzyghP6QA",
  "Yamuna Hostel": "https://maps.app.goo.gl/XSkADLykij7bSBiX6",
  "Dhauladhar hostel": "https://maps.app.goo.gl/JuuRfcjN58k8rSC37",
  Library: "https://maps.app.goo.gl/nFHVKXGZ6MoGEaRf8",
  Canteen: "https://maps.app.goo.gl/bH5vSvGLNc3AXEfT9",
  "Sports Complex": "https://maps.app.goo.gl/KPHBR8WHVU8mZvoTA",
};

// Location icon mapping using Lucide icons
const getLocationIcon = (location) => {
  switch (location) {
    case "Main Gate":
      return <LogIn size={24} color="white" />;
    case "Admin Block":
      return <Building2 size={24} color="white" />;
    case "Mini Campus":
      return <School size={24} color="white" />;
    case "Yamuna Hostel":
      return <Home size={24} color="white" />;
    case "Dhauladhar hostel":
      return <Home size={24} color="white" />;
    case "Library":
      return <BookOpen size={24} color="white" />;
    case "Canteen":
      return <Utensils size={24} color="white" />;
    case "Sports Complex":
      return <Dumbbell size={24} color="white" />;
    default:
      return null;
  }
};

// Simplified color scheme
const locationColors = {
  "Main Gate": ["#4158D0", "#C850C0"],
  "Admin Block": ["#0093E9", "#80D0C7"],
  "Mini Campus": ["#8EC5FC", "#E0C3FC"],
  "Yamuna Hostel": ["#FF9A8B", "#FF6A88"],
  "Dhauladhar hostel": ["#6A11CB", "#2575FC"],
  Library: ["#FF416C", "#FF4B2B"],
  Canteen: ["#F09819", "#EDDE5D"],
  "Sports Complex": ["#43E97B", "#38F9D7"],
};

const CampusNavigation = () => {
  const [selected, setSelected] = useState(null);
  const [locationList, setLocationList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Creating the array with delays for staggered animation
    const locationsWithDelay = Object.keys(campusLocations).map(
      (location, index) => ({
        name: location,
        delay: index * 100,
      })
    );
    setLocationList(locationsWithDelay);
  }, []);

  const openMap = () => {
    if (selected && locationLinks[selected]) {
      Linking.openURL(locationLinks[selected]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Campus Navigation</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.subtitleText}>Select a location to view details</Text>

      {/* Location List */}
      <ScrollView
        contentContainerStyle={styles.locationsContainer}
        showsVerticalScrollIndicator={false}
      >
        {locationList.map((location) => (
          <Animatable.View
            key={location.name}
            animation="fadeInUp"
            delay={location.delay}
            duration={500}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSelected(location.name)}
              style={styles.locationCard}
            >
              <LinearGradient
                colors={locationColors[location.name]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.locationButton}
              >
                {getLocationIcon(location.name)}
                <Text style={styles.locationText}>{location.name}</Text>
                <ChevronRight size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>

      {/* Location Details Modal */}
      <Modal
        visible={!!selected}
        transparent
        animationType="fade"
        onRequestClose={() => setSelected(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={
                selected ? locationColors[selected] : ["#4c669f", "#3b5998"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.modalHeader}
            >
              {selected && getLocationIcon(selected)}
              <Text style={styles.modalTitle}>{selected}</Text>
            </LinearGradient>

            <View style={styles.modalContent}>
              <Text style={styles.modalDescription}>
                {selected && campusLocations[selected]}
              </Text>

              {/* Map Button */}
              <TouchableOpacity style={styles.actionButton} onPress={openMap}>
                <Map size={18} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Open in Maps</Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                style={[styles.actionButton, styles.closeButton]}
                onPress={() => setSelected(null)}
              >
                <X size={18} color="white" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  placeholder: {
    width: 40,
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 16,
  },
  locationsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  locationCard: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  locationText: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width * 0.85,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  modalContent: {
    padding: 16,
  },
  modalDescription: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "#F44336",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default CampusNavigation;

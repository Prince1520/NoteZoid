import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { H1, H2, P } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";

const PYQScreen = () => {
  const [papers, setPapers] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedYear, setExpandedYear] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a delay to mimic async fetch
    setTimeout(() => {
      const hardcodedData = {
        2023: {
          Mathematics: {
            midsem: ["https://example.com/math2023mid.pdf"],
            endsem: ["https://example.com/math2023end.pdf"],
          },
          Physics: {
            midsem: ["https://example.com/phy2023mid.pdf"],
          },
        },
        2022: {
          Chemistry: {
            endsem: ["https://example.com/chem2022end.pdf"],
          },
          Mathematics: {
            midsem: ["https://example.com/math2022mid.pdf"],
            endsem: ["https://example.com/math2022end.pdf"],
          },
        },
      };
      setPapers(hardcodedData);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleYear = (year) => {
    setExpandedYear((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const filteredYears = Object.keys(papers)
    .sort((a, b) => b - a)
    .filter((year) =>
      Object.keys(papers[year]).some((subject) =>
        subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
        <P className="mt-4">Loading past papers...</P>
      </View>
    );
  }

  return (
    <ScrollView className="bg-background p-4">
      <View className="mb-6">
        <H1 className="text-3xl font-bold mb-2">Past Year Papers</H1>
        <P className="text-muted-foreground">
          Access previous year question papers for your courses
        </P>
      </View>

      <Input
        placeholder="Search by subject..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className="mb-6"
      />

      {filteredYears.length === 0 ? (
        <Card className="p-6">
          <Text className="text-center text-muted-foreground">
            No papers found matching your search
          </Text>
        </Card>
      ) : (
        filteredYears.map((year) => (
          <Card key={year} className="mb-4">
            <CardHeader className="pb-0">
              <TouchableOpacity
                onPress={() => toggleYear(year)}
                className="flex-row justify-between items-center"
              >
                <H2>{year}</H2>
                <Ionicons
                  name={expandedYear[year] ? "chevron-up" : "chevron-down"}
                  size={20}
                />
              </TouchableOpacity>
            </CardHeader>

            {expandedYear[year] && (
              <CardContent className="pt-2">
                {Object.entries(papers[year]).map(([subject, types]) => {
                  if (!subject.toLowerCase().includes(searchTerm.toLowerCase()))
                    return null;

                  return (
                    <View key={subject} className="mb-4">
                      <Text className="text-lg font-semibold text-primary mb-2">
                        {subject}
                      </Text>

                      <View className="space-y-3">
                        {["midsem", "endsem"].map((type) => {
                          if (!types[type]) return null;
                          return (
                            <View key={type} className="ml-2">
                              <Text className="font-medium text-muted-foreground mb-1">
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                              </Text>
                              <View className="space-y-2">
                                {types[type].map((url, idx) => (
                                  <Button
                                    key={idx}
                                    onPress={() => Linking.openURL(url)}
                                    variant="outline"
                                    className="flex-row items-center justify-start"
                                  >
                                    <Ionicons
                                      name="document-text-outline"
                                      size={16}
                                      className="mr-2"
                                    />
                                    <Text>Paper {idx + 1}</Text>
                                  </Button>
                                ))}
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                })}
              </CardContent>
            )}
          </Card>
        ))
      )}
    </ScrollView>
  );
};

export default PYQScreen;

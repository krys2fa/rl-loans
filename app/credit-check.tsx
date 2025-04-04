import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function CreditCheckScreen() {
  const [creditScore, setCreditScore] = useState(0);
  const [questionnaire, setQuestionnaire] = useState({
    q1: 0, // Timely repayments
    q2: 0, // Active loan usage
    q3: 0, // Defaults or late payments
  });

  const [isScoreVisible, setIsScoreVisible] = useState(false);

  const allAnswered = () => {
    return (
      questionnaire.q1 !== undefined &&
      questionnaire.q2 !== undefined &&
      questionnaire.q3 !== undefined
    );
  };

  // Normalize the score and ensure it's between 0 and 100
  const calculateScore = () => {
    let score = 0;

    // Each answer has a different weight for calculation (0 to 10 range for each question)
    score += questionnaire.q1 * 10; // Timely repayments, range 0-10, weight 10
    score -= questionnaire.q2 * 5; // Active loan usage, range 0-10, weight -5
    score -= questionnaire.q3 * 7; // Defaults or late payments, range 0-10, weight -7

    // Normalize to 100 scale (the maximum possible score is 100)
    score = Math.min(Math.max(score, 0), 100);

    return score;
  };

  const handleSubmit = () => {
    if (allAnswered()) {
      const finalScore = calculateScore();
      setCreditScore(finalScore);
      setIsScoreVisible(true);
    } else {
      alert("Please answer all questions.");
    }
  };

  const handleChange = (question: string, value: number) => {
    setQuestionnaire((prev) => ({ ...prev, [question]: value }));
  };

  const getScoreColor = () => {
    if (creditScore >= 80) return "#2e7d32"; // Excellent score
    if (creditScore >= 60) return "#fbc02d"; // Good score
    if (creditScore >= 40) return "#ff7043"; // Fair score
    return "#d32f2f"; // Poor score
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Credit Worthiness</Text>

      {/* Animated Score Box - Show only after clicking the button */}
      {isScoreVisible && (
        <Animated.View entering={FadeInUp.springify()} style={styles.scoreBox}>
          <Ionicons name='pulse-outline' size={40} color={getScoreColor()} />
          <Text style={[styles.scoreText, { color: getScoreColor() }]}>
            {creditScore}
          </Text>
          <Text style={[styles.scoreLabel, { color: getScoreColor() }]}>
            {creditScore >= 80
              ? "Excellent"
              : creditScore >= 60
              ? "Good"
              : creditScore >= 40
              ? "Fair"
              : "Poor"}
          </Text>
        </Animated.View>
      )}

      {/* Questionnaire */}
      <View style={styles.questionnaire}>
        <Text style={styles.questionTitle}>
          How timely are your repayments?
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={questionnaire.q1}
          onValueChange={(value) => handleChange("q1", value)}
        />
        <View style={styles.markerRow}>
          {[...Array(11)].map((_, index) => (
            <Text key={index} style={styles.marker}>
              {index * 10}
            </Text>
          ))}
        </View>

        <Text style={styles.questionTitle}>
          How often do you use loans actively?
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={questionnaire.q2}
          onValueChange={(value) => handleChange("q2", value)}
        />
        <View style={styles.markerRow}>
          {[...Array(11)].map((_, index) => (
            <Text key={index} style={styles.marker}>
              {index * 10}
            </Text>
          ))}
        </View>

        <Text style={styles.questionTitle}>
          Have you had any defaults or late payments?
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={questionnaire.q3}
          onValueChange={(value) => handleChange("q3", value)}
        />
        <View style={styles.markerRow}>
          {[...Array(11)].map((_, index) => (
            <Text key={index} style={styles.marker}>
              {index * 10}
            </Text>
          ))}
        </View>
      </View>

      {/* Submit Button */}
      <Button title='Submit' onPress={handleSubmit} />

      {/* Tips Section */}
      <View style={styles.tipsBox}>
        <Text style={styles.tipTitle}>What Affects Your Score?</Text>
        <Text style={styles.tip}>• Timely repayments</Text>
        <Text style={styles.tip}>• Active loan usage</Text>
        <Text style={styles.tip}>• No defaults or late payments</Text>
      </View>

      <View style={styles.tipsBox}>
        <Text style={styles.tipTitle}>How to Improve?</Text>
        <Text style={styles.tip}>✓ Always pay on time</Text>
        <Text style={styles.tip}>✓ Don’t borrow more than needed</Text>
        <Text style={styles.tip}>✓ Maintain good account history</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#fafafa", padding: 16 },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 20,
  },
  scoreBox: {
    backgroundColor: "#e8f5e9",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  scoreText: { fontSize: 40, fontWeight: "bold" },
  scoreLabel: { fontSize: 18, fontWeight: "500" },
  questionnaire: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  slider: {
    width: "100%",
    marginBottom: 16,
  },
  markerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -10,
  },
  marker: {
    fontSize: 12,
    color: "#333",
  },
  tipsBox: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  tipTitle: { fontWeight: "600", fontSize: 16, marginBottom: 8 },
  tip: { fontSize: 14, color: "#333", marginBottom: 4 },
});

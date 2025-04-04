import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

const faqs = [
  {
    question: "How do I contact support?",
    answer: "You can use chat, email, or call us directly from this screen.",
  },
  {
    question: "What is the response time?",
    answer: "We typically respond within 24 hours on weekdays.",
  },
  {
    question: "Can I get help outside working hours?",
    answer: "Yes! Our chat is 24/7 for emergencies.",
  },
];

export default function SupportScreen() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Need Help?</Text>

      <View style={styles.options}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("tel:+233558252455")}
        >
          <Ionicons name='call-outline' size={28} color='#1e88e5' />
          <Text style={styles.cardText}>Call Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => Linking.openURL("mailto:kriskit7@gmail.com")}
        >
          <Ionicons name='mail-outline' size={28} color='#1e88e5' />
          <Text style={styles.cardText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => alert("Starting chat...")}
        >
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={28}
            color='#1e88e5'
          />
          <Text style={styles.cardText}>Live Chat</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.faqHeading}>Frequently Asked Questions</Text>
      {faqs.map((faq, i) => (
        <TouchableOpacity
          key={i}
          style={styles.faqItem}
          onPress={() => setExpanded(expanded === i ? null : i)}
        >
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          {expanded === i && (
            <Animated.Text
              entering={FadeInDown.duration(200)}
              style={styles.faqAnswer}
            >
              {faq.answer}
            </Animated.Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fafafa" },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e1e1e",
    marginBottom: 20,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardText: { marginTop: 8, color: "#1e1e1e", fontWeight: "500", fontSize: 14 },
  faqHeading: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  faqItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  faqQuestion: { fontWeight: "600", color: "#333" },
  faqAnswer: { marginTop: 6, color: "#555", fontSize: 14 },
});

import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import Animated, {
  Layout,
  FadeInDown,
  FadeOutUp,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const questionnaire = {
  "Personal & Demographic Info": {
    relationship_status: {
      question: "What is your relationship status?",
      options: {
        Single: 0,
        Married: 2,
        "Living with partner (not married)": 1,
        Divorced: -1,
        Widowed: -1,
      },
    },
    age_range: {
      question: "What is your age range?",
      options: {
        "18–24": 0,
        "25–34": 2,
        "35–44": 3,
        "45–54": 2,
        "55+": 1,
        "Below 18": -1,
      },
    },
    gender: {
      question: "What is your gender?",
      options: {
        Male: 1,
        Female: 2,
        "Other / Prefer not to say": 0,
      },
    },
    physically_challenged: {
      question: "Are you physically challenged?",
      options: {
        Yes: -1,
        No: 1,
      },
    },
  },
  "Education & Literacy": {
    education_level: {
      question: "What is your highest level of education completed?",
      options: {
        "No formal education": -2,
        "Some primary": -1,
        "Completed primary": 0,
        "JHS / O-Level": 1,
        "SHS / A-Level": 2,
        "Tertiary diploma / professional certificate": 3,
        "Bachelor’s degree": 4,
        Postgraduate: 5,
      },
    },
    literacy: {
      question: "Can you read and write in English?",
      options: {
        Yes: 2,
        Somewhat: 1,
        No: -1,
      },
    },
  },
  "Household & Residency": {
    house_ownership: {
      question: "Who owns the house where you live?",
      options: {
        Self: 3,
        "Spouse/partner": 2,
        "Family member": 1,
        Landlord: 0,
        Employer: 0,
        Other: 0,
      },
    },
    residency_duration: {
      question: "How long have you lived at your current residence?",
      options: {
        "Less than 6 months": -2,
        "6 months – 1 year": -1,
        "1–2 years": 0,
        "2–4 years": 1,
        "4–6 years": 2,
        "6 years or more": 3,
      },
    },
    number_supported: {
      question:
        "How many people do you financially support (including yourself)?",
      options: {
        none: 2,
        "1": 2,
        "2": 1,
        "3": 0,
        "4": -1,
        "5 or more": -2,
      },
    },
  },
  "Employment & Income": {
    employment_status: {
      question: "What is your current employment status?",
      options: {
        Unemployed: -2,
        "National service": 0,
        "Informally self-employed": 1,
        "Formally self-employed": 3,
        "Employed part-time": 2,
        "Employed full-time": 4,
        Retired: 1,
      },
    },
    job_duration: {
      question: "How long have you been working in your current job/business?",
      options: {
        "Less than 6 months": -2,
        "6 months – 1 year": -1,
        "1–2 years": 0,
        "2–4 years": 1,
        "4–6 years": 2,
        "6+ years": 3,
      },
    },
    monthly_income: {
      question: "What is your average monthly income?",
      options: {
        "Below GHS 350": -2,
        "GHS 351–700": -1,
        "GHS 701–1000": 0,
        "GHS 1001–1400": 1,
        "GHS 1401–1800": 2,
        "Above GHS 1800": 3,
      },
    },
    side_income: {
      question: "Do you have any side income?",
      options: {
        Yes: 1,
        No: 0,
      },
    },
  },
  "Business Ownership & Stability": {
    own_business: {
      question: "Do you own a business?",
      options: {
        No: 0,
        "Yes, alone": 2,
        "Yes, with partners": 1,
      },
    },
    business_age: {
      question: "How long has the business been running?",
      options: {
        "Less than 6 months": -1,
        "6 months – 1 year": 0,
        "1–2 years": 1,
        "2–4 years": 2,
        "4+ years": 3,
      },
    },
    business_docs: {
      question:
        "Do you have any of the following documents?(Certificate of Registration, Business Operating Permit,District Assembly License,Tax Identification Number (TIN))",
      options: {
        Yes: 1,
        None: -2,
      },
    },
  },
  "Financial Habits & History": {
    momo_user: {
      question: "Do you have a mobile money account?",
      options: {
        "Yes, MTN": 1,
        "Yes, Vodafone": 1,
        "Yes, AirtelTigo": 1,
        No: -1,
      },
    },
    savings_habit: {
      question: "Do you save money regularly?",
      options: {
        "Yes, weekly": 3,
        "Yes, monthly": 2,
        Occasionally: 1,
        No: -1,
      },
    },
    loan_history: {
      question: "Have you taken a loan before?",
      options: {
        "Yes, and I repaid fully on time": 3,
        "Yes, repaid late": 1,
        "Yes, defaulted": -2,
        No: 0,
      },
    },
    outstanding_loans: {
      question: "Do you currently have any outstanding loans?",
      options: {
        Yes: -2,
        No: 1,
      },
    },
    bank_account: {
      question: "Do you have a bank or credit union account?",
      options: {
        Yes: 2,
        No: -1,
      },
    },
  },
  "Psychometric & Behavioral Insights": {
    emergency_spending: {
      question:
        "If you unexpectedly received GHS 1000 today, what would you do?",
      options: {
        "Invest in business": 3,
        "Save it": 2,
        "Pay off debts": 1,
        "Spend on family needs": 0,
        "Buy personal items": -1,
      },
    },
    budgeting_habit: {
      question: "How often do you set a budget and stick to it?",
      options: {
        Always: 3,
        Sometimes: 2,
        Rarely: 1,
        Never: 0,
      },
    },
    backup_income: {
      question: "If your business fails today, do you have a backup income?",
      options: {
        Yes: 2,
        No: -1,
      },
    },
    loan_reapplication_likelihood: {
      question:
        "How likely are you to take another loan if you are refused today?",
      options: {
        "Very likely": 0,
        "Somewhat likely": 1,
        "Not likely": 2,
        "I’ll wait and reapply": 3,
      },
    },
  },
};

const getCreditLabel = (score: number) => {
  if (score >= 40)
    return { label: "Good", color: "#22c55e", icon: "checkmark-circle" };
  if (score >= 20) return { label: "Fair", color: "#facc15", icon: "warning" };
  return { label: "Poor", color: "#ef4444", icon: "close-circle" };
};

export default function QuestionnaireForm() {
  const [responses, setResponses] = useState({});
  const [sectionIndex, setSectionIndex] = useState(0);
  const [finalScore, setFinalScore] = useState(null);
  const sectionNames = Object.keys(questionnaire);

  const currentSection = sectionNames[sectionIndex];
  const currentQuestions = questionnaire[currentSection];

  const handleChange = (question: string, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const calculateScore = () => {
    let total = 0;
    for (const [section, questions] of Object.entries(questionnaire)) {
      for (const [questionKey, questionData] of Object.entries(questions)) {
        const answer = responses[questionKey];
        const options = questionData.options;

        if (answer !== undefined && options && options[answer] !== undefined) {
          total += options[answer];
        }
      }
    }
    return total;
  };

  const nextSection = () => {
    if (sectionIndex < sectionNames.length - 1) {
      setSectionIndex((index) => index + 1);
    } else {
      const score = calculateScore();
      setFinalScore(score);
    }
  };

  const resetForm = () => {
    setResponses({});
    setSectionIndex(0);
    setFinalScore(null);
  };

  if (finalScore !== null) {
    const { label, color, icon } = getCreditLabel(finalScore);
    return (
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.duration(500)}>
          <View style={[styles.resultCard, { borderColor: color }]}>
            <Ionicons
              name={icon}
              size={64}
              color={color}
              style={{ marginBottom: 16 }}
            />
            <Text style={[styles.scoreText, { color }]}>
              {label} Creditworthiness
            </Text>
            <Text style={styles.finalScore}>Score: {finalScore}</Text>
          </View>
          <Pressable style={styles.retakeButton} onPress={resetForm}>
            <Text style={styles.retakeText}>Retake Survey</Text>
          </Pressable>
        </Animated.View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>{currentSection}</Text>
      <Animated.View
        layout={Layout.springify()}
        style={styles.questionsWrapper}
      >
        {Object.entries(currentQuestions).map(
          ([questionKey, { question, options }]) => (
            <Animated.View
              key={questionKey}
              entering={FadeInDown.duration(400)}
              exiting={FadeOutUp.duration(300)}
              style={styles.card}
            >
              <Text style={styles.questionText}>{question}</Text>
              <View style={styles.optionsGrid}>
                {Object.keys(options).map((option) => (
                  <Pressable
                    key={option}
                    style={[
                      styles.optionButton,
                      responses[questionKey] === option &&
                        styles.optionSelected,
                    ]}
                    onPress={() => handleChange(questionKey, option)}
                  >
                    <Text
                      style={
                        responses[questionKey] === option
                          ? styles.optionTextSelected
                          : styles.optionText
                      }
                    >
                      {option}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Animated.View>
          )
        )}
      </Animated.View>
      <View style={styles.footer}>
        <Pressable style={styles.nextButton} onPress={nextSection}>
          <Text style={styles.nextButtonText}>
            {sectionIndex < sectionNames.length - 1 ? "Next" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Quicksand",
  },
  questionsWrapper: {
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    elevation: 2,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Quicksand",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    margin: 4,
  },
  optionSelected: {
    backgroundColor: "#1e88e5",
    borderColor: "#1e88e5",
  },
  optionText: {
    color: "#333",
    fontFamily: "Quicksand",
  },
  optionTextSelected: {
    color: "#fff",
    fontFamily: "Quicksand",
  },
  footer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  nextButton: {
    backgroundColor: "#1e88e5",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  nextButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Quicksand",
  },
  resultCard: {
    alignItems: "center",
    padding: 30,
    marginTop: 50,
    borderWidth: 2,
    borderRadius: 16,
    backgroundColor: "#fff",
  },
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
  finalScore: {
    marginTop: 10,
    fontSize: 18,
    color: "#444",
  },
  retakeButton: {
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retakeText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Quicksand",
  },
});

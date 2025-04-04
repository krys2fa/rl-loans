import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "react-native-paper";

export default function Pay() {
  const [repaymentAmount, setRepaymentAmount] = useState("0");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [repaymentDate, setRepaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const loanOptions = [
    { label: "Personal Loan", value: "Personal Loan" },
    { label: "Business Loan", value: "Business Loan" },
    { label: "Education Loan", value: "Education Loan" },
  ];

  const handleLoanTypeChange = (value: any) => setLoanType(value);

  const handleRepaymentDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || repaymentDate;
    setShowDatePicker(false);
    setRepaymentDate(currentDate);
  };

  const handleRepaymentAmountChange = (amount: any) => {
    // Only allow numeric input (including decimal points)
    if (/^\d*\.?\d*$/.test(amount)) {
      setRepaymentAmount(amount);
    }
  };

  const handleRepaymentSubmit = () => {
    if (agreeToTerms) {
      console.log({ repaymentAmount, loanType, repaymentDate });
      alert("Repaying now...");
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan Repayment</Text>

      <Text style={styles.label}>Loan Type</Text>
      <Picker
        selectedValue={loanType}
        onValueChange={handleLoanTypeChange}
        style={styles.input}
      >
        {loanOptions.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Repayment Amount</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter amount'
        keyboardType='numeric'
        onChangeText={handleRepaymentAmountChange}
        value={repaymentAmount}
      />

      <Text style={styles.label}>Repayment Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={repaymentDate.toDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={repaymentDate}
          mode='date'
          display='default'
          onChange={handleRepaymentDateChange}
        />
      )}

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={agreeToTerms ? "checked" : "unchecked"}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        />

        <Text
          style={styles.label}
          onPress={() => Linking.openURL("https://example.com/terms")}
        >
          I agree to the{" "}
          <Text style={styles.termsLink}>terms and conditions</Text>
        </Text>
      </View>

      <Button
        title='Repay Now'
        onPress={handleRepaymentSubmit}
        color='#1e88e5'
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Quicksand",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Quicksand",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#ffffff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  termsLink: {
    color: "#1e88e5",
    textDecorationLine: "underline",
  },
  button: {
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
  },
});

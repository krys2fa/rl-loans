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
import CheckBox from "@react-native-community/checkbox";

export default function Pay() {
  const [repaymentAmount, setRepaymentAmount] = useState("");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [repaymentDate, setRepaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const loanOptions = [
    { label: "Personal Loan", value: "Personal Loan" },
    { label: "Business Loan", value: "Business Loan" },
    { label: "Education Loan", value: "Education Loan" },
  ];

  const handleLoanTypeChange = (value) => setLoanType(value);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || repaymentDate;
    setShowDatePicker(false);
    setRepaymentDate(currentDate);
  };

  const handleRepayment = () => {
    if (agreeToTerms) {
      console.log({ repaymentAmount, loanType, repaymentDate });
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
        onChangeText={setRepaymentAmount}
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
          onChange={onChangeDate}
        />
      )}

      <View style={styles.checkboxContainer}>
        {/* <CheckBox value={agreeToTerms} onValueChange={setAgreeToTerms} /> */}
        <Text
          style={styles.label}
          onPress={() => Linking.openURL("https://example.com/terms")}
        >
          I agree to the{" "}
          <Text style={{ color: "#1e88e5", textDecorationLine: "underline" }}>
            terms and conditions
          </Text>
        </Text>
      </View>

      <Button
        title='Repay Now'
        onPress={handleRepayment}
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
  button: { borderRadius: 25, padding: 15, marginTop: 10 },
});

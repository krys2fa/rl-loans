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
import { useDispatch, useSelector } from "react-redux";
import { setPaymentDetails, resetPayment } from "../../features/paymentSlice";
import type { RootState } from "../../store";

export default function Pay() {
  const dispatch = useDispatch();
  const payment = useSelector((state: RootState) => state.payment);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const loanOptions = [
    { label: "Personal Loan", value: "Personal Loan" },
    { label: "Business Loan", value: "Business Loan" },
    { label: "Education Loan", value: "Education Loan" },
  ];

  const handleLoanTypeChange = (value: any) => {
    dispatch(setPaymentDetails({ method: value }));
  };

  const handleRepaymentDateChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || new Date(payment.date);
    setShowDatePicker(false);
    dispatch(setPaymentDetails({ date: currentDate.toISOString() }));
  };

  const handleRepaymentAmountChange = (amount: any) => {
    if (/^\d*\.?\d*$/.test(amount)) {
      dispatch(setPaymentDetails({ amount: parseFloat(amount) }));
    }
  };

  const handleRepaymentSubmit = () => {
    if (agreeToTerms) {
      alert("Repaying now...");
      // You can dispatch more actions here, e.g., setPaymentStatus('pending')
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan Repayment</Text>

      <Text style={styles.label}>Loan Type</Text>
      <Picker
        selectedValue={payment.method}
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
        placeholder="Enter amount"
        keyboardType="numeric"
        onChangeText={handleRepaymentAmountChange}
        value={payment.amount ? payment.amount.toString() : ""}
      />

      <Text style={styles.label}>Repayment Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          value={
            payment.date
              ? new Date(payment.date).toDateString()
              : new Date().toDateString()
          }
          editable={false}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={payment.date ? new Date(payment.date) : new Date()}
          mode="date"
          display="default"
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
        title="Repay Now"
        onPress={handleRepaymentSubmit}
        color="#1e88e5"
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

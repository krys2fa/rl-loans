import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Linking,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import CheckBox from "@react-native-community/checkbox";

export default function Apply() {
  const [amount, setAmount] = useState("");
  const [repaymentPeriod, setRepaymentPeriod] = useState("");
  const [loanType, setLoanType] = useState("Personal Loan");
  const [interestRate, setInterestRate] = useState("15%");
  const [repaymentDate, setRepaymentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [installmentAmount, setInstallmentAmount] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const loanOptions = [
    { label: "Personal Loan", value: "Personal Loan", rate: "15%", period: 12 },
    { label: "Business Loan", value: "Business Loan", rate: "20%", period: 24 },
    {
      label: "Education Loan",
      value: "Education Loan",
      rate: "10%",
      period: 36,
    },
  ];

  const handleLoanTypeChange = (value) => {
    setLoanType(value);
    const selectedOption = loanOptions.find((option) => option.value === value);
    if (selectedOption) {
      setInterestRate(selectedOption.rate);
      setRepaymentPeriod(selectedOption.period.toString());
      calculateInstallment(amount, selectedOption.period);
    }
  };

  const calculateInstallment = (amount, period) => {
    if (amount && period) {
      const installment = (parseFloat(amount) / period).toFixed(2);
      setInstallmentAmount(installment);
    }
  };

  const handleAmountChange = (value) => {
    setAmount(value);
    calculateInstallment(value, parseInt(repaymentPeriod));
  };

  const handleApply = () => {
    if (agreeToTerms) {
      console.log({
        amount,
        repaymentPeriod,
        loanType,
        interestRate,
        repaymentDate,
        installmentAmount,
      });
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || repaymentDate;
    setShowDatePicker(Platform.OS === "ios");
    if (currentDate > new Date()) {
      setRepaymentDate(currentDate);
    } else {
      alert("Please select a future date.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Loan Application</Text>
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter loan amount'
        keyboardType='numeric'
        value={amount}
        onChangeText={handleAmountChange}
      />

      <Text style={styles.label}>Repayment Period</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter period (months)'
        keyboardType='numeric'
        value={repaymentPeriod}
        editable={false}
      />

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

      <Text style={styles.label}>Interest Rate</Text>
      <TextInput style={styles.input} value={interestRate} editable={false} />

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
          minimumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Installment Amount</Text>
      <TextInput
        style={styles.input}
        value={installmentAmount}
        editable={false}
      />

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
        title='Apply Now'
        onPress={handleApply}
        color='#1e88e5'
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
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
  button: {
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
  },
});

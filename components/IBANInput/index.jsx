// src/components/IBANInput.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';


const GROUP_SIZE = 4;

export default function IBANInput() {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");


  const validate = (text: string): string => {

    if (!text.startsWith("TR")) {
      return t("iban.error.invalidStart");
    }

    const afterTR = text.slice(2);

    if (/[^0-9 ]/.test(afterTR)) {
      return t("iban.error.invalidChars");
    }

    const parts = text.split(" ");

    for (let i = 0; i < parts.length - 1; i++) {
      if (parts[i].length !== GROUP_SIZE) {
        return t("iban.error.invalidSpacing");
      }
    }
    const last = parts[parts.length - 1];
    if (last.length === 0 || last.length > GROUP_SIZE) {
      return t("iban.error.invalidSpacing");
    }

    return "";
  };

  const onChange = (text: string) => {
    setValue(text);
    setError(validate(text));
  };

  const onValidatePress = () => {
    const err = validate(value);
    if (err === "") {
      Alert.alert(t("iban.alert.valid"));
    } else {
      Alert.alert(t("iban.alert.invalid"));
    }
  };

  return (
    <View style={styles.wrap}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChange}
        placeholder={t("iban.input.placeholder")}
        autoCapitalize="characters"
        keyboardType="default"
        maxLength={32}
      />
      {error.length > 0 && <Text style={styles.error}>{error}</Text>}
      <View style={styles.button}>
        <Button 
          title={t("iban.button.validate")} 
          onPress={onValidatePress} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: "100%",
    marginTop: 16
},
  input: { 
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: "red"
},
  error: {
    marginTop: 8,
    color: "red",
    fontSize: 14,
  },
  button: {
    marginTop: 12,
    width: "50%",
    alignSelf: "center",
  },
});
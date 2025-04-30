import React, { useEffect } from "react";
import { SafeAreaView, Text, Button, StyleSheet, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, TextInput, View, Keyboard, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "./i18n/i18n";
import { useTranslation } from "react-i18next";
import IBANInput from "./components/IBANInput";

const STORAGE_KEY = "user-language";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(lang => {
      if (lang) i18n.changeLanguage(lang);
    });
  }, []);

  const changeLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

          <View style={styles.topContainer}>
            <Text style={styles.title}>{t("home.header.title")}</Text>
            <Text style={styles.section}>{t("iban.header")}</Text>
            <IBANInput />
            <View style={styles.langButtons}>
              <Button title="EN" onPress={() => changeLang("en")} />
              <Button title="TR" onPress={() => changeLang("tr")} />
            </View>
          </View>
          <IBANInput />
          <IBANInput />
          <IBANInput />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 60}
            style={styles.loginContainer}
          >
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <Button title="Login" onPress={() => {}} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  topContainer: {
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
  section: {
    fontSize: 24,
    marginTop: 30,
  },
  langButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 20,
  },
  loginContainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
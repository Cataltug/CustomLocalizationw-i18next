import React, { useEffect } from 'react';
import { SafeAreaView, Text, Button, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './i18n/i18n';
import { useTranslation } from 'react-i18next';
import IBANInput from './components/IBANInput';

const STORAGE_KEY = "user-language";

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(lang => {
      if (lang) {
        i18n.changeLanguage(lang);
      }
    });
  }, []);

  const changeLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t("home.header.title")}</Text>
        <Button title="EN" onPress={() => changeLang("en")} />
        <Button title="TR" onPress={() => changeLang("tr")} />

        <Text style={styles.section}>{t("iban.header")}</Text>
        <IBANInput />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    alignItems: "center",
    padding: 20
  },
  title: {
    fontSize: 32,
    marginBottom: 10
  },
  section: {
    fontSize: 24,
    marginTop: 30
  },
});
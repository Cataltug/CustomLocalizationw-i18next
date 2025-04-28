import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, } from 'react-native';
import "./i18n/i18n";
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = "user-language";


export default function App() {

  const { t, i18n } = useTranslation();


  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(savedLang => {
      if (savedLang) {
        i18n.changeLanguage(savedLang);
      }
    })
  }, [])


  const handleChangeLang = async (lang: string) => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang)
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{t("home.header.title")}</Text>
      <Button title="EN" onPress={() => handleChangeLang("en")} />
      <Button title="TR" onPress={() => handleChangeLang("tr")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:16
  },
  title: {
    fontSize: 32,
    marginBottom: 20
  },
});


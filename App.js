import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Platform, SafeAreaViewComponent} from 'react-native';
import CurrentPrice from "./src/components/CurrentPrice";
import HistoryGraphic from "./src/components/HistoryGraphic";
import QuotationsList from "./src/components/QuotationsList";
import QuotationItem from "./src/components/QuotationsList/QuotationItem";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" backgroundColor="#f50d41" barStyle="dark-content" />
      <CurrentPrice/>
      <HistoryGraphic/>
      <QuotationsList/>
      <QuotationItem/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0
  },
});

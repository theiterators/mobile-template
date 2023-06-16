/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-magic-numbers */
import React from "react"
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar } from "react-native"

export const KeyboardAvoidingContainer = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={10}
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 20,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 50 : 50,
            backgroundColor: "red",
          }}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

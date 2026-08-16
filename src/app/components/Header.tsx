import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.logo}>TopFilms</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 72,
    backgroundColor: '#0b0b0b',
    borderBottomWidth: 1,
    borderBottomColor: '#111',
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: { color: '#e50914', fontWeight: '800', fontSize: 18 },
});

import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {

const [count, setCount] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>
      <Pressable
        style={styles.floatingButton} 
        onPress={() => setCount(count + 1)}
        >
        <Text>Press me</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textHuge: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

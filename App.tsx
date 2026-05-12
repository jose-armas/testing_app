import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function App() {

const [count, setCount] = useState(10);
const [count2, setCount2] = useState(20);

  return (
    <View style={styles.container}>
      <Text style={styles.textHuge}>{count}</Text>
      <Pressable
        testID="pressable1"
        style={styles.floatingButton} 
        onPress={() => setCount(count + 1)}
        >
        <Text>Press me</Text>
      </Pressable>
      <StatusBar style="auto" />
      <Text style={styles.textHuge}>{count2}</Text>
      <Pressable
        testID="pressable2"
        style={styles.floatingButton2} 
        onPress={() => setCount2(count2 + 1)}
        >
        <Text>Press me 2</Text>
      </Pressable>
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
  floatingButton2: {
    backgroundColor: 'rgb(255, 0, 8)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textHuge: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});


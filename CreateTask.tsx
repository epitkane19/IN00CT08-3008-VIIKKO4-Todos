import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  input: string;
  setInput: (text: string) => void;
  addTask: () => void;
}

export default function CreateTask({ input, setInput, addTask }: Props) {
  return (
    <View style={styles.inputRow}> 
        <TextInput 
            style={styles.input} 
            value={input} 
            onChangeText={setInput} 
            placeholder="Add item" 
        /> 
        <Button title="Add" onPress={addTask} /> 
    </View> 
  );
}

const styles = StyleSheet.create({
  inputRow: { 
    flexDirection: 'row', 
    marginBottom: 16, 
  }, 
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
});

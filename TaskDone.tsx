import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Task } from './App';

interface Props {
  task: Task;
  toggleTask: (id: string) => void;
}

export default function TaskDone({ task, toggleTask }: Props) {
  return (
    <Pressable onPress={() => toggleTask(task.id)}>
      <Text style={[styles.taskText, task.done && styles.taskDone]}>
        {task.name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  taskText: { 
    fontSize: 16, 
    paddingVertical: 8, 
  }, 
  taskDone: { 
    textDecorationLine: 'line-through', 
  }, 
});

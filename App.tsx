import React, { useState, useEffect } from 'react'; 
import { StyleSheet, Text, View, TextInput, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskDone from './TaskDone';
 import CreateTask from './CreateTask';

export interface Task { 
  id: string; 
  name: string; 
  done: boolean;
} 

const STORAGE_KEY = 'TODO_LIST_TASKS';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [input, setInput] = useState('');
  
  useEffect(() => { 
    (async () => { 
      try { 
        const json = await AsyncStorage.getItem(STORAGE_KEY); 
        if (json) setTasks(JSON.parse(json)); 
      } catch (e) { 
        console.log('Error loading task:', e);
      } 
    })(); 
  }, []);

  useEffect(() => { 
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); 
  }, [tasks]);

  const addTask = () => { 
    if (input.trim()) { 
      setTasks(prev => [ 
        ...prev, 
        { id: Date.now().toString(), name: input.trim(), done: false }, 
      ]); 
      setInput(''); 
    } 
  }; 

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === id ? { ...t, done: !t.done } : t 
      ) 
    ); 
  };

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Todo List</Text> 
      <CreateTask input={input} setInput={setInput} addTask={addTask} />
      {tasks.map(task => (
        <TaskDone key={task.id} task={task} toggleTask={toggleTask} />
      ))}
    </View> 
  ); 
};

const styles = StyleSheet.create({
   container: { 
    flex: 1, 
    paddingTop: 60, 
    paddingHorizontal: 16, 
    backgroundColor: '#fff', 
  }, 
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center', 
  },
}); 

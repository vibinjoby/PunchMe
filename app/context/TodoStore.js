import React, { useEffect, useState } from "react";
import { AsyncStorage } from "react-native";
import { Context } from "./Context";

export default function TodoStore({ children }) {
  const [todo, setToDo] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const todo = await AsyncStorage.getItem("TODO");
        if (todo !== null) {
          setToDo(JSON.parse(todo));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  deleteSelectedTask = async item => {
    const previousTodo = [...todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.filter(list => {
          if (list.key === item.todo.key) {
            return false;
          }
          return true;
        });

        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    const checkForEmpty = newTodo.filter(data => {
      if (data.todoList.length === 0) {
        return false;
      }
      return true;
    });
    try {
      await AsyncStorage.setItem("TODO", JSON.stringify(checkForEmpty));
      setToDo(checkForEmpty);
    } catch (error) {
      // Error saving data
    }
  };

  updateSelectedTask = async item => {
    const previousTodo = [...todo];
    const newTodo = previousTodo.map(data => {
      if (item.date === data.date) {
        const previousTodoList = [...data.todoList];
        const newTodoList = previousTodoList.map(list => {
          if (list.key === item.todo.key) {
            return item.todo;
          }
          return list;
        });
        data.todoList = newTodoList;
        return data;
      }
      return data;
    });
    try {
      await AsyncStorage.setItem("TODO", JSON.stringify(newTodo));
      setToDo(newTodo);
    } catch (error) {
      // Error saving data
    }
  };

  updateTodo = async item => {
    const datePresent = todo.find(data => {
      if (data.date === item.date) {
        return true;
      }
    });

    if (datePresent) {
      const updatedTodo = todo.map(data => {
        if (datePresent.date === data.date) {
          data.todoList = [...data.todoList, ...item.todoList];
          return data;
        }
        return data;
      });
      try {
        await AsyncStorage.setItem("TODO", JSON.stringify(updatedTodo));
        setToDo(updatedTodo);
      } catch (error) {
        // Error saving data
      }
    } else {
      const newTodo = [...todo, item];

      try {
        await AsyncStorage.setItem("TODO", JSON.stringify(newTodo));
        setToDo(newTodo);
      } catch (error) {
        // Error saving data
      }
    }
  };

  deleteTodo = () => {};

  return (
    <Context.Provider
      value={{
        todo: [],
        updateTodo: item => updateTodo(item),
        deleteTodo: item => deleteTodo(item),
        updateSelectedTask: item => updateSelectedTask(item),
        deleteSelectedTask: item => deleteSelectedTask(item)
      }}
    >
      {children}
    </Context.Provider>
  );
}

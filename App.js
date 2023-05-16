import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [data2, setData2] = useState(null);
  const [error2, setError2] = useState(null);
  const api = '0d3435d470b7ca8074338816578ecb4a';

  useEffect(() => {
    fetchToday();
    fetchForcast();
  }, []);

  const fetchToday = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Lyon&appid=${api}&units=metric&lang=FR`);
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error);
    }
  };

  const fetchForcast = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Lyon&appid=${api}&units=metric&lang=FR`);
      const json = await response.json();
      setData2(json);
    } catch (error2) {
      setError2(error2);
    }
  };

  if (error) {
    return <Text>Une erreur s'est produite: {error.message}</Text>;
  }

  if (!data) {
    return <Text>Chargement en cours...</Text>;
  }
  //console.log(data2.list[0].dt_txt);
  const weatherIcon = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/w/${weatherIcon}.png`;

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.ville}>Vous êtes à {data.name}</Text>
        <Text>Température Actuelle : {data.main.temp} C°</Text>
        <Text>Le temps : {data.weather[0].main}</Text>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
      </View>

      <View style={styles.container}>
        {/* <Text>{data2.list[0].dt_txt}</Text>
        <Text>{data2.list[1].dt_txt}</Text> */}
      </View>
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
  ville: {
    fontWeight: "bold",
    fontSize: 30,
    position: 'relative',
  }, icon: {
    width: 100,
    height: 100,
  },
});

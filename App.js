import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
//import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null); 
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const api = '0d3435d470b7ca8074338816578ecb4a';

  useEffect(() => {
    fetchToday();
    Localisation();
  }, []);

  const fetchToday = async () => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=fr&appid=${api}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.weather && json.main) {
            setData(json);
          }
        });
    } catch (error) {
      setError(error);
    }
  };

  const Localisation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(String(location.coords.latitude));
        setLongitude(String(location.coords.longitude));
      } catch (error) {
        setErrorMsg("Failed to fetch location");
      }
    }

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
        <Text>Le temps : {data.weather[0].description}</Text>
        <Image source={{ uri: iconUrl }} style={styles.icon} />
        {/* <Text>{{longitude}}</Text> */}
      </View>

      <View style={styles.container}>
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

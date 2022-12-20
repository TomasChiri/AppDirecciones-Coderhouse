import React, { useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, {Marker} from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

const initialRegion = {
  latitude: 48.8583486,
  longitude: 2.2244437,
  // latitudeDelta: 0.0922,
  // longitudeDelta: 0.0421,
}

const MapScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState("");


  const handleSelectedLocation = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    })
  }

  const handleSaveLocation = () => {
    if(selectedLocation){
      navigation.navigate("Nuevo", {mapLocation: selectedLocation});
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <Ionicons name="md-save-outline" color="white" size={22}/>
        </TouchableOpacity>
      )
    })
  }, [])

  return (
    <MapView initialRegion={initialRegion} styles={styles.container}  onPress={handleSelectedLocation}>
      {selectedLocation && (
        <Marker title="Ubicacion seleccionada" coordinate={{latitude: selectedLocation.lat, longitude:selectedLocation.lng}} />
      )}

    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;

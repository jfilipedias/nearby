import { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import MapView, { Callout, Marker } from "react-native-maps"
import Location from "expo-location"
import { router } from "expo-router"
import { Categories, CategoriesProps } from "@/components/categories"
import type { PlaceProps } from "@/components/place"
import { Places } from "@/components/places"
import { api } from "@/services/api"
import { colors, fontFamily } from "@/styles/theme"

type MarketsProps = PlaceProps & {
  latitude: number;
  longitude: number;
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656441388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])
  const [category, setCategory] = useState("")

  const [markets, setMarkets] = useState<MarketsProps[]>([])

  async function fetchCatedories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategory(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) return
      const { data } = await api.get(`/markets/category/${category}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync()

      if (granted) {
        const location = await Location.getCurrentPositionAsync()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCatedories()
  }, [])

  useEffect(() => {
    fetchMarkets()
    getCurrentLocation()
  }, [category])
  
  return (
    <View style={{ flex: 1}}>
      <Categories data={categories} selected={category} onSelect={setCategory} />
      <MapView 
        style={{ flex: 1 }} 
        initialRegion={{ 
          latitude: currentLocation.latitude, 
          longitude: currentLocation.longitude, 
          latitudeDelta: 0.01, 
          longitudeDelta: 0.01,
        }} 
      >
          <Marker 
            identifier="current" 
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude
            }}
            image={require("@/assets/location.png")}
          />
          {markets.map((item) => (
            <Marker
              key={item.id}
              identifier={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
              image={require("@/assets/pin.png")}
            >
              <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                <View>
                  <Text 
                    style={{ 
                      fontSize: 14, 
                      fontFamily:fontFamily.medium,
                      color: colors.gray[600],
                    }}
                  >
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: fontFamily.regular,
                      color: colors.gray[600],
                    }}
                  >
                    {item.address}
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>
      <Places data={markets} />
    </View>
  )
}
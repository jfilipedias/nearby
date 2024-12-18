import { useEffect, useState } from "react"
import { Alert, View } from "react-native"
import { api } from "@/services/api";
import { Categories, CategoriesProps } from "@/components/categories";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([])

  async function fetchCatedories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  useEffect(() => {
    fetchCatedories()
  }, [])
  
  return (
    <View style={{ 
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
    <Categories data={categories} />
    </View>
  )
}
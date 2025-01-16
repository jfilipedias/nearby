import { useEffect, useRef, useState } from "react"
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native"
import { useCameraPermissions, CameraView } from "expo-camera"
import { Redirect, router, useLocalSearchParams } from "expo-router"
import { Button } from "@/components/button"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { api } from "@/services/api"
import { Details, type DetailsProps } from "@/components/market/details"

type DataProps = DetailsProps & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false)
  const [isGettingCoupon, setIsGettingCoupon] = useState(false)

  const [_, requestPermission] = useCameraPermissions()

  const params = useLocalSearchParams<{ id: string }>()

  const qrLock = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro", 
        "Não foi possível carregar os dados", 
        [{ text: "OK", onPress: () => router.back() }]
      )
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsGettingCoupon(true)
      
      const { data } = await api.get(`/coupons/${id}`)

      Alert.alert("Cupom", data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      Alert.alert("error", "Não foi possível utilizar o coupon")
    } finally {
      setIsGettingCoupon(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false)
    qrLock.current = false
    Alert.alert(
      "Cupom", 
      "Não é possível reutilizar um cupom resgatado. Deseja real",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) }
      ]
    )
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission()
      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera")
      }

      setIsVisibleCameraModal(true)
    } catch (error) {
      console.log(error)
      Alert.alert("Câmera", "Não foi possível utilizar a câmera")
    }
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/" />
  }

  return (
    <View style={{ flex:1 }}>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} coupon={coupon} />
      </ScrollView>
      <View style={{ padding: 32 }}>
        <Button onPress={() => handleOpenCamera()}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>
      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView style={{ flex: 1 }} facing="back" onBarcodeScanned={({ data }) => handleUseCoupon(params.id)} />
        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)} isLoading={isGettingCoupon}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
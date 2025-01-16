import { Text, View } from "react-native"
import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native"
import { s } from "./styles"
import { Coupon } from "../coupon"
import { Info } from "../info"

export type DetailsProps = {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: {
    id: string
    description: string
  }[]
}

type Props = {
  data: DetailsProps
  coupon: string | null
}

export function Details({ data, coupon }: Props) {

  return (
    <View style={s.container}>
      <Text style={s.name}>{data.name}</Text>
      <Text style={s.description}>{data.description}</Text>
      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info icon={IconTicket} description={`${data.coupons} cupons disponíveis`}/>
        <Info icon={IconMapPin} description={data.address}/>
        <Info icon={IconPhone} description={data.phone}/>
      </View>
      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {data.rules.map((item) => (
          <Text key={item.id} style={s.rule}>
            {`\u2022 ${item.description}`}
          </Text>
        ))}
      </View>
      {coupon && (
        <View style={s.group}>
          <Text style={s.title}>Utilize esse cupom</Text>
          <Coupon code={coupon}/>
        </View>
      )}
    </View>
  )
}

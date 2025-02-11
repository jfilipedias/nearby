import { Text, View } from "react-native"
import { IconTicket } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { s } from "./styles"

type Props = {
  code: string
}

export function Coupon({ code }: Props) {
  return (
    <View style={s.container}>
      <IconTicket size={24} color={colors.green.light} />
      <Text style={s.code}>{code}</Text>
    </View>
  )
}
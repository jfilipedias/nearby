import type { ComponentType } from "react"
import { Text, View } from "react-native"
import { IconProps } from "@tabler/icons-react-native"
import { colors } from "@/styles/colors"
import { s } from "./styles"

type Props = {
  description: string
  icon: ComponentType<IconProps>
}

export function Info({ icon: Icon, description }: Props) {
  return (
    <View style={s.container}>
      <Icon size={16} color={colors.gray[400]} />
      <Text style={s.text}>{description}</Text>
    </View>
  )
}
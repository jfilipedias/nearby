import type { ComponentType } from "react"
import { 
  ActivityIndicator,
  Text, 
  TextProps, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from "react-native"
import { IconProps as TablerIconProps } from "@tabler/icons-react-native"
import { colors } from "@/styles/theme"
import { s } from "./styles"

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...props }: ButtonProps) {
  return (
    <TouchableOpacity 
      style={[s.container, style]} 
      activeOpacity={0.8} 
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} /> 
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>
}

Button.Title = Title

type IconProps = {
  icon: ComponentType<TablerIconProps>
}

function Icon({icon: Icon}: IconProps) {
  return <Icon size={24} color={colors.gray[100]} />
}

Button.Icon = Icon

export { Button }

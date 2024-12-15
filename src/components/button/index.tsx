import { 
  Text, 
  TextProps, 
  TouchableOpacity, 
  TouchableOpacityProps 
} from "react-native"
import { colors } from "@/styles/theme"
import { s } from "./styles"

function Button({ children, style }: TouchableOpacityProps) {
  return (
    <TouchableOpacity style={[s.container, style]}>
      {children}
    </TouchableOpacity>
  )
}

function Title({ children }: TextProps) {
  return <Text style={s.title}>{children}</Text>
}

Button.Title = Title

export { Button }

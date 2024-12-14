import { StyleSheet } from "react-native"
import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"

export const s = StyleSheet.create({
  container: {
    flex: 1,
    gap: 14,
  },
  title: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  },
})

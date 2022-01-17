import * as React from "react";
import { Text } from "react-native";

export const T = ({ description, color, size, weight, textAlign, paddingStart }) => (
    <Text style={{
        fontSize: size,
        fontFamily: weight ? "URWGeometric-SemiBold" : "URWGeometric-Regular",
        color: color,
        textAlign: textAlign,
        paddingStart: paddingStart && paddingStart,
    }}>
        {description}
    </Text>
)
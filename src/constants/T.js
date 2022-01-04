import * as React from "react";
import { Text } from "react-native";

export const T = ({ description, color, size, weight, textAlign }) => (
    <Text style={{
        fontSize: size,
        fontFamily: weight ? "URWGeometric-SemiBold" : "URWGeometric-Regular",
        color: color,
        textAlign: textAlign
    }}>
        {description}
    </Text>
)
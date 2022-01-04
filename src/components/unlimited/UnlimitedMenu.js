import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Unlimited } from "./Unlimited";
import { UnlimitedOrder } from "./UnlimitedOrder";
import { UnlimitedBooking } from "./UnlimitedBooking";


const UnlimitedStack = createNativeStackNavigator();

export const UnlimitedMenu = ({ navigation, route }) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <UnlimitedStack.Navigator>
            <UnlimitedStack.Screen name="Unlimited" component={Unlimited} />
            <UnlimitedStack.Screen name="UnlimitedOrder" component={UnlimitedOrder} />
            <UnlimitedStack.Screen name="UnlimitedBooking" component={UnlimitedBooking} />
        </UnlimitedStack.Navigator>
    )
}
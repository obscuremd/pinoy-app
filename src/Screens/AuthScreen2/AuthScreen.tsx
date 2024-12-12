import { Button, Input, Text } from "@/src/Exports/Exports";
import { useAuth } from "@/src/Providers/AuthProvider";
import { User } from "iconoir-react-native";
import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {

    const { Create } = useAuth()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone_number: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <SafeAreaView style={{ flex: 1 }} className="relative bg-background-500 items-center pt-5 text-grayscale-500 gap-5">
            <Text text="Please Complete this Form" />
            
            {/* Username Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Username"
                inside_icon={<User />}
                InputFunction={(value) => handleInputChange("username", value)}
            />

            {/* Email Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Email"
                inside_icon={<User />}
                InputFunction={(value) => handleInputChange("email", value)}
            />

            {/* Phone Number Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Phone Number"
                inside_icon={<User />} 
                InputFunction={(value) => handleInputChange("phone_number", value)}
            />

            <Button color="primary" size="lg" text="Submit" onclick={()=>Create({formData})}/>
        </SafeAreaView>
    );
}

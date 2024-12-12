import { Button, Input, Text } from "@/src/Exports/Exports";
import { useAuth } from "@/src/Providers/AuthProvider";
import { useClerk } from "@clerk/clerk-expo";
import { User } from "iconoir-react-native";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthScreen() {

    const { Create, loading } = useAuth()
    const { user } = useClerk()

    const [formData, setFormData] = useState({
        username: "",
        full_name: "",
        email: user?.emailAddresses[0].emailAddress,
        phone_number: "",
        residential_address: "",
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
            
            {/* Full_name Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Full name"
                inside_icon={<User />}
                InputFunction={(value) => handleInputChange("full_name", value)}
            />

            {/* Phone Number Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Phone Number"
                inside_icon={<User />} 
                InputFunction={(value) => handleInputChange("phone_number", value)}
            />
            
            {/* Phone Number Input */}
            <Input
                stretch
                outside_icon={false}
                placeholder="Residential Address"
                inside_icon={<User />} 
                InputFunction={(value) => handleInputChange("residential_address", value)}
            />

            <Button color="primary" size="lg" text="Submit" onclick={()=>Create({formData})}/>
        </SafeAreaView>
    );
}

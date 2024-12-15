import { Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import GeneralProvider from "@/src/Providers/GeneralProvider";
import AuthProvider from "@/src/Providers/AuthProvider";
import { tokenCache } from '@/cache'
import RideProvider from "@/src/Providers/RideProvider";
import DriverProvider from "@/src/Providers/DriverProvider";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
}

export default function RootLayout(){
    return(
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
          <ClerkLoaded>
            <GeneralProvider>
                <AuthProvider>
                  <RideProvider>
                    <DriverProvider>
                      <Slot/>
                    </DriverProvider>
                  </RideProvider>
                </AuthProvider>
            </GeneralProvider>
          </ClerkLoaded>
      </ClerkProvider>
        )
}
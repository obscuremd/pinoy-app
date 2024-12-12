import { Slot, Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import GeneralProvider from "@/src/Providers/GeneralProvider";
import AuthProvider from "@/src/Providers/AuthProvider";
import { tokenCache } from '@/cache'

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
                <Slot/>
              </AuthProvider>
            </GeneralProvider>
          </ClerkLoaded>
      </ClerkProvider>
        )
}
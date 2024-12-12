
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { characters } from "../Exports/Constants";
import { useClerk, useSignIn, useSignUp } from '@clerk/clerk-expo'
import axios from 'axios';
import { useRouter } from "expo-router";


  interface LoginProps {
    email: string;
    password: string;
    setVerification:(verification: boolean) => void
    setVerificationButton:(verification: number) => void
  }

  interface VerificationProps {
    code:string
  }

  interface CreateProps {
    formData:{
        username: string,
        full_name: string,
        email: string,
        phone_number: string,
        residential_address: string,
    }
  }

  interface AuthContextType {
    Login: (props: LoginProps) => Promise<void>;
    Register: (props: LoginProps) => Promise<void>;
    RegisterVerification: (props: VerificationProps) => Promise<void>;
    LoginVerification: (props: VerificationProps) => Promise<void>;
    url:string;
    userData: User | null
    loading: boolean
    Create: (props: CreateProps)=> Promise<void>
  }

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider ({children}:PropsWithChildren){

        const {isLoaded:signInLoaded, signIn, setActive:signInActive} = useSignIn()
        const {isLoaded:signUpLoaded, signUp, setActive:signUpActive} = useSignUp()

        const url = 'https://pinoy-sever.vercel.app'
        const {user} = useClerk()
        const route = useRouter()

        const [userData,setUserData] = useState<User | null>(null)
        const [loading, setLoading] = useState(false)

        useEffect(()=>{
            fetchUsers()
        },[])

        const fetchUsers=async()=>{
          setLoading(true)
            try {
              const res = await axios.get(`${url}/user/email/${user?.emailAddresses[0].emailAddress}`)
              setUserData(res.data)
              setLoading(false)
            } catch (error) {
              console.log(error)
              setLoading(false)
            }
        }

        const Create =async({formData}:CreateProps)=>{
          setLoading(true)
          try {
            const res = await axios.post(`${url}/user/register`,formData)
            console.log(res.data  )
            setLoading(false)
            route.replace('/')
            fetchUsers()
          } catch (error) {
            console.log(error)
            setLoading(false)
          }
        }

        const Login = async ({ email, password,  setVerification, setVerificationButton }: LoginProps): Promise<void> => {
            if (!signInLoaded) {
            return;
            }
        
            // Validate email and password
            if (email === '' || password === '') {
            alert('Email and Password cannot be empty');
            return;
            }
        
            setLoading(true);
        
            try {
                // Attempt to sign in
                await signIn.create({
                    strategy: 'email_code',
                    identifier: email,
                    // password: password // Uncomment if needed
                });
            
                alert('Verification code delivered');
                setVerificationButton(1)
                setTimeout(() => { setVerification(true) }, 2000);
            } catch (err: unknown) {
            const error = err as { errors?: { code: string }[] };
        
            if (error.errors && error.errors[0]?.code === 'form_param_format_invalid') {
                alert('Email or Password is invalid');
            } else {
                alert(`Error: ${error.errors?.[0]?.code || 'Unknown error'}`);
                console.error('Error:', error);
            }
            } finally {
            setLoading(false);
            }
        };
    
        const Register =async({ email, password,  setVerification, setVerificationButton }: LoginProps)=>{

            if(!signUpLoaded){
              return
            }
        
            if( email === '' && password === ''){
              setTimeout(()=>{
                alert('fields must not be empty')
                setLoading(false)
              },2000)
            }
        
            else if(password.length < 8){
              setTimeout(()=>{
                alert('password must be at least 8 characters long')
                setLoading(false)
              },2000)
            }
        
            else if (!characters.test(password)){
              setTimeout(()=>{
                alert('password must include at least one special character')
                setLoading(false)
              }, 2000)
            }
        
        
            else {
              try {
                await signUp.create({
                  emailAddress: email,
                  password:password
                })
        
                await signUp.prepareEmailAddressVerification({ strategy:'email_code'})
                alert('user created successfully');
                setVerificationButton(0)
                setTimeout(() => { setVerification(true) }, 2000);
              } catch (err:unknown) {
        
                const error = err as { errors?: { code: string }[] };
        
                if( error?.errors && error?.errors[0]?.code === 'form_identifier_exists'){
                  setTimeout(()=>{
                    alert('That email address is taken. Please try another.')
                    setLoading(false)
                  },2000)
                }
                else if(error?.errors && error?.errors[0]?.code === 'form_param_format_invalid'){
                  setTimeout(()=>{
                    alert('invalid email format')
                    setLoading(false)
                  },2000)
                }
                else{
                  alert(JSON.stringify(error?.errors && error?.errors[0]?.code))
                  setLoading(false)
                  console.log(JSON.stringify(error))
                  console.log(error);
                }
              }
            }
          } 

        const RegisterVerification =async({ code, }: VerificationProps) => {

            setLoading(true)
            
            if(!signUpLoaded){return}
            
            try {
                
                const completeSignUp = await signUp.attemptEmailAddressVerification({code})
                
                if (completeSignUp.status === 'complete') {
                    if (signUpActive) {
                        await signUpActive({ session: completeSignUp.createdSessionId });
                        // console.log(completeSignUp.createdSessionId);
                        setTimeout(() => {
                            setLoading(false);
                            alert('Logged in successfully');
                            // window.location.reload(); // Optional, depending on your app flow
                        }, 2000);
                    } else {
                        console.error('setActive is undefined. Cannot set the session.');
                        setLoading(false);
                        alert('Authentication session could not be set. Please try again.');
                    }
                }
                else{
                setLoading(false)
                console.log(completeSignUp)
                }
                
                
            } catch (err: unknown) {
                const error = err as { errors?: { code: string }[] };
            
                if (error.errors && error.errors[0]?.code === 'form_code_incorrect') {
                setTimeout(() => {
                    setLoading(false);
                    alert('Wrong code');
                }, 2000);
                } else if (error.errors && error.errors[0]?.code === 'verification_failed') {
                setTimeout(() => {
                    setLoading(false);
                    alert('Too many failed attempts, please go back');
                }, 2000);
                } else {
                console.log(JSON.stringify(error));
                console.log(error);
                setTimeout(() => {
                    setLoading(false);
                    alert(error.errors?.[0]?.code ?? 'Unknown error occurred');
                }, 2000);
                }
            }
            }

        const LoginVerification =async({ code, }: VerificationProps)=>{
              
              setLoading(true)
              
              if(!signInLoaded){return}
              
              try {
                
                const completeSignIn = await signIn.attemptFirstFactor({ strategy:'email_code', code})

                if (completeSignIn.status === 'complete') {
                    if (signInActive) {
                        await signInActive({session: completeSignIn.createdSessionId})
                        setTimeout(()=>{
                            setLoading(false)
                            alert('logged in successfully')
                            // window.location.reload()
                        },2000)
                    } else {
                        console.error('setActive is undefined. Cannot set the session.');
                        setLoading(false);
                        alert('Authentication session could not be set. Please try again.');
                    }
                  }
                  else{
                    setLoading(false)
                    console.log(completeSignIn)
                  }
                
                
              } catch (err: unknown) {
                const error = err as { errors?: { code: string }[] };
              
                if (error.errors && error.errors[0]?.code === 'form_code_incorrect') {
                  setTimeout(() => {
                    setLoading(false);
                    alert('Wrong code');
                  }, 2000);
                } else if (error.errors && error.errors[0]?.code === 'verification_failed') {
                  setTimeout(() => {
                    setLoading(false);
                    alert('Too many failed attempts, please go back');
                  }, 2000);
                } else {
                  console.log(JSON.stringify(error));
                  console.log(error);
                  setTimeout(() => {
                    setLoading(false);
                    alert(error.errors?.[0]?.code ?? 'Unknown error occurred');
                  }, 2000);
                }
              }
            }

    return(
        <AuthContext.Provider value={{Login,Register,RegisterVerification, LoginVerification, url, userData, loading, Create}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth =(): AuthContextType =>{
    const context = useContext(AuthContext)
    
    if(!context){
        throw new Error('must be within the AuthContext')
        
    }
    
    return context
}
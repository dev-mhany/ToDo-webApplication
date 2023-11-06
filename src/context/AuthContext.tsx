/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
import { Auth, getAuth, onAuthStateChanged, sendEmailVerification, User } from 'firebase/auth'
import {
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  query,
  collection,
  orderBy,
  limit,
  addDoc
} from 'firebase/firestore'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import trackException from '../utils/track-exception.ts'
import Context from "../Context.js";

type UserNotification = {
  id: string
  data: {
    title: string
    body: string
    link: string
    type: 'markAsDone'
    timestamp: Date
  }
  readTimestamp: Date
}



type authContextType = {
  auth: Auth | undefined
  user: User | null | undefined
  setUser: Dispatch<SetStateAction<User | null | undefined>>
  authLoading: boolean
  userData: UserData
  notifications: UserNotification[]
  setNotifications: Dispatch<SetStateAction<UserNotification[]>>
}

const authContextDefaultValues: authContextType = {
  auth: undefined,
  user: null,
  setUser: () => {},
  authLoading: true,
  userData: {},
  notifications: [],
  setNotifications: () => {},
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
  return useContext(AuthContext)
}

type Props = {
  children: ReactNode
}

type UserData = {
  enName?: string | null
  arName?: string | null
  email?: string | null
  photoURL?: string | null
  language?: string | null
  gender?: 'male' | 'female' | 'prefer not to say'
  type?: 'teacher' | 'parent' | 'student'
  date?: Date | null
  lastUpdate?: Date | null
  fcmTokens?: string[]
  governorate?: string | null
  city?: string | null
  phoneViews?: string[]
  teachingLink?: string
}

const originalData =
[{
  title: "Go to gym",
  completed: true,
},
{
  title: "Do your workout",
  completed: true,
},
{
  title: "Hangout with friends",
  completed: false,
}]

export function AuthProvider({ children }: Props) {
  const [auth] = useState(getAuth())
  const [authLoading, setAuthLoading] = useState(true)
  const [user, setUser] = useState<User | null | undefined>(undefined)
  const [userData, setUserData] = useState<UserData>({})
  const [notifications, setNotifications] = useState<UserNotification[]>([])

  const { setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(authLoading);
  }, [setIsLoading,authLoading]);

  useEffect(() => {
    let unSub = () => {}
    const unsubscribe = onAuthStateChanged(auth, async user => {
      setAuthLoading(true)

      try {
        setUser(user)

        if (user !== null) {
          const db = getFirestore()
          const userRef = doc(db, 'users', user.uid)
          const userData = await getDoc(userRef)
          if (!userData.exists()) {
            await setDoc(
              userRef,
              {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastUpdate: serverTimestamp(),
                createdAt: serverTimestamp()
              },
              { merge: true }
            )

            originalData.forEach(async (task) => {
              await addDoc(
                collection(db, 'users', user.uid, 'tasks'),
                {
                  title: task.title,
                  completed: task.completed,
                  lastUpdate: serverTimestamp(),
                  createdAt: serverTimestamp()
                }
              )
            })
          }

          if (!user.emailVerified) {
            if (!userData.data()?.emailVerificationSent) {
              await sendEmailVerification(user)
              await updateDoc(userRef, { emailVerificationSent: true, lastUpdate: serverTimestamp() })
            }
          } else {
            if (!userData.data()?.emailVerified) {
              await updateDoc(userRef, {
                emailVerified: true,
                lastUpdate: serverTimestamp()
              })
            }
          }

          unSub = onSnapshot(userRef, doc => {
            //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
            const data = doc.data()
            setUserData({
              ...data,
              date: data?.date?.toDate(),
              lastUpdate: data?.lastUpdate?.toDate()
            } as UserData)
          })
        }
      } catch (error) {
        trackException('unsubscribe', error as Error, JSON.stringify({ user }))
      } finally {
        setAuthLoading(false)
      }
    })

    return () => {
      unsubscribe()
      unSub()
    }
  }, [auth])
  useEffect(() => {
    if (!user) {
      setNotifications([])

      return
    }
    const db = getFirestore()
    const q = query(collection(db, 'users', user.uid, 'notifications'), orderBy('data.timestamp', 'desc'), limit(10))
    const unsubscribe = onSnapshot(q, querySnapshot => {
      const notifications: Array<UserNotification> = []
      querySnapshot.forEach(doc => {
        const n = { ...(doc.data() as UserNotification), id: doc.id }
        n.data.timestamp = doc.data().data.timestamp.toDate()
        notifications.push(n)
      })
      setNotifications(notifications)
    })

    return () => {
      unsubscribe()
    }
  }, [user])
  useEffect(() => {
    if (user === undefined) {
      setUser(auth.currentUser)
    }
  }, [user, auth.currentUser])

  const value = {
    auth,
    user,
    setUser,
    authLoading,
    userData,
    notifications,
    setNotifications,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  Check, 
  Mail, 
  Lock, 
  UserPlus, 
  LogIn, 
  LogOut, 
  Award,
  Clock
} from 'lucide-react';
import { Product } from '../types';
import { products } from '../data';
import { locales } from '../locales';
import { formatPrice } from '../utils/price';
import { auth, db } from '../lib/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';

interface AccountViewProps {
  favorites?: string[];
  onToggleFavorite?: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
  showToast?: (message: string, type: 'success' | 'favorite' | 'info') => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  language: 'en' | 'fr';
  currency?: 'MAD' | 'EUR';
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  skinType: string;
  address: string;
  tier: string;
  memberSince: string;
}

const DEFAULT_USERS: UserProfile[] = [
  {
    firstName: "El Mehdi",
    lastName: "Aglif",
    email: "elmehdi@botanique.com",
    password: "admin",
    skinType: "Balanced",
    address: "Founder's Atelier, Kelaat M'gouna, High Atlas, Morocco",
    tier: "Grand Curator & Founder",
    memberSince: "Inception"
  }
];

export default function AccountView({
  favorites = [],
  onToggleFavorite,
  onAddToCart,
  onSelectProduct,
  setCurrentView,
  showToast,
  currentUser,
  setCurrentUser,
  language,
  currency = 'MAD',
}: AccountViewProps) {
  const t = locales[language].account;
  // Initialize registered users in localStorage if empty
  React.useEffect(() => {
    if (!localStorage.getItem('botanical_guild_users')) {
      localStorage.setItem('botanical_guild_users', JSON.stringify(DEFAULT_USERS));
    }
  }, []);

  // Auth screen states
  const [authTab, setAuthTab] = React.useState<'signin' | 'signup'>('signin');
  const [activeProfileTab, setActiveProfileTab] = React.useState<'history' | 'profile'>('history');
  const [dbOrders, setDbOrders] = React.useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchOrders() {
      if (!currentUser) {
        setDbOrders([]);
        return;
      }
      setIsLoadingOrders(true);
      try {
        const q = query(
          collection(db, 'orders'),
          where('userId', 'in', [
            auth.currentUser?.uid || '',
            currentUser.email || '',
          ].filter(Boolean)),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const fetched: any[] = [];
        querySnapshot.forEach((docSnap) => {
          fetched.push({
            id: docSnap.id,
            ...docSnap.data(),
          });
        });
        setDbOrders(fetched);
      } catch (err) {
        console.error('Error fetching orders from Firestore:', err);
        // Fallback: If we don't have a composite index or if orderBy fails, we query without orderBy and sort client-side
        try {
          const q = query(
            collection(db, 'orders'),
            where('userId', 'in', [
              auth.currentUser?.uid || '',
              currentUser.email || '',
            ].filter(Boolean))
          );
          const querySnapshot = await getDocs(q);
          const fetched: any[] = [];
          querySnapshot.forEach((docSnap) => {
            fetched.push({
              id: docSnap.id,
              ...docSnap.data(),
            });
          });
          fetched.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
          });
          setDbOrders(fetched);
        } catch (fallbackErr) {
          console.error('Fallback fetching orders failed:', fallbackErr);
        }
      } finally {
        setIsLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [currentUser]);

  // Tracking Form States
  const [trackingOrderId, setTrackingOrderId] = React.useState('');
  const [trackingResult, setTrackingResult] = React.useState<any>(null);
  const [isTracking, setIsTracking] = React.useState(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');

  // Forgot Password States
  const [isForgotMode, setIsForgotMode] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState('');
  const [resetSuccess, setResetSuccess] = React.useState('');
  const [resetError, setResetError] = React.useState('');
  const [isSendingReset, setIsSendingReset] = React.useState(false);

  // Signup Form States
  const [regFirstName, setRegFirstName] = React.useState('');
  const [regLastName, setRegLastName] = React.useState('');
  const [regEmail, setRegEmail] = React.useState('');
  const [regPassword, setRegPassword] = React.useState('');
  const [regSkinType, setRegSkinType] = React.useState('Dry / Sensitive');
  const [regAddress, setRegAddress] = React.useState('');
  const [regError, setRegError] = React.useState('');

  // Sourcing orders mockup (specifically tailored or dynamic)
  const pastOrders = [
    {
      id: 'L-1042',
      date: 'June 12, 2026',
      total: 168.0,
      status: 'Delivered',
      statusColor: 'bg-sage-100 text-sage-800',
      items: [
        { name: "L'Or du Maroc Elixir", qty: 1, price: 120.0, image: products[0].image },
        { name: '100% Pure Argan Oil', qty: 1, price: 48.0, image: products[1].image },
      ],
      shippingTimeline: [
        { label: 'Sourced in Atlas Coops', date: 'June 12', completed: true },
        { label: 'Quality Tested & Milled', date: 'June 13', completed: true },
        { label: 'Packed & Dispatched', date: 'June 14', completed: true },
        { label: 'Hand Delivered in Linen', date: 'June 16', completed: true },
      ],
    },
    {
      id: 'L-1025',
      date: 'May 04, 2026',
      total: 32.0,
      status: 'Archived',
      statusColor: 'bg-cream-300 text-charcoal',
      items: [
        { name: 'Rhassoul Clay Mask', qty: 1, price: 32.0, image: products[3].image },
      ],
      shippingTimeline: [
        { label: 'Sourced in Atlas Coops', date: 'May 04', completed: true },
        { label: 'Quality Tested & Milled', date: 'May 05', completed: true },
        { label: 'Hand Delivered', date: 'May 08', completed: true },
      ],
    },
  ];

  // Favorite products list
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  const handleProductClick = (p: Product) => {
    onSelectProduct(p);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Auth Operations
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');

    if (!resetEmail) {
      setResetError(language === 'en' ? 'Please enter your email address.' : 'Veuillez saisir votre adresse e-mail.');
      return;
    }

    setIsSendingReset(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSuccess(
        language === 'en' 
          ? 'Password reset link sent to your email. Please check your inbox.' 
          : 'Le lien de réinitialisation de mot de passe a été envoyé. Veuillez vérifier votre boîte de réception.'
      );
      if (showToast) {
        showToast(
          language === 'en' ? 'Password reset email sent!' : 'E-mail de réinitialisation envoyé !', 
          'success'
        );
      }
      setResetEmail('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setResetError(
          language === 'en'
            ? "Email/Password sign-in method is disabled. Please enable it in Firebase Console -> Authentication -> Sign-in method."
            : "La méthode d'authentification par e-mail/mot de passe est désactivée. Veuillez l'activer dans la console Firebase -> Authentication -> Sign-in method."
        );
      } else if (err.code === 'auth/user-not-found') {
        setResetError(
          language === 'en'
            ? 'This email address is not registered in our database.'
            : 'Cette adresse e-mail n\'est pas enregistrée dans notre base de données.'
        );
      } else {
        setResetError(
          err.message || (language === 'en' ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.')
        );
      }
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail || !loginPassword) {
      setLoginError(language === 'en' ? 'Please enter both email and password.' : 'Veuillez saisir votre e-mail et votre mot de passe.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      
      // Fetch user profile from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      
      if (userDocSnap.exists()) {
        const profileData = userDocSnap.data() as UserProfile;
        setCurrentUser(profileData);
        localStorage.setItem('current_botanical_user', JSON.stringify(profileData));
        if (showToast) {
          showToast(language === 'en' ? `Welcome back to your oasis, ${profileData.firstName}!` : `Bienvenue de retour dans votre oasis, ${profileData.firstName}!`, 'success');
        }
      } else {
        // Fallback or create default profile if not present
        const defaultProfile: UserProfile = {
          firstName: user.displayName?.split(' ')[0] || 'Member',
          lastName: user.displayName?.split(' ')[1] || 'Guild',
          email: user.email || loginEmail,
          skinType: 'Dry / Sensitive',
          address: 'Marrakech, Morocco',
          tier: 'Atlas Argan Guild',
          memberSince: new Date().toLocaleString(language, { month: 'long', year: 'numeric' }),
        };
        await setDoc(userDocRef, defaultProfile);
        setCurrentUser(defaultProfile);
        localStorage.setItem('current_botanical_user', JSON.stringify(defaultProfile));
        if (showToast) {
          showToast(language === 'en' ? `Welcome to L'Essence Botanique, ${defaultProfile.firstName}!` : `Bienvenue chez L'Essence Botanique, ${defaultProfile.firstName}!`, 'success');
        }
      }
      
      setLoginEmail('');
      setLoginPassword('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setLoginError(
          language === 'en'
            ? "Email and Password authentication is not enabled in your Firebase Console. Please go to Authentication -> Sign-in method, and enable 'Email/Password' to proceed."
            : "L'authentification par e-mail et mot de passe n'est pas activée dans votre console Firebase. Veuillez vous rendre sur Authentication -> Sign-in method, et activer 'Email/Password' pour continuer."
        );
      } else {
        setLoginError(
          language === 'en' 
            ? 'Invalid email credentials or password. Please try again.' 
            : 'Identifiants ou mot de passe invalides. Veuillez réessayer.'
        );
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regFirstName || !regLastName || !regEmail || !regPassword || !regAddress) {
      setRegError(language === 'en' ? 'Please fill in all requested fields to create your skin profile.' : 'Veuillez remplir tous les champs requis pour créer votre profil.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError(
        language === 'en'
          ? 'Password should be at least 6 characters.'
          : 'Le mot de passe doit contenir au moins 6 caractères.'
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;

      const isOwner = regFirstName.toLowerCase() === 'el mehdi' && regLastName.toLowerCase() === 'aglif';
      const tier = isOwner ? 'Grand Curator & Founder' : 'Atlas Argan Guild';
      const memberSince = isOwner ? 'Inception' : new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

      const newProfile: UserProfile = {
        firstName: regFirstName,
        lastName: regLastName,
        email: regEmail,
        skinType: regSkinType,
        address: regAddress,
        tier,
        memberSince,
      };

      // Store in Firestore
      await setDoc(doc(db, 'users', user.uid), newProfile);

      setCurrentUser(newProfile);
      localStorage.setItem('current_botanical_user', JSON.stringify(newProfile));

      if (showToast) {
        showToast(language === 'en' ? `Skin profile created. Welcome, ${regFirstName}!` : `Profil de peau créé. Bienvenue, ${regFirstName}!`, 'success');
      }

      setRegFirstName('');
      setRegLastName('');
      setRegEmail('');
      setRegPassword('');
      setRegAddress('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setRegError(
          language === 'en'
            ? "Email and Password authentication is not enabled in your Firebase Console. Please go to Authentication -> Sign-in method, and enable 'Email/Password' to proceed."
            : "L'authentification par e-mail et mot de passe n'est pas activée dans votre console Firebase. Veuillez vous rendre sur Authentication -> Sign-in method, et activer 'Email/Password' pour continuer."
        );
      } else if (err.code === 'auth/weak-password') {
        setRegError(
          language === 'en'
            ? 'Password should be at least 6 characters.'
            : 'Le mot de passe doit contenir au moins 6 caractères.'
        );
      } else if (err.code === 'auth/email-already-in-use') {
        setRegError(language === 'en' ? 'This botanical email is already registered.' : 'Cet e-mail botanique est déjà enregistré.');
      } else {
        setRegError(err.message || (language === 'en' ? 'An error occurred. Please try again.' : 'Une erreur est survenue. Veuillez réessayer.'));
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('current_botanical_user');
      setCurrentUser(null);
      if (showToast) {
        showToast(language === 'en' ? 'You have stepped out of your personal oasis.' : 'Vous êtes sorti de votre oasis personnel.', 'info');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full pt-28 pb-24 bg-warm-white">
      <AnimatePresence mode="wait">
        {!currentUser ? (
          /* ========================================================== */
          /* 1. LOGIN / SIGNUP SCREEN (UNAUTHENTICATED)                */
          /* ========================================================== */
          <motion.div
            key="auth-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch min-h-[600px]">
              
              {/* Left Side: Elegant Portal Forms Card */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 border border-cream-200/60 shadow-md flex flex-col justify-between">
                <div>
                  <div className="text-center lg:text-left mb-8">
                    <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-sage-800 bg-sage-50 px-3 py-1 rounded-full border border-sage-100">
                      {language === 'en' ? 'The Botanical Guild Portal' : 'Le Portail de la Guilde Botanique'}
                    </span>
                    <h1 className="font-serif text-3xl md:text-4xl text-charcoal font-medium mt-4">
                      {authTab === 'signin' ? t.signIn : t.createProfile}
                    </h1>
                    <p className="font-sans text-xs text-muted-gray mt-2 max-w-md leading-relaxed">
                      {authTab === 'signin' 
                        ? (language === 'en' ? 'Access your saved Moroccan formulas, track hand-bottled deliveries, and manage your personal ritual.' : 'Accédez à vos formules marocaines sauvegardées, suivez vos livraisons artisanales et gérez votre rituel personnel.') 
                        : (language === 'en' ? 'Join our conscious slow skincare circle to customize formulations matching your raw skin type.' : 'Rejoignez notre cercle de soins conscients et lents pour personnaliser les formulations adaptées à votre type de peau.')}
                    </p>
                  </div>

                  {/* Auth Tab Selector */}
                  <div className="flex border-b border-cream-200 mb-8 font-sans text-xs font-semibold tracking-widest uppercase">
                    <button
                      onClick={() => { setAuthTab('signin'); setLoginError(''); }}
                      className={`pb-4 pr-6 border-b-2 transition-colors ${
                        authTab === 'signin' 
                          ? 'border-sage-800 text-sage-800' 
                          : 'border-transparent text-muted-gray hover:text-charcoal'
                      }`}
                    >
                      {t.signIn}
                    </button>
                    <button
                      onClick={() => { setAuthTab('signup'); setRegError(''); }}
                      className={`pb-4 px-6 border-b-2 transition-colors ${
                        authTab === 'signup' 
                          ? 'border-sage-800 text-sage-800' 
                          : 'border-transparent text-muted-gray hover:text-charcoal'
                      }`}
                    >
                      {t.createProfile}
                    </button>
                  </div>

                  {/* Tab forms */}
                  <AnimatePresence mode="wait">
                    {authTab === 'signin' ? (
                      <motion.div
                        key={isForgotMode ? "forgot" : "signin"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isForgotMode ? (
                          /* FORGOT PASSWORD FORM */
                          <form onSubmit={handleForgotPassword} className="space-y-5">
                            <h3 className="font-serif text-lg text-charcoal font-medium">
                              {language === 'en' ? 'Reset Your Password' : 'Réinitialiser votre mot de passe'}
                            </h3>
                            <p className="font-sans text-xs text-muted-gray leading-relaxed">
                              {language === 'en' 
                                ? 'Enter your botanical email address below and we will send you a secure link to reset your credentials.' 
                                : 'Saisissez votre adresse e-mail botanique ci-dessous et nous vous enverrons un lien sécurisé pour réinitialiser vos identifiants.'}
                            </p>

                            {resetError && (
                              <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-sans border border-red-100">
                                {resetError}
                              </div>
                            )}

                            {resetSuccess && (
                              <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl text-xs font-sans border border-emerald-100">
                                {resetSuccess}
                              </div>
                            )}

                            <div className="space-y-2">
                              <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                                {language === 'en' ? 'Botanical Email Address' : 'Adresse Email Botanique'}
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray/70" />
                                <input
                                  type="email"
                                  required
                                  placeholder="e.g. sarah@botanique.com"
                                  value={resetEmail}
                                  onChange={(e) => setResetEmail(e.target.value)}
                                  className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3.5 pl-11 pr-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                              <button
                                type="button"
                                onClick={() => {
                                  setIsForgotMode(false);
                                  setResetError('');
                                  setResetSuccess('');
                                }}
                                className="sm:w-1/3 border border-cream-300 hover:bg-cream-100/40 text-charcoal font-sans text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1"
                              >
                                {language === 'en' ? 'Cancel' : 'Annuler'}
                              </button>
                              <button
                                type="submit"
                                disabled={isSendingReset}
                                className="sm:w-2/3 bg-sage-800 hover:bg-sage-700 text-warm-white font-sans text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                              >
                                {isSendingReset 
                                  ? (language === 'en' ? 'Sending...' : 'Envoi...') 
                                  : (language === 'en' ? 'Send Reset Link' : 'Envoyer le lien')}
                              </button>
                            </div>
                          </form>
                        ) : (
                          /* SIGN IN FORM */
                          <form onSubmit={handleSignIn} className="space-y-5">
                            {loginError && (
                              <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-sans border border-red-100">
                                {loginError}
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                                {language === 'en' ? 'Botanical Email Address' : 'Adresse Email Botanique'}
                              </label>
                              <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray/70" />
                                <input
                                  type="email"
                                  placeholder="e.g. sarah@botanique.com"
                                  value={loginEmail}
                                  onChange={(e) => setLoginEmail(e.target.value)}
                                  className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3.5 pl-11 pr-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                                />
                              </div>
                            </div>
    
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80">
                                  {language === 'en' ? 'Secure Password' : 'Mot de passe sécurisé'}
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsForgotMode(true);
                                    setResetEmail(loginEmail);
                                    setResetError('');
                                    setResetSuccess('');
                                  }}
                                  className="font-sans text-[10px] font-semibold text-sage-800 hover:text-sage-700 hover:underline cursor-pointer"
                                >
                                  {language === 'en' ? 'Forgot Password?' : 'Mot de passe oublié ?'}
                                </button>
                              </div>
                              <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-gray/70" />
                                <input
                                  type="password"
                                  placeholder="••••••••"
                                  value={loginPassword}
                                  onChange={(e) => setLoginPassword(e.target.value)}
                                  className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3.5 pl-11 pr-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                                />
                              </div>
                            </div>
    
                            <button
                              type="submit"
                              className="w-full bg-sage-800 hover:bg-sage-700 text-warm-white font-sans text-xs font-bold tracking-widest uppercase py-4 rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                            >
                              <LogIn className="w-4 h-4" /> {language === 'en' ? 'Enter Your Sanctuary' : 'Entrez dans votre Sanctuaire'}
                            </button>
    

                          </form>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="signup"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* SIGN UP FORM */}
                        <form onSubmit={handleSignUp} className="space-y-4">
                          {regError && (
                            <div className="bg-red-50 text-red-700 p-3.5 rounded-xl text-xs font-sans border border-red-100">
                              {regError}
                            </div>
                          )}
  
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                              <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                                {language === 'en' ? 'First Name' : 'Prénom'}
                              </label>
                              <input
                                type="text"
                                placeholder={language === 'en' ? "e.g. Sarah" : "ex. Sarah"}
                                value={regFirstName}
                                onChange={(e) => setRegFirstName(e.target.value)}
                                className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                                {language === 'en' ? 'Last Name' : 'Nom'}
                              </label>
                              <input
                                type="text"
                                placeholder={language === 'en' ? "e.g. Alami" : "ex. Alami"}
                                value={regLastName}
                                onChange={(e) => setRegLastName(e.target.value)}
                                className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                              />
                            </div>
                          </div>
  
                          <div className="space-y-1.5">
                            <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                              {language === 'en' ? 'Secure Email Address' : 'Adresse Email Sécurisée'}
                            </label>
                            <input
                              type="email"
                              placeholder={language === 'en' ? "your.email@example.com" : "votre.email@exemple.com"}
                              value={regEmail}
                              onChange={(e) => setRegEmail(e.target.value)}
                              className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                            />
                          </div>
  
                          <div className="space-y-1.5">
                            <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                              {language === 'en' ? 'Choose Password' : 'Choisissez un mot de passe'}
                            </label>
                            <input
                              type="password"
                              placeholder={language === 'en' ? "At least 6 characters" : "Au moins 6 caractères"}
                              value={regPassword}
                              onChange={(e) => setRegPassword(e.target.value)}
                              className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal"
                            />
                          </div>
  
                          <div className="space-y-1.5">
                            <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                              {t.skinType}
                            </label>
                            <select
                              value={regSkinType}
                              onChange={(e) => setRegSkinType(e.target.value)}
                              className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all text-charcoal"
                            >
                              <option value="Dry / Sensitive">{language === 'en' ? 'Dry / Sensitive (Deep Nourishment)' : 'Sèche / Sensible (Nutrition Profonde)'}</option>
                              <option value="Oily / Combination">{language === 'en' ? 'Oily / Combination (Rhassoul Balancing)' : 'Grasse / Mixte (Équilibrage au Rhassoul)'}</option>
                              <option value="Balanced">{language === 'en' ? 'Balanced Skin (Pristine Hydration)' : 'Peau Équilibrée (Hydratation Parfaite)'}</option>
                              <option value="Mature / Renewing">{language === 'en' ? 'Mature / Renewing (Prickly Pear Firming)' : 'Mature / Renouvellement (Raffermissant Figue de Barbarie)'}</option>
                            </select>
                          </div>
  
                          <div className="space-y-1.5">
                            <label className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/80 block">
                              {language === 'en' ? 'Oasis Shipping Address (For Linen-Wrapped Orders)' : 'Adresse d\'expédition (Pour les commandes emballées dans du lin)'}
                            </label>
                            <textarea
                              placeholder={language === 'en' ? "e.g. 144 Rue de la Bahia, Medina, Marrakesh" : "ex. 144 Rue de la Bahia, Medina, Marrakech"}
                              value={regAddress}
                              onChange={(e) => setRegAddress(e.target.value)}
                              rows={2}
                              className="w-full bg-cream-100/50 border border-cream-200 rounded-xl py-3 px-4 font-sans text-xs focus:outline-none focus:border-sage-800 focus:bg-white transition-all placeholder:text-muted-gray/55 text-charcoal resize-none"
                            />
                          </div>
  
                          <button
                            type="submit"
                            className="w-full bg-sage-800 hover:bg-sage-700 text-warm-white font-sans text-xs font-bold tracking-widest uppercase py-3.5 rounded-xl transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <UserPlus className="w-4 h-4" /> {language === 'en' ? 'Register & Join Guild' : 'S\'inscrire & Rejoindre la Guilde'}
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Secure footer */}
                <div className="mt-8 border-t border-cream-100 pt-6 flex items-center gap-2 text-muted-gray font-sans text-[10px]">
                  <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
                  <span>{language === 'en' ? 'Enrolled in secure SSL hand-pressed botanical ledger, backed by AES-256 local protection.' : 'Inscrit dans le grand livre botanique sécurisé par SSL, soutenu par une protection locale AES-256.'}</span>
                </div>
              </div>

              {/* Right Side: Stunning Founder Story Spotlight (El Mehdi Aglif) */}
              <div className="lg:col-span-5 bg-sage-800 text-warm-white rounded-3xl p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-md">
                {/* Background glow effects */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-cream-200 rounded-full blur-[100px] opacity-10 pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-[250px] h-[250px] bg-emerald-700 rounded-full blur-[90px] opacity-15 pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 rounded-full bg-warm-white/10 flex items-center justify-center border border-warm-white/10">
                    <Award className="w-6 h-6 text-gold-accent" />
                  </div>
                  
                  <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-cream-200 bg-warm-white/10 px-3 py-1 rounded-full border border-warm-white/5 inline-block">
                    {language === 'en' ? 'Founder\'s Guarantee' : 'Garantie du Fondateur'}
                  </span>

                  <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug">
                    {language === 'en' ? '"Every seed pressed, every drop distilled, is a celebration of Moroccan heritage."' : '"Chaque graine pressée, chaque goutte distillée, est une célébration de l\'héritage marocain."'}
                  </h2>

                  <p className="font-sans text-xs text-cream-200/90 leading-relaxed font-light">
                    {language === 'en' ? 'Under the careful stewardship of our founder and head curator,' : 'Sous la direction attentive de notre fondateur et conservateur en chef,'} <strong className="text-white font-semibold">El Mehdi Aglif</strong>, {language === 'en' ? 'L\'Essence Botanique remains dedicated to supporting women-led agricultural cooperatives in the Atlas region. By establishing direct single-origin partnerships, we avoid raw material dilution and guarantee living wages for over 800 indigenous female harvesters.' : 'L\'Essence Botanique reste dévouée à soutenir les coopératives agricoles dirigées par des femmes dans la région de l\'Atlas. En établissant des partenariats directs d\'origine unique, nous évitons la dilution des matières premières et garantissons des salaires décents pour plus de 800 récolteuses autochtones.'}
                  </p>
                </div>

                <div className="relative z-10 pt-8 border-t border-warm-white/10 flex items-center gap-4.5">
                  <div className="w-11 h-11 rounded-full bg-cream-100 text-sage-800 font-serif font-bold text-lg flex items-center justify-center shadow-inner">
                    EMA
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-semibold text-warm-white">El Mehdi Aglif</h4>
                    <p className="font-sans text-[10px] text-cream-300 font-medium tracking-wider uppercase">
                      {language === 'en' ? 'Founder & Chief Alchemist' : 'Fondateur & Alchimiste en Chef'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          /* ========================================================== */
          /* 2. AUTHENTICATED PROFILE & SANCTUARY DASHBOARD            */
          /* ========================================================== */
          <motion.div
            key="authenticated-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Header Block */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mb-12">
              <div className="glass-panel rounded-3xl p-8 border border-cream-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm bg-white">
                <div className="flex items-center gap-4.5 text-center md:text-left flex-col md:flex-row">
                  <div className="w-16 h-16 rounded-full bg-sage-800 text-warm-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-sage-800/20">
                    {currentUser.firstName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 justify-center md:justify-start">
                      <h1 className="font-serif text-2xl md:text-3xl font-medium text-charcoal">
                        {currentUser.firstName} {currentUser.lastName}
                      </h1>
                      <Sparkles className="w-5 h-5 text-gold-accent animate-pulse" />
                    </div>
                    <p className="font-sans text-xs text-muted-gray mt-1">
                      {t.memberSince} {currentUser.memberSince} — <strong className="text-sage-800">{currentUser.tier}</strong>
                    </p>
                  </div>
                </div>

                {/* Skin Profiler stats */}
                <div className="grid grid-cols-2 gap-4 font-sans text-xs">
                  <div className="bg-cream-100 px-4 py-3.5 rounded-2xl text-center border border-cream-200">
                    <span className="text-muted-gray block mb-1">{t.skinType}</span>
                    <strong className="text-sage-800 uppercase tracking-widest font-semibold text-[10px]">
                      {currentUser.skinType}
                    </strong>
                  </div>
                  <div className="bg-cream-100 px-4 py-3.5 rounded-2xl text-center border border-cream-200">
                    <span className="text-muted-gray block mb-1">{language === 'en' ? 'Apothecary Tier' : 'Niveau Apothicaire'}</span>
                    <strong className="text-sage-800 uppercase tracking-widest font-semibold text-[10px]">
                      {currentUser.firstName.toLowerCase() === 'el mehdi' ? (language === 'en' ? 'Curator Supreme' : 'Conservateur Suprême') : (language === 'en' ? 'Atlas Guild' : 'Guilde de l\'Atlas')}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Panel grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-4 gap-12 items-start">
              
              {/* Navigation Tabs (Sidebar style on desktop) */}
              <div className="lg:col-span-1 space-y-2">
                <button
                  onClick={() => setActiveProfileTab('history')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                    activeProfileTab === 'history'
                      ? 'bg-sage-800 text-warm-white shadow-md'
                      : 'text-muted-gray hover:text-sage-800 hover:bg-cream-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {t.orders}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <button
                  onClick={() => setActiveProfileTab('profile')}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                    activeProfileTab === 'profile'
                      ? 'bg-sage-800 text-warm-white shadow-md'
                      : 'text-muted-gray hover:text-sage-800 hover:bg-cream-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" /> {t.personalProfile}
                  </span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>

                <div className="border-t border-cream-200/50 pt-4 mt-4">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 p-4 rounded-xl text-left font-sans text-xs font-bold tracking-widest uppercase text-red-700 hover:bg-red-50 hover:text-red-800 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" /> {t.signOut}
                  </button>
                </div>
              </div>

              {/* Tab Contents Panel */}
              <div className="lg:col-span-3">
                <AnimatePresence mode="wait">
                  {activeProfileTab === 'history' && (
                    <motion.div
                      key="history"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="font-serif text-2xl text-charcoal font-medium border-b border-cream-300/30 pb-4">
                        {language === 'en' ? 'Your Order History' : 'Historique de vos Commandes'}
                      </h2>

                      {isLoadingOrders ? (
                        <div className="flex flex-col items-center justify-center py-12 text-muted-gray font-sans text-xs gap-3">
                          <div className="w-8 h-8 border-2 border-sage-800 border-t-transparent rounded-full animate-spin" />
                          <span>{language === 'en' ? 'Retrieving your botanical registry...' : 'Récupération de votre registre botanique...'}</span>
                        </div>
                      ) : dbOrders.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center border border-cream-300/20 shadow-sm space-y-4">
                          <Clock className="w-12 h-12 text-sage-300 mx-auto" />
                          <p className="font-serif text-lg text-charcoal font-medium">
                            {language === 'en' ? 'No orders recorded yet' : 'Aucune commande enregistrée pour le moment'}
                          </p>
                          <p className="font-sans text-xs text-muted-gray max-w-md mx-auto leading-relaxed">
                            {language === 'en' 
                              ? 'Your slow beauty purchases will appear here once placed. Begin your journey by exploring our pure collections.'
                              : 'Vos achats de beauté lente apparaîtront ici une fois effectués. Commencez votre parcours en explorant nos collections pures.'}
                          </p>
                          <button
                            onClick={() => setCurrentView('shop')}
                            className="bg-sage-800 hover:bg-sage-700 text-warm-white font-sans text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition-all shadow-sm cursor-pointer inline-block"
                          >
                            {language === 'en' ? 'Explore Collection' : 'Explorer la Collection'}
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {dbOrders.map((order) => {
                            const orderDate = order.createdAt?.toDate 
                              ? order.createdAt.toDate().toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })
                              : order.createdAt?.seconds 
                                ? new Date(order.createdAt.seconds * 1000).toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })
                                : language === 'en' ? 'Just now' : 'À l\'instant';

                            return (
                              <div
                                key={order.id}
                                className="bg-white rounded-3xl border border-cream-300/20 p-6 shadow-sm space-y-6"
                              >
                                {/* Order header summary */}
                                <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-cream-100 font-sans text-xs">
                                  <div>
                                    <span className="text-muted-gray">{language === 'en' ? 'Order Reference:' : 'Référence Commande:'}</span>{' '}
                                    <strong className="text-charcoal font-semibold uppercase">{order.id.slice(-6)}</strong>
                                  </div>
                                  <div>
                                    <span className="text-muted-gray">{language === 'en' ? 'Date:' : 'Date :'}</span>{' '}
                                    <strong className="text-charcoal font-semibold">{orderDate}</strong>
                                  </div>
                                  <div>
                                    <span className="text-muted-gray">{language === 'en' ? 'Total Amount:' : 'Montant Total :'}</span>{' '}
                                    <strong className="text-sage-800 font-serif text-sm font-semibold">
                                      {formatPrice(order.total, order.currency || currency, language)}
                                    </strong>
                                  </div>
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    order.status === 'Delivered' 
                                      ? 'bg-sage-100 text-sage-800' 
                                      : order.status === 'Pending' 
                                        ? 'bg-amber-100 text-amber-800' 
                                        : 'bg-cream-300 text-charcoal'
                                  }`}>
                                    {language === 'en' ? order.status : (order.status === 'Pending' ? 'En Attente' : order.status === 'Delivered' ? 'Livré' : order.status)}
                                  </span>
                                </div>

                                {/* Items list */}
                                <div className="space-y-4">
                                  {order.items?.map((item: any, i: number) => {
                                    const matchedProduct = products.find((p) => p.name === item.name);
                                    const localizedItemName = language === 'en' ? item.name : (matchedProduct?.nameFr || item.name);

                                    return (
                                      <div key={i} className="flex gap-4 items-center">
                                        <div className="w-12 h-12 bg-cream-100 rounded-xl overflow-hidden shrink-0">
                                          {item.image ? (
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                          ) : (
                                            <div className="w-full h-full bg-cream-200 flex items-center justify-center text-sage-800 font-serif text-sm">
                                              LB
                                            </div>
                                          )}
                                        </div>
                                        <div className="flex-grow min-w-0 font-sans text-xs">
                                          <h4 className="font-serif text-sm text-charcoal truncate">{localizedItemName}</h4>
                                          <p className="text-muted-gray">
                                            {language === 'en' ? 'Qty:' : 'Qté:'} {item.qty} — {formatPrice(item.price, order.currency || currency, language)}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeProfileTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <h2 className="font-serif text-2xl text-charcoal font-medium border-b border-cream-300/30 pb-4">
                        {language === 'en' ? 'Conscious Botanical Profile' : 'Profil Botanique Conscient'}
                      </h2>

                      <div className="bg-white rounded-3xl p-6 md:p-8 border border-cream-300/25 shadow-sm space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans text-xs">
                          <div>
                            <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">First Name</span>
                            <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">
                              {currentUser.firstName}
                            </p>
                          </div>
                          <div>
                            <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">Last Name</span>
                            <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">
                              {currentUser.lastName}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">Registered Botanical Email</span>
                            <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">
                              {currentUser.email}
                            </p>
                          </div>
                          <div className="sm:col-span-2">
                            <span className="text-muted-gray block mb-2 uppercase tracking-wider text-[10px]">Primary Delivery Oasis Address</span>
                            <p className="text-charcoal font-semibold text-sm bg-cream-100 px-4 py-3 rounded-xl border border-cream-200">
                              {currentUser.address}
                            </p>
                          </div>
                        </div>

                        {/* Security locks */}
                        <div className="flex items-center gap-2.5 p-4 bg-sage-50 rounded-2xl border border-sage-200/50 text-sage-950 font-sans text-xs">
                          <ShieldCheck className="w-5 h-5 text-sage-600 shrink-0" />
                          <div>
                            <span className="font-semibold block">Protected Guild Account Sourcing Key</span>
                            <p className="text-muted-gray">Your skin credentials and direct-trade delivery details are verified under premium security.</p>
                          </div>
                        </div>

                        {/* Special Founder Note if El Mehdi is logged in */}
                        {currentUser.firstName.toLowerCase() === 'el mehdi' && currentUser.lastName.toLowerCase() === 'aglif' && (
                          <div className="bg-cream-100 border border-gold-accent/20 p-6 rounded-3xl space-y-3">
                            <h3 className="font-serif text-lg font-medium text-sage-800 flex items-center gap-2">
                              <Award className="w-5 h-5" /> Founder's Atelier Access
                            </h3>
                            <p className="font-sans text-xs text-muted-gray leading-relaxed">
                              Greetings, El Mehdi. You are currently logged in with supreme management credentials. You can monitor local cooperatives, verify organic extraction batches, and curate new slow beauty collections.
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

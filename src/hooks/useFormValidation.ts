import React from 'react';
import { CartItem } from '../types';

export interface FormValues {
  fullName: string;
  phone: string;
  city: string;
  address: string;
}

export interface FormErrors {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
  quantity?: string;
}

export interface UseFormValidationProps {
  initialValues: FormValues;
  cartItems: CartItem[];
  language: 'en' | 'fr';
}

export function useFormValidation({
  initialValues,
  cartItems,
  language,
}: UseFormValidationProps) {
  const [values, setValues] = React.useState<FormValues>(initialValues);
  const [touched, setTouched] = React.useState<Record<keyof FormValues, boolean>>({
    fullName: false,
    phone: false,
    city: false,
    address: false,
  });

  // Keep state in sync if initialValues changes (e.g., when currentUser loads)
  React.useEffect(() => {
    setValues(initialValues);
  }, [initialValues.fullName, initialValues.phone, initialValues.city, initialValues.address]);

  // Real-time validation criteria
  const getValidationErrors = (formValues: FormValues, items: CartItem[]): FormErrors => {
    const errors: FormErrors = {};

    // Name Validation
    const nameTrimmed = formValues.fullName.trim();
    if (!nameTrimmed) {
      errors.fullName = language === 'en' 
        ? 'Full name is required.' 
        : 'Le nom complet est requis.';
    } else if (nameTrimmed.length < 3) {
      errors.fullName = language === 'en'
        ? 'Please enter your full name (at least 3 characters).'
        : 'Veuillez saisir votre nom complet (au moins 3 caractères).';
    }

    // Phone Validation
    const phoneTrimmed = formValues.phone.trim();
    const phoneRegex = /^[+0-9\s-]{9,15}$/;
    if (!phoneTrimmed) {
      errors.phone = language === 'en'
        ? 'Phone number is required.'
        : 'Le numéro de téléphone est requis.';
    } else if (!phoneRegex.test(phoneTrimmed)) {
      errors.phone = language === 'en'
        ? 'Please enter a valid phone number (9 to 15 digits).'
        : 'Veuillez saisir un numéro de téléphone valide (9 à 15 chiffres).';
    }

    // City Validation
    const cityTrimmed = formValues.city.trim();
    if (!cityTrimmed) {
      errors.city = language === 'en'
        ? 'City is required.'
        : 'La ville est requise.';
    } else if (cityTrimmed.length < 2) {
      errors.city = language === 'en'
        ? 'Please enter your city (at least 2 characters).'
        : 'Veuillez saisir votre ville (au moins 2 caractères).';
    }

    // Address Validation
    const addressTrimmed = formValues.address.trim();
    if (!addressTrimmed) {
      errors.address = language === 'en'
        ? 'Full address is required.'
        : 'L’adresse complète est requise.';
    } else if (addressTrimmed.length < 10) {
      errors.address = language === 'en'
        ? 'Please enter your full address (at least 10 characters).'
        : 'Veuillez saisir votre adresse complète (au moins 10 caractères).';
    }

    // Quantity Validation (All item quantities in cart must be >= 1 and total items in cart > 0)
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
    const hasInvalidQty = items.some(item => item.quantity < 1);

    if (items.length === 0 || totalQty < 1) {
      errors.quantity = language === 'en'
        ? 'Your botanical cart is empty.'
        : 'Votre panier botanique est vide.';
    } else if (hasInvalidQty) {
      errors.quantity = language === 'en'
        ? 'All items must have a quantity of at least 1.'
        : 'Tous les articles doivent avoir une quantité d’au moins 1.';
    }

    return errors;
  };

  const errors = React.useMemo(() => getValidationErrors(values, cartItems), [values, cartItems, language]);

  // Is Form completely valid? (No errors for fields and quantity)
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const markAllAsTouched = () => {
    setTouched({
      fullName: true,
      phone: true,
      city: true,
      address: true,
    });
  };

  return {
    values,
    setValues,
    touched,
    errors,
    isValid,
    handleChange,
    handleBlur,
    markAllAsTouched,
  };
}

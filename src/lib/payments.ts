/**
 * Holiday Hype Tours & Travel - Payment Processing Abstraction
 * 
 * Note: Real-time automated credit card charging is currently configured in
 * 'Invoicing & Assisted Payment Mode'. This module provides clear customer communication,
 * booking quote computation, and multi-channel payment instructions without storing sensitive
 * credit card numbers, CVVs, or bank logins.
 */

import { siteConfig } from "./config";

export interface PaymentOption {
  id: string;
  name: string;
  type: "wire" | "mpesa" | "card_invoice" | "consultation";
  description: string;
  badge?: string;
  instructions: string;
  depositPercentage: number;
}

export const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "bank_wire",
    name: "International Bank Wire Transfer (USD / EUR / GBP)",
    type: "wire",
    badge: "Recommended for International Travelers",
    description: "Direct bank-to-bank SWIFT/IBAN transfer to our corporate multi-currency escrow account at Standard Chartered Bank Kenya.",
    instructions: "Upon booking confirmation, you will receive an official Pro-Forma Invoice featuring full SWIFT codes, IBAN, and unique reference number. Standard 30% deposit secures all lodges & flight allocations.",
    depositPercentage: 30
  },
  {
    id: "mpesa",
    name: "Safaricom M-Pesa (Buy Goods / Paybill)",
    type: "mpesa",
    badge: "East Africa Instant Mobile Money",
    description: "Instant mobile payment for residents and East African regional travelers via verified corporate Till.",
    instructions: "Official Lipa na M-Pesa Buy Goods Till: 894321 (Holiday Hype Tours). Currency: KES calculated at prevailing daily Central Bank rate.",
    depositPercentage: 30
  },
  {
    id: "card_invoice",
    name: "Secure Online Payment Link (Visa / Mastercard / Amex)",
    type: "card_invoice",
    badge: "Assisted Card Invoicing",
    description: "We issue an encrypted 3D-Secure payment link directly from our licensed banking gateway (Pesapal / DPO Group).",
    instructions: "No card numbers are entered or stored on this website. Our travel coordinator sends an official 3D-Secure payment link to your verified email once flight and lodge availability is locked in.",
    depositPercentage: 30
  },
  {
    id: "consultation",
    name: "Custom Itinerary & Quote (No Immediate Payment)",
    type: "consultation",
    badge: "100% Tailor-Made & Free Consultation",
    description: "Request a bespoke quote with customized room choices, private safari vehicles, and dates before making any financial commitment.",
    instructions: "A dedicated senior safari designer will review your requests and send a detailed itemized PDF proposal within 4 hours.",
    depositPercentage: 0
  }
];

export interface PriceBreakdown {
  adultsCount: number;
  childrenCount: number;
  pricePerAdult: number;
  pricePerChild: number;
  totalAdultsPrice: number;
  totalChildrenPrice: number;
  subtotal: number;
  parkFeesIncluded: boolean;
  flyingDoctorsIncluded: boolean;
  requiredDeposit: number;
  balanceDue: number;
  currency: string;
}

export function calculateBookingPrice(
  pricePerPersonUsd: number,
  adultsCount: number = 2,
  childrenCount: number = 0,
  roomType: string = "Double / Twin"
): PriceBreakdown {
  // Children discount: 35% off for children sharing with parents
  const childRate = Math.round(pricePerPersonUsd * 0.65);
  
  let singleSupplement = 0;
  if (roomType === "Single") {
    singleSupplement = Math.round(pricePerPersonUsd * 0.25);
  }

  const adultPrice = pricePerPersonUsd + singleSupplement;
  const totalAdults = adultPrice * Math.max(1, adultsCount);
  const totalChildren = childRate * Math.max(0, childrenCount);
  const subtotal = totalAdults + totalChildren;
  const requiredDeposit = Math.round(subtotal * 0.30); // 30% deposit
  const balanceDue = subtotal - requiredDeposit;

  return {
    adultsCount,
    childrenCount,
    pricePerAdult: adultPrice,
    pricePerChild: childRate,
    totalAdultsPrice: totalAdults,
    totalChildrenPrice: totalChildren,
    subtotal,
    parkFeesIncluded: true,
    flyingDoctorsIncluded: true,
    requiredDeposit,
    balanceDue,
    currency: siteConfig.currency.default
  };
}

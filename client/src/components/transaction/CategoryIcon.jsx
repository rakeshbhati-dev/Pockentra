import {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift, CreditCard,
} from "lucide-react";

const ICON_MAP = {
  Film, ShoppingCart, Coffee, Home, Car, Zap, Heart,
  Music, Book, Briefcase, Globe, Gift, CreditCard,
};

export default function CategoryIcon({ iconName, color, size = 14 }) {
  const Icon = ICON_MAP[iconName] || CreditCard;
  return <Icon size={size} color={color} />;
}

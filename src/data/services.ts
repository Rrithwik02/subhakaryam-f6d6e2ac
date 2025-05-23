
import { 
  UserRoundCog, 
  Brush,
  Camera, 
  UtensilsCrossed, 
  Music2, 
  Flower2,
  Building2 // Added for Function Hall
} from "lucide-react";
import { ServiceCategory } from "../types/services";

export const serviceCategories: ServiceCategory[] = [
  {
    id: "poojari",
    name: "Poojari Services",
    description: "Expert priests for all traditional ceremonies",
    icon: UserRoundCog,
    basePrice: 5000,
  },
  {
    id: "mehendi",
    name: "Mehendi & Makeup",
    description: "Professional beauty services for your special day",
    icon: Brush,
    basePrice: 8000,
  },
  {
    id: "photo",
    name: "Photography & Videography",
    description: "Capture your precious moments",
    icon: Camera,
    basePrice: 15000,
  },
  {
    id: "catering",
    name: "Catering",
    description: "Delicious traditional cuisine",
    icon: UtensilsCrossed,
    basePrice: 25000,
  },
  {
    id: "music",
    name: "Mangala Vayudhyam",
    description: "Traditional musical accompaniment",
    icon: Music2,
    basePrice: 10000,
  },
  {
    id: "decoration",
    name: "Decoration",
    description: "Beautiful traditional decorations",
    icon: Flower2,
    basePrice: 20000,
  },
  {
    id: "function_hall",
    name: "Function Hall (Coming Soon)",
    description: "Spacious venues for your special occasions",
    icon: Building2,
    basePrice: 50000,
  },
];

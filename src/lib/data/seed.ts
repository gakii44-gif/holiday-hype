/**
 * Holiday Hype Tours & Travel - Seed Content
 * High-quality verified tourism data for East Africa & beyond.
 */

import { Destination, HolidayPackage, TourSafari, TravelService, Testimonial, BlogPost } from "../types";

export const seedDestinations: Destination[] = [
  {
    id: "dest-kenya",
    slug: "kenya",
    name: "Kenya",
    country: "Kenya",
    region: "East Africa",
    tagline: "The Cradle of Safari & The Great Migration",
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "Kenya is the birthplace of the safari, celebrated worldwide for the drama of the Great Wildebeest Migration across the Mara River, close-up elephant herds under Mount Kilimanjaro in Amboseli, and pristine white-sand shores in Diani Beach.",
    bestTimeToVisit: "July to October for the Great Migration; January to March for clear skies and birdwatching.",
    climate: "Tropical along the coast, arid to semi-arid in the interior, and pleasant temperate weather across high-altitude safari parks.",
    topAttractions: [
      "Maasai Mara National Reserve",
      "Amboseli National Park (Kilimanjaro Views)",
      "Lake Nakuru & Lake Naivasha (Flamingos & Rhinos)",
      "Tsavo East & West National Parks",
      "Diani Beach & Watamu Marine Park",
      "Ol Pejeta Chimpanzee & Rhino Sanctuary"
    ],
    keyWildlife: ["Lions", "Cheetahs", "Leopards", "Elephants", "Black & White Rhinos", "Wildebeests", "Giraffes"],
    travelTips: {
      visa: "Electronic Travel Authorization (eTA) required online before departure.",
      currency: "Kenyan Shilling (KES); USD widely accepted for safari tips and lodges.",
      languages: "English (Official), Swahili (National).",
      vaccinations: "Yellow fever certificate recommended; malaria prophylaxis advised for safari areas."
    },
    featured: true,
    packageCount: 4
  },
  {
    id: "dest-tanzania",
    slug: "tanzania",
    name: "Tanzania",
    country: "Tanzania",
    region: "East Africa",
    tagline: "Endless Serengeti Plains & Ngorongoro Caldera",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "Tanzania boasts some of Earth's most breathtaking wilderness ecosystems, including the vast Serengeti savannah, the UNESCO World Heritage Ngorongoro Crater, and the snow-capped summit of Mount Kilimanjaro.",
    bestTimeToVisit: "June to October for dry season game viewing; January to March for the Serengeti calving season.",
    climate: "Tropical highland climate in Arusha and Crater rim; warm savannah plains.",
    topAttractions: [
      "Serengeti National Park",
      "Ngorongoro Crater Conservation Area",
      "Tarangire National Park (Elephant & Baobab Haven)",
      "Lake Manyara National Park (Tree-climbing Lions)",
      "Mount Kilimanjaro"
    ],
    keyWildlife: ["Tree-climbing Lions", "Ngorongoro Black Rhinos", "Cheetahs", "Massive Elephant Herds", "Leopards"],
    travelTips: {
      visa: "Online eVisa available; passport valid for 6 months required.",
      currency: "Tanzanian Shilling (TZS); USD bills printed after 2013 accepted.",
      languages: "Swahili & English.",
      vaccinations: "Yellow fever required if arriving from endemic countries; malaria precaution."
    },
    featured: true,
    packageCount: 3
  },
  {
    id: "dest-zanzibar",
    slug: "zanzibar",
    name: "Zanzibar Archipelago",
    country: "Tanzania (Zanzibar)",
    region: "Indian Ocean",
    tagline: "Spices, Turquoise Lagoons & Swahili Heritage",
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "The semi-autonomous spice island of Zanzibar blends powdery white beaches, UNESCO-listed Stone Town stone alleys, aromatic clove plantations, and world-class scuba diving at Mnemba Atoll.",
    bestTimeToVisit: "June to October and December to February.",
    climate: "Tropical maritime, warm waters year-round with refreshing sea breezes.",
    topAttractions: [
      "Stone Town UNESCO Heritage Site",
      "Nungwi & Kendwa Sunset Beaches",
      "Mnemba Atoll Marine Sanctuary",
      "Jozani Chwaka Bay National Park (Red Colobus Monkeys)",
      "Spice Farm Plantation Tours"
    ],
    keyWildlife: ["Zanzibar Red Colobus Monkeys", "Dolphins", "Green Sea Turtles", "Whale Sharks"],
    travelTips: {
      visa: "Same as mainland Tanzania eVisa.",
      currency: "Tanzanian Shilling (TZS) & USD.",
      languages: "Swahili, English, Arabic.",
      vaccinations: "Routine vaccines & yellow fever if applicable."
    },
    featured: true,
    packageCount: 2
  },
  {
    id: "dest-uganda",
    slug: "uganda",
    name: "Uganda",
    country: "Uganda",
    region: "East Africa",
    tagline: "The Pearl of Africa & Mountain Gorilla Sanctuary",
    heroImage: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "Winston Churchill famously named Uganda 'The Pearl of Africa' for its lush misty rainforests, roaring Murchison Falls on the Nile, and the life-changing thrill of eye-to-eye contact with endangered mountain gorillas.",
    bestTimeToVisit: "June to August and December to February for gorilla trekking.",
    climate: "Temperate tropical with mild temperatures in highlands.",
    topAttractions: [
      "Bwindi Impenetrable National Park",
      "Queen Elizabeth National Park (Tree-climbing lions & Kazinga Channel)",
      "Murchison Falls National Park",
      "Kibale National Park (Chimpanzee Capital)",
      "Source of the River Nile at Jinja"
    ],
    keyWildlife: ["Mountain Gorillas", "Chimpanzees", "Shoebill Storks", "Hippos", "Nile Crocodiles"],
    travelTips: {
      visa: "Uganda eVisa / East Africa Tourist Visa.",
      currency: "Ugandan Shilling (UGX).",
      languages: "English, Luganda, Swahili.",
      vaccinations: "Mandatory Yellow Fever Certificate required."
    },
    featured: true,
    packageCount: 2
  },
  {
    id: "dest-rwanda",
    slug: "rwanda",
    name: "Rwanda",
    country: "Rwanda",
    region: "East Africa",
    tagline: "Land of a Thousand Hills & High-End Eco-Luxury",
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "A beacon of conservation and eco-luxury, Rwanda offers seamless access to Volcanoes National Park for mountain gorilla encounters, canopy walks in ancient Nyungwe Forest, and serene boat trips on Lake Kivu.",
    bestTimeToVisit: "June to September and December to February.",
    climate: "Mild highland mountain climate year-round.",
    topAttractions: [
      "Volcanoes National Park",
      "Kigali Genocide Memorial & Cultural City Tour",
      "Nyungwe Rainforest Canopy Walk",
      "Lake Kivu Resort Town of Gisenyi",
      "Akagera National Park (Big Five Safari)"
    ],
    keyWildlife: ["Mountain Gorillas", "Golden Monkeys", "Chimpanzees", "Lions", "Black Rhinos"],
    travelTips: {
      visa: "Visas on arrival available for most nationalities; East Africa Tourist Visa accepted.",
      currency: "Rwandan Franc (RWF).",
      languages: "Kinyarwanda, English, French.",
      vaccinations: "Yellow fever certificate required."
    },
    featured: false,
    packageCount: 1
  },
  {
    id: "dest-south-africa",
    slug: "south-africa",
    name: "South Africa",
    country: "South Africa",
    region: "Southern Africa",
    tagline: "Kruger Safaris, Cape Town & Cape Winelands",
    heroImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "From the dramatic cliffs of Cape Point and world-renowned Table Mountain in Cape Town to private game reserves in Greater Kruger, South Africa delivers cosmopolitan sophistication paired with untamed wilderness.",
    bestTimeToVisit: "May to September for Kruger safari wildlife viewing; November to March for Cape Town summer.",
    climate: "Mediterranean in Cape Town; subtropical savannah in the north.",
    topAttractions: [
      "Greater Kruger National Park & Sabi Sands",
      "Table Mountain & Cape Peninsula",
      "Stellenbosch & Franschhoek Winelands",
      "Boulders Beach Penguin Colony",
      "The Garden Route & Hermanus Whale Watching"
    ],
    keyWildlife: ["Big Five", "African Penguins", "Southern Right Whales", "Wild Dogs", "Cheetahs"],
    travelTips: {
      visa: "Visa-free for many passport holders up to 90 days.",
      currency: "South African Rand (ZAR).",
      languages: "English, Zulu, Xhosa, Afrikaans.",
      vaccinations: "Routine vaccines; low malaria risk in Kruger."
    },
    featured: true,
    packageCount: 2
  },
  {
    id: "dest-victoria-falls",
    slug: "victoria-falls",
    name: "Victoria Falls (Zimbabwe & Zambia)",
    country: "Zimbabwe / Zambia",
    region: "Southern Africa",
    tagline: "The Smoke that Thunders & Chobe River Safaris",
    heroImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "One of the Seven Natural Wonders of the World, Victoria Falls plunges more than 100 meters into the Zambezi Gorge. Pair thunderous waterfall vistas with sunset boat cruises and day trips to Botswana's Chobe National Park.",
    bestTimeToVisit: "February to May for maximum water flow; August to December for white-water rafting and Devil's Pool.",
    climate: "Warm subtropical with sunny dry winters.",
    topAttractions: [
      "Victoria Falls National Park Rainforest",
      "Zambezi River Sunset Catamaran Cruise",
      "Devil's Pool Livingstone Island",
      "Day Safari in Chobe National Park (Botswana)",
      "Helicopter Flight of Angels"
    ],
    keyWildlife: ["Hippos", "Nile Crocodiles", "Chobe River Elephants", "African Fish Eagles"],
    travelTips: {
      visa: "KAZA Univisa covers Zimbabwe and Zambia multiple entries.",
      currency: "USD in Zimbabwe; Zambian Kwacha (ZMW).",
      languages: "English.",
      vaccinations: "Malaria precautions advised."
    },
    featured: false,
    packageCount: 1
  },
  {
    id: "dest-seychelles",
    slug: "seychelles",
    name: "Seychelles & Indian Ocean Islands",
    country: "Seychelles",
    region: "Indian Ocean",
    tagline: "Granite Boulders, Coral Atolls & Castaway Luxury",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "A dream archipelago of 115 islands in the warm Indian Ocean, Seychelles offers iconic pink-hued granite boulders at Anse Source d'Argent, giant Aldabra tortoises, and private island sanctuaries.",
    bestTimeToVisit: "April to May and October to November for calm sea conditions and scuba diving.",
    climate: "Year-round tropical warmth (26°C – 31°C).",
    topAttractions: [
      "Anse Source d'Argent (La Digue)",
      "Vallée de Mai UNESCO Forest (Coco de Mer)",
      "Anse Lazio (Praslin)",
      "Curieuse Island Giant Tortoise Sanctuary",
      "Sainte Anne Marine National Park"
    ],
    keyWildlife: ["Giant Aldabra Tortoises", "Black Parrots", "Manta Rays", "Hawksbill Sea Turtles"],
    travelTips: {
      visa: "Visa-free entry; Travel Authorization form required before arrival.",
      currency: "Seychellois Rupee (SCR) & Euro/USD.",
      languages: "Creole, English, French.",
      vaccinations: "Routine vaccinations."
    },
    featured: false,
    packageCount: 1
  }
];

export const seedPackages: HolidayPackage[] = [
  {
    id: "pkg-kenya-classic-7d",
    slug: "classic-kenya-migration-safari-7-days",
    title: "7-Day Classic Kenya Big 5 & Great Migration Safari",
    subtitle: "Maasai Mara, Lake Nakuru & Amboseli National Park",
    destinationId: "dest-kenya",
    destinationName: "Kenya",
    country: "Kenya",
    durationDays: 7,
    durationNights: 6,
    pricePerPersonUsd: 1850,
    priceOriginalUsd: 2150,
    groupSize: "Private 4x4 Land Cruiser (Max 6 guests)",
    travelStyle: "Wildlife Safari",
    featured: true,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "Embark on an iconic 7-day Kenya wildlife expedition traversing three of Africa's premier wildlife reserves. Witness the predator-dense savannahs of Maasai Mara, the endangered rhino haven of Lake Nakuru, and the majestic elephant herds of Amboseli under Mount Kilimanjaro.",
    highlights: [
      "Thrilling game drives across the world-famous Maasai Mara",
      "Witness the Big Five: Lion, Leopard, Rhino, Elephant, and Buffalo",
      "Spectacular view of Mount Kilimanjaro rising over Amboseli elephants",
      "Boat safari on Lake Naivasha & walking safari on Crescent Island",
      "Dedicated professional Silver-level KPSGA safari guide",
      "Custom 4x4 safari Land Cruiser with pop-up photography roof"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Amboseli National Park",
        location: "Amboseli National Park",
        description: "Depart Nairobi early morning through scenic Maasai plains. Arrive at your lodge in time for lunch. Afternoon game drive tracking giant elephant herds with Kilimanjaro in the backdrop.",
        meals: "Lunch, Dinner",
        accommodation: "Amboseli Serena Safari Lodge / Kibo Safari Camp",
        activities: ["Morning scenic transfer", "Afternoon Big Game drive", "Sunset view of Mt. Kilimanjaro"]
      },
      {
        day: 2,
        title: "Full Day in Amboseli National Park",
        location: "Amboseli National Park",
        description: "Early morning sunrise game drive when Kilimanjaro summit is most visible. Visit Observation Hill overlooking Enkongo Narok marshlands filled with hippos and waterbirds. Evening game drive tracking lions and cheetahs.",
        meals: "Breakfast, Picnic Lunch, Dinner",
        accommodation: "Amboseli Serena Safari Lodge / Kibo Safari Camp",
        activities: ["Sunrise photography drive", "Observation Hill viewpoint", "Evening predator tracking"]
      },
      {
        day: 3,
        title: "Amboseli to Lake Nakuru & Lake Naivasha",
        location: "Great Rift Valley",
        description: "Drive north into the Great Rift Valley. Afternoon game drive in Lake Nakuru National Park, a premier sanctuary for both Black and White Rhinos and Rothschild giraffes.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sarova Lion Hill Game Lodge / Lake Naivasha Sopa Resort",
        activities: ["Rift Valley viewpoint stop", "Rhino tracking game drive", "Bird watching"]
      },
      {
        day: 4,
        title: "Lake Naivasha Boat Safari to Maasai Mara",
        location: "Maasai Mara National Reserve",
        description: "Morning boat safari on freshwater Lake Naivasha watching fish eagles and hippos. Ascend the western Rift escarpment into the legendary Maasai Mara. Welcome game drive upon entry.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ashnil Mara Camp / Mara Serena Safari Lodge",
        activities: ["Naivasha boat cruise", "Entry game drive in Mara", "Bush dinner"]
      },
      {
        day: 5,
        title: "Full Day Mara Predator & Migration Tracking",
        location: "Maasai Mara National Reserve",
        description: "A full day with picnic lunch exploring the Mara River and Talek confluence. Track cheetah coalitions on open savannahs and search for leopards draped in acacia trees.",
        meals: "Breakfast, Bush Picnic Lunch, Dinner",
        accommodation: "Ashnil Mara Camp / Mara Serena Safari Lodge",
        activities: ["Full-day extended safari drive", "Mara River hippos & crocs", "Big Cat tracking"]
      },
      {
        day: 6,
        title: "Maasai Cultural Village & Mara River Safaris",
        location: "Maasai Mara National Reserve",
        description: "Optional dawn Hot Air Balloon Safari. Morning visit to an authentic Maasai cultural manyatta for traditional jumping dance and fire-making. Afternoon game drive.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ashnil Mara Camp / Mara Serena Safari Lodge",
        activities: ["Maasai cultural encounter", "Golden hour sunset drive", "Campfire storytelling"]
      },
      {
        day: 7,
        title: "Maasai Mara to Nairobi & Departure",
        location: "Nairobi",
        description: "Early morning final sunrise game drive. Breakfast at the lodge and return journey to Nairobi with lunch en-route. Drop-off at Jomo Kenyatta International Airport (NBO) or hotel.",
        meals: "Breakfast, Lunch",
        accommodation: "Day room or airport drop-off",
        activities: ["Sunrise game drive", "Scenic return transfer", "Airport farewell"]
      }
    ],
    inclusions: [
      "All park entry and conservation fees for Amboseli, Nakuru, and Maasai Mara",
      "6 nights full-board accommodation in luxury safari lodges / tented camps",
      "Private use of customized 4x4 Safari Land Cruiser with pop-up roof & VHF radio",
      "Services of an experienced English-speaking professional driver-guide",
      "Unlimited game drives as specified in the itinerary",
      "Complimentary bottled mineral water in safari vehicle",
      "Lake Naivasha boat safari excursion",
      "Emergency Flying Doctors medical evacuation cover (AMREF)",
      "All government taxes and levies"
    ],
    exclusions: [
      "International flights and visa fees (Kenya eTA)",
      "Hot Air Balloon Safari over Maasai Mara (Optional: $450 per person)",
      "Maasai Cultural Village visit fee ($30 per person)",
      "Travel & medical insurance",
      "Gratuities for safari guide and lodge staff",
      "Personal drinks, laundry, and items of a personal nature"
    ],
    faqs: [
      {
        question: "When is the best time to see the Great Wildebeest Migration?",
        answer: "The Great Migration typically arrives in Kenya's Maasai Mara from mid-July and remains through late October. However, the Big Five and resident cats are spectacular in Kenya all year round."
      },
      {
        question: "What vehicle is used for the safari?",
        answer: "You will travel in a custom-built 4x4 Toyota Land Cruiser with an elevating pop-up photography roof, window seat guarantee, onboard inverter for charging cameras/phones, and cooler box."
      },
      {
        question: "Is this package suitable for families with children?",
        answer: "Yes, this itinerary is private and fully customizable to accommodate families, including child-friendly lodge rooms and flexible game drive pacing."
      }
    ],
    bestSeason: "July – October & December – March",
    transportType: "Private 4x4 Safari Land Cruiser",
    accommodationType: "4 to 5-Star Luxury Safari Lodges & Tented Camps",
    rating: 4.95,
    reviewCount: 148
  },
  {
    id: "pkg-tanzania-serengeti-6d",
    slug: "serengeti-ngorongoro-ultimate-expedition-6-days",
    title: "6-Day Serengeti & Ngorongoro Ultimate Wildlife Expedition",
    subtitle: "Tarangire, Central Serengeti & The World Heritage Ngorongoro Crater",
    destinationId: "dest-tanzania",
    destinationName: "Tanzania",
    country: "Tanzania",
    durationDays: 6,
    durationNights: 5,
    pricePerPersonUsd: 2280,
    priceOriginalUsd: 2590,
    groupSize: "Private 4x4 Land Cruiser (Max 6 guests)",
    travelStyle: "Wildlife Safari",
    featured: true,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "Explore Tanzania's legendary Northern Safari Circuit. Marvel at ancient baobab trees and massive elephant herds in Tarangire, track lions across the endless Seronera plains of the Serengeti, and descend 600 meters into the wildlife amphitheater of the Ngorongoro Crater.",
    highlights: [
      "Descend into Ngorongoro Crater floor for high-density Black Rhino sightings",
      "Two full days traversing the predator-rich Central Serengeti (Seronera Valley)",
      "Tarangire National Park elephant herds and colossal baobab trees",
      "Stunning crater rim sunset views and luxury bush dining",
      "Expert Tanzanian KPSGA certified safari guide"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arusha to Tarangire National Park",
        location: "Tarangire National Park",
        description: "Pickup from Arusha/Kilimanjaro Airport. Drive to Tarangire National Park, celebrated for ancient baobabs and the highest concentration of elephants in East Africa.",
        meals: "Lunch, Dinner",
        accommodation: "Tarangire Safari Lodge / Maramboi Tented Camp",
        activities: ["Morning departure", "Afternoon Tarangire river game drive"]
      },
      {
        day: 2,
        title: "Tarangire to Central Serengeti National Park",
        location: "Serengeti National Park",
        description: "Drive through the Ngorongoro Conservation Area highlands and descend into the vast sea of Serengeti grass. Game drive across the Seronera River valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Serengeti Serena Safari Lodge / Kubu Kubu Tented Lodge",
        activities: ["Scenic highland drive", "Serengeti plains entry safari"]
      },
      {
        day: 3,
        title: "Full Day Serengeti Plains Safari",
        location: "Serengeti National Park",
        description: "Full day tracking lion prides, leopards lounging in sausage trees, and cheetah hunts across the kopjes (granite rocky outcrops).",
        meals: "Breakfast, Picnic Lunch, Dinner",
        accommodation: "Serengeti Serena Safari Lodge / Kubu Kubu Tented Lodge",
        activities: ["Morning game drive", "Bush picnic", "Afternoon predator sweep"]
      },
      {
        day: 4,
        title: "Serengeti to Ngorongoro Crater Highlands",
        location: "Ngorongoro Highlands",
        description: "Morning game drive in Serengeti. Afternoon journey to the rim of Ngorongoro Crater with an optional stop at Olduvai Gorge, the cradle of mankind.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ngorongoro Serena Safari Lodge / Neptune Ngorongoro",
        activities: ["Morning Serengeti safari", "Olduvai Gorge historical tour"]
      },
      {
        day: 5,
        title: "600m Descent into Ngorongoro Crater Floor",
        location: "Ngorongoro Crater",
        description: "Descend into the 20km-wide caldera for a 6-hour safari. Spot endangered black rhinos, giant tuskers, pride of lions, and thousands of flamingos at Lake Magadi.",
        meals: "Breakfast, Crater Picnic Lunch, Dinner",
        accommodation: "Ngorongoro Serena Safari Lodge / Karatu Lodge",
        activities: ["Crater floor safari", "Lake Magadi birding", "Hippo pool lunch"]
      },
      {
        day: 6,
        title: "Karatu to Arusha & Departure",
        location: "Arusha",
        description: "Leisurely breakfast overlooking the coffee plantations of Karatu. Transfer to Arusha or Kilimanjaro International Airport (JRO) for your onward flight.",
        meals: "Breakfast, Lunch",
        accommodation: "Departure",
        activities: ["Cultural craft shopping", "Airport transfer"]
      }
    ],
    inclusions: [
      "All park entry fees, concession fees, and Ngorongoro Crater vehicle descent fees",
      "5 nights luxury lodge and tented camp accommodation",
      "Private 4x4 Safari Land Cruiser with pop-up roof and English-speaking guide",
      "All meals as specified in the itinerary",
      "Bottled drinking water in the safari vehicle",
      "AMREF Flying Doctors Medical Evacuation Cover",
      "Airport transfers in Arusha / Kilimanjaro"
    ],
    exclusions: [
      "International flights and Tanzania visa fees",
      "Hot Air Balloon Safari in Serengeti ($590 per person)",
      "Gratuities for guides and camp staff",
      "Travel insurance and personal purchases"
    ],
    faqs: [
      {
        question: "How cold does it get on the Ngorongoro Crater rim?",
        answer: "Because the crater rim sits over 2,200 meters above sea level, evenings and early mornings can be quite cool (10°C to 14°C). We recommend bringing a fleece jacket or light sweater."
      }
    ],
    bestSeason: "Year-Round (Best June – October & January – March)",
    transportType: "Private 4x4 Safari Land Cruiser",
    accommodationType: "Luxury Safari Lodges & Wilderness Tented Camps",
    rating: 4.98,
    reviewCount: 112
  },
  {
    id: "pkg-bush-beach-10d",
    slug: "bush-and-beach-bliss-mara-diani-10-days",
    title: "10-Day Bush & Beach Bliss: Maasai Mara + Diani Beach Luxury Escape",
    subtitle: "World-Class Wildlife Safari Followed by Indian Ocean Tropical Relaxation",
    destinationId: "dest-kenya",
    destinationName: "Kenya",
    country: "Kenya",
    durationDays: 10,
    durationNights: 9,
    pricePerPersonUsd: 2890,
    priceOriginalUsd: 3300,
    groupSize: "Private Bush Safari + Luxury Beach Resort",
    travelStyle: "Bush & Beach Combo",
    featured: true,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1000&q=80"
    ],
    overview: "The ultimate African holiday: 4 days of thrilling Big Five safari in the world-renowned Maasai Mara, followed by a direct bush-to-beach bush plane flight to Diani Beach, Africa's leading beach destination for 5 nights of barefoot luxury.",
    highlights: [
      "4 Days of untamed Big Five safari in the Maasai Mara",
      "Scenic domestic flight directly from Mara bush airstrip to the Coast",
      "5 Nights in a 5-star beachfront boutique resort in Diani Beach",
      "Snorkeling & dolphin safari at Kisite-Mpunguti Marine National Park",
      "Sunset dhow cruise with fresh seafood dinner"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Nairobi",
        location: "Nairobi",
        description: "Meet and greet at Jomo Kenyatta Airport. Transfer to luxury boutique hotel in Karen, Nairobi.",
        meals: "Dinner",
        accommodation: "Hemingways Nairobi / House of Waine",
        activities: ["VIP airport meet & assist", "Welcome briefing"]
      },
      {
        day: 2,
        title: "Fly from Wilson Airport to Maasai Mara",
        location: "Maasai Mara",
        description: "Board scenic morning bush flight to Mara airstrip. Afternoon game drive in the Mara reserve.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Governors' Camp / Mara Intrepids",
        activities: ["Scenic flight", "Afternoon Big Cat safari"]
      },
      {
        day: 3,
        title: "Full Day Maasai Mara Safari",
        location: "Maasai Mara",
        description: "Dawn to dusk tracking the Big Five and Mara River crossing points.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Governors' Camp / Mara Intrepids",
        activities: ["Full day game drive", "Bush picnic lunch"]
      },
      {
        day: 4,
        title: "Another Day in the Mara Wilderness",
        location: "Maasai Mara",
        description: "Morning walking safari with Maasai naturalists and evening sunset game drive.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Governors' Camp / Mara Intrepids",
        activities: ["Guided nature walk", "Sundowner cocktails"]
      },
      {
        day: 5,
        title: "Fly Direct Bush to Beach (Diani Beach)",
        location: "Diani Beach, South Coast",
        description: "Direct scheduled flight from Mara airstrip to Ukunda Diani Airport. Check in to beachfront luxury resort.",
        meals: "Breakfast, Dinner",
        accommodation: "The Sands at Nomad / Swahili Beach Resort",
        activities: ["Bush-to-beach flight", "Beachfront sunset stroll"]
      },
      {
        day: 6,
        title: "Diani Beach Leisure & Coral Reef",
        location: "Diani Beach",
        description: "Relax on powdery white sands, swim in warm turquoise waters, or indulge in resort spa treatments.",
        meals: "Breakfast, Dinner",
        accommodation: "The Sands at Nomad / Swahili Beach Resort",
        activities: ["Beach relaxation", "Spa wellness"]
      },
      {
        day: 7,
        title: "Kisite Mpunguti Marine Park & Dolphin Safari",
        location: "Wasini Island & Marine Park",
        description: "Traditional Arabian dhow excursion to Kisite Mpunguti Marine Park. Snorkel with turtles and dolphins followed by Swahili seafood lunch on Wasini Island.",
        meals: "Breakfast, Seafood Lunch, Dinner",
        accommodation: "The Sands at Nomad / Swahili Beach Resort",
        activities: ["Dhow sailing", "Coral snorkeling", "Dolphin spotting"]
      },
      {
        day: 8,
        title: "Water Sports & Relaxation",
        location: "Diani Beach",
        description: "Optional kite surfing, scuba diving, deep-sea fishing, or golfing at Leisure Lodge Golf Club.",
        meals: "Breakfast, Dinner",
        accommodation: "The Sands at Nomad / Swahili Beach Resort",
        activities: ["Water sports (optional)", "Sunset cocktails"]
      },
      {
        day: 9,
        title: "Sunset Dhow Cruise & Swahili Feast",
        location: "Diani Beach",
        description: "Final full day relaxing on the sand. Evening romantic sunset dhow cruise along Kongo River estuary.",
        meals: "Breakfast, Dinner",
        accommodation: "The Sands at Nomad / Swahili Beach Resort",
        activities: ["Sunset river cruise", "Farewell coastal dinner"]
      },
      {
        day: 10,
        title: "Transfer to Mombasa/Ukunda Airport & Departure",
        location: "Departure",
        description: "Transfer to Ukunda or Mombasa International Airport for your flight to Nairobi and onward home.",
        meals: "Breakfast",
        accommodation: "Departure",
        activities: ["Airport transfer"]
      }
    ],
    inclusions: [
      "Domestic flights: Nairobi to Maasai Mara, Mara to Diani, Diani to Nairobi",
      "3 Nights luxury full-board safari in Maasai Mara",
      "5 Nights half-board luxury resort accommodation in Diani Beach",
      "1 Night boutique hotel in Nairobi with dinner",
      "All Maasai Mara park fees and game drive services",
      "Full day Kisite Mpunguti Dolphin & Dhow excursion with seafood lunch",
      "All airport and airstrip road transfers in comfortable vehicles",
      "AMREF Flying Doctors Emergency Cover"
    ],
    exclusions: [
      "International flights and Kenya eTA entry fees",
      "Optional water sports (scuba diving, kite surfing)",
      "Gratuities for guides and hotel staff",
      "Personal travel insurance"
    ],
    faqs: [
      {
        question: "Can we customize the number of days in the safari vs beach?",
        answer: "Yes! All Holiday Hype packages can be customized. You can extend your safari in the Mara or add extra beach days in Diani, Zanzibar, or Watamu."
      }
    ],
    bestSeason: "July – March",
    transportType: "Domestic Bush Planes & Private Safari Land Cruiser",
    accommodationType: "5-Star Safari Camp & Beach Boutique Resort",
    rating: 4.99,
    reviewCount: 94
  },
  {
    id: "pkg-uganda-gorilla-4d",
    slug: "uganda-mountain-gorilla-primates-trekking-4-days",
    title: "4-Day Uganda Mountain Gorilla & Primates Trekking Expedition",
    subtitle: "Bwindi Impenetrable National Park & Lake Bunyonyi",
    destinationId: "dest-uganda",
    destinationName: "Uganda",
    country: "Uganda",
    durationDays: 4,
    durationNights: 3,
    pricePerPersonUsd: 1980,
    priceOriginalUsd: 2250,
    groupSize: "Private 4x4 Vehicle (Permit Included)",
    travelStyle: "Gorilla Trekking",
    featured: true,
    popular: false,
    heroImage: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "Experience one of the world's most profound wildlife encounters. Journey into the UNESCO-listed ancient mist-shrouded rainforest of Bwindi Impenetrable Forest to spend one unforgettable hour in the presence of a habituated wild Mountain Gorilla family.",
    highlights: [
      "Guaranteed official Uganda Wildlife Authority Gorilla Trekking Permit ($800 value included)",
      "Spend one magical hour up-close with a wild Mountain Gorilla family",
      "Guided rainforest trek with veteran Uganda Wildlife Authority rangers",
      "Canoe ride on scenic Lake Bunyonyi, Africa's second deepest lake",
      "Batwa Pygmy cultural heritage encounter"
    ],
    itinerary: [
      {
        day: 1,
        title: "Entebbe/Kigali to Bwindi Impenetrable Forest",
        location: "Bwindi Impenetrable Forest",
        description: "Pickup from Entebbe Airport or Kigali (Rwanda) and drive through rolling green hills and tea plantations to Bwindi.",
        meals: "Lunch, Dinner",
        accommodation: "Buhoma Lodge / Mahogany Springs Lodge",
        activities: ["Scenic mountain drive", "Equator crossing photo stop", "Lodge check-in"]
      },
      {
        day: 2,
        title: "The Gorilla Trekking Encounter in Bwindi",
        location: "Bwindi Impenetrable National Park",
        description: "Early breakfast and briefing at UWA park headquarters. Trek into the dense jungle with expert trackers. Once the gorilla family is located, spend a life-changing 60 minutes observing their behavior.",
        meals: "Breakfast, Forest Picnic Lunch, Dinner",
        accommodation: "Buhoma Lodge / Mahogany Springs Lodge",
        activities: ["Ranger briefing", "Mountain Gorilla Trekking", "Gorilla tracking certificate award"]
      },
      {
        day: 3,
        title: "Batwa Cultural Trail to Lake Bunyonyi",
        location: "Lake Bunyonyi",
        description: "Morning community walk learning traditional hunting and medicinal plants from the Batwa people. Afternoon transfer to Lake Bunyonyi for a relaxing dugout canoe cruise.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "BirdNest Resort Lake Bunyonyi",
        activities: ["Batwa cultural trail", "Lake Bunyonyi canoe cruise"]
      },
      {
        day: 4,
        title: "Return to Entebbe/Kigali & Departure",
        location: "Entebbe / Kigali",
        description: "Scenic return drive with lunch stop. Transfer to Entebbe (EBB) or Kigali (KGL) airport for your flight home.",
        meals: "Breakfast, Lunch",
        accommodation: "Departure",
        activities: ["Return transfer", "Souvenir shopping"]
      }
    ],
    inclusions: [
      "Official Uganda Wildlife Authority (UWA) Gorilla Trekking Permit (Value $800)",
      "3 nights luxury lodge accommodation on full-board basis",
      "Private 4x4 Safari Land Cruiser with professional driver-guide",
      "Guided Batwa cultural experience and Lake Bunyonyi boat cruise",
      "All park and vehicle entry fees",
      "Bottled mineral water in vehicle throughout the trip"
    ],
    exclusions: [
      "International flights and East Africa tourist visa",
      "Porters for gorilla trekking ($20 tip recommended)",
      "Gratuities for rangers, guides, and lodge staff",
      "Personal travel insurance"
    ],
    faqs: [
      {
        question: "How physically challenging is gorilla trekking in Bwindi?",
        answer: "Treks can range from 1 to 5 hours depending on where the gorilla family is feeding. Moderate fitness is recommended, and porters are available to assist with backpacks and walking sticks."
      }
    ],
    bestSeason: "June – September & December – February",
    transportType: "Private 4x4 Safari Vehicle",
    accommodationType: "Luxury Forest Eco-Lodges",
    rating: 4.97,
    reviewCount: 68
  },
  {
    id: "pkg-south-africa-kruger-cape-8d",
    slug: "best-of-south-africa-cape-town-kruger-8-days",
    title: "8-Day Best of South Africa: Cape Town & Greater Kruger Private Reserve",
    subtitle: "Table Mountain, Cape Winelands & Sabi Sands Big Five Luxury Safari",
    destinationId: "dest-south-africa",
    destinationName: "South Africa",
    country: "South Africa",
    durationDays: 8,
    durationNights: 7,
    pricePerPersonUsd: 3150,
    priceOriginalUsd: 3600,
    groupSize: "Bespoke Private Itinerary",
    travelStyle: "Luxury Safari",
    featured: true,
    popular: false,
    heroImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "Combine the world's most scenic city with Africa's premier Big Five safari. Indulge in Cape Town's dining, Table Mountain cableway, Cape Peninsula penguin colony, and Franschhoek wine tastings, followed by an open-vehicle safari in Kruger's private game concessions.",
    highlights: [
      "Table Mountain aerial cableway & private Cape Peninsula tour",
      "Visit Boulders Beach African Penguin colony",
      "Wine tasting in historic Stellenbosch and Franschhoek estates",
      "3 Nights in a 5-star private safari lodge in Greater Kruger / Sabi Sands",
      "Open 4x4 safari vehicles with tracker and armed ranger (off-roading permitted)"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival in Cape Town",
        location: "Cape Town",
        description: "Welcome at Cape Town International Airport (CPT). Private transfer to luxury hotel at V&A Waterfront.",
        meals: "Dinner",
        accommodation: "The Silo Hotel / Cape Grace Hotel",
        activities: ["Private airport transfer", "V&A Waterfront evening stroll"]
      },
      {
        day: 2,
        title: "Table Mountain & City Tour",
        location: "Cape Town",
        description: "Ascend Table Mountain via rotating cable car. Afternoon walking tour of colorful Bo-Kaap and Company's Garden.",
        meals: "Breakfast, Lunch",
        accommodation: "The Silo Hotel / Cape Grace Hotel",
        activities: ["Table Mountain Cable Car", "Bo-Kaap cultural walk"]
      },
      {
        day: 3,
        title: "Cape Peninsula & Boulders Beach Penguins",
        location: "Cape Peninsula",
        description: "Drive along Chapman's Peak to Cape Point and the Cape of Good Hope. Walk on boardwalks alongside penguins at Boulders Beach.",
        meals: "Breakfast, Lunch",
        accommodation: "The Silo Hotel / Cape Grace Hotel",
        activities: ["Chapman's Peak drive", "Cape Point funicular", "Boulders Beach penguins"]
      },
      {
        day: 4,
        title: "Cape Winelands Gourmet Tour",
        location: "Stellenbosch & Franschhoek",
        description: "Explore the rolling vineyards of Stellenbosch and Franschhoek with cellar tours, wine tastings, and artisan cheese pairings.",
        meals: "Breakfast, Gourmet Lunch",
        accommodation: "The Silo Hotel / Cape Grace Hotel",
        activities: ["Private wine tastings", "Historic estate tours"]
      },
      {
        day: 5,
        title: "Fly Cape Town to Greater Kruger Safari",
        location: "Greater Kruger / Sabi Sands",
        description: "Fly direct to Kruger lodge airstrip. Check in and embark on your first open-vehicle evening safari with spotlight.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sabi Sabi Bush Lodge / Lion Sands Game Reserve",
        activities: ["Flight to Kruger", "Night safari with spotlight"]
      },
      {
        day: 6,
        title: "Full Day Big Five Safari in Sabi Sands",
        location: "Greater Kruger",
        description: "Sunrise open-vehicle safari tracking leopards and lions. Afternoon bush walk and evening sundowner drinks in the wilderness.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sabi Sabi Bush Lodge / Lion Sands Game Reserve",
        activities: ["Dawn game drive", "Guided bush walk", "Sundowner cocktails"]
      },
      {
        day: 7,
        title: "Intensive Wildlife & Predator Tracking",
        location: "Greater Kruger",
        description: "Witness rare sightings of African wild dogs, cheetahs, and rhinos with your master tracker and ranger team.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Sabi Sabi Bush Lodge / Lion Sands Game Reserve",
        activities: ["Morning game drive", "Boma fireside dinner"]
      },
      {
        day: 8,
        title: "Kruger to Johannesburg & Departure",
        location: "Johannesburg",
        description: "Final sunrise game drive. Flight to O.R. Tambo International Airport (JNB) for your flight home.",
        meals: "Breakfast",
        accommodation: "Departure",
        activities: ["Sunrise safari", "Flight to Johannesburg"]
      }
    ],
    inclusions: [
      "4 nights luxury 5-star hotel in Cape Town (Bed & Breakfast)",
      "3 nights all-inclusive luxury safari lodge in Greater Kruger (Full Board + Drinks + Safaris)",
      "Domestic flights: Cape Town to Kruger, Kruger to Johannesburg",
      "Private guided tours in Cape Town (Peninsula, Table Mountain, Winelands)",
      "Twice-daily open 4x4 game drives in private game reserve with ranger and tracker",
      "All park and conservation fees",
      "All private airport and road transfers"
    ],
    exclusions: [
      "International flights and visa fees",
      "Gratuities for rangers and drivers",
      "Personal items and premium champagne/cellar reserve wines"
    ],
    faqs: [
      {
        question: "Why choose a private game reserve over public Kruger National Park?",
        answer: "Private reserves like Sabi Sands allow open-sided 4x4 vehicles, off-road driving to follow predators into the bush, and exhilarating night drives with spotlights that are not permitted in the public national park."
      }
    ],
    bestSeason: "May – September (Safari) & October – April (Cape Town)",
    transportType: "Domestic Scheduled Flights & Open 4x4 Safari Vehicles",
    accommodationType: "5-Star Luxury Boutique Hotels & Private Safari Lodges",
    rating: 4.96,
    reviewCount: 76
  },
  {
    id: "pkg-zanzibar-getaway-5d",
    slug: "zanzibar-spice-and-coral-reefs-getaway-5-days",
    title: "5-Day Tropical Zanzibar Spice & Coral Reefs Island Getaway",
    subtitle: "Stone Town UNESCO Heritage & Luxury Beachfront Resort in Nungwi",
    destinationId: "dest-zanzibar",
    destinationName: "Zanzibar",
    country: "Tanzania",
    durationDays: 5,
    durationNights: 4,
    pricePerPersonUsd: 950,
    priceOriginalUsd: 1150,
    groupSize: "Private / Couples / Families",
    travelStyle: "Beach & Coastal",
    featured: false,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "Unwind on the idyllic spice island of Zanzibar. Discover centuries of history in the labyrinthine alleys of Stone Town, savor tropical spices on organic plantations, snorkel with sea turtles at Mnemba Atoll, and marvel at world-famous African sunsets in Nungwi.",
    highlights: [
      "Guided Stone Town walking tour & House of Wonders history",
      "Aromatic organic spice farm sensory tasting tour",
      "Full day Mnemba Atoll boat & snorkeling cruise with dolphins",
      "Luxury beachfront stay in non-tidal Nungwi/Kendwa beach",
      "Traditional sunset dhow sailing cruise with appetizers"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Stone Town Heritage Tour",
        location: "Stone Town, Zanzibar",
        description: "Meet and greet at Abeid Amani Karume International Airport (ZNZ). Check in to historic heritage hotel. Afternoon walking tour through Stone Town's carved wooden doorways, spice markets, and Old Fort.",
        meals: "Dinner",
        accommodation: "Park Hyatt Zanzibar / Emerson Spice Hotel",
        activities: ["Airport transfer", "Guided Stone Town walk", "Forodhani Gardens night market"]
      },
      {
        day: 2,
        title: "Spice Plantation & Transfer to Nungwi Beach",
        location: "Nungwi Beach",
        description: "Morning tour through a countryside spice plantation smelling fresh cloves, cinnamon, nutmeg, and vanilla. Transfer to luxury beachfront resort in northern Zanzibar.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Royal Zanzibar Beach Resort / Zuri Zanzibar",
        activities: ["Organic spice tasting", "Transfer to north coast beach", "Sunset swim"]
      },
      {
        day: 3,
        title: "Mnemba Atoll Snorkeling & Dolphin Cruise",
        location: "Mnemba Island Atoll",
        description: "Speedboat excursion to Mnemba Atoll marine reserve. Snorkel over pristine coral reefs teeming with colorful reef fish, rays, and dolphins. Seafood BBQ lunch on the beach.",
        meals: "Breakfast, Seafood Lunch, Dinner",
        accommodation: "Royal Zanzibar Beach Resort / Zuri Zanzibar",
        activities: ["Mnemba marine park snorkeling", "Dolphin watching", "Beach BBQ"]
      },
      {
        day: 4,
        title: "Beach Leisure & Sunset Dhow Sailing",
        location: "Nungwi Beach",
        description: "Relax poolside or swim in the tide-free turquoise waters of Nungwi. Late afternoon board a handcrafted wooden dhow for a romantic sunset cruise with Swahili music.",
        meals: "Breakfast, Dinner",
        accommodation: "Royal Zanzibar Beach Resort / Zuri Zanzibar",
        activities: ["Beach relaxation", "Sunset dhow sailing", "Cocktails & appetizers"]
      },
      {
        day: 5,
        title: "Zanzibar Airport Transfer & Departure",
        location: "Zanzibar Airport",
        description: "Leisurely breakfast and final beach walk. Private transfer to Zanzibar Airport (ZNZ) for departure.",
        meals: "Breakfast",
        accommodation: "Departure",
        activities: ["Private airport transfer"]
      }
    ],
    inclusions: [
      "1 night luxury boutique hotel in Stone Town on bed & breakfast",
      "3 nights luxury all-inclusive beachfront resort in Nungwi",
      "Private guided Stone Town UNESCO walking tour with admission fees",
      "Organic spice farm interactive tour with local lunch",
      "Mnemba Atoll private boat tour with snorkeling gear & seafood lunch",
      "Sunset dhow cruise with refreshments",
      "All private airport and hotel transfers in air-conditioned van"
    ],
    exclusions: [
      "International flights and Tanzania visa",
      "Zanzibar mandatory infrastructure tax ($5/night)",
      "Gratuities and personal purchases"
    ],
    faqs: [
      {
        question: "Why are Nungwi and Kendwa beaches recommended?",
        answer: "Unlike the east coast of Zanzibar where the tide goes out very far, Nungwi and Kendwa on the northern tip are non-tidal, meaning you can swim in crystal turquoise water all day long."
      }
    ],
    bestSeason: "June – October & December – March",
    transportType: "Air-Conditioned Private Minivan & Marine Speedboat",
    accommodationType: "5-Star Beachfront Luxury All-Inclusive Resort",
    rating: 4.93,
    reviewCount: 82
  },
  {
    id: "pkg-east-africa-combo-9d",
    slug: "east-africa-grand-highlights-kenya-tanzania-9-days",
    title: "9-Day East Africa Grand Highlights: Kenya & Tanzania Combined",
    subtitle: "Maasai Mara, Serengeti Plains, Ngorongoro Crater & Amboseli",
    destinationId: "dest-kenya",
    destinationName: "Kenya & Tanzania",
    country: "Kenya & Tanzania",
    durationDays: 9,
    durationNights: 8,
    pricePerPersonUsd: 3650,
    priceOriginalUsd: 4100,
    groupSize: "Private 4x4 Safari Land Cruiser",
    travelStyle: "Wildlife Safari",
    featured: true,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "The quintessential East African safari spanning both Kenya and Tanzania. Cross international borders seamlessly to experience the complete Mara-Serengeti ecosystem, the wonders of Ngorongoro Crater, and Amboseli's giant elephants under Mount Kilimanjaro.",
    highlights: [
      "Seamless cross-border safari combining Kenya's Mara and Tanzania's Serengeti",
      "Descent into the UNESCO Ngorongoro Crater floor",
      "Spectacular views of Mount Kilimanjaro in Amboseli",
      "Guaranteed window seats in private 4x4 Safari Land Cruiser",
      "Over 40 hours of thrilling guided game drives"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Amboseli National Park",
        location: "Amboseli, Kenya",
        description: "Depart Nairobi for Amboseli National Park. Afternoon game drive among large elephant herds with Kilimanjaro views.",
        meals: "Lunch, Dinner",
        accommodation: "Amboseli Serena Lodge",
        activities: ["Scenic drive", "Amboseli safari"]
      },
      {
        day: 2,
        title: "Amboseli to Lake Manyara / Tarangire",
        location: "Tanzania Northern Circuit",
        description: "Cross Namanga border into Tanzania. Drive to Tarangire or Lake Manyara for afternoon game drive.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Tarangire Sopa Lodge",
        activities: ["Border crossing assistance", "Tanzania entry safari"]
      },
      {
        day: 3,
        title: "Tarangire to Serengeti National Park",
        location: "Serengeti, Tanzania",
        description: "Drive through Ngorongoro highlands into the vast Serengeti. Game drive through the Seronera valley.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Serengeti Serena Safari Lodge",
        activities: ["Serengeti game drive"]
      },
      {
        day: 4,
        title: "Full Day Serengeti Safari Expedition",
        location: "Serengeti, Tanzania",
        description: "Full day tracking the Big Five and great herds across the iconic savannah.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Serengeti Serena Safari Lodge",
        activities: ["Full day game drive", "Bush picnic"]
      },
      {
        day: 5,
        title: "Serengeti to Ngorongoro Crater Descent",
        location: "Ngorongoro, Tanzania",
        description: "Descend into Ngorongoro Crater for a 6-hour wildlife safari on the caldera floor.",
        meals: "Breakfast, Picnic Lunch, Dinner",
        accommodation: "Ngorongoro Serena Lodge",
        activities: ["Crater floor game drive", "Black Rhino tracking"]
      },
      {
        day: 6,
        title: "Ngorongoro to Isebania Border to Maasai Mara",
        location: "Maasai Mara, Kenya",
        description: "Cross at Isebania border back into Kenya's Maasai Mara. Welcome afternoon game drive.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ashnil Mara Camp",
        activities: ["Border crossing", "Maasai Mara game drive"]
      },
      {
        day: 7,
        title: "Full Day in Maasai Mara National Reserve",
        location: "Maasai Mara, Kenya",
        description: "Track cheetahs, lions, leopards, and Mara River crossings.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ashnil Mara Camp",
        activities: ["Full day safari", "Mara River hippos & crocs"]
      },
      {
        day: 8,
        title: "Maasai Mara Game Drives & Culture",
        location: "Maasai Mara, Kenya",
        description: "Morning safari drive followed by Maasai cultural village visit.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ashnil Mara Camp",
        activities: ["Morning game drive", "Maasai cultural tour"]
      },
      {
        day: 9,
        title: "Maasai Mara to Nairobi & Departure",
        location: "Nairobi, Kenya",
        description: "Morning drive back to Nairobi. Farewell lunch at Carnivore Restaurant and airport drop-off.",
        meals: "Breakfast, Lunch",
        accommodation: "Departure",
        activities: ["Return transfer", "Farewell lunch"]
      }
    ],
    inclusions: [
      "All national park, conservation, and crater descent fees in Kenya and Tanzania",
      "8 nights luxury safari lodge accommodation on full-board",
      "Private 4x4 Safari Land Cruisers in both countries",
      "Professional English-speaking KPSGA certified safari guides",
      "Border crossing facilitation at Namanga and Isebania",
      "AMREF Flying Doctors Medical Evacuation Cover",
      "All meals and drinking water during safari"
    ],
    exclusions: [
      "East Africa Tourist Visa / Tanzania & Kenya entry fees",
      "International flights",
      "Hot air balloon safari ($450-$590 per person)",
      "Gratuities for guides and staff"
    ],
    faqs: [
      {
        question: "Do I need separate visas for Kenya and Tanzania?",
        answer: "You can apply for the East Africa Tourist Visa (covering Kenya, Uganda, Rwanda) plus a single-entry Tanzania eVisa, or individual eVisas for both countries. Our team assists with all visa requirements."
      }
    ],
    bestSeason: "July – October & December – March",
    transportType: "Private 4x4 Safari Land Cruiser",
    accommodationType: "5-Star Serena & Luxury Tented Safari Lodges",
    rating: 4.98,
    reviewCount: 165
  },
  {
    id: "pkg-amboseli-express-3d",
    slug: "amboseli-elephant-sanctuary-express-3-days",
    title: "3-Day Amboseli Elephant Sanctuary Express Safari",
    subtitle: "Magnificent Tuskers with Mount Kilimanjaro Backdrop",
    destinationId: "dest-kenya",
    destinationName: "Kenya",
    country: "Kenya",
    durationDays: 3,
    durationNights: 2,
    pricePerPersonUsd: 790,
    priceOriginalUsd: 920,
    groupSize: "Private 4x4 Safari Land Cruiser",
    travelStyle: "Wildlife Safari",
    featured: false,
    popular: true,
    heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    thumbnail: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
    gallery: [],
    overview: "Short on time but yearning for authentic African wildlife? This 3-day express safari takes you directly from Nairobi to Amboseli National Park for world-class elephant photography against the backdrop of snow-capped Mount Kilimanjaro.",
    highlights: [
      "Close encounters with Africa's famous Amboseli giant tuskers",
      "Breathtaking views of Mount Kilimanjaro at sunrise and sunset",
      "Observation Hill panoramic lookout over marshes filled with pelicans and hippos",
      "Convenient 4-hour scenic drive on smooth tarmac road from Nairobi"
    ],
    itinerary: [
      {
        day: 1,
        title: "Nairobi to Amboseli National Park",
        location: "Amboseli National Park",
        description: "Pickup from Nairobi hotel at 07:30 AM. Arrive at Amboseli lodge for lunch. Afternoon game drive till sunset.",
        meals: "Lunch, Dinner",
        accommodation: "Ol Tukai Lodge / Kibo Safari Camp",
        activities: ["Morning transfer", "Afternoon safari drive"]
      },
      {
        day: 2,
        title: "Full Day in Amboseli with Kilimanjaro Views",
        location: "Amboseli National Park",
        description: "Early dawn game drive when Kilimanjaro skies are clearest. Visit Observation Hill and track lions, cheetahs, and hyenas.",
        meals: "Breakfast, Lunch, Dinner",
        accommodation: "Ol Tukai Lodge / Kibo Safari Camp",
        activities: ["Sunrise photography safari", "Observation Hill viewpoint", "Evening sunset drive"]
      },
      {
        day: 3,
        title: "Amboseli Morning Safari to Nairobi",
        location: "Nairobi",
        description: "Early morning final game drive. Breakfast at lodge, then return drive to Nairobi arriving by early afternoon.",
        meals: "Breakfast, Lunch",
        accommodation: "Departure",
        activities: ["Morning game drive", "Return transfer to Nairobi"]
      }
    ],
    inclusions: [
      "2 nights full-board lodge accommodation in Amboseli",
      "Amboseli National Park entrance and conservation fees",
      "Private 4x4 Safari Land Cruiser with pop-up roof",
      "Professional driver-guide and unlimited game drives",
      "Bottled water in vehicle",
      "AMREF Medical Evacuation Cover"
    ],
    exclusions: [
      "International flights and Kenya eTA",
      "Gratuities for safari guide and lodge staff",
      "Personal drinks and items"
    ],
    faqs: [
      {
        question: "Can this short safari be added as an extension to a business trip in Nairobi?",
        answer: "Absolutely! Amboseli is just a 4-hour drive or 35-minute scheduled flight from Nairobi Wilson Airport, making it the perfect 3-day weekend safari extension."
      }
    ],
    bestSeason: "Year-Round",
    transportType: "Private 4x4 Safari Land Cruiser",
    accommodationType: "Luxury Safari Lodges",
    rating: 4.91,
    reviewCount: 89
  }
];

export const seedServices: TravelService[] = [
  {
    id: "srv-safari",
    slug: "bespoke-safari-expeditions",
    title: "Bespoke Safari Expeditions",
    shortDescription: "Tailor-made private wildlife safaris across Kenya, Tanzania, Uganda, Rwanda, and Southern Africa.",
    fullDescription: "Every safari we craft is custom designed around your travel dreams, pace, and passions. From thrilling Great Migration river crossings and endangered Mountain Gorilla treks to private conservancy night drives, our expert safari architects handle every detail with precision.",
    iconName: "Compass",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Private custom 4x4 Land Cruisers with photography pop-up roofs",
      "Handpicked luxury tented camps and premier safari lodges",
      "Certified KPSGA Silver/Gold driver-guides with decades of wildlife expertise",
      "Private bush dinners, hot air balloon safaris, and night drives"
    ],
    benefits: [
      "100% personalized itinerary with no rigid group constraints",
      "24/7 dedicated safari concierge throughout your journey",
      "Included AMREF Flying Doctors emergency medical evacuation cover"
    ],
    faqs: [
      {
        question: "How far in advance should we book a safari?",
        answer: "For peak migration months (July-October) and gorilla trekking permits, we recommend booking 6 to 12 months in advance to secure premier camps and permits."
      }
    ],
    ctaLabel: "Plan My Custom Safari"
  },
  {
    id: "srv-beach",
    slug: "luxury-beach-and-island-getaways",
    title: "Luxury Beach & Island Holidays",
    shortDescription: "Pristine tropical escapes to Diani Beach, Zanzibar, Seychelles, Mauritius, and Lamu Island.",
    fullDescription: "After the dust and excitement of the savannah, immerse yourself in the turquoise waters and soft white sands of the Indian Ocean. We partner with world-renowned boutique resorts, private island villas, and eco-luxury beach retreats.",
    iconName: "Palmtree",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "All-inclusive luxury beachfront resorts & private villas",
      "Private dhow sunset sailing with fresh seafood feasts",
      "Scuba diving, snorkeling, and kite surfing excursions",
      "Bush-to-beach domestic flights for seamless transitions"
    ],
    benefits: [
      "Exclusive resort amenities, upgrades, and spa credits",
      "Tide-safe swimming beach recommendations",
      "Private airport transfers and local island concierge"
    ],
    faqs: [
      {
        question: "Can we combine a safari with a beach holiday in one trip?",
        answer: "Yes, our Bush & Beach combinations are our most popular itineraries, featuring scheduled bush flights directly from safari airstrips to coastal beaches."
      }
    ],
    ctaLabel: "Explore Beach Getaways"
  },
  {
    id: "srv-flights",
    slug: "international-domestic-flight-ticketing",
    title: "Flight Ticketing & Bush Flights",
    shortDescription: "Seamless international airline ticketing, regional connections, and safari bush plane charters.",
    fullDescription: "Holiday Hype provides accredited flight management services. Whether booking global long-haul flights or chartering a Cessna Caravan into a remote Maasai Mara airstrip, we ensure smooth connections and competitive fares.",
    iconName: "Plane",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80",
    features: [
      "International flights on Emirates, Qatar, Kenya Airways, British Airways, KLM & Delta",
      "Scheduled bush flights via Safarilink, AirKenya, and Coastal Aviation",
      "Private VIP aviation charter management",
      "Flexible rebooking support and baggage advisory for bush planes"
    ],
    benefits: [
      "Real-time ticket issuance and schedule monitoring",
      "Accredited ticketing partner with zero hidden booking surcharges",
      "Immediate assistance in case of airline flight delays or cancellations"
    ],
    faqs: [
      {
        question: "What is the luggage limit on safari bush planes?",
        answer: "Standard bush planes within Kenya and Tanzania enforce a strict 15 kg (33 lbs) luggage limit per person in soft-sided bags to fit in aircraft cargo pods."
      }
    ],
    ctaLabel: "Request Flight Quote"
  },
  {
    id: "srv-hotels",
    slug: "luxury-hotel-lodge-bookings",
    title: "Hotel & Luxury Lodge Bookings",
    shortDescription: "Curated portfolio of 5-star city hotels, wilderness safari lodges, and boutique sanctuaries.",
    fullDescription: "We leverage established relationships with Africa's leading hospitality groups (Serena Hotels, Governors' Camp, Singita, &Beyond, Elewana Collection, Kempinski, and Radisson) to offer exclusive rates and VIP perks.",
    iconName: "Hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Exclusive contracted rates across 500+ vetted luxury properties",
      "Room upgrades and complimentary amenities on availability",
      "Direct lodge liaison for special dietary and anniversary requests",
      "Flexible deposit terms and transparent cancellation policies"
    ],
    benefits: [
      "Best rate guarantee on curated luxury partner lodges",
      "Verified properties adhering to high safety and hygiene standards",
      "Seamless billing and voucher management"
    ],
    faqs: [
      {
        question: "Are meals included in safari lodge bookings?",
        answer: "Almost all safari lodges in our portfolio operate on a Full Board basis (Breakfast, Lunch, and Dinner included) or Game Package basis (inclusive of all game drives and local drinks)."
      }
    ],
    ctaLabel: "Browse Lodges & Hotels"
  },
  {
    id: "srv-corporate",
    slug: "corporate-travel-and-mice",
    title: "Corporate Travel & MICE Management",
    shortDescription: "End-to-end corporate retreat management, incentive trips, conferences, and executive logistics.",
    fullDescription: "From high-stakes board retreats in luxury wilderness sanctuaries to multi-day corporate conferences in Nairobi, Cape Town, and Kigali, we handle logistics, AV, transport, and leisure extensions.",
    iconName: "Briefcase",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Dedicated corporate account manager and SLA agreements",
      "Turnkey conference venue sourcing and staging",
      "Executive VIP airport concierge and fleet transport",
      "Team building wildlife retreats and gala bush dinners"
    ],
    benefits: [
      "Centralized invoicing and corporate expense reporting",
      "Duty of care emergency tracking for business travelers",
      "Cost optimization on group airline and lodge allocations"
    ],
    faqs: [
      {
        question: "Can you manage corporate groups exceeding 50 travelers?",
        answer: "Yes, our MICE department has successfully coordinated corporate delegations and conferences for up to 350 delegates with complete fleet transport and lodging."
      }
    ],
    ctaLabel: "Inquire for Corporate Travel"
  },
  {
    id: "srv-honeymoon",
    slug: "honeymoon-and-romantic-escapes",
    title: "Honeymoon & Romantic Escapes",
    shortDescription: "Unforgettable honeymoon celebrations with private candlelit bush dinners and overwater villas.",
    fullDescription: "Celebrate your love story with bespoke honeymoon touches: hot air balloon champagne breakfasts, private sunset infinity pools, couples spa treatments in the wild, and private dhow cruises.",
    iconName: "Heart",
    image: "https://images.unsplash.com/photo-1528728329032-2972f65dfb3f?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Complimentary honeymoon amenities (chilled sparkling wine, fruit baskets, romantic turndown)",
      "Private secluded honeymoon suites and luxury star-bed decks",
      "Candlelit bush dinners under star-filled African skies",
      "Couples massage and personalized romantic itineraries"
    ],
    benefits: [
      "Personalized romantic itinerary pacing with plenty of private leisure time",
      "Surprise amenities arranged with lodge management",
      "Honeymoon gift registry setup option for couples"
    ],
    faqs: [
      {
        question: "Do hotels require proof of marriage for honeymoon perks?",
        answer: "Some luxury resorts request a marriage certificate dated within 6 to 12 months of travel to validate official honeymoon discounts and complimentary perks."
      }
    ],
    ctaLabel: "Plan My Honeymoon"
  },
  {
    id: "srv-visa-insurance",
    slug: "visa-assistance-and-travel-insurance",
    title: "Visa Assistance & Travel Insurance",
    shortDescription: "Expert guidance on East Africa Tourist Visas, entry requirements, and medical cover.",
    fullDescription: "Navigating international travel protocols is effortless with our advisory service. We guide you through the Kenya Electronic Travel Authorization (eTA), Tanzania eVisa, Uganda/Rwanda permits, and comprehensive travel insurance.",
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    features: [
      "Step-by-step Kenya eTA and Tanzania eVisa application support",
      "AMREF Flying Doctors 500km radius bush medical evacuation cover",
      "Trip cancellation, delay, and baggage loss insurance advice",
      "Yellow fever, malaria, and health protocol consultation"
    ],
    benefits: [
      "Pre-departure document verification to prevent airport check-in delays",
      "Reliable 24/7 medical evacuation dispatch network across East Africa",
      "Up-to-date travel advisory updates from tourism boards"
    ],
    faqs: [
      {
        question: "Is AMREF Flying Doctors cover included in our safari?",
        answer: "Yes, every multi-day safari package booked through Holiday Hype includes complimentary AMREF Flying Doctors emergency medical evacuation cover."
      }
    ],
    ctaLabel: "Ask Travel Consultant"
  }
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "test-1",
    clientName: "David & Sarah Henderson",
    originCountry: "United Kingdom",
    travelerType: "Couple",
    packageTaken: "7-Day Classic Kenya Big 5 & Great Migration Safari",
    rating: 5,
    reviewDate: "August 2025",
    comment: "Our Kenya safari exceeded every possible expectation! Our guide Joseph was phenomenal—he positioned our 4x4 Land Cruiser right in front of a dramatic Mara River crossing with thousands of wildebeests. The lodges were luxurious and the staff made us feel like family.",
    verified: true
  },
  {
    id: "test-2",
    clientName: "Dr. Marcus & Elena Vance",
    originCountry: "United States",
    travelerType: "Family",
    packageTaken: "10-Day Bush & Beach Bliss (Maasai Mara + Diani)",
    rating: 5,
    reviewDate: "October 2025",
    comment: "Traveling with two teenagers can be daunting, but Holiday Hype curated the perfect balance of adventure and relaxation. The direct bush flight from the Mara to Diani Beach was effortless, and the resort at Diani was paradise on earth!",
    verified: true
  },
  {
    id: "test-3",
    clientName: "Claire Dupont",
    originCountry: "France",
    travelerType: "Solo Traveler",
    packageTaken: "4-Day Uganda Mountain Gorilla Trekking",
    rating: 5,
    reviewDate: "November 2025",
    comment: "Locking eyes with a 200kg silverback gorilla in the misty Bwindi forest brought tears to my eyes. Holiday Hype took care of all permits, transport, and lodges with utmost professionalism. I felt completely safe and cared for as a solo female traveler.",
    verified: true
  },
  {
    id: "test-4",
    clientName: "Liam & Chloe O'Connor",
    originCountry: "Australia",
    travelerType: "Couple",
    packageTaken: "6-Day Serengeti & Ngorongoro Ultimate Wildlife Expedition",
    rating: 5,
    reviewDate: "January 2026",
    comment: "Descending into Ngorongoro Crater was like stepping into Jurassic Park. We saw black rhinos, tree-climbing lions, and hundreds of flamingos. Holiday Hype's attention to detail, transparent pricing, and instant communication on WhatsApp was 10/10.",
    verified: true
  },
  {
    id: "test-5",
    clientName: "Amina & Tariq Al-Mansoor",
    originCountry: "United Arab Emirates",
    travelerType: "Couple",
    packageTaken: "5-Day Tropical Zanzibar Spice & Coral Reefs Island Getaway",
    rating: 5,
    reviewDate: "February 2026",
    comment: "A magnificent escape! The resort in Nungwi was immaculate, the private sunset dhow cruise was romantic beyond words, and the spice farm tour was enlightening. Thank you Holiday Hype team!",
    verified: true
  },
  {
    id: "test-6",
    clientName: "Johannes & Anke Mueller",
    originCountry: "Germany",
    travelerType: "Group of Friends",
    packageTaken: "9-Day East Africa Grand Highlights (Kenya & Tanzania)",
    rating: 5,
    reviewDate: "July 2025",
    comment: "The border crossing between Kenya and Tanzania was handled seamlessly by our two drivers. We saw all Big Five in the first three days! Exceptional vehicles and top-notch lodge selections.",
    verified: true
  }
];

export const seedBlogPosts: BlogPost[] = [
  {
    id: "blog-1",
    slug: "ultimate-guide-great-wildebeest-migration-kenya-tanzania",
    title: "The Ultimate Guide to Africa's Great Wildebeest Migration",
    excerpt: "Month-by-month breakdown of the world's largest mammal migration across the Serengeti and Maasai Mara ecosystems.",
    content: `
The Great Wildebeest Migration is often hailed as the Eighth Wonder of the World. Over 1.5 million wildebeests, accompanied by 300,000 zebras and gazelles, complete a relentless 800-kilometer clockwise circular trek across Tanzania's Serengeti and Kenya's Maasai Mara.

### Month-by-Month Migration Calendar

- **January to March (Southern Serengeti - Calving Season):** Over 8,000 calves are born daily on the nutrient-rich volcanic short-grass plains of Ndutu. Predator action with lions, cheetahs, and hyenas is at its peak.
- **April to May (The Long Rains & Central Serengeti):** The herds move northwest into the Western Corridor and Seronera Valley.
- **June to July (Grumeti & Mara River Crossings):** The herds face their first perilous river crossings over the Grumeti River and enter the northern Serengeti.
- **July to October (Kenya's Maasai Mara - The Climax):** The dramatic Mara River crossings take place under the watchful gaze of giant Nile crocodiles. The savannah turns into an ocean of wildlife.
- **November to December (Short Rains Return South):** The herds head back south towards the Serengeti plains to begin the cycle anew.

### Essential Tips for Your Migration Safari
1. **Book 6 to 9 Months Early:** Riverfront tented camps in Maasai Mara and Northern Serengeti sell out very quickly for the July-October peak season.
2. **Prioritize 4x4 Private Vehicles:** A private vehicle allows you to wait patiently by the river crossing without rushing for other guests' schedules.
3. **Bring Binoculars and High-Zoom Cameras:** Wildlife action can occur across wide rivers and vast plains.
    `,
    category: "Safari Guides",
    author: {
      name: "Joseph Kiprono",
      role: "Head Safari Guide & Wildlife Naturalist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2026-02-15",
    readTimeMinutes: 6,
    coverImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    tags: ["Wildebeest Migration", "Maasai Mara", "Serengeti", "Safari Tips"],
    featured: true
  },
  {
    id: "blog-2",
    slug: "serengeti-vs-maasai-mara-which-safari-is-right-for-you",
    title: "Serengeti vs. Maasai Mara: Which Safari Destination is Right for You?",
    excerpt: "Comparing topography, wildlife density, travel logistics, and costs between East Africa's two legendary national reserves.",
    content: `
Deciding between Kenya's Maasai Mara and Tanzania's Serengeti is one of the most common dilemmas for travelers planning their first African safari. While both form a single contiguous ecosystem, each has unique advantages.

### Maasai Mara: High Density & Accessibility
- **Size:** ~1,510 sq km (compact and wildlife-dense).
- **Logistics:** Only a 4.5-hour scenic drive from Nairobi or a 45-minute bush flight from Wilson Airport.
- **Wildlife Concentration:** Because the Mara is smaller, the concentration of big cats per square kilometer is among the highest in the world.
- **Ideal For:** Travelers with limited time (3 to 5 days) seeking maximum predator sightings.

### Serengeti: Vastness & Dramatic Geological Diversity
- **Size:** ~14,763 sq km (nearly ten times the size of Maasai Mara).
- **Terrain:** Endless horizons, granite kopjes (lion rocks), acacia woodlands, and riverine forests.
- **Calving Season:** The famous calving season (Jan-March) occurs exclusively in the southern Serengeti/Ndutu.
- **Ideal For:** Extended safaris (5 to 8+ days) exploring diverse regional zones from Seronera to Kogatende.

### The Verdict: Can You Combine Both?
If you have 8 to 10 days, you don't have to choose! Our combined Kenya & Tanzania packages seamlessly link Amboseli, Maasai Mara, Serengeti, and Ngorongoro Crater.
    `,
    category: "Destination Focus",
    author: {
      name: "Faith Njeri",
      role: "Senior Travel Consultant",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2026-02-02",
    readTimeMinutes: 5,
    coverImage: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Kenya vs Tanzania", "Maasai Mara", "Serengeti", "Planning"],
    featured: true
  },
  {
    id: "blog-3",
    slug: "trekking-mountain-gorillas-rwanda-uganda-what-to-expect",
    title: "Trekking with Mountain Gorillas in Rwanda & Uganda: What to Expect",
    excerpt: "Everything you need to know about permits, packing, fitness requirements, and the magical one-hour encounter.",
    content: `
With fewer than 1,060 mountain gorillas surviving in the wild, trekking to see them in Bwindi Impenetrable Forest (Uganda) or Volcanoes National Park (Rwanda) is widely considered nature's ultimate wildlife pilgrimage.

### Uganda vs. Rwanda: Key Differences
- **Permit Cost:** Uganda permits are currently $800 per person, while Rwanda permits are $1,500 per person.
- **Terrain:** Bwindi (Uganda) is dense tropical rainforest with steep ridges. Volcanoes NP (Rwanda) features bamboo forests with generally shorter treks.
- **Accessibility:** Volcanoes NP is just a 2.5-hour smooth drive from Kigali Airport. Bwindi is an 8-hour drive from Entebbe (or accessible via a 4-hour drive from Kigali across the border).

### The Golden Rules of Gorilla Trekking
1. **Maintain 7-10 Meters Distance:** Gorillas share 98% of human DNA and are vulnerable to human respiratory illnesses.
2. **No Flash Photography:** Flash frightens gorillas. Turn off all camera sounds and flashes.
3. **Hire a Local Porter:** For $20, a porter will carry your daypack and help you over slippery roots, directly supporting local conservation communities.
    `,
    category: "Safari Guides",
    author: {
      name: "Joseph Kiprono",
      role: "Head Safari Guide & Wildlife Naturalist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2026-01-20",
    readTimeMinutes: 7,
    coverImage: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80",
    tags: ["Gorilla Trekking", "Bwindi", "Uganda", "Rwanda"],
    featured: false
  },
  {
    id: "blog-4",
    slug: "zanzibar-spice-island-7-unmissable-hidden-gems",
    title: "Zanzibar Spice Island: 7 Unmissable Hidden Gems & Local Secrets",
    excerpt: "Beyond the white sands: Discover secluded sandbanks, secret rooftop cafes, and spice history.",
    content: `
Zanzibar is far more than just a beach destination. It is a sensory journey where Swahili, Arab, Indian, and Portuguese cultures intertwine across turquoise waters.

### 7 Unmissable Island Highlights
1. **Mnemba Atoll Dolphin & Coral Marine Reserve:** Crystal-clear 25-meter underwater visibility filled with green turtles and colorful damselfish.
2. **Emerson Spice Rooftop Sunset Dining:** Enjoy a 5-course seafood tasting menu with panoramic 360-degree views over Stone Town's minarets.
3. **The Rock Restaurant at Michamvi:** Dine on a coral rock situated in the ocean, reachable by foot at low tide and wooden boat at high tide.
4. **Jozani Chwaka Bay Forest:** The only habitat in the world of the rare Zanzibar Red Colobus Monkey.
5. **Kizimkazi Dhow Sunset Sailing:** Sail alongside wild bottlenose dolphins in the southern bay.
6. **Forodhani Gardens Night Food Market:** Taste Zanzibar pizza, grilled lobster skewers, and freshly pressed sugarcane juice with ginger.
7. **Paje & Kendwa Bioluminescent Night Plankton:** Experience glowing night waters under new moon skies.
    `,
    category: "Travel Tips",
    author: {
      name: "Faith Njeri",
      role: "Senior Travel Consultant",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2026-01-10",
    readTimeMinutes: 5,
    coverImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Zanzibar", "Stone Town", "Beach Holiday", "Island Guides"],
    featured: false
  },
  {
    id: "blog-5",
    slug: "top-10-packing-essentials-for-your-first-african-safari",
    title: "Top 10 Packing Essentials for Your First African Safari",
    excerpt: "What to wear, what gear to bring, and what to leave at home for an unforgettable safari expedition.",
    content: `
Packing for your first safari can feel tricky, especially with bush flight luggage restrictions (15kg soft-sided bags). Here is our expert guide on what to pack.

### 1. Neutral-Toned Clothing
Pack khaki, olive green, beige, and tan tones. Avoid bright white (shows red dust quickly) and dark blue or black (which attract tsetse flies in woodland areas).

### 2. Layers for Cold Mornings and Warm Afternoons
Game drives start at dawn (6:00 AM) when savannah temperatures can dip to 12°C, before reaching 28°C by midday. Bring a fleece jacket or windbreaker you can strip off easily.

### 3. Compact High-Quality Binoculars (8x42 or 10x42)
Do not rely solely on your camera lens. A good pair of binoculars brings distant leopard sightings right in front of your eyes.

### 4. Wide-Brimmed Hat & Polarized Sunglasses
Protection against the equatorial sun during open-roof game drives is vital.

### 5. Insect Repellent with DEET & High-SPF Sunscreen
Essential for evenings by the campfire and sunny game drives.

### 6. Power Bank and Multi-Country Plug Adapter
Kenya and Tanzania use British Type G 3-pin plugs.
    `,
    category: "Travel Tips",
    author: {
      name: "David Kimani",
      role: "Operations Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2025-12-18",
    readTimeMinutes: 4,
    coverImage: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Packing List", "Safari Prep", "Travel Tips"],
    featured: false
  },
  {
    id: "blog-6",
    slug: "sustainable-tourism-how-your-safari-protects-wildlife",
    title: "Sustainable Tourism: How Your Safari Supports Wildlife Conservation",
    excerpt: "Discover how conservation fees, community conservancies, and eco-lodges safeguard endangered species and empower indigenous communities.",
    content: `
When you travel with Holiday Hype Tours & Travel, your journey directly funds the protection of vulnerable ecosystems and community livelihoods.

### Where Does Your Safari Money Go?
1. **Anti-Poaching Ranger Patrols:** A significant portion of your national park entry fee directly pays ranger salaries, canine tracking units, and aerial surveillance.
2. **Community Land Conservancies:** Conservancies like Mara North and Ol Pejeta lease land from Maasai and Samburu landowners, providing steady family income while keeping wildlife corridors open.
3. **Local Employment & Training:** Over 90% of our driver-guides, camp chefs, and naturalists come from adjacent indigenous communities.
4. **Clean Water & School Initiatives:** We partner with local schools around the Maasai Mara and Amboseli to support classroom building and solar power installation.
    `,
    category: "Wildlife Conservation",
    author: {
      name: "David Kimani",
      role: "Operations Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "2025-12-05",
    readTimeMinutes: 5,
    coverImage: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Conservation", "Eco Tourism", "Community Impact"],
    featured: false
  }
];

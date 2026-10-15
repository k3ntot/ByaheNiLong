/**
 * Byahe ni Long - Website & Digital Business Card Configuration
 * -------------------------------------------------------------
 * Edit this centralized configuration file to update brand information,
 * main banner/profile image, travel gallery photos and destinations,
 * contact numbers, and social media channels without editing HTML/CSS.
 */

const SITE_CONFIG = {
  // Brand Information
  brand: {
    name: "Byahe ni Long",
    tagline: "Mga Lakad, Tanawin, at Kwentong Baon.",
    shortIntro:
      "Tara, samahan ako sa pag-explore ng mga lugar, pagtuklas ng bagong destinations, at pagbuo ng mga kwentong sulit balikan.",
    aboutHeading: "Kilala si Long",
    aboutBio:
      "Kumusta! Ako si Long. Hilig kong maglakbay, umakyat sa mga bundok, tumambay sa tabing-dagat, at tuklasin ang kagandahan ng iba't ibang sulok ng ating bansa at karatig-lugar. Binuo ko ang Byahe ni Long upang ibahagi ang mga tunay na karanasan, magagandang tanawin, at mga kwentong baon sa bawat byahe. Tara, sabay tayong maglakbay!",
    // Official brand and profile image (main banner image)
    mainBanner: "assets/images/main-banner.jpg",
    avatar: "assets/images/main-banner.jpg",
    badgeText: "Travel & Adventure",
  },

  // Contact Details
  contact: {
    phoneDisplay: "0956 092 9225",
    phoneTel: "+639560929225",
    phoneSms: "09560929225",
    email: "", // Optional: e.g. "byahenilong@gmail.com"
    locationBadge: "Philippines",
    cardVCard: {
      firstName: "Long",
      lastName: "Byahe ni Long",
      organization: "Byahe ni Long",
      title: "Travel Content Creator",
      note: "Mga Lakad, Tanawin, at Kwentong Baon. | https://www.facebook.com/ByaheNiLong",
    },
  },

  // Social Media Accounts
  // To activate Instagram, TikTok, YouTube, or other channels in the future,
  // simply provide the respective URL. Unconfigured accounts (empty URL) remain hidden.
  socials: [
    {
      id: "facebook",
      name: "Facebook",
      label: "Follow Byahe ni Long on Facebook",
      shortLabel: "Facebook",
      handle: "@ByaheNiLong",
      url: "https://www.facebook.com/ByaheNiLong",
      isPrimary: true,
      description: "Ang aming opisyal na tambayan para sa mga photos, videos, at travel updates.",
    },
    {
      id: "instagram",
      name: "Instagram",
      label: "Follow on Instagram",
      shortLabel: "Instagram",
      handle: "@byahenilong",
      url: "", // Leave blank until ready; e.g. "https://www.instagram.com/byahenilong"
      isPrimary: false,
      description: "Visual stories at adventure highlights.",
    },
    {
      id: "tiktok",
      name: "TikTok",
      label: "Follow on TikTok",
      shortLabel: "TikTok",
      handle: "@byahenilong",
      url: "", // Leave blank until ready; e.g. "https://www.tiktok.com/@byahenilong"
      isPrimary: false,
      description: "Short-form travel clips, tips, at reels.",
    },
    {
      id: "youtube",
      name: "YouTube",
      label: "Subscribe on YouTube",
      shortLabel: "YouTube",
      handle: "@byahenilong",
      url: "", // Leave blank until ready; e.g. "https://www.youtube.com/@byahenilong"
      isPrimary: false,
      description: "Full travel vlogs at in-depth travel guides.",
    },
  ],

  // Travel & Adventure Gallery Photos
  // Grouped and categorized by destination based on the provided photo filenames.
  // The main banner image is reserved for the hero brand section and excluded here.
  galleryCategories: [
    { id: "all", name: "Lahat" },
    { id: "siargao", name: "Siargao" },
    { id: "balabac", name: "Balabac" },
    { id: "calaguas", name: "Calaguas" },
    { id: "taipei", name: "Taipei" },
  ],

  gallery: [
    // --- Siargao ---
    {
      id: "siargao-1",
      category: "siargao",
      destination: "Siargao",
      title: "Maasin River",
      caption: "Siargao",
      image: "assets/images/siargao1.jpg",
      tag: "River & Palms",
    },
    {
      id: "siargao-2",
      category: "siargao",
      destination: "Siargao",
      title: "Cloud 9 Boardwalk",
      caption: "Siargao",
      image: "assets/images/siargao2.jpg",
      tag: "Ocean Pier",
    },
    {
      id: "siargao-3",
      category: "siargao",
      destination: "Siargao",
      title: "Coconut Mountain View",
      caption: "Siargao",
      image: "assets/images/siargao3.jpg",
      tag: "Viewpoint",
    },

    // --- Balabac ---
    {
      id: "balabac-1",
      category: "balabac",
      destination: "Balabac",
      title: "Onuk Island Sandbar",
      caption: "Balabac",
      image: "assets/images/balabac1.jpg",
      tag: "Sandbar & Reef",
    },
    {
      id: "balabac-2",
      category: "balabac",
      destination: "Balabac",
      title: "Crystal Waters",
      caption: "Balabac",
      image: "assets/images/balabac2.jpg",
      tag: "Lagoon Swim",
    },
    {
      id: "balabac-3",
      category: "balabac",
      destination: "Balabac",
      title: "Overwater Haven",
      caption: "Balabac",
      image: "assets/images/balabac3.jpg",
      tag: "Stilt Cottage",
    },

    // --- Calaguas ---
    {
      id: "calaguas-1",
      category: "calaguas",
      destination: "Calaguas",
      title: "Mahabang Buhangin Coast",
      caption: "Calaguas",
      image: "assets/images/calaguas1.jpg",
      tag: "White Beach",
    },
    {
      id: "calaguas-2",
      category: "calaguas",
      destination: "Calaguas",
      title: "Calaguas Hilltop",
      caption: "Calaguas",
      image: "assets/images/calaguas2.jpg",
      tag: "Hill Viewpoint",
    },
    {
      id: "calaguas-3",
      category: "calaguas",
      destination: "Calaguas",
      title: "Island Hopping Cruise",
      caption: "Calaguas",
      image: "assets/images/calaguas3.jpg",
      tag: "Boat Trip",
    },

    // --- Taipei ---
    {
      id: "taipei-1",
      category: "taipei",
      destination: "Taipei",
      title: "Tiaoshi Coastal Stop",
      caption: "Taipei",
      image: "assets/images/taepei1.jpg",
      tag: "Coastal Trail",
    },
    {
      id: "taipei-2",
      category: "taipei",
      destination: "Taipei",
      title: "Yehliu Geopark",
      caption: "Taipei",
      image: "assets/images/taepe2.jpg",
      tag: "Rock Formations",
    },
    {
      id: "taipei-3",
      category: "taipei",
      destination: "Taipei",
      title: "Remains of the 13 Levels",
      caption: "Taipei",
      image: "assets/images/taepei3.jpg",
      tag: "Historic Ruins",
    },
  ],

  // Footer configuration
  footer: {
    brandName: "Byahe ni Long",
    closingMessage: "Mga Lakad, Tanawin, at Kwentong Baon.",
    facebookUrl: "https://www.facebook.com/ByaheNiLong",
    phoneDisplay: "0956 092 9225",
  },
};

// Export for module systems or fallback to window
if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}

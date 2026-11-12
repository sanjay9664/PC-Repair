export type DeviceType = "Laptop" | "Desktop PC" | "Peripheral";

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  quickDevice: DeviceType;
  quickService: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  deviceValue: DeviceType;
  defaultService: string;
  icon: string;
  accent: string;
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  commonIssues: string[];
}

export interface HardwarePart {
  id: string;
  name: string;
  serviceValue: string;
  deviceValue: DeviceType;
  icon: string;
  tagline: string;
  symptoms: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  category: "Pricing & Visit" | "Booking & Tracking" | "Repairs & Parts";
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  brandName: "A M Hardware & Software",
  brandTagline: "Services at Doorstep",
  fullBrandName: "A M Hardware & Software Services at Doorstep",
  shortName: "AM",
  primaryPhone: "+91 7323 877 289",
  primaryPhoneTel: "+917323877289",
  secondaryPhone: "9643627724",
  whatsappPrimary: "917323877289",
  whatsappSecondary: "919643627724",
  email: "ankitkushwaha732287@gmail.com",
  secondaryEmail: "mohit88srivastav@gmail.com",
  serviceAreas: ["Noida", "Ghaziabad", "Vijay Nagar, Ghaziabad"] as const,
  paymentModes: ["UPI", "Cash"] as const,
  timeSlots: [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 4 PM)",
    "Evening (4 PM - 8 PM)",
  ] as const,
  visitNote:
    "Visit and diagnosis charges are confirmed according to your exact location before the technician visits.",
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-laptop",
    badge: "Doorstep Service • Noida • Ghaziabad • Vijay Nagar",
    title: "PC or Laptop Problem?",
    highlight: "We Come to You.",
    subtitle:
      "Fast doorstep laptop & computer repair, genuine spare parts replacement, peripherals setup, and OS troubleshooting right at your home or office.",
    image: "/images/hero-laptop-repair.jpg",
    imageAlt: "Technician repairing a laptop at a customer's doorstep desk",
    primaryCtaLabel: "Book a Technician",
    primaryCtaHref: "/book-service",
    quickDevice: "Laptop",
    quickService: "General Diagnosis / Repair",
  },
  {
    id: "slide-desktop",
    badge: "Desktop PC & Speed Upgrades • On-Site Diagnosis",
    title: "Slow PC, No Display or",
    highlight: "RAM / SSD Upgrade?",
    subtitle:
      "Complete desktop PC troubleshooting, boot error fixes, NVMe/SATA SSD speed upgrades, SMPS checks, and thermal care without carrying your tower anywhere.",
    image: "/images/hero-desktop-upgrade.jpg",
    imageAlt: "Modern desktop PC workstation with RAM and SSD upgrade internals",
    primaryCtaLabel: "Book Desktop Service",
    primaryCtaHref: "/book-service?device=Desktop+PC&service=SSD+%2F+HDD",
    quickDevice: "Desktop PC",
    quickService: "SSD / HDD",
  },
  {
    id: "slide-parts",
    badge: "Screen • Battery • Keyboard • DC Jack • Body",
    title: "Quality Laptop Parts",
    highlight: "Replaced at Home.",
    subtitle:
      "Broken screen, draining battery, faulty keyboard, loose charging DC jack, or damaged hinges? Share your laptop brand & model directly on WhatsApp or Email.",
    image: "/images/hero-hardware-parts.jpg",
    imageAlt: "Laptop replacement screen, battery, keyboard, SSD, RAM, and tools",
    primaryCtaLabel: "Explore Hardware Parts",
    primaryCtaHref: "/hardware-parts",
    quickDevice: "Laptop",
    quickService: "Screen",
  },
];

export const QUICK_SELECT_ITEMS: Array<{
  label: string;
  icon: string;
  device: DeviceType;
  service: string;
}> = [
  { label: "Laptop", icon: "bi-laptop", device: "Laptop", service: "General Diagnosis / Repair" },
  { label: "Desktop PC", icon: "bi-pc-display", device: "Desktop PC", service: "General Diagnosis / Repair" },
  { label: "Screen", icon: "bi-display", device: "Laptop", service: "Screen" },
  { label: "Keyboard", icon: "bi-keyboard", device: "Laptop", service: "Keyboard" },
  { label: "Battery", icon: "bi-battery-charging", device: "Laptop", service: "Battery" },
  { label: "SSD / HDD", icon: "bi-hdd", device: "Laptop", service: "SSD / HDD" },
  { label: "Software / OS", icon: "bi-gear", device: "Laptop", service: "Software / OS" },
  { label: "Peripherals", icon: "bi-mouse", device: "Peripheral", service: "Mouse / Peripheral" },
];

export const SERVICE_OPTIONS = [
  "General Diagnosis / Repair",
  "Screen",
  "Keyboard",
  "Battery",
  "DC Jack",
  "Laptop Body",
  "Speaker",
  "SSD / HDD",
  "RAM / Performance Upgrade",
  "Mouse / Peripheral",
  "Software / OS",
] as const;

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "laptop-repair",
    title: "Laptop Repair",
    deviceValue: "Laptop",
    defaultService: "General Diagnosis / Repair",
    icon: "bi-laptop",
    accent: "primary",
    image: "/images/hero-laptop-repair.jpg",
    imageAlt: "Doorstep laptop hardware diagnosis and repair",
    description:
      "Complete doorstep diagnosis and repair for common laptop hardware faults, power issues, overheating, and slow performance.",
    highlights: [
      "No power, charging & DC jack issues",
      "Broken screen, keyboard & hinge/body repair",
      "Battery replacement & overheating care",
    ],
    commonIssues: [
      "Laptop not turning on or sudden shutdown",
      "Dim, cracked, or flickering display",
      "Hinge damage or fan making loud noise",
    ],
  },
  {
    id: "desktop-repair",
    title: "Desktop / PC Repair",
    deviceValue: "Desktop PC",
    defaultService: "General Diagnosis / Repair",
    icon: "bi-pc-display",
    accent: "indigo",
    image: "/images/hero-desktop-upgrade.jpg",
    imageAlt: "Desktop PC tower internal diagnostics and RAM/SSD upgrade",
    description:
      "On-site troubleshooting for home and office desktops—from sudden shutdowns and display errors to RAM and storage upgrades.",
    highlights: [
      "No display, beep codes & boot failures",
      "SMPS, motherboard & RAM diagnostics",
      "SSD / HDD upgrade for faster speed",
    ],
    commonIssues: [
      "CPU powers on but monitor shows no signal",
      "Blue screen (BSOD) or Windows stuck on boot",
      "Slow loading requiring SSD or RAM upgrade",
    ],
  },
  {
    id: "peripherals",
    title: "Peripherals & Accessories",
    deviceValue: "Peripheral",
    defaultService: "Mouse / Peripheral",
    icon: "bi-keyboard",
    accent: "teal",
    image: "/images/hero-hardware-parts.jpg",
    imageAlt: "Laptop and desktop peripherals, SSD, keyboard, and tools",
    description:
      "Setup, replacement, and troubleshooting for external keyboards, mice, speakers, storage drives, and essential computer peripherals.",
    highlights: [
      "Keyboard, mouse & speaker setup",
      "External & internal SSD / HDD setup",
      "Port, cable & connectivity checks",
    ],
    commonIssues: [
      "USB devices or external hard drives not detected",
      "Wireless keyboard/mouse pairing or lag issues",
      "Audio output / speaker distortion problems",
    ],
  },
  {
    id: "software-support",
    title: "Software & OS Support",
    deviceValue: "Laptop",
    defaultService: "Software / OS",
    icon: "bi-cpu",
    accent: "amber",
    image: "/images/service-software-os.jpg",
    imageAlt: "Laptop showing clean system optimization and OS troubleshooting",
    description:
      "Clean OS installation, driver updates, system optimization, startup cleanup, and network/Wi-Fi troubleshooting right at your desk.",
    highlights: [
      "Windows OS setup & driver installation",
      "Slow system cleanup & optimization",
      "Wi-Fi, Bluetooth & software errors",
    ],
    commonIssues: [
      "Corrupted Windows OS or missing display/audio drivers",
      "High disk/CPU usage making PC sluggish",
      "Wi-Fi disconnecting or printer/peripheral driver failure",
    ],
  },
];

export const HARDWARE_PARTS: HardwarePart[] = [
  {
    id: "screen",
    name: "Screen",
    serviceValue: "Screen",
    deviceValue: "Laptop",
    icon: "bi-display",
    tagline: "Cracked, flickering, or dim display check & replacement",
    symptoms: ["Dead lines or black ink spots", "Dim backlight or blank screen", "Physical crack"],
  },
  {
    id: "keyboard",
    name: "Keyboard",
    serviceValue: "Keyboard",
    deviceValue: "Laptop",
    icon: "bi-keyboard",
    tagline: "Non-working keys, auto-typing, or full keyboard replacement",
    symptoms: ["Keys not responding", "Liquid spill damage", "Repeated key presses"],
  },
  {
    id: "battery",
    name: "Battery",
    serviceValue: "Battery",
    deviceValue: "Laptop",
    icon: "bi-battery-half",
    tagline: "Fast drain, swollen battery, or laptop dying without charger",
    symptoms: ["0% plugged in not charging", "Backup under 20 minutes", "Swollen touchpad/base"],
  },
  {
    id: "dc-jack",
    name: "DC Jack",
    serviceValue: "DC Jack",
    deviceValue: "Laptop",
    icon: "bi-plug",
    tagline: "Loose charging port or intermittent adapter connection fix",
    symptoms: ["Need to wiggle charger pin", "No charging LED light", "Broken port pin"],
  },
  {
    id: "laptop-body",
    name: "Laptop Body",
    serviceValue: "Laptop Body",
    deviceValue: "Laptop",
    icon: "bi-shield-check",
    tagline: "Broken hinges, cracked casing, or screen bezel restoration",
    symptoms: ["Lid stiff or separating", "Cracked bottom panel", "Loose display hinge"],
  },
  {
    id: "speaker",
    name: "Speaker",
    serviceValue: "Speaker",
    deviceValue: "Laptop",
    icon: "bi-volume-up",
    tagline: "Crackling sound, low volume, or no internal speaker audio",
    symptoms: ["Distorted or buzzing sound", "No sound from left/right side", "Muted internal audio"],
  },
  {
    id: "ssd-hdd",
    name: "SSD / HDD",
    serviceValue: "SSD / HDD",
    deviceValue: "Laptop",
    icon: "bi-hdd-stack",
    tagline: "NVMe/SATA SSD upgrade, boot drive setup & storage health check",
    symptoms: ["100% disk usage in Task Manager", "Boot drive not found", "Need faster boot speed"],
  },
  {
    id: "ram-upgrade",
    name: "RAM & Speed Boost",
    serviceValue: "RAM / Performance Upgrade",
    deviceValue: "Desktop PC",
    icon: "bi-memory",
    tagline: "Memory upgrade for smoother multitasking, work & office apps",
    symptoms: ["Browser/apps freezing", "Low available RAM", "Lag during multitasking"],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Share Your Issue",
    description:
      "Fill out the booking form and send your ticket directly on WhatsApp or Email in one click.",
    icon: "bi-send-check",
  },
  {
    step: "02",
    title: "Confirm Visit & Slot",
    description:
      "We verify your Noida / Ghaziabad / Vijay Nagar address, confirm the visit charge upfront, and lock your time slot.",
    icon: "bi-calendar2-check",
  },
  {
    step: "03",
    title: "Doorstep Diagnosis",
    description:
      "Our technician inspects your laptop or desktop right in front of you and shares a clear repair estimate.",
    icon: "bi-tools",
  },
  {
    step: "04",
    title: "Repair & Easy Pay",
    description:
      "After testing everything with you, pay conveniently via UPI or Cash—zero advance payment needed.",
    icon: "bi-wallet2",
  },
];

export const TRUST_PILLARS = [
  {
    icon: "bi-house-door",
    title: "100% Doorstep Service",
    text: "Skip carrying your PC or laptop in traffic—we visit your home or office.",
  },
  {
    icon: "bi-geo-alt",
    title: "Local NCR Coverage",
    text: "Dedicated service across Noida, Ghaziabad, and Vijay Nagar.",
  },
  {
    icon: "bi-cash-coin",
    title: "Transparent Visit Quote",
    text: "Visit/diagnosis fee is confirmed based on your location before dispatch.",
  },
  {
    icon: "bi-qr-code-scan",
    title: "UPI & Cash Accepted",
    text: "Flexible payment after service completion and live testing.",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    category: "Pricing & Visit",
    question: "How much is the doorstep visit or diagnosis charge?",
    answer:
      "Visit and diagnosis charges are not fixed across all locations—they depend on your exact sector or locality in Noida, Ghaziabad, or Vijay Nagar. Once you send your query via WhatsApp or Email, we confirm the exact visit charge with you before dispatching a technician.",
  },
  {
    id: "faq-2",
    category: "Pricing & Visit",
    question: "What payment methods are accepted after repair?",
    answer:
      "We accept both UPI and Cash. You pay only after the technician completes the diagnosis or repair and tests the system with you.",
  },
  {
    id: "faq-3",
    category: "Booking & Tracking",
    question: "Which areas do you currently cover?",
    answer:
      "We provide doorstep laptop, desktop PC, and peripheral services across Noida, Ghaziabad, and Vijay Nagar (Ghaziabad).",
  },
  {
    id: "faq-4",
    category: "Booking & Tracking",
    question: "How does booking work without an online payment or account login?",
    answer:
      "Fill out the booking form on our Book Service page (or home page). It generates a Ticket Reference (AM-YYYY-XXXXXX) and prepares a structured summary you can send straight to WhatsApp (+91 7323 877 289) or Email (ankitkushwaha732287@gmail.com & mohit88srivastav@gmail.com) in one click.",
  },
  {
    id: "faq-5",
    category: "Repairs & Parts",
    question: "Can I share a photo of my broken screen or laptop problem?",
    answer:
      "Yes! Select the photo in the booking form to preview it, and once WhatsApp or Email opens with your pre-filled ticket details, attach the image directly in the chat or email.",
  },
  {
    id: "faq-6",
    category: "Repairs & Parts",
    question: "Do I need to know my exact laptop model before booking?",
    answer:
      "Sharing your brand/model (e.g., Dell Inspiron 3511, HP Pavilion 15, Lenovo IdeaPad) helps us check spare part availability (like Screen, Battery, or Keyboard) before visiting, though it is optional if you are unsure.",
  },
];

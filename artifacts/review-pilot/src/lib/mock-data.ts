export type ReviewStatus = "Posted" | "Pending" | "Failed" | "Skipped" | "Waiting";
export type Sentiment = "Positive" | "Neutral" | "Negative";
export type OwnerAction = "YES" | "EDIT" | "SKIP" | "Pending";

export interface Review {
  id: string;
  reviewerName: string;
  reviewerInitials: string;
  rating: number;
  text: string;
  location: string;
  date: string;
  sentiment: Sentiment;
  aiDraftStatus: "Ready" | "Generating" | "None";
  ownerAction: OwnerAction;
  replyStatus: ReviewStatus;
  aiReply?: string;
  toneUsed?: string;
  templateUsed?: string;
}

export const mockReviews: Review[] = [
  {
    id: "r1",
    reviewerName: "Priya Sharma",
    reviewerInitials: "PS",
    rating: 5,
    text: "Absolutely loved the service! The staff was incredibly professional and the ambiance was perfect. Will definitely come back.",
    location: "Glow Salon - Pune Branch",
    date: "2025-01-10",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "Pending",
    replyStatus: "Waiting",
    aiReply: "Thank you so much, Priya! We're thrilled to hear you loved your experience at Glow Salon Pune. Our team works hard to make every visit special. We can't wait to welcome you back!",
    toneUsed: "Warm",
    templateUsed: "5-star Happy Customer",
  },
  {
    id: "r2",
    reviewerName: "Rahul Mehta",
    reviewerInitials: "RM",
    rating: 4,
    text: "Great service overall. The haircut was excellent but waiting time was a bit long. Would recommend though.",
    location: "Glow Salon - Mumbai Branch",
    date: "2025-01-09",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "YES",
    replyStatus: "Posted",
    aiReply: "Thank you, Rahul! We appreciate your kind words. We're working on reducing wait times and hope to serve you even better next visit!",
    toneUsed: "Friendly",
    templateUsed: "4-star Positive Review",
  },
  {
    id: "r3",
    reviewerName: "Anita Patel",
    reviewerInitials: "AP",
    rating: 1,
    text: "Very disappointed with the service. Had to wait for over an hour and the staff was rude. Will not be returning.",
    location: "Glow Salon - Mumbai Branch",
    date: "2025-01-08",
    sentiment: "Negative",
    aiDraftStatus: "Ready",
    ownerAction: "Pending",
    replyStatus: "Waiting",
    aiReply: "Dear Anita, we sincerely apologize for the experience you had. This is not the standard we hold ourselves to. We would love to connect with you personally to make things right. Please reach out to us directly.",
    toneUsed: "Apologetic",
    templateUsed: "1-2 Star Complaint",
  },
  {
    id: "r4",
    reviewerName: "Vikram Singh",
    reviewerInitials: "VS",
    rating: 5,
    text: "Best salon experience in Delhi! The team is amazing. Highly recommend.",
    location: "Glow Salon - Delhi NCR",
    date: "2025-01-07",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "YES",
    replyStatus: "Posted",
    aiReply: "Thank you Vikram! We're so glad you had a wonderful experience at our Delhi branch. See you soon!",
    toneUsed: "Warm",
    templateUsed: "5-star Happy Customer",
  },
  {
    id: "r5",
    reviewerName: "Sunita Rao",
    reviewerInitials: "SR",
    rating: 2,
    text: "The color treatment I got was not what I asked for. Very unhappy with the result.",
    location: "Glow Salon - Pune Branch",
    date: "2025-01-06",
    sentiment: "Negative",
    aiDraftStatus: "Ready",
    ownerAction: "EDIT",
    replyStatus: "Skipped",
    aiReply: "Dear Sunita, we're truly sorry about your hair color experience. Please visit us again and we'll make sure to get it right at no extra charge.",
    toneUsed: "Apologetic",
    templateUsed: "Salon Service Complaint",
  },
  {
    id: "r6",
    reviewerName: "Mohit Kumar",
    reviewerInitials: "MK",
    rating: 3,
    text: "Decent service. Nothing outstanding but not bad either. Prices are a bit high.",
    location: "Glow Salon - Pune Branch",
    date: "2025-01-05",
    sentiment: "Neutral",
    aiDraftStatus: "None",
    ownerAction: "Pending",
    replyStatus: "Pending",
  },
  {
    id: "r7",
    reviewerName: "Deepa Nair",
    reviewerInitials: "DN",
    rating: 5,
    text: "Fantastic experience every single time. The staff remembers my preferences!",
    location: "Glow Salon - Delhi NCR",
    date: "2025-01-04",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "YES",
    replyStatus: "Posted",
    aiReply: "Thank you Deepa! Your loyalty means the world to us. We love seeing you!",
    toneUsed: "Warm",
    templateUsed: "5-star Happy Customer",
  },
  {
    id: "r8",
    reviewerName: "Arjun Verma",
    reviewerInitials: "AV",
    rating: 4,
    text: "Good place but the parking is terrible. Service itself is great.",
    location: "Glow Salon - Mumbai Branch",
    date: "2025-01-03",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "Pending",
    replyStatus: "Waiting",
    aiReply: "Thanks for the feedback Arjun! We hear you on the parking - it's something we're actively looking into. So glad you enjoyed the service!",
    toneUsed: "Friendly",
    templateUsed: "4-star Positive Review",
  },
  {
    id: "r9",
    reviewerName: "Kavita Joshi",
    reviewerInitials: "KJ",
    rating: 1,
    text: "The therapist was extremely rough during the massage. Never coming back.",
    location: "Glow Salon - Pune Branch",
    date: "2025-01-02",
    sentiment: "Negative",
    aiDraftStatus: "Ready",
    ownerAction: "Pending",
    replyStatus: "Waiting",
    aiReply: "Dear Kavita, we're extremely sorry to hear this. This is not acceptable and we have addressed it with our team. We'd like to offer you a complimentary session to make it right.",
    toneUsed: "Apologetic",
    templateUsed: "Staff Behavior Complaint",
  },
  {
    id: "r10",
    reviewerName: "Rajan Gupta",
    reviewerInitials: "RG",
    rating: 5,
    text: "Excellent! The new branch in Delhi has a lovely ambiance. Worth every penny.",
    location: "Glow Salon - Delhi NCR",
    date: "2025-01-01",
    sentiment: "Positive",
    aiDraftStatus: "Ready",
    ownerAction: "YES",
    replyStatus: "Posted",
    aiReply: "Thank you so much Rajan! We put a lot of heart into the Delhi branch. We hope to see you again soon!",
    toneUsed: "Professional",
    templateUsed: "5-star Happy Customer",
  },
];

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  avgRating: number;
  totalReviews: number;
  pendingReplies: number;
  negativeReviews: number;
  autoReplyMode: "Safe" | "Balanced" | "Auto";
  whatsappContact: string;
  status: "Connected" | "Needs Reconnect" | "Sync Failed";
}

export const mockLocations: Location[] = [
  {
    id: "l1",
    name: "Glow Salon - Pune Branch",
    address: "12, MG Road, Koregaon Park",
    city: "Pune",
    country: "India",
    avgRating: 4.5,
    totalReviews: 387,
    pendingReplies: 5,
    negativeReviews: 2,
    autoReplyMode: "Balanced",
    whatsappContact: "+91 98765 43210",
    status: "Connected",
  },
  {
    id: "l2",
    name: "Glow Salon - Mumbai Branch",
    address: "45, Linking Road, Bandra West",
    city: "Mumbai",
    country: "India",
    avgRating: 4.1,
    totalReviews: 512,
    pendingReplies: 18,
    negativeReviews: 4,
    autoReplyMode: "Safe",
    whatsappContact: "+91 91234 56789",
    status: "Needs Reconnect",
  },
  {
    id: "l3",
    name: "Glow Salon - Delhi NCR",
    address: "8, Connaught Place",
    city: "New Delhi",
    country: "India",
    avgRating: 4.7,
    totalReviews: 203,
    pendingReplies: 0,
    negativeReviews: 0,
    autoReplyMode: "Auto",
    whatsappContact: "+91 80000 12345",
    status: "Connected",
  },
];

export interface Template {
  id: string;
  name: string;
  category: string;
  tone: string;
  usageCount: number;
  active: boolean;
  text: string;
}

export const mockTemplates: Template[] = [
  {
    id: "t1",
    name: "5-Star Thank You",
    category: "5-star happy customer",
    tone: "Warm",
    usageCount: 234,
    active: true,
    text: "Thank you so much {{customer_name}}! We're thrilled you loved your experience at {{business_name}}. See you soon!",
  },
  {
    id: "t2",
    name: "4-Star Positive",
    category: "4-star positive review",
    tone: "Friendly",
    usageCount: 156,
    active: true,
    text: "Thank you {{customer_name}}! We really appreciate your kind words. We hope to make your next visit even better at {{business_name}}!",
  },
  {
    id: "t3",
    name: "Neutral Response",
    category: "Neutral review",
    tone: "Professional",
    usageCount: 89,
    active: true,
    text: "Thank you for your feedback, {{customer_name}}. We're continuously working to improve our services at {{location_name}}.",
  },
  {
    id: "t4",
    name: "Complaint Apology",
    category: "1–2 star complaint",
    tone: "Apologetic",
    usageCount: 45,
    active: true,
    text: "Dear {{customer_name}}, we sincerely apologize for the experience. This is not the standard at {{business_name}}. Please contact us so we can make it right.",
  },
  {
    id: "t5",
    name: "Wait Time Apology",
    category: "Delayed service complaint",
    tone: "Apologetic",
    usageCount: 28,
    active: true,
    text: "Dear {{customer_name}}, we're sorry for the long wait. We're working on improving our scheduling at {{location_name}}.",
  },
  {
    id: "t6",
    name: "Staff Behavior Response",
    category: "Staff behavior complaint",
    tone: "Apologetic",
    usageCount: 12,
    active: false,
    text: "Dear {{customer_name}}, we sincerely apologize for the behavior you experienced. We've addressed this with our team at {{location_name}}.",
  },
  {
    id: "t7",
    name: "Salon Service Issue",
    category: "Salon service complaint",
    tone: "Apologetic",
    usageCount: 18,
    active: true,
    text: "Hi {{customer_name}}, we're sorry your {{service_name}} didn't meet expectations. We'd love to have you back to make it right at no charge.",
  },
  {
    id: "t8",
    name: "No-Text Rating Reply",
    category: "No-text rating-only review",
    tone: "Warm",
    usageCount: 67,
    active: true,
    text: "Thank you for the rating, {{customer_name}}! We'd love to hear your thoughts. Hope to see you again at {{business_name}}!",
  },
];

export interface AutoRule {
  id: string;
  name: string;
  ratingCondition: string;
  sentimentCondition: string;
  keywordsToBlock: string[];
  locationCondition: string;
  action: "Auto-post reply" | "Send for approval" | "Send urgent alert" | "Skip";
  template: string;
  tone: string;
  active: boolean;
}

export const mockAutoRules: AutoRule[] = [
  {
    id: "ar1",
    name: "5-star Auto Thank You",
    ratingCondition: "5 stars",
    sentimentCondition: "Positive",
    keywordsToBlock: [],
    locationCondition: "All locations",
    action: "Auto-post reply",
    template: "5-Star Thank You",
    tone: "Warm",
    active: true,
  },
  {
    id: "ar2",
    name: "4-star Approval Flow",
    ratingCondition: "4 stars",
    sentimentCondition: "Positive",
    keywordsToBlock: [],
    locationCondition: "All locations",
    action: "Send for approval",
    template: "4-Star Positive",
    tone: "Friendly",
    active: true,
  },
  {
    id: "ar3",
    name: "Negative Review Alert",
    ratingCondition: "1-3 stars",
    sentimentCondition: "Negative",
    keywordsToBlock: ["refund", "rude", "scam", "legal", "injury"],
    locationCondition: "All locations",
    action: "Send urgent alert",
    template: "Complaint Apology",
    tone: "Apologetic",
    active: true,
  },
  {
    id: "ar4",
    name: "Keyword Block Rule",
    ratingCondition: "Any",
    sentimentCondition: "Any",
    keywordsToBlock: ["refund", "complaint", "angry", "legal", "police"],
    locationCondition: "All locations",
    action: "Skip",
    template: "None",
    tone: "None",
    active: true,
  },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  signupDate: string;
  plan: string;
  paymentStatus: "Paid" | "Trial" | "Failed" | "Cancelled";
  businessConnected: boolean;
  locationsCount: number;
  lastActive: string;
  status: "Active" | "Trial" | "Cancelled" | "Suspended";
}

export const mockAdminUsers: AdminUser[] = [
  { id: "u1", name: "Riya Kapoor", email: "riya@glowsalon.com", phone: "+91 98765 43210", country: "India", signupDate: "2024-11-01", plan: "Growth", paymentStatus: "Paid", businessConnected: true, locationsCount: 3, lastActive: "2 hours ago", status: "Active" },
  { id: "u2", name: "Sanjay Patel", email: "sanjay@spicegarden.com", phone: "+91 87654 32109", country: "India", signupDate: "2024-10-15", plan: "Pro", paymentStatus: "Paid", businessConnected: true, locationsCount: 7, lastActive: "1 day ago", status: "Active" },
  { id: "u3", name: "Meera Iyer", email: "meera@healthclinic.com", phone: "+91 76543 21098", country: "India", signupDate: "2024-12-01", plan: "Starter", paymentStatus: "Trial", businessConnected: false, locationsCount: 0, lastActive: "3 days ago", status: "Trial" },
  { id: "u4", name: "David Chen", email: "david@fitzone.com", phone: "+1 555-234-5678", country: "USA", signupDate: "2024-09-20", plan: "Pro", paymentStatus: "Paid", businessConnected: true, locationsCount: 12, lastActive: "5 hours ago", status: "Active" },
  { id: "u5", name: "Fatima Al-Hassan", email: "fatima@glamour.ae", phone: "+971 50 123 4567", country: "UAE", signupDate: "2024-11-10", plan: "Growth", paymentStatus: "Failed", businessConnected: true, locationsCount: 2, lastActive: "1 week ago", status: "Suspended" },
  { id: "u6", name: "Amrita Sharma", email: "amrita@naturals.com", phone: "+91 65432 10987", country: "India", signupDate: "2024-08-05", plan: "Growth", paymentStatus: "Paid", businessConnected: true, locationsCount: 4, lastActive: "12 hours ago", status: "Active" },
  { id: "u7", name: "Tom Wilson", email: "tom@luxehotel.co.uk", phone: "+44 7700 900123", country: "UK", signupDate: "2024-12-10", plan: "Starter", paymentStatus: "Trial", businessConnected: false, locationsCount: 0, lastActive: "Today", status: "Trial" },
  { id: "u8", name: "Nisha Reddy", email: "nisha@coachingplus.com", phone: "+91 54321 09876", country: "India", signupDate: "2024-07-01", plan: "Pro", paymentStatus: "Cancelled", businessConnected: false, locationsCount: 0, lastActive: "1 month ago", status: "Cancelled" },
  { id: "u9", name: "Rajesh Kumar", email: "rajesh@royalhotel.com", phone: "+91 43210 98765", country: "India", signupDate: "2024-10-01", plan: "Pro", paymentStatus: "Paid", businessConnected: true, locationsCount: 5, lastActive: "3 hours ago", status: "Active" },
  { id: "u10", name: "Maria Garcia", email: "maria@bellasalon.es", phone: "+34 612 345 678", country: "Spain", signupDate: "2024-12-15", plan: "Starter", paymentStatus: "Trial", businessConnected: true, locationsCount: 1, lastActive: "Today", status: "Trial" },
];

export interface Payment {
  id: string;
  customerName: string;
  businessName: string;
  plan: string;
  amount: string;
  currency: string;
  provider: "Razorpay" | "Stripe";
  status: "Paid" | "Failed" | "Refunded" | "Pending";
  offerApplied?: string;
  date: string;
  nextBilling: string;
}

export const mockPayments: Payment[] = [
  { id: "p1", customerName: "Riya Kapoor", businessName: "Glow Salon", plan: "Growth", amount: "₹999", currency: "INR", provider: "Razorpay", status: "Paid", date: "2025-01-01", nextBilling: "2025-02-01" },
  { id: "p2", customerName: "Sanjay Patel", businessName: "Spice Garden", plan: "Pro", amount: "₹1,999", currency: "INR", provider: "Razorpay", status: "Paid", offerApplied: "DIWALI30", date: "2024-12-15", nextBilling: "2025-01-15" },
  { id: "p3", customerName: "David Chen", businessName: "FitZone Gym", plan: "Pro", amount: "$39", currency: "USD", provider: "Stripe", status: "Paid", date: "2025-01-05", nextBilling: "2025-02-05" },
  { id: "p4", customerName: "Fatima Al-Hassan", businessName: "Glamour Salon", plan: "Growth", amount: "₹999", currency: "INR", provider: "Razorpay", status: "Failed", date: "2025-01-08", nextBilling: "—" },
  { id: "p5", customerName: "Amrita Sharma", businessName: "Naturals Salon", plan: "Growth", amount: "₹999", currency: "INR", provider: "Razorpay", status: "Paid", offerApplied: "WELCOME50", date: "2024-12-01", nextBilling: "2025-01-01" },
  { id: "p6", customerName: "Tom Wilson", businessName: "Luxe Hotel", plan: "Starter", amount: "$9", currency: "USD", provider: "Stripe", status: "Paid", date: "2025-01-10", nextBilling: "2025-02-10" },
  { id: "p7", customerName: "Rajesh Kumar", businessName: "Royal Hotel", plan: "Pro", amount: "₹1,999", currency: "INR", provider: "Razorpay", status: "Paid", date: "2025-01-03", nextBilling: "2025-02-03" },
  { id: "p8", customerName: "Meera Iyer", businessName: "HealthFirst Clinic", plan: "Starter", amount: "₹499", currency: "INR", provider: "Razorpay", status: "Refunded", date: "2024-12-20", nextBilling: "—" },
  { id: "p9", customerName: "Maria Garcia", businessName: "Bella Salon", plan: "Starter", amount: "$9", currency: "USD", provider: "Stripe", status: "Pending", date: "2025-01-11", nextBilling: "2025-02-11" },
  { id: "p10", customerName: "Nisha Reddy", businessName: "CoachingPlus", plan: "Pro", amount: "₹1,999", currency: "INR", provider: "Razorpay", status: "Refunded", date: "2024-06-01", nextBilling: "—" },
];

export const mockOffers = [
  { id: "o1", code: "WELCOME50", discount: "50% off first month", discountType: "percentage" as const, value: 50, validTill: "2025-12-31", plan: "All Plans", usedCount: 234, limitCount: 500, active: true },
  { id: "o2", code: "FIRSTMONTH99", discount: "₹99 for first month", discountType: "fixed" as const, value: 99, validTill: "2025-03-31", plan: "Starter", usedCount: 89, limitCount: 200, active: true },
  { id: "o3", code: "DIWALI30", discount: "30% off", discountType: "percentage" as const, value: 30, validTill: "2025-11-30", plan: "Growth, Pro", usedCount: 156, limitCount: 300, active: true },
  { id: "o4", code: "SALON20", discount: "20% off for salons", discountType: "percentage" as const, value: 20, validTill: "2025-06-30", plan: "Starter", usedCount: 45, limitCount: 100, active: true },
  { id: "o5", code: "CLINICSTART", discount: "₹0 setup fee", discountType: "fixed" as const, value: 0, validTill: "2025-09-30", plan: "All Plans", usedCount: 28, limitCount: 150, active: false },
];

export const reviewsChartData = [
  { day: "Jan 1", reviews: 12 }, { day: "Jan 2", reviews: 8 }, { day: "Jan 3", reviews: 15 },
  { day: "Jan 4", reviews: 18 }, { day: "Jan 5", reviews: 11 }, { day: "Jan 6", reviews: 22 },
  { day: "Jan 7", reviews: 19 }, { day: "Jan 8", reviews: 14 }, { day: "Jan 9", reviews: 25 },
  { day: "Jan 10", reviews: 17 },
];

export const ratingDistData = [
  { rating: "5 Star", count: 734, fill: "#22c55e" },
  { rating: "4 Star", count: 312, fill: "#84cc16" },
  { rating: "3 Star", count: 98, fill: "#eab308" },
  { rating: "2 Star", count: 67, fill: "#f97316" },
  { rating: "1 Star", count: 36, fill: "#ef4444" },
];

export const replyStatusData = [
  { name: "Posted", value: 1189, fill: "#22c55e" },
  { name: "Pending", value: 23, fill: "#eab308" },
  { name: "Skipped", value: 28, fill: "#94a3b8" },
  { name: "Failed", value: 7, fill: "#ef4444" },
];

export const locationPerfData = [
  { location: "Delhi NCR", reviews: 203, replies: 203 },
  { location: "Pune", reviews: 387, replies: 362 },
  { location: "Mumbai", reviews: 512, replies: 468 },
];

export const adminUserGrowthData = [
  { month: "Jul", users: 120 }, { month: "Aug", users: 198 }, { month: "Sep", users: 287 },
  { month: "Oct", users: 389 }, { month: "Nov", users: 512 }, { month: "Dec", users: 694 },
  { month: "Jan", users: 847 },
];

export const adminRevenueData = [
  { month: "Jul", revenue: 32000 }, { month: "Aug", revenue: 54000 }, { month: "Sep", revenue: 71000 },
  { month: "Oct", revenue: 89000 }, { month: "Nov", revenue: 104000 }, { month: "Dec", revenue: 118000 },
  { month: "Jan", revenue: 124500 },
];

export const planDistData = [
  { name: "Starter", value: 312, fill: "#4f46e5" },
  { name: "Growth", value: 438, fill: "#0ea5e9" },
  { name: "Pro", value: 89, fill: "#8b5cf6" },
  { name: "Enterprise", value: 8, fill: "#06b6d4" },
];

export const mockWhatsAppLogs = [
  { id: "w1", customer: "Riya Kapoor", business: "Glow Salon", reviewId: "#R-4521", messageType: "Approval Request", deliveryStatus: "Delivered", ownerResponse: "YES", timestamp: "2025-01-10 14:32" },
  { id: "w2", customer: "Sanjay Patel", business: "Spice Garden", reviewId: "#R-4518", messageType: "Urgent Alert", deliveryStatus: "Delivered", ownerResponse: "EDIT", timestamp: "2025-01-10 13:15" },
  { id: "w3", customer: "Amrita Sharma", business: "Naturals Salon", reviewId: "#R-4510", messageType: "Approval Request", deliveryStatus: "Delivered", ownerResponse: "SKIP", timestamp: "2025-01-10 11:44" },
  { id: "w4", customer: "Rajesh Kumar", business: "Royal Hotel", reviewId: "#R-4505", messageType: "Approval Request", deliveryStatus: "Failed", ownerResponse: "—", timestamp: "2025-01-09 18:22" },
  { id: "w5", customer: "David Chen", business: "FitZone Gym", reviewId: "#R-4498", messageType: "Urgent Alert", deliveryStatus: "Delivered", ownerResponse: "YES", timestamp: "2025-01-09 09:05" },
];

export const mockGoogleHealth = [
  { id: "g1", business: "Glow Salon", location: "Pune Branch", googleAccount: "glow.pune@gmail.com", tokenStatus: "Healthy", lastSync: "10 min ago", fetchStatus: "Success", replyStatus: "Success" },
  { id: "g2", business: "Glow Salon", location: "Mumbai Branch", googleAccount: "glow.mumbai@gmail.com", tokenStatus: "Expired", lastSync: "3 days ago", fetchStatus: "Failed", replyStatus: "Failed" },
  { id: "g3", business: "Glow Salon", location: "Delhi NCR", googleAccount: "glow.delhi@gmail.com", tokenStatus: "Healthy", lastSync: "15 min ago", fetchStatus: "Success", replyStatus: "Success" },
  { id: "g4", business: "Spice Garden", location: "Main Branch", googleAccount: "spicegarden@gmail.com", tokenStatus: "Healthy", lastSync: "5 min ago", fetchStatus: "Success", replyStatus: "Success" },
  { id: "g5", business: "Royal Hotel", location: "Jaipur", googleAccount: "royal.jaipur@gmail.com", tokenStatus: "Needs Reconnect", lastSync: "1 day ago", fetchStatus: "Partial", replyStatus: "Failed" },
];

export const mockSupportTickets = [
  { id: "st1", customer: "Riya Kapoor", issue: "Google OAuth not working after reconnect", status: "Open" as const, created: "2025-01-10", updated: "2025-01-10" },
  { id: "st2", customer: "Fatima Al-Hassan", issue: "Payment failed but amount deducted", status: "In Progress" as const, created: "2025-01-09", updated: "2025-01-10" },
  { id: "st3", customer: "Tom Wilson", issue: "WhatsApp messages not being delivered", status: "Resolved" as const, created: "2025-01-07", updated: "2025-01-09" },
  { id: "st4", customer: "Meera Iyer", issue: "Unable to add second location", status: "Open" as const, created: "2025-01-08", updated: "2025-01-08" },
  { id: "st5", customer: "David Chen", issue: "AI replies generating in wrong language", status: "In Progress" as const, created: "2025-01-06", updated: "2025-01-10" },
];

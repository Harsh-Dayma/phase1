export interface Sponsor {
  id: string
  name: string
  ticker: string
  color: string
  accentColor: string
  logoText: string
  description: string
  website: string
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'google',
    name: 'Google',
    ticker: 'GOOGL',
    color: '#06B6D4',
    accentColor: '#38BDF8',
    logoText: 'GOOGLE',
    description: 'Circular Electronics Partnership & Cloud Sustainability',
    website: 'https://sustainability.google'
  },
  {
    id: 'apple',
    name: 'Apple',
    ticker: 'AAPL',
    color: '#F8FAFC',
    accentColor: '#94A3B8',
    logoText: 'APPLE',
    description: 'Apple 2030 Carbon Neutral Hardware Initiative',
    website: 'https://apple.com/environment'
  },
  {
    id: 'intel',
    name: 'Intel',
    ticker: 'INTC',
    color: '#0284C7',
    accentColor: '#38BDF8',
    logoText: 'INTEL',
    description: 'RISE 2030 Sustainable Semiconductor Recycling',
    website: 'https://intel.com/responsibility'
  },
  {
    id: 'tcs',
    name: 'TCS',
    ticker: 'TCS',
    color: '#10B981',
    accentColor: '#34D399',
    logoText: 'TCS',
    description: 'Zero Waste Campus Drive & Green Cloud Computing',
    website: 'https://tcs.com/sustainability'
  },
  {
    id: 'tata',
    name: 'Tata Sustainability',
    ticker: 'TATA',
    color: '#3B82F6',
    accentColor: '#60A5FA',
    logoText: 'TATA',
    description: 'Project Aalingana — Circular Economy Across Bharat',
    website: 'https://tata.com/sustainability'
  },
  {
    id: 'infosys',
    name: 'Infosys',
    ticker: 'INFY',
    color: '#F59E0B',
    accentColor: '#FBBF24',
    logoText: 'INFOSYS',
    description: 'Carbon Neutral Campus Operations & E-Waste Stewardship',
    website: 'https://infosys.com/sustainability'
  },
  {
    id: 'dell',
    name: 'Dell Technologies',
    ticker: 'DELL',
    color: '#0EA5E9',
    accentColor: '#7DD3FC',
    logoText: 'DELL',
    description: 'Moonshot 2030: 1-for-1 Hardware Recycling Goal',
    website: 'https://dell.com/recycle'
  },
  {
    id: 'tesla',
    name: 'Tesla Energy',
    ticker: 'TSLA',
    color: '#EF4444',
    accentColor: '#F87171',
    logoText: 'TESLA',
    description: 'Closed-Loop Battery Material Recovery Program',
    website: 'https://tesla.com/impact'
  }
]

export const SPONSOR_MAP = new Map<string, Sponsor>(
  SPONSORS.map((s) => [s.id, s])
)

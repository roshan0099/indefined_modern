import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';

// Types for our service data
type ServiceTier = 'base' | 'standard' | 'pro';
type WebsiteType = 'static' | 'portfolio' | 'ecommerce';
type MarketingType = 'seo' | 'social';

interface PricingOption {
    id: string;
    name: string;
    price: number;
    description: string;
}

interface WebOption {
    type: WebsiteType;
    basePrice: number;
    tiers: {
        standard: number; // Additive cost
        premium: number;  // Additive cost
    }
}

// Pricing Configuration
const PRICING_DATA = {
    design: {
        logo: {
            base: 1500,
            standard: 3000,
            pro: 5000
        },
        poster: {
            base: 500,
            standard: 1200,
            pro: 2500
        }
    },
    web: {
        static: { base: 5000, pages: 1000 }, // per extra page
        portfolio: { base: 8000 },
        ecommerce: { base: 25000 }
    },
    maintenance: {
        update: 2000, // One time
        support: 5000 // Monthly
    },
    marketing: {
        seo: {
            basic: 8000,
            advanced: 15000
        },
        social: {
            posts: 10000, // 10 posts
            reels: 15000  // 5 reels
        }
    }
};

const ServiceEstimator: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<'design' | 'web' | 'marketing'>('design');
    const [enabledCategories, setEnabledCategories] = useState({
        design: true,
        web: false,
        marketing: false
    });

    // Design State
    const [designService, setDesignService] = useState<'logo' | 'poster'>('logo');
    const [designTier, setDesignTier] = useState<ServiceTier>('base');

    // Web State
    const [webType, setWebType] = useState<WebsiteType>('static');
    const [webPages, setWebPages] = useState(5); // Default 5 pages
    const [webSupport, setWebSupport] = useState(false);

    // Marketing State
    const [marketingSeo, setMarketingSeo] = useState<'none' | 'basic' | 'advanced'>('none');
    const [marketingSocial, setMarketingSocial] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);

    const toggleCategory = (catId: 'design' | 'web' | 'marketing') => {
        setEnabledCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]
        }));
    };

    // Calculate Price Effect
    useEffect(() => {
        let price = 0;

        // Design
        if (enabledCategories.design) {
            price += PRICING_DATA.design[designService][designTier];
        }

        // Web
        if (enabledCategories.web) {
            const base = PRICING_DATA.web[webType].base;
            let extras = 0;
            if (webType === 'static') {
                const extraPages = Math.max(0, webPages - 5);
                extras += extraPages * PRICING_DATA.web.static.pages;
            }
            if (webSupport) extras += PRICING_DATA.maintenance.support;
            price += base + extras;
        }

        // Marketing
        if (enabledCategories.marketing) {
            if (marketingSeo !== 'none') {
                price += PRICING_DATA.marketing.seo[marketingSeo];
            }
            if (marketingSocial) {
                price += PRICING_DATA.marketing.social.posts + PRICING_DATA.marketing.social.reels;
            }
        }

        setTotalPrice(price);
    }, [enabledCategories, designService, designTier, webType, webPages, webSupport, marketingSeo, marketingSocial]);


    const categories = [
        { id: 'design', label: 'Graphic Design', icon: '🎨' },
        { id: 'web', label: 'Web Development', icon: '💻' },
        { id: 'marketing', label: 'Digital Marketing', icon: '🚀' },
    ];

    return (
        <section className="py-20 bg-white dark:bg-dark-bg transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-heading text-4xl md:text-5xl mb-4 text-black dark:text-white">
                        Estimate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-green to-emerald-600 dark:from-emerald-400 dark:to-emerald-600">Project</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">Select categories and customize your package to get an instant estimate.</p>
                </motion.div>

                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => {
                        const isEnabled = enabledCategories[cat.id as keyof typeof enabledCategories];
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id as any)}
                                className={`px-8 py-4 rounded-2xl flex items-center gap-3 transition-all duration-300 border-2 relative ${isActive
                                    ? 'border-primary-green dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg scale-105'
                                    : 'border-transparent bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <span className="text-2xl">{cat.icon}</span>
                                <span className={`font-heading text-lg ${isActive ? 'text-black dark:text-white' : ''}`}>
                                    {cat.label}
                                </span>
                                {isEnabled && (
                                    <div className="absolute -top-2 -right-2 bg-primary-green dark:bg-emerald-500 text-white rounded-full p-1 border-2 border-white dark:border-dark-bg">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Options Panel */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeCategory}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-gray-50 dark:bg-dark-card rounded-3xl p-8 border border-gray-200 dark:border-gray-800 mr-min-h-[400px]"
                            >
                                {/* Category Toggle Header */}
                                <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-2xl font-heading text-black dark:text-white">
                                            {categories.find(c => c.id === activeCategory)?.label}
                                        </h3>
                                    </div>
                                    <label className="flex items-center cursor-pointer gap-3">
                                        <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            {enabledCategories[activeCategory] ? 'Included' : 'Not Included'}
                                        </span>
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={enabledCategories[activeCategory]}
                                                onChange={() => toggleCategory(activeCategory)}
                                            />
                                            <div className={`block w-14 h-8 rounded-full transition-colors ${enabledCategories[activeCategory] ? 'bg-primary-green dark:bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${enabledCategories[activeCategory] ? 'transform translate-x-6' : ''}`}></div>
                                        </div>
                                    </label>
                                </div>

                                <div className={!enabledCategories[activeCategory] ? 'opacity-50 pointer-events-none grayscale transition-all duration-300' : 'transition-all duration-300'}>
                                    {/* GRAPHIC DESIGN OPTIONS */}
                                    {activeCategory === 'design' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-heading mb-4 text-black dark:text-white">Service Type</h3>
                                                <div className="flex gap-4">
                                                    {['logo', 'poster'].map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setDesignService(type as any)}
                                                            className={`flex-1 py-3 px-6 rounded-xl border transition-all ${designService === type
                                                                ? 'border-primary-green dark:border-emerald-500 bg-white dark:bg-gray-800 shadow-md text-primary-green dark:text-emerald-400'
                                                                : 'border-gray-200 dark:border-gray-700 text-gray-500'
                                                                }`}
                                                        >
                                                            <span className="capitalize font-bold">{type} Design</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-heading mb-4 text-black dark:text-white">Quality Tier</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    {(['base', 'standard', 'pro'] as const).map((tier) => (
                                                        <button
                                                            key={tier}
                                                            onClick={() => setDesignTier(tier)}
                                                            className={`p-4 rounded-xl border text-left transition-all ${designTier === tier
                                                                ? 'border-primary-green dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10 ring-1 ring-primary-green dark:ring-emerald-500'
                                                                : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700'
                                                                }`}
                                                        >
                                                            <div className="font-bold text-lg capitalize mb-1 text-black dark:text-white">{tier}</div>
                                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                                {tier === 'base' && 'Essential elements, standard delivery.'}
                                                                {tier === 'standard' && 'Polished look, multiple concepts.'}
                                                                {tier === 'pro' && 'Premium details, priority support, source files.'}
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* WEB DEV OPTIONS */}
                                    {activeCategory === 'web' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-heading mb-4 text-black dark:text-white">Website Type</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                    {(['static', 'portfolio', 'ecommerce'] as const).map((type) => (
                                                        <button
                                                            key={type}
                                                            onClick={() => setWebType(type)}
                                                            className={`p-4 rounded-xl border transition-all text-center ${webType === type
                                                                ? 'border-primary-green dark:border-emerald-500 text-black dark:text-white bg-white dark:bg-gray-800 shadow-md'
                                                                : 'border-gray-200 dark:border-gray-700 text-gray-500'
                                                                }`}
                                                        >
                                                            <span className="capitalize font-bold block">{type}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {webType === 'static' && (
                                                <div>
                                                    <h3 className="text-xl font-heading mb-4 text-black dark:text-white">Number of Pages: {webPages}</h3>
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="20"
                                                        value={webPages}
                                                        onChange={(e) => setWebPages(parseInt(e.target.value))}
                                                        className="w-full accent-emerald-500"
                                                    />
                                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                                        <span>1 Page</span>
                                                        <span>20 Pages</span>
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <label className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={webSupport}
                                                        onChange={(e) => setWebSupport(e.target.checked)}
                                                        className="w-6 h-6 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-black dark:text-white">Include Maintenance & Support</div>
                                                        <div className="text-sm text-gray-500">Monthly checkups, updates, and bug fixes.</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )}

                                    {/* MARKETING OPTIONS */}
                                    {activeCategory === 'marketing' && (
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="text-xl font-heading mb-4 text-black dark:text-white">SEO Package</h3>
                                                <div className="space-y-3">
                                                    {(['none', 'basic', 'advanced'] as const).map((opt) => (
                                                        <label key={opt} className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${marketingSeo === opt
                                                            ? 'border-primary-green dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
                                                            : 'border-gray-200 dark:border-gray-700'
                                                            }`}>
                                                            <input
                                                                type="radio"
                                                                name="seo_opt"
                                                                checked={marketingSeo === opt}
                                                                onChange={() => setMarketingSeo(opt)}
                                                                className="w-5 h-5 text-emerald-600 focus:ring-emerald-500"
                                                            />
                                                            <div>
                                                                <div className="font-bold capitalize text-black dark:text-white">{opt === 'none' ? 'No SEO' : `${opt} SEO`}</div>
                                                                {opt !== 'none' && <div className="text-sm text-gray-500">
                                                                    {opt === 'basic' ? 'Keywords, Meta tags, Basic Analytics' : 'Competitor Analysis, Content Strategy, Monthly Reports'}
                                                                </div>}
                                                            </div>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-heading mb-4 text-black dark:text-white">Social Media</h3>
                                                <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${marketingSocial
                                                    ? 'border-primary-green dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10'
                                                    : 'border-gray-200 dark:border-gray-700'
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={marketingSocial}
                                                        onChange={(e) => setMarketingSocial(e.target.checked)}
                                                        className="w-6 h-6 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                                    />
                                                    <div>
                                                        <div className="font-bold text-black dark:text-white">Social Boost Bundle</div>
                                                        <div className="text-sm text-gray-500">Includes 10 Posts + 5 Reels + Content Calendar</div>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Receipt / Total Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <div className="bg-black/90 dark:bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 blur-[80px] opacity-20 pointer-events-none"></div>

                                <h3 className="font-heading text-2xl mb-6">Estimated Cost</h3>

                                <div className="space-y-4 mb-8 text-white/80 max-h-[400px] overflow-y-auto custom-scrollbar">
                                    {enabledCategories.design && (
                                        <div className="pb-4 border-b border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-emerald-400">Graphic Design</span>
                                                <span className="text-xs bg-white/10 px-2 py-1 rounded">Selected</span>
                                            </div>
                                            <div className="pl-2 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="capitalize">{designService} - {designTier}</span>
                                                    <span>₹{PRICING_DATA.design[designService][designTier]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {enabledCategories.web && (
                                        <div className="pb-4 border-b border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-emerald-400">Web Development</span>
                                                <span className="text-xs bg-white/10 px-2 py-1 rounded">Selected</span>
                                            </div>
                                            <div className="pl-2 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="capitalize">{webType} Site</span>
                                                    <span>₹{PRICING_DATA.web[webType].base}</span>
                                                </div>
                                                {webType === 'static' && (webPages - 5) > 0 && (
                                                    <div className="flex justify-between text-white/60">
                                                        <span>Extra Pages ({webPages - 5})</span>
                                                        <span>+ ₹{(webPages - 5) * PRICING_DATA.web.static.pages}</span>
                                                    </div>
                                                )}
                                                {webSupport && (
                                                    <div className="flex justify-between text-white/60">
                                                        <span>Maintenance</span>
                                                        <span>+ ₹{PRICING_DATA.maintenance.support}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {enabledCategories.marketing && (
                                        <div className="pb-4 border-b border-white/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-bold text-emerald-400">Marketing</span>
                                                <span className="text-xs bg-white/10 px-2 py-1 rounded">Selected</span>
                                            </div>
                                            <div className="pl-2 space-y-2 text-sm">
                                                {marketingSeo !== 'none' && (
                                                    <div className="flex justify-between">
                                                        <span className="capitalize">{marketingSeo} SEO</span>
                                                        <span>+ ₹{PRICING_DATA.marketing.seo[marketingSeo]}</span>
                                                    </div>
                                                )}
                                                {marketingSocial && (
                                                    <div className="flex justify-between">
                                                        <span>Social Bundle</span>
                                                        <span>+ ₹{PRICING_DATA.marketing.social.posts + PRICING_DATA.marketing.social.reels}</span>
                                                    </div>
                                                )}
                                                {marketingSeo === 'none' && !marketingSocial && (
                                                    <div className="text-sm italic opacity-50">No options selected</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {!enabledCategories.design && !enabledCategories.web && !enabledCategories.marketing && (
                                        <div className="text-center py-8 text-white/40 italic">
                                            Select categories to build your package.
                                        </div>
                                    )}
                                </div>

                                <div className="border-t border-white/20 pt-6 mb-8">
                                    <div className="flex justify-between items-end">
                                        <span className="text-lg">Total Estimate</span>
                                        <motion.span
                                            key={totalPrice}
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="font-heading text-4xl text-emerald-400"
                                        >
                                            ₹{totalPrice.toLocaleString()}
                                        </motion.span>
                                    </div>
                                </div>

                                <Button variant="primary" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white border-none">
                                    Book This Package
                                </Button>
                                <p className="text-xs text-center mt-4 text-white/40">*Estimated price. Final quote may vary based on specific requirements.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceEstimator;

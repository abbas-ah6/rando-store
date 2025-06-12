export const heroSectionData: THero = {
    heading: "Welcome to RandoStore",
    subHeading: "Discover and sell the most random, quirky, and unexpected items all in one place.",
    links: [
        {
            href: "/products",
            label: "Explore Our Products",
        },
    ],
    banner: {
        src: "/images/home-hero-banner.jpg",
        fileName: "hero-banner.jpg",
    },
}

export const linkCardsData: TLinkCards = {
    heading: "Start Exploring RandoStore",
    subHeading: "Navigate through our quirky marketplace with ease!",
    cards: [
        {
            title: "Explore All Products",
            shortDescription: "Dive into our collection of the most random and unique items available for purchase.",
            link: {
                href: "/products",
                label: "Browse Products",
            },
        },
        {
            title: "Checkout",
            shortDescription: "Ready to buy? Head over to your cart and complete your purchase effortlessly.",
            link: {
                href: "/checkout",
                label: "Go to Checkout",
            },
        },
        {
            title: "Add New Product",
            shortDescription: "Got something fun to sell? List your item and reach curious buyers instantly.",
            link: {
                href: "/add-product",
                label: "Add Your Product",
            },
        },
    ],
};

export const productsSectionData: TProductsList = {
    heading: "Explore Our Products",
    subHeading: "Find quirky and unique items from our growing catalog.",
    showAllProducts: false
};
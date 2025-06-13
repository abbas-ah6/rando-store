type TImage = {
    src: string
    fileName: string
}

type TLink = {
    label: string
    href: string
    className?: string
}

type THero = {
    heading: string
    subHeading: string
    links?: TLink[]
    banner?: TImage
}

type TLinkCard = {
    title: string
    shortDescription: string
    link: TLink
}

type TLinkCards = {
    heading: string
    subHeading: string
    cards: TLinkCard[]
}

type THeader = {
    storeName: string
    links: TLink[]
}

type TProduct = {
    id: number;
    name: string;
    price: number;
    img: string;
};

type TProductsList = {
    heading: string
    subHeading: string
    showAllProducts?: boolean
}

type TProductCardProps = {
    product: TProduct
};

type TCartItem = {
    id: number
    name: string
    price: number
    img: string
    quantity?: number
};

type TCartContextType = {
    cart: TCartItem[]
    totalItems: number
    totalPrice: number
    isCartOpen: boolean
    addItem: (item: TCartItem) => void
    removeItem: (id: number) => void
    clearCart: () => void
    toggleCart: (open: boolean) => void
    updateItemQuantity: (id: number, quantity: number) => void
};

type TSearchBarProps = {
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleSearch: () => void
    onClearSearch: () => void
}
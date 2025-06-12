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
    product: TProduct;
};
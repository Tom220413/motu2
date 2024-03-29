export type SearchResult = {
    totalHits: number;
    hits: SearchHit[];
}

export type SearchHit = {
    id: number;
    title: string;
    titlecana: string
    description: string;
    address: string;
    phone_number: string;
    url: string;
    image_url: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}

export type Tab = {
    id: number;
    label: string;
    content: JSX.Element;
}

export type Review = {
    id: number;
    author: string;
    text: string;
}

export type AuthUser = {
    userid: string;
}

export type OperationType = {
    login: (userId: string) => void
    logout: () => void
}

export type Prefecture = {
    id: number;
    name: string;
}
export type StoreDetail = {
    id: string
    name: string,
    namekana: string,
    description: string,
    address: string,
    latitude: string,
    longitude: string,
    phone_number: string,
    email: string,
    opening_hours: string,
    regular_holiday: string,
    photos: string,
}

export type RankingType = {
    storeid: string,
    menu: string,
    soup: string,
    shime: string,
    image: {
        id: number,
        url: string,
        description: string
    }[],
    comment: string
}


export type MypageCountType = {
    review_count: number,
    iine_count: number,
    favorite_count: number,
}

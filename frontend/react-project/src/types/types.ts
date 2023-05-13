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
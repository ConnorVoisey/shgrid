export type ContactRow = {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    organisation: {
        name: string;
        id: string;
        postcode: string;
    };
    active: boolean;
    mobile: string;
    postcode: string;
}

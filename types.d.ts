// auth user that can access to the API
type CurrentUser = {
    id: number,
};

declare namespace Express {
    export interface Request {
        currentUser: CurrentUser;
    }
}

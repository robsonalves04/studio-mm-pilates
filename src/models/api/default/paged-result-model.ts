export class ApiPagedResultModel<T> {
    constructor(
        public query: string | null,
        public index: number,
        public totalPages: number,
        public list: T[] | undefined = undefined
    ) { }
}
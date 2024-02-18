export class ValidationProblemsDetails {
    constructor(
        public title: string,
        public desc: string,
        public errors : {[key : string] : string[]} = {},
        public status : string | number
    ) { }
}
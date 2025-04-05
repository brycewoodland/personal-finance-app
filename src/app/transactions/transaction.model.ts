export class Transaction {
    constructor(
        public date: Date,
        public description: string,
        public amount: number,
        public type: string,
        public categoryId: string,
        public userId: string,
        public customId: number
    ) {}
}
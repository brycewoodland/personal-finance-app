export class Budget {
    constructor(
        public categoryId: Object,
        public allocated: number,
        public spent: number,
        public remaining: number, 
        public userId: Object,
        public customId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}

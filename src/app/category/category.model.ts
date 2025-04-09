export class Category {
    constructor(
        public id: string,
        public name: string,
        public icon: string,
        public userId: string,
        public description: string,
        public createdAt: Date,
        public updatedAt: Date,
        public color?: string
    ) {}
}
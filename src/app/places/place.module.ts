export class Place {
  constructor(public id: string,
    public title: string,
    public description: string,
    public imgUrl: string,
    public price: number,
    public avaibleForm: Date,
    public avaiableTo: Date,
    public userId: string) { }
}

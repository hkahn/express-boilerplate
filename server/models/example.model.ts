import { getModelForClass, prop } from '@typegoose/typegoose';

export interface IExample {
  _id?: string;
  title?: string;
  description?: string;
}

export class Example implements IExample {
  // title
  @prop({ type: String, required: false })
  public title?: string;
  // description
  @prop({ type: String, required: false })
  public description?: string;
  // when deleted
  @prop({ type: Date, required: false })
  public deletedAt?: Date;

  constructor({ title, description }: { title?: string; description?: string }) {
    this.title = title;
    this.description = description;
  }
}

export default getModelForClass(Example, { schemaOptions: { timestamps: true } });
